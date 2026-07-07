import { createStart, createCsrfMiddleware } from "@tanstack/react-start";

/**
 * TanStack Start application instance.
 * Adds CSRF protection to all server function endpoints.
 */
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware],
}));
