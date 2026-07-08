# Rosmaninho Fotografia

Photography portfolio website for Luísa Rosmaninho (rosmaninhofotografia.pt), built with TanStack Start + React 19 + Tailwind CSS v4 + PostgreSQL.

## Stack

- **Framework**: TanStack Start (SSR) + TanStack Router
- **UI**: React 19, Tailwind CSS v4, Radix UI, Framer Motion
- **Database**: PostgreSQL via `pg` — connection via `DATABASE_URL` (optional; falls back to JSON files)
- **Dev server**: Vite — port defaults to `PORT` env var, then `5000`

## Quick start (local)

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

See `.env.example` for all variables with descriptions.

| Variable | Required in prod | Description |
|---|---|---|
| `NODE_ENV` | ✅ | Set to `production` — enables prod optimisations and startup DB seed |
| `SITE_URL` | ✅ (behind proxy) | Public URL e.g. `https://rosmaninhofotografia.pt` — used for CSRF origin check |
| `ADMIN_PASSWORD` | Recommended | Password for `/admin` — defaults to `"rosmaninho"` if unset (⚠️ change before going live) |
| `DATABASE_URL` | Optional | PostgreSQL connection string — falls back to JSON files if not set |
| `PORT` | Optional | HTTP port — hosting platforms inject this automatically; defaults to `5000` |
| `GITHUB_TOKEN` | Optional | Personal access token for git push from the admin panel |
| `SMTP_HOST` | Optional | SMTP server hostname for contact form email delivery |
| `SMTP_PORT` | Optional | SMTP port (typically `587` or `465`) |
| `SMTP_USER` | Optional | SMTP login username |
| `SMTP_PASS` | Optional | SMTP login password |
| `CONTACT_EMAIL` | Optional | Destination address for contact form submissions |

## Production deployment

### Build & run (any Node.js host)

```bash
# 1. Install dependencies
npm install

# 2. Build for production
npm run build

# 3. Start the production server
npm start   # equivalent to: node dist/server/server.js
```

Set at minimum `NODE_ENV=production`, `SITE_URL`, and `ADMIN_PASSWORD` in your hosting platform's environment variables panel.

### Docker

```bash
docker build -t rosmaninho .
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e SITE_URL=https://example.com \
  -e ADMIN_PASSWORD=your-secure-password \
  -e DATABASE_URL=postgresql://... \
  rosmaninho
```

### Supported platforms

| Platform | How to deploy |
|---|---|
| **Railway** | Connect repo → Railway detects Node automatically; set env vars in the dashboard |
| **Render** | Build: `npm run build` · Start: `npm start`; set env vars in the dashboard |
| **Fly.io** | `fly launch` — uses the included `Dockerfile` |
| **VPS / own server** | `npm run build` + `npm start` with PM2 or systemd |
| **Cloudflare Workers** | ⚠️ Not recommended — the app uses Node.js file-system APIs (`fs`, `path`) and a stateful PostgreSQL connection that are incompatible with the Workers runtime |

## Database schema

Single table `admin_config`, created automatically on first startup:

```sql
CREATE TABLE IF NOT EXISTS admin_config (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

Schema creation is handled by `ensureSchema()` in `src/lib/db.ts`, called from `src/server.ts` on startup. No migration tool or manual step is needed.

## CSRF note

The CSRF middleware in `src/start.ts` compares the browser's `Origin` header against the server-side request URL. When the app runs behind a TLS-terminating reverse proxy the server sees an internal `http://…:PORT` URL while the browser sends the public `https://…` origin. Setting `SITE_URL` to the public-facing URL resolves this mismatch.

## Content management & sync (dev ↔ prod)

All admin content is written to **both** the PostgreSQL DB (table `admin_config`) and the JSON config files (`*-config.json`) in the project root simultaneously.

**Sync flow:**
1. Edit content in `/admin` — saves to DB + updates JSON files
2. Click **"Publicar no GitHub"** in admin — commits JSON files + pushes to GitHub
3. Fresh deployment reads JSON files → seeds its own DB via `loadJsonToDb()` → serves

This means dev and prod always converge after a git push, with no manual data migration.

## Routes

| Route | Description |
|---|---|
| `/` | Homepage |
| `/portfolio` | Photo archive |
| `/portfolio/:category` | Series — `urbanas`, `natureza`, `retratos`, `iguarias` |
| `/diario` | Journal (Caderno de Matcha) |
| `/diario/:slug` | Individual journal entry |
| `/notas` | Field notes |
| `/sobre` | About / Author |
| `/contacto` | Contact form |
| `/admin` | Content management panel (password-protected) |
| `/rosemary` | Hidden route (type "rosemary" anywhere on the site) |
| `/api/rss` | RSS feed for the journal |

## Scripts

```bash
npm run dev        # Dev server (port from PORT env var, default 5000)
npm run build      # Production build
npm run preview    # Preview production build locally
npm run lint       # ESLint
npm run format     # Prettier
npm run sitemap    # Generate sitemap
npm start          # Start production server (after build)
```

## Notes

- Dark/light mode auto-switches based on sunrise/sunset for Coimbra (40.2033°N, 8.4103°W)
- CSRF protection is active via `src/start.ts` (TanStack Start middleware)
- RSS feed at `/api/rss` reads from DB, falls back to `journal-config.json`

## User preferences
