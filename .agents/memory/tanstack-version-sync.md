---
name: TanStack package version sync
description: @tanstack/react-start and its internal sub-packages must stay in sync to avoid "Invalid hook call" + hydration errors
---

## Rule
All TanStack packages must be updated together: `@tanstack/react-start`, `@tanstack/react-router`, `@tanstack/router-plugin`.

**Why:** @tanstack/react-start bundles internal sub-packages (react-start-client, react-start-server, start-plugin-core) at their own version numbers. When the outer `react-router` version drifts ahead of these internals, React detects conflicting hook call sites and throws "Invalid hook call" + "Hydration failed" at runtime — with no useful stack trace.

**Confirmed symptom:** browser console shows both errors simultaneously, ~3 seconds after page load, with an empty `{}` error object. The hydration error message mentions `Math.random()` or `Date.now()` but the real cause is the version skew.

**How to apply:** When upgrading any TanStack package, run:
```
npm install @tanstack/react-start@latest @tanstack/react-router@latest @tanstack/router-plugin@latest
```
Then check `npm ls @tanstack/react-start` to confirm sub-packages (react-start-server, react-start-client) moved to matching minor versions.
