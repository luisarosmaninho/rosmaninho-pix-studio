# Rosmaninho Fotografia

Photography portfolio website for Luísa Rosmaninho (rosmaninhofotografia.pt), built with TanStack Start + React 19 + Tailwind CSS v4 + PostgreSQL.

## Stack

- **Framework**: TanStack Start (SSR) + TanStack Router
- **UI**: React 19, Tailwind CSS v4, Radix UI, Framer Motion
- **Database**: PostgreSQL via `pg` — connection via `DATABASE_URL`
- **Dev server**: Vite on port 5000

## Quick start (Replit)

1. Open the Replit project
2. Set the required secrets in **Secrets** (🔒 padlock):
   - `ADMIN_PASSWORD` — password for the `/admin` panel
   - `DATABASE_URL` — auto-injected by the built-in PostgreSQL add-on
   - `GITHUB_TOKEN` — needed if you want to push content to GitHub from the admin panel
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — optional, for contact form email delivery
3. Click **Run** (or the workflow will start automatically)

## Quick start (VS Code / local)

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill in the env file
cp .env.example .env
# Edit .env — at minimum set ADMIN_PASSWORD
# DATABASE_URL is optional: without it the app runs in JSON-only mode

# 3. Start the dev server
npm run dev
# → http://localhost:5000
```

**JSON-only mode (no database):** if `DATABASE_URL` is not set, all content reads/writes go directly to the JSON config files (`*-config.json`) in the project root. This is ideal for local development without spinning up PostgreSQL.

## Environment variables

See `.env.example` for all variables with descriptions. Required in production:

| Variable | Description |
|---|---|
| `ADMIN_PASSWORD` | Password for `/admin` — defaults to `"rosmaninho"` if not set (⚠️ change in prod) |
| `DATABASE_URL` | PostgreSQL connection string — optional, falls back to JSON files |
| `GITHUB_TOKEN` | Personal access token for git push from admin panel |
| `SMTP_HOST/PORT/USER/PASS` | SMTP config for contact form email delivery |
| `CONTACT_EMAIL` | Where contact form emails are delivered |

## Routes

- `/` — Homepage
- `/portfolio` / `/portfolio/:category` — Photo portfolio (Urbanas, Natureza, Retratos, Iguarias)
- `/diario` / `/diario/:slug` — Journal (Caderno de Matcha)
- `/notas` — Field notes
- `/sobre` — About / Author
- `/contacto` — Contact form
- `/admin` — Admin panel (content management)
- `/rosemary` — Hidden route (type "rosemary" anywhere on the site)
- `/api/rss` — RSS feed

## Content management & sync (dev ↔ prod)

All admin content is stored in **PostgreSQL** (table `admin_config`) AND written simultaneously to JSON config files (`*-config.json`) in the project root.

**Sync flow:**
1. Edit content in `/admin` — saves to DB + updates JSON files
2. Click **"Publicar no GitHub"** in admin — commits JSON files + pushes to GitHub
3. Fresh deployment reads JSON files → migrates data to its own DB → serves

This means dev and prod always converge after a git push, with no manual data migration needed.

## Scripts

```bash
npm run dev        # Dev server (port 5000)
npm run build      # Production build
npm run preview    # Preview production build locally
npm run lint       # ESLint
npm run format     # Prettier
npm run sitemap    # Generate sitemap
```

## Database schema

Single table `admin_config`:

```sql
CREATE TABLE admin_config (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

Schema is created automatically on first startup (`ensureSchema()` in `src/server.ts`).

## Notes

- Dark/light mode auto-switches based on sunrise/sunset for Coimbra (40.2033°N, 8.4103°W)
- CSRF protection is enabled via `src/start.ts` (TanStack Start middleware)
- RSS feed at `/api/rss` reads from DB (falls back to `journal-config.json`)

## User preferences
