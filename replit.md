# Rosmaninho Fotografia

Photography portfolio website for Luísa Rosmaninho (rosmaninhofotografia.pt), built with TanStack Start + React + Tailwind CSS v4 + PostgreSQL.

## Stack

- **Framework**: TanStack Start (SSR) + TanStack Router
- **UI**: React 19, Tailwind CSS v4, Radix UI, Framer Motion
- **Database**: PostgreSQL (Replit built-in) via `pg` — connection via `DATABASE_URL` (runtime-managed)
- **Dev server**: Vite on port 5000

## How to run

```
npm run dev
```

Workflow: **Start application** → `npm run dev` → port 5000

## Routes

- `/` — Homepage
- `/portfolio` / `/portfolio/:category` — Photo portfolio
- `/diario` / `/diario/:slug` — Journal (Caderno de Matcha)
- `/notas` — Notes
- `/sobre` — About
- `/contacto` — Contact
- `/video` — Video
- `/admin` — Admin panel (content management)
- `/rosemary` — Internal route

## Database

Uses Replit's built-in PostgreSQL. `DATABASE_URL` is injected automatically at runtime.

Schema: single `admin_config` table (`key TEXT PRIMARY KEY, value JSONB, updated_at TIMESTAMPTZ`) used to store all admin-managed content overrides.

Admin data reads from PostgreSQL with JSON file fallbacks for static defaults.

## Notes

- App uses a dark/light mode that auto-switches based on sunrise/sunset calculated for Coimbra coordinates (40.2033°N, 8.4103°W)
- Content (photos, journal entries, homepage text) is managed via the `/admin` route and persisted to `admin_config` in PostgreSQL
- RSS feed available at `/api/rss`

## User preferences
