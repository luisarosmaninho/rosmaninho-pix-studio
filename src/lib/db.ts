import pg from "pg";
import fs from "fs";
import path from "path";

const { Pool } = pg;

// ── JSON file registry ────────────────────────────────────────────────────────
// Every DB key maps to a JSON config file on disk.
// writeConfig() always writes both the DB (when available) AND the JSON file,
// so git commits automatically capture the latest content and a fresh deployment
// (empty DB) can bootstrap itself from the committed JSON files.

const KEY_TO_JSON: Record<string, string> = {
  categories:      "categories-config.json",
  photos_meta:     "photos-meta-config.json",
  new_photos:      "new-photos-config.json",
  journal:         "journal-config.json",
  notas:           "notas-config.json",
  contacto:        "contacto-config.json",
  portfolio_page:  "portfolio-page-config.json",
  notas_page:      "notas-page-config.json",
  homepage:        "homepage-config.json",
  sobre:           "sobre-config.json",
  momento:         "momento-config.json",
  neste_momento:   "momento-config.json",  // alias — same file as momento
  visits:          "visits-config.json",
  visit_counts:    "visits-config.json",   // used by visits-fns.ts
  photos_config:   "photos-config.json",
  photo_config:    "photos-config.json",   // used by photo-config-fns.ts
  diario_config:   "diario-config.json",
  rosemary:        "rosemary-config.json",
};

function jsonFilePath(key: string): string | null {
  const filename = KEY_TO_JSON[key];
  if (!filename) return null;
  return path.join(process.cwd(), filename);
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

function writeJsonFile(filePath: string, value: unknown): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(value, null, 2), "utf-8");
  } catch (err) {
    console.warn(`[db] Could not write JSON file ${filePath}:`, err);
  }
}

// ── Database pool ─────────────────────────────────────────────────────────────
// When DATABASE_URL is not set the app runs in JSON-only mode: reads and writes
// go directly to the JSON files. This allows local development (VS Code, etc.)
// without a database, and also works on any hosting provider out of the box.

const HAS_DB = !!process.env.DATABASE_URL;

let pool: pg.Pool | null = null;
let schemaInitialized = false;

export function getPool(): pg.Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 5000,  // fail fast if DB unreachable
      statement_timeout: 8000,        // kill hung queries after 8 s
      idleTimeoutMillis: 30000,
    });
  }
  return pool;
}

// In-flight promise so concurrent callers wait for the same init
let schemaPromise: Promise<void> | null = null;

export async function ensureSchema(): Promise<void> {
  if (!HAS_DB) return;          // no-op in JSON-only mode
  if (schemaInitialized) return;
  if (schemaPromise) return schemaPromise;
  schemaPromise = (async () => {
    try {
      await getPool().query(`
        CREATE TABLE IF NOT EXISTS admin_config (
          key TEXT PRIMARY KEY,
          value JSONB NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        )
      `);
      schemaInitialized = true;
    } catch (err) {
      // Reset so the next call can retry
      schemaPromise = null;
      console.error("[db] Failed to ensure schema:", err);
    }
  })();
  return schemaPromise;
}

export async function readConfig<T>(key: string, fallback: T): Promise<T> {
  if (!HAS_DB) {
    // JSON-only mode — read directly from the config file
    const jp = jsonFilePath(key);
    return jp ? readJsonFile(jp, fallback) : fallback;
  }
  // In production, wait for the startup JSON→DB seed before serving data.
  // _startupSeed is set to null once complete, so this is a no-op after the first run.
  if (_startupSeed) await _startupSeed;
  try {
    const result = await getPool().query<{ value: T }>(
      "SELECT value FROM admin_config WHERE key = $1",
      [key]
    );
    if (result.rows.length > 0) return result.rows[0].value as T;
    return fallback;
  } catch {
    return fallback;
  }
}

export async function writeConfig(key: string, value: unknown): Promise<void> {
  // Always sync the JSON file so git commits capture the latest content.
  // This is the bridge between dev and prod: admin saves → JSON updated →
  // git push commits JSON → fresh deployment reads JSON → migrates to DB.
  const jp = jsonFilePath(key);
  if (jp) writeJsonFile(jp, value);

  if (!HAS_DB) return;   // JSON-only mode — file write above is the only store

  // Ensure schema exists before writing (handles race on first request)
  await ensureSchema();

  try {
    await getPool().query(
      `INSERT INTO admin_config (key, value, updated_at)
       VALUES ($1, $2::jsonb, NOW())
       ON CONFLICT (key) DO UPDATE
         SET value = EXCLUDED.value,
             updated_at = EXCLUDED.updated_at`,
      [key, JSON.stringify(value)]
    );
  } catch (err) {
    // DB write failed but JSON file is already saved — log and continue.
    // Content is safe; DB will sync on next successful write.
    console.warn(`[db] writeConfig("${key}") DB write failed (JSON saved):`, err);
  }
}

