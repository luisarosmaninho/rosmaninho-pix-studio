/**
 * Gera public/sitemap.xml a partir das entradas do diário e das páginas estáticas.
 * Uso: node scripts/generate-sitemap.mjs
 *
 * Adiciona uma entrada aqui sempre que criares uma nova entrada no diário.
 */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = "https://rosmaninhofotografia.pt";

const staticPages = [
  { path: "/",                    changefreq: "weekly",  priority: "1.0" },
  { path: "/sobre",               changefreq: "monthly", priority: "0.7" },
  { path: "/portfolio",           changefreq: "weekly",  priority: "0.9" },
  { path: "/portfolio/urbanas",   changefreq: "weekly",  priority: "0.8" },
  { path: "/portfolio/natureza",  changefreq: "weekly",  priority: "0.8" },
  { path: "/portfolio/retratos",  changefreq: "weekly",  priority: "0.8" },
  { path: "/portfolio/iguarias",  changefreq: "weekly",  priority: "0.8" },
  { path: "/diario",              changefreq: "weekly",  priority: "0.8" },
  { path: "/notas",               changefreq: "monthly", priority: "0.7" },
  { path: "/contacto",            changefreq: "monthly", priority: "0.5" },
];

// Adiciona aqui cada nova entrada do diário { slug, date }
const journalEntries = [
  { slug: "figura-no-mondego",    date: "2026-04-12" },
  { slug: "telhados-com-nevoa",   date: "2026-02-03" },
  { slug: "barco-no-douro",       date: "2026-01-17" },
  { slug: "matcha-da-manha",      date: "2025-11-18" },
  { slug: "retrato-na-esplanada", date: "2025-09-06" },
  { slug: "ribeiro-e-musgo",      date: "2025-06-29" },
];

function url({ loc, lastmod, changefreq, priority }) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

const staticUrls = staticPages
  .map((p) => url({ loc: `${BASE_URL}${p.path}`, changefreq: p.changefreq, priority: p.priority }))
  .join("\n");

const journalUrls = journalEntries
  .map((e) =>
    url({
      loc: `${BASE_URL}/diario/${e.slug}`,
      lastmod: e.date,
      changefreq: "monthly",
      priority: "0.7",
    })
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Páginas principais -->
${staticUrls}

  <!-- Entradas do diário -->
${journalUrls}

</urlset>
`;

const outPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`✓ sitemap.xml gerado com ${staticPages.length + journalEntries.length} URLs → ${outPath}`);
