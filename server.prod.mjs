/**
 * Production HTTP server for TanStack Start.
 *
 * `vite build` produces:
 *   dist/server/server.js  — SSR handler (exports { fetch })
 *   dist/client/           — static assets (CSS, JS, images, …)
 *
 * This wrapper:
 *   1. Serves static files from dist/client/ (with proper caching)
 *   2. Passes everything else to the TanStack Start fetch handler
 */

import { createServer }            from "node:http";
import { Readable }                from "node:stream";
import { createReadStream, statSync } from "node:fs";
import { join, extname }           from "node:path";
import { fileURLToPath }           from "node:url";

const __dirname  = fileURLToPath(new URL(".", import.meta.url));
const STATIC_DIR = join(__dirname, "dist", "client");
const PORT       = Number(process.env.PORT ?? 5000);
const HOST       = "0.0.0.0";

// ── Static file MIME types ────────────────────────────────────────────────────
const MIME = {
  ".js":    "application/javascript; charset=utf-8",
  ".mjs":   "application/javascript; charset=utf-8",
  ".css":   "text/css; charset=utf-8",
  ".html":  "text/html; charset=utf-8",
  ".json":  "application/json",
  ".png":   "image/png",
  ".jpg":   "image/jpeg",
  ".jpeg":  "image/jpeg",
  ".gif":   "image/gif",
  ".svg":   "image/svg+xml",
  ".webp":  "image/webp",
  ".ico":   "image/x-icon",
  ".woff":  "font/woff",
  ".woff2": "font/woff2",
  ".ttf":   "font/ttf",
  ".xml":   "application/xml; charset=utf-8",
  ".txt":   "text/plain; charset=utf-8",
};

/**
 * Try to serve a static file from dist/client/.
 * Returns true if the response was handled, false to fall through to SSR.
 */
function tryServeStatic(nodeReq, nodeRes) {
  const pathname = decodeURIComponent(nodeReq.url.split("?")[0]);
  const filePath = join(STATIC_DIR, pathname);

  // Prevent directory traversal
  if (!filePath.startsWith(STATIC_DIR)) return false;

  try {
    const stat = statSync(filePath);
    if (!stat.isFile()) return false;

    const mime = MIME[extname(filePath)] ?? "application/octet-stream";
    nodeRes.statusCode = 200;
    nodeRes.setHeader("Content-Type", mime);
    nodeRes.setHeader("Content-Length", stat.size);
    // Fingerprinted assets (content-hashed) can be cached forever; others: 1 h
    nodeRes.setHeader(
      "Cache-Control",
      pathname.startsWith("/assets/")
        ? "public, max-age=31536000, immutable"
        : "public, max-age=3600",
    );
    createReadStream(filePath).pipe(nodeRes);
    return true;
  } catch {
    return false;
  }
}

// ── Load the TanStack Start SSR handler ───────────────────────────────────────
const { default: handler } = await import("./dist/server/server.js");

// ── HTTP server ───────────────────────────────────────────────────────────────
const server = createServer(async (nodeReq, nodeRes) => {
  // 1. Static assets first (CSS, JS, images, fonts, robots.txt, …)
  if (tryServeStatic(nodeReq, nodeRes)) return;

  // 2. Build Web API Request
  const headers = {};
  for (let i = 0; i < nodeReq.rawHeaders.length; i += 2) {
    const key = nodeReq.rawHeaders[i].toLowerCase();
    const val = nodeReq.rawHeaders[i + 1];
    headers[key] = headers[key] ? `${headers[key]}, ${val}` : val;
  }

  const proto = headers["x-forwarded-proto"] ?? "https";
  const host  = headers["x-forwarded-host"] ?? headers["host"] ?? `localhost:${PORT}`;
  const url   = `${proto}://${host}${nodeReq.url}`;

  let body = undefined;
  if (nodeReq.method !== "GET" && nodeReq.method !== "HEAD") {
    const chunks = [];
    for await (const chunk of nodeReq) chunks.push(chunk);
    if (chunks.length) body = Buffer.concat(chunks);
  }

  const request = new Request(url, {
    method:  nodeReq.method,
    headers,
    ...(body != null ? { body } : {}),
  });

  // 3. SSR handler
  try {
    const response = await handler.fetch(request, {}, {
      waitUntil() {},
      passThroughOnException() {},
    });

    nodeRes.statusCode = response.status;
    response.headers.forEach((v, k) => nodeRes.setHeader(k, v));

    if (response.body) {
      // Stream the response — required for TanStack Start streaming SSR
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
