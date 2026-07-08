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
 *
 * On Replit, REPLIT_DEV_DOMAIN is set automatically — no extra config needed.
 */

// Prefer explicit SITE_URL; fall back to Replit's automatic dev domain.
const publicUrl = process.env.SITE_URL
  || (process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : null);

let allowedOrigin: string | null = null;
if (publicUrl) {
  try {
    allowedOrigin = new URL(publicUrl).origin;
  } catch {
    console.error(
      `[csrf] Invalid public URL "${publicUrl}" — must be a valid URL (e.g. https://example.com). ` +
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
