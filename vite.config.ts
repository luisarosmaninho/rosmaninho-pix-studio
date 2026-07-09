import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import fs from "fs";
import path from "path";

function rssDevPlugin(): Plugin {
  return {
    name: "rss-dev",
    configureServer(server) {
      server.middlewares.use("/api/rss", (_req, res) => {
        try {
          const configPath = path.join(process.cwd(), "journal-config.json");
          let overrides: Record<string, unknown> = {};
          try { overrides = JSON.parse(fs.readFileSync(configPath, "utf-8")); } catch {}

          // Dynamic import to avoid static analysis issues
          const journalPath = path.join(process.cwd(), "src/lib/journal.ts");
          void journalPath;

          // Read static journal data directly
          const journalConfigPath = path.join(process.cwd(), "journal-config.json");
          let journalOverrides: Record<string, Record<string, string>> = {};
          try { journalOverrides = JSON.parse(fs.readFileSync(journalConfigPath, "utf-8")); } catch {}

          const BASE = "https://rosmaninhofotografia.pt";

          // We'll build from overrides what we can, but mostly relay on a simple XML for dev
          const xml = buildDevRss(journalOverrides, BASE);
          res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
          res.end(xml);
        } catch (err) {
          res.statusCode = 500;
          res.end("RSS error: " + String(err));
        }
      });
    },
  };
}

function buildDevRss(overrides: Record<string, Record<string, string>>, BASE: string): string {
  // Static journal slugs/dates/titles – mirrored from journal.ts for dev-mode RSS
  const staticEntries = [
    { slug: "o-cafe-antes-de-tudo", date: "2026-05-20", title: "Vinte minutos antes de pegar na câmara", excerpt: "A câmara fica dentro do saco. Aprendi que funciona melhor assim — esperar. Pedir qualquer coisa quente. Deixar o lugar tornar-se lugar." },
    { slug: "figura-no-mondego", date: "2026-04-12", title: "Uma vez, havia uma figura no rio, em Outense", excerpt: "Não estava a fazer nada que eu conseguisse perceber. Só estava. Água pelos joelhos, costas para mim." },
    { slug: "telhados-com-nevoa", date: "2026-02-03", title: "A cidade tinha encolhido durante a noite", excerpt: "Fui à janela e Coimbra tinha só a metade de baixo. A outra metade tinha ido algures, sem aviso." },
    { slug: "matcha-da-manha", date: "2025-12-18", title: "O verde que não esperava às oito da manhã", excerpt: "Há uma qualidade de luz às oito da manhã de dezembro que não se repete noutro mês. Naquele dia havia matcha, havia frio, havia a janela aberta." },
    { slug: "retrato-na-esplanada", date: "2025-11-05", title: "Havia alguém sentado contra a luz", excerpt: "Não estava a fotografar retratos. Estava a tomar café. Ela estava sentada dois lugares à frente, de costas para o sol." },
    { slug: "ribeiro-e-musgo", date: "2025-09-14", title: "Encontrei água onde não esperava encontrá-la", excerpt: "Andei durante quarenta minutos num bosque que não estava no mapa. A água apareceu sem aviso." },
    { slug: "barco-no-douro", date: "2025-07-22", title: "Porto às seis da manhã tem frio de pedra", excerpt: "Fui antes dos turistas. O Douro era outro rio àquela hora — mais escuro, mais quieto, mais seu." },
  ];

  const entries = staticEntries
    .map((e) => ({ ...e, ...(overrides[e.slug] ?? {}) }))
    .sort((a, b) => b.date.localeCompare(a.date));

  const items = entries
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

export default defineConfig({
  resolve: {
    // Guarantee a single React instance across all packages — prevents
    // "Invalid hook call" errors caused by duplicate React copies in SSR.
    dedupe: ["react", "react-dom", "react-dom/server"],
  },
  ssr: {
    // Apply the same deduplication inside the SSR environment.
    resolve: {
      dedupe: ["react", "react-dom", "react-dom/server"],
    },
  },
  plugins: [
    rssDevPlugin(),
    tsConfigPaths({ ignoreConfigErrors: true }),
    tailwindcss(),
    tanstackStart({
      server: { entry: "src/server.ts" },
      serverFns: {
        // CSRF is handled via src/start.ts — disable the startup warning
        disableCsrfMiddlewareWarning: true,
      },
    }),
    react(),
  ],
  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT ?? 5000),
    strictPort: true,
    allowedHosts: true,
    watch: {
      ignored: [
        "**/momento-config.json",
        "**/journal-config.json",
        "**/photos-config.json",
        "**/categories-config.json",
        "**/photos-meta-config.json",
        "**/new-photos-config.json",
        "**/notas-config.json",
        "**/sobre-config.json",
        "**/visits-config.json",
        "**/homepage-config.json",
        "**/contacto-config.json",
        "**/portfolio-page-config.json",
        "**/notas-page-config.json",
        "**/diario-config.json",
        "**/rosemary-config.json",
        "**/public/uploads/**",
      ],
    },
  },
  preview: {
    host: "0.0.0.0",
    port: Number(process.env.PORT ?? 5000),
    allowedHosts: true,
  },
});
