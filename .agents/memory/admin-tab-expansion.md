---
name: Admin tab expansion pattern
description: How to add a new editable section to the admin panel in this TanStack Start app
---

# Adding a new editable section to admin

## The rule
Every new editable area needs 5 coordinated changes:

1. **content-fns.ts** — add `getX` / `saveX` server functions with DB persistence via `cfg()` + `writeConfig()`. Export the types too.
2. **The page route** — add `getX()` to the route loader's `Promise.all`. Use loader data instead of hardcoded constants.
3. **admin.tsx imports** — import the new fns + types.
4. **admin.tsx TabId + TABS** — extend the union type and push `{ id, label }` to TABS array.
5. **admin.tsx loader + AdminPage** — add to Promise.all destructuring + render `{tab === "x" && <XSection ... />}` + write the `XSection` component.

## Why
The admin uses a single loader that fetches all data upfront. Adding a tab without updating the loader means the component has no data to show.

## How to apply
When user asks to "add admin control over page X", check if X has a loader already. If not, add server fns first, then wire the page, then add the admin tab.

## Current tabs (as of 2026-07-06)
homepage, momento, autora, contacto, portfolio, series, caderno, caderno-intro, notas, fotos, ordem, rosemary (§ Interior), github (↑ GitHub)
