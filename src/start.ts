import { createStart, createCsrfMiddleware } from "@tanstack/react-start";

/**
 * TanStack Start application instance.
 * Adds CSRF protection to all server function endpoints.
 *
 * Reverse-proxy note: when the app runs behind a TLS-terminating proxy
 * (e.g. Railway, Render, Fly.io, nginx) the server sees an internal
 * http://…:PORT URL while the browser sends the public HTTPS origin.
 * Set SITE_URL to the public-facing URL (e.g. https://example.com) so
 * the CSRF check does not block legitimate requests from the browser.
 */
let allowedOrigin: string | null = null;
if (process.env.SITE_URL) {
  try {
    allowedOrigin = new URL(process.env.SITE_URL).origin;
  } catch {
    console.error(
      `[csrf] Invalid SITE_URL "${process.env.SITE_URL}" — must be a valid URL (e.g. https://example.com). ` +
      "CSRF will fall back to same-origin-only checks until this is fixed.",
    );
  }
}

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
  origin: (origin, ctx) => {
    // Allow the configured public origin in addition to the standard same-origin check.
    if (allowedOrigin && origin === allowedOrigin) return true;
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
