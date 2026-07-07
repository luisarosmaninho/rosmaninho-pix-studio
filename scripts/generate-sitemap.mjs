/**
 * Gera public/sitemap.xml dinamicamente a partir dos dados reais do diário.
 * Lê as entradas estáticas de src/lib/journal.ts e as entradas dinâmicas
 * de journal-config.json — não é necessário actualizar este ficheiro manualmente.
 *
 * Uso: node scripts/generate-sitemap.mjs
 * Executado automaticamente pelo botão "Publicar no GitHub" do painel admin.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const BASE_URL = "https://rosmaninhofotografia.pt";

// ── Páginas estáticas ────────────────────────────────────────────────────────
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

// ── Entradas do diário — lidas dos dados reais ────────────────────────────────
// 1. Entradas estáticas: extraídas do ficheiro journal.ts por regex
const journalTs = readFileSync(resolve(root, "src/lib/journal.ts"), "utf-8");
const slugs = [...journalTs.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);
const dates = [...journalTs.matchAll(/date:\s*["'](\d{4}-\d{2}-\d{2})["']/g)].map(m => m[1]);
const staticEntries = slugs.map((slug, i) => ({ slug, date: dates[i] ?? "" })).filter(e => e.date);

// 2. Entradas dinâmicas: adicionadas pelo admin e guardadas em journal-config.json
let newEntries = [];
try {
  const config = JSON.parse(readFileSync(resolve(root, "journal-config.json"), "utf-8"));
  newEntries = Array.isArray(config.newEntries) ? config.newEntries : [];
} catch { /* ficheiro ainda não existe */ }

// Combina tudo, removendo duplicados pelo slug (dinâmica tem prioridade)
const seen = new Set();
const allJournalEntries = [...staticEntries, ...newEntries].filter(e => {
  if (seen.has(e.slug)) return false;
  seen.add(e.slug);
  return true;
}).sort((a, b) => b.date.localeCompare(a.date));

// ── Helpers XML ──────────────────────────────────────────────────────────────
function urlEntry({ loc, lastmod, changefreq, priority }) {
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
  .map(p => urlEntry({ loc: `${BASE_URL}${p.path}`, changefreq: p.changefreq, priority: p.priority }))
  .join("\n");

const journalUrls = allJournalEntries
  .map(e => urlEntry({ loc: `${BASE_URL}/diario/${e.slug}`, lastmod: e.date, changefreq: "monthly", priority: "0.7" }))
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Páginas principais -->
${staticUrls}

  <!-- Entradas do diário (${allJournalEntries.length} entradas) -->
${journalUrls}

</urlset>
`;

const outPath = resolve(root, "public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`✓ sitemap.xml — ${staticPages.length} páginas + ${allJournalEntries.length} entradas do diário → ${outPath}`);
