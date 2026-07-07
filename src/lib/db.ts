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
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
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
