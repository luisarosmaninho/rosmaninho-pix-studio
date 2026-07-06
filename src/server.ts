import "./lib/error-capture";

import fs from "fs";
import path from "path";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { journal as staticJournal } from "./lib/journal";
import type { JournalEntry } from "./lib/journal";
import { ensureSchema } from "./lib/db";

// Create admin_config table if it doesn't exist yet (dev and production).
ensureSchema().catch((err) => console.error("[server] ensureSchema failed:", err));

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

// ── RSS Feed ───────────────────────────────────────────────────────────────────

type JournalConfig = Record<string, Partial<JournalEntry>>;

function buildRssFeed(): string {
  const configPath = path.join(process.cwd(), "journal-config.json");
  let overrides: JournalConfig = {};
  try {
    overrides = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } catch {
    // no overrides file yet
  }
  const entries = staticJournal.map((entry) => {
    const ov = overrides[entry.slug];
    return ov ? { ...entry, ...ov } : entry;
  });
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  const BASE = "https://rosmaninhofotografia.pt";

  const items = sorted
    .map(
      (e) => `    <item>
      <title><![CDATA[${e.title}]]></title>
      <link>${BASE}/diario/${e.slug}</link>
      <guid isPermaLink="true">${BASE}/diario/${e.slug}</guid>
      <pubDate>${new Date(e.date + "T12:00:00Z").toUTCString()}</pubDate>
      <description><![CDATA[${e.excerpt}]]></description>
    </item>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Caderno de Matcha — Rosmaninho Fotografia</title>
    <link>${BASE}/diario</link>
    <description>Notas sobre fotografias e o que estava a sentir quando as fiz. Por Luísa Rosmaninho.</description>
    <language>pt-PT</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE}/api/rss" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

function handleRss(): Response {
  try {
    return new Response(buildRssFeed(), {
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
  } catch (err) {
    console.error("RSS generation error:", err);
    return new Response("RSS unavailable", { status: 500 });
  }
}

// ── Main export ───────────────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);

    if (url.pathname === "/api/rss") {
      return handleRss();
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
