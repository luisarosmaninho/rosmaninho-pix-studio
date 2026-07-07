import { createStart, createCsrfMiddleware } from "@tanstack/react-start";

/**
 * TanStack Start application instance.
 * Adds CSRF protection to all server function endpoints.
 *
 * Replit note: requests go through a TLS-terminating proxy so the
 * server sees `http://localhost:5000` while the browser Origin is the
 * public Replit domain.  We explicitly allow that domain so the CSRF
 * check does not block legitimate admin saves in development.
 */
const replitOrigin = process.env.REPLIT_DEV_DOMAIN
  ? `https://${process.env.REPLIT_DEV_DOMAIN}`
  : null;

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
  origin: (origin, ctx) => {
    // Allow the Replit dev-proxy origin in addition to the standard same-origin check.
    if (replitOrigin && origin === replitOrigin) return true;
    try {
      return origin === new URL((ctx as { request: Request }).request.url).origin;
    } catch {
      return false;
    }
  },
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware],
}));