// ── File ↔ key index ─────────────────────────────────────────────────────────
// Build a reverse map: filename → [keys…] so alias handling is deterministic.
// Iteration order of Object.entries() is insertion order, so the *first* key
// in KEY_TO_JSON for each file is the "primary" key; aliases follow.
const FILE_TO_KEYS: Map<string, string[]> = (() => {
  const m = new Map<string, string[]>();
  for (const [key, filename] of Object.entries(KEY_TO_JSON)) {
    if (!m.has(filename)) m.set(filename, []);
    m.get(filename)!.push(key);
  }
  return m;
})();

/** Returns the unique list of JSON config filenames managed by this registry. */
export function getConfigFilenames(): string[] {
  return [...new Set(Object.values(KEY_TO_JSON))];
}

// ── Sync helpers ─────────────────────────────────────────────────────────────

/**
 * Dump every DB key to its corresponding JSON file.
 * Call this BEFORE git commit so the repository always reflects the latest
 * content — even if some keys were saved before the JSON-write logic existed.
 *
 * Alias-safe: for each JSON file, only the primary key's value is written.
 * If the primary key is absent from the DB, the first alias that has a value
 * is used instead.
 */
export async function syncDbToJson(): Promise<void> {
  if (!HAS_DB) return; // JSON-only mode — files are already the source of truth
  try {
    await ensureSchema();
    const result = await getPool().query<{ key: string; value: unknown }>(
      "SELECT key, value FROM admin_config"
    );
    // Index all DB rows by key for O(1) lookup.
    const dbRows = new Map<string, unknown>(result.rows.map((r) => [r.key, r.value]));

    // For each unique file, pick the primary key's value (or first alias with data).
    for (const [filename, keys] of FILE_TO_KEYS) {
      let value: unknown = undefined;
      for (const k of keys) {
        if (dbRows.has(k)) { value = dbRows.get(k); break; }
      }
      if (value === undefined) continue; // nothing in DB for this file
      const jp = path.join(process.cwd(), filename);
      writeJsonFile(jp, value);
    }
  } catch (err) {
    console.warn("[db] syncDbToJson failed (non-critical):", err);
  }
}

/**
 * Seed the DB from JSON files on the filesystem.
 * Called once on server startup in production so that a git push + Replit Publish
 * cycle immediately reflects the new content — the JSON files baked into the
 * deployment build win over whatever the previous deployment left in the DB.
 *
 * Alias-safe: every alias key for a file is upserted so all code paths find data,
 * regardless of which key they use to read.
 *
 * Only skips a file if it cannot be read or cannot be parsed as JSON.
 * Valid empty structures ({} / []) ARE written — they represent intentional clears.
 */
export async function loadJsonToDb(): Promise<void> {
  if (!HAS_DB) return; // JSON-only mode — nothing to seed
  try {
    await ensureSchema();
    for (const [filename, keys] of FILE_TO_KEYS) {
      const jp = path.join(process.cwd(), filename);
      let raw: string;
      try { raw = fs.readFileSync(jp, "utf-8"); } catch { continue; } // file missing — skip
      let value: unknown;
      try { value = JSON.parse(raw); } catch { continue; } // malformed JSON — skip
      // INSERT only — never overwrite existing DB values.
      // The DB is the source of truth for a running deployment; admin changes
      // must survive server restarts. JSON files are only used to seed a
      // brand-new / empty database (fresh deploy or new instance).
      for (const key of keys) {
        try {
          await getPool().query(
            `INSERT INTO admin_config (key, value, updated_at)
             VALUES ($1, $2::jsonb, NOW())
             ON CONFLICT (key) DO NOTHING`,
            [key, JSON.stringify(value)]
          );
        } catch (err) {
          console.warn(`[db] loadJsonToDb("${key}") failed:`, err);
        }
      }
    }
    console.log("[db] loadJsonToDb: startup JSON→DB seed complete.");
  } catch (err) {
    console.warn("[db] loadJsonToDb failed (non-critical):", err);
  }
}

// ── Production startup seed ───────────────────────────────────────────────────
// Kick off the seed immediately when this module is first imported in production.
// readConfig() awaits _startupSeed before serving data, so early requests are
// blocked only for the brief duration of the seed (typically <100 ms).
let _startupSeed: Promise<void> | null = null;
if (process.env.NODE_ENV === "production" && HAS_DB) {
  _startupSeed = loadJsonToDb().finally(() => { _startupSeed = null; });
}

/** @internal – exported only so readConfig can await it. */
export function getStartupSeedPromise(): Promise<void> | null {
  return _startupSeed;
}
