---
name: Admin content architecture
description: How admin data is stored and read — PostgreSQL-backed, with JSON file migration path.
---

## Current architecture (PostgreSQL)

All admin-editable content is stored in a single PostgreSQL table:

```sql
CREATE TABLE admin_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### DB helper: `src/lib/db.ts`

- `readConfig(key, fallback)` — SELECT from admin_config, returns fallback if not found
- `writeConfig(key, value)` — UPSERT into admin_config

### DB keys and their owners

| Key | File | Content |
|---|---|---|
| `homepage` | content-fns.ts | Hero tagline, subtitle, manifesto, autora paragraphs |
| `categories` | content-fns.ts | Category title/description overrides |
| `photos_meta` | content-fns.ts | Per-photo title/description/date/location/conditions |
| `new_photos` | content-fns.ts | Entirely new photos added via admin |
| `journal` | content-fns.ts | `{overrides: {...}, newEntries: [...]}` |
| `notas` | content-fns.ts | Full notas array |
| `contacto` | content-fns.ts | Contact page texts |
| `portfolio_page` | content-fns.ts | Portfolio header/closing texts |
| `notas_page` | content-fns.ts | Notas page header/closing texts |
| `sobre` | content-fns.ts | Full sobre page content |
| `neste_momento` | content-fns.ts | Homepage "neste momento" items |
| `visits` | content-fns.ts | Visit count + lastReset |
| `photos_config` | photo-config-fns.ts | `{hidden: string[], order: string[]}` |
| `visit_counts` | visits-fns.ts | Per-slug visit counts `{slug: count}` |
| `momento` | momento-fns.ts | NesteMomento object (aLer, aEscutar, etc.) |

### Migration path

Every read function first tries DB; if no row exists, tries the legacy JSON file on disk, writes it to DB, and returns it. This ensures existing data survives the first deploy after migration.

**Why:** JSON files on the container's filesystem are wiped on every new deploy. PostgreSQL persists independently of deploys and is shared across all instances.

**How to apply:** Any new admin-editable field should use `readConfig`/`writeConfig` from `src/lib/db.ts` — never `fs.readFileSync`/`writeFileSync` for content that must survive redeploys.

**Auth pattern:** Password checked server-side on every write. Uses `ADMIN_PASSWORD` env secret (fallback: "rosmaninho").
