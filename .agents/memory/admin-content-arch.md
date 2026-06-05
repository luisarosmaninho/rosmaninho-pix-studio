---
name: Admin content architecture
description: How the /admin CMS and JSON override system works for Rosmaninho Fotografia
---

## Architecture

All editable content uses JSON override files at project root. Server functions merge static TS defaults with JSON overrides. Routes fetch via loaders.

**JSON config files:**
- `photos-config.json` — photo order + hidden (existing)
- `momento-config.json` — Neste Momento (existing)
- `categories-config.json` — category text overrides per slug
- `photos-meta-config.json` — photo title/description/conditions overrides per photo id
- `journal-config.json` — journal entry text overrides per slug
- `notas-config.json` — full notas array (replaces static when exists)
- `sobre-config.json` — sobre page text config (merged with SOBRE_DEFAULTS)

**Server functions in `src/lib/content-fns.ts`:**
- `getCategories()` / `saveCategoryTexts()`
- `getPhotosWithMeta()` / `savePhotoMeta()`
- `getJournal()` / `saveJournalEntry()`
- `getNotas()` / `saveNotas()`
- `getSobreTexts()` / `saveSobreTexts()`

**Admin tabs:** Momento | Séries | Fotos | Caderno | Notas | Autora | Ordem

**Routes modified to use loaders:**
- `portfolio.index.tsx` → `getCategories()`
- `portfolio.$category.tsx` → `getPhotoConfig()` + `getCategories()` + `getPhotosWithMeta()`
- `diario.index.tsx` → `getJournal()`
- `diario.$slug.tsx` → `getJournal()`
- `notas.tsx` → `getNotas()`
- `sobre.tsx` → `getNesteMomento()` + `getSobreTexts()` + `getCategories()`

**Why:** beforeLoad/head still use static data (SSR reliability); components use Route.useLoaderData() for dynamic content.

**Auth pattern:** Password checked server-side on every write. Admin stores password in React state after gate. Uses `ADMIN_PASSWORD` env secret (fallback: "rosmaninho").
