---
name: API endpoints in TanStack Start v1
description: How to add custom API routes (e.g. /api/rss) when createAPIFileRoute doesn't exist in this version.
---

## Rule
`createAPIFileRoute` from `@tanstack/react-start/api` does NOT exist in TanStack Start v1.168.x. Custom API endpoints need two complementary implementations:

1. **Dev mode** — add a Vite plugin with `configureServer` in `vite.config.ts`. Place it BEFORE `tanstackStart()` in the plugins array so it intercepts first.
2. **Production** — intercept the request in `src/server.ts` before delegating to the TanStack Start handler.

**Why:** In dev mode, Vite runs its own dev server and `src/server.ts` is not executed directly. `configureServer` middlewares are the only way to inject custom handlers into the Vite dev pipeline.

**How to apply:** Any new endpoint (e.g. `/api/webhook`) needs both a `server.middlewares.use("/api/webhook", ...)` in `configureServer` and a URL check before `handler.fetch(request, ...)` in `src/server.ts`.
