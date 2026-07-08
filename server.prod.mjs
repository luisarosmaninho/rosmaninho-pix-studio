/**
 * Production HTTP server for TanStack Start.
 *
 * `vite build` produces dist/server/server.js which exports a Web Fetch API
 * handler (i.e. `{ fetch(request, env, ctx) }`) — it does NOT start an HTTP
 * server on its own.  This wrapper adapts it to Node's http.createServer so
 * the process stays alive and responds to health checks.
 */

import { createServer } from "node:http";
import { Readable } from "node:stream";

const PORT = Number(process.env.PORT ?? 5000);
const HOST = "0.0.0.0";

// Dynamic import keeps this file valid even before a build exists.
const { default: handler } = await import("./dist/server/server.js");

const server = createServer(async (nodeReq, nodeRes) => {
  // ── Build Headers ──────────────────────────────────────────────────────────
  const headers = {};
  for (let i = 0; i < nodeReq.rawHeaders.length; i += 2) {
    const key = nodeReq.rawHeaders[i].toLowerCase();
    const val = nodeReq.rawHeaders[i + 1];
    headers[key] = headers[key] ? `${headers[key]}, ${val}` : val;
  }

  // ── Reconstruct URL ────────────────────────────────────────────────────────
  const proto = headers["x-forwarded-proto"] ?? "https";
  const host = headers["x-forwarded-host"] ?? headers["host"] ?? `localhost:${PORT}`;
  const url = `${proto}://${host}${nodeReq.url}`;

  // ── Collect request body (non-GET / non-HEAD) ──────────────────────────────
  let body = undefined;
  if (nodeReq.method !== "GET" && nodeReq.method !== "HEAD") {
    const chunks = [];
    for await (const chunk of nodeReq) chunks.push(chunk);
    if (chunks.length) body = Buffer.concat(chunks);
  }

  const request = new Request(url, {
    method: nodeReq.method,
    headers,
    ...(body != null ? { body } : {}),
  });

  // ── Dispatch to TanStack Start handler ─────────────────────────────────────
  try {
    const response = await handler.fetch(request, {}, {
      waitUntil() {},
      passThroughOnException() {},
    });

    nodeRes.statusCode = response.status;
    response.headers.forEach((v, k) => nodeRes.setHeader(k, v));

    if (response.body) {
      // Stream the response body — important for TanStack Start streaming SSR.
      Readable.fromWeb(response.body).pipe(nodeRes);
    } else {
      nodeRes.end();
    }
  } catch (err) {
    console.error("[server] unhandled error:", err);
    if (!nodeRes.headersSent) {
      nodeRes.statusCode = 500;
      nodeRes.end("Internal Server Error");
    }
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
