---
name: DB writeConfig JSON sync
description: writeConfig always writes JSON files alongside DB — the mechanism for dev↔prod content sync via git.
---

## Rule
`writeConfig(key, value)` in `src/lib/db.ts` ALWAYS writes both:
1. The JSON config file mapped in `KEY_TO_JSON` (even if DATABASE_URL is absent)
2. The DB row (only when DATABASE_URL is set)

**Why:** Admin saves must be captured in git. JSON files are committed and pushed when the user clicks "Publicar no GitHub". A fresh deployment (empty DB) reads JSON → migrates to DB on first `writeConfig` call.

## How to apply
- When adding a new editable section, add its DB key → JSON filename to `KEY_TO_JSON` in `src/lib/db.ts`.
- `writeConfig` already has a try/catch on the DB write — JSON always succeeds even if DB fails.
- `readConfig` already returns fallback on any DB error — safe in JSON-only mode.

## DB graceful fallback (JSON-only mode)
When `DATABASE_URL` is not set (`HAS_DB = false`):
- `readConfig` reads from the mapped JSON file (or returns fallback if file missing)
- `writeConfig` writes only to JSON file, skips DB
- `ensureSchema` is a no-op

This means the app works fully in VS Code / local dev without any database.

## Schema init race fix
`ensureSchema` uses an in-flight promise (`schemaPromise`) to prevent concurrent callers from hitting the table-not-exist error. `writeConfig` calls `ensureSchema()` before the DB UPSERT, ensuring the table exists on first write. The schema flag `schemaInitialized` is only set to `true` AFTER the CREATE TABLE succeeds.
