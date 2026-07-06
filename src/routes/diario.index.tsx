import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { getJournal, getDiarioConfig } from "@/lib/content-fns";

function rasuraParaEntrada(slug: string, seed: number, rasurasPorSlug: Record<string, string[]>): string {
  const pool = rasurasPorSlug[slug] ?? ["uma tentativa que não ficou"];
  return pool[seed % pool.length];
}

function Rasura({ texto }: { texto: string }) {
  return (
    <span
      className="block font-italic-serif text-[0.8rem] leading-snug mb-1.5 select-none pointer-events-none"
      style={{
        textDecoration: "line-through",
        textDecorationColor: "currentColor",
        textDecorationThickness: "1px",
        opacity: 0.18,
        letterSpacing: "0.01em",
        fontStyle: "italic",
      }}
      aria-hidden="true"
    >
      {texto}
    </span>
  );
}

function AberturaDoDia({ pool }: { pool: string[] }) {
  const [frase, setFrase] = useState(pool[0] ?? "");
  useEffect(() => {
    if (pool.length > 0) setFrase(pool[Math.floor(Math.random() * pool.length)]);
  }, [pool]);
  return (
    <p className="font-italic-serif text-foreground/25 text-sm mt-8 italic">
      {frase}
    </p>
  );
}

export const Route = createFileRoute("/diario/")({
  head: () => ({
    meta: [
      { title: "Caderno de Matcha — Rosmaninho Fotografia" },
      { name: "description", content: "Escrevo aqui quando há uma pausa longa o suficiente — com uma chávena à frente. Notas sobre fotografias que fiz e sobre o que estava a sentir quando as fiz." },
      { property: "og:title", content: "Caderno de Matcha — Rosmaninho Fotografia" },
      { property: "og:description", content: "Notas sobre fotografias e o que estava a sentir quando as fiz. Por Luísa Rosmaninho." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rosmaninhofotografia.pt/diario" },
      { property: "og:image", content: "https://rosmaninhofotografia.pt/og/diario.jpg" },
      { property: "og:image:alt", content: "Caderno de Matcha — notas de fotografia por Luísa Rosmaninho" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://rosmaninhofotografia.pt/og/diario.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://rosmaninhofotografia.pt/diario" },
      { rel: "alternate", type: "application/rss+xml", title: "Caderno de Matcha — RSS", href: "https://rosmaninhofotografia.pt/api/rss" },
    ],
  }),
  loader: async () => {
    const [journal, diarioConfig] = await Promise.all([getJournal(), getDiarioConfig()]);
    return { journal, diarioConfig };
  },
  component: JournalIndex,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: "easeOut" } },
};

function mesAbrev(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", { month: "short" }).replace(".", "");
}

function JournalIndex() {
  const { journal, diarioConfig } = Route.useLoaderData();
  const sorted = [...journal].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-background text-foreground min-h-screen">
      <SiteNav variant="solid" />

      {/* ── Abertura ── */}
      <section className="px-6 md:px-12 pt-32 md:pt-48 pb-16 max-w-4xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl">
          <p className="font-mono-label text-copper/50 mb-4 tracking-[0.38em] uppercase text-[10px]">caderno de matcha</p>
          <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.92] tracking-tight">
            Caderno<br />
            <span className="font-italic-serif text-copper">de Matcha</span>.
          </h1>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}
          className="mt-10 max-w-md">
          <div className="space-y-2.5 text-foreground/50 body-text text-sm leading-loose">
            <p>— não começo a escrever com intenção.</p>
            <p>— começo com uma frase que não sei onde vai.</p>
            <p>rabisco. recomeço. às vezes resulta.</p>
            <p>este caderno é o intermédio — entre a fotografia e a palavra certa.</p>
            <p className="text-foreground/28 italic">nem todas as entradas ficam prontas.</p>
          </div>
          <AberturaDoDia pool={diarioConfig.aberturasPool} />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 0.7 }}
          className="mt-12 max-w-xs">
          <div className="flex items-baseline gap-4 border-t border-foreground/10 pt-5">
            <p className="font-display text-4xl text-copper tabular-nums">{sorted.length}</p>
            <div>
              <p className="font-mono-label text-[10px] text-foreground/40 leading-relaxed">entradas</p>
              <p className="font-italic-serif text-foreground/25 text-xs italic">ao café, ao matcha, e às vezes a seco.</p>
            </div>
          </div>
          <a
            href="/api/rss"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 group"
            title="Feed RSS do Caderno"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-copper/40 group-hover:text-copper transition-colors duration-300">
              <circle cx="2" cy="10" r="1.5" fill="currentColor"/>
              <path d="M1 6.5C3.48528 6.5 5.5 8.51472 5.5 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              <path d="M1 2.5C5.69442 2.5 9.5 6.30558 9.5 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="font-mono-label text-[8px] uppercase tracking-[0.4em] text-foreground/25 group-hover:text-copper transition-colors duration-300">
              feed rss
            </span>
          </a>
        </motion.div>
      </section>

      {/* ── Lista de entradas — caderno ── */}
      <section className="px-6 md:px-12 max-w-4xl mx-auto pb-10">
        {sorted.map((entry, i) => {
          const d = new Date(entry.date);
          const dia = d.getDate();
          const mes = mesAbrev(entry.date);
          const rasura = rasuraParaEntrada(entry.slug, i, diarioConfig.rasurasPorSlug);

          return (
            <motion.div
              key={entry.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.08 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to="/diario/$slug"
                params={{ slug: entry.slug }}
                className="group relative block py-7 border-b border-foreground/6 overflow-hidden"
              >
                <div className="flex items-start gap-5 md:gap-8">
                  {/* Coluna data */}
                  <div className="shrink-0 w-14 md:w-20 pt-0.5 select-none flex flex-col items-start gap-0.5">
                    <span className="font-mono-label text-[9px] text-foreground/25 tabular-nums leading-tight">
                      {dia} {mes}.
                    </span>
                    <span className="font-mono-label text-[7px] text-copper/25 uppercase tracking-widest leading-tight">
                      {entry.relatedCategory}
                    </span>
                    <span className="font-mono-label text-[7px] text-foreground/12 mt-1.5 leading-tight">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Conteúdo com rasura */}
                  <div className="flex-1 min-w-0">
                    <Rasura texto={rasura} />
                    <h2 className="font-display text-xl md:text-[1.85rem] leading-[1.1] group-hover:text-copper transition-colors duration-500">
                      {entry.title}
                    </h2>
                    <p className="mt-3 text-foreground/42 leading-relaxed body-text text-sm max-w-xl">
                      {entry.excerpt}
                    </p>
                    <span className="font-mono-label mt-5 inline-block text-foreground/20 group-hover:text-copper transition-colors duration-500 text-[9px] uppercase tracking-widest">
                      ler →
                    </span>
                  </div>

                  {/* Imagem ao hover */}
                  <div className="hidden md:flex items-center shrink-0">
                    <div className="w-24 h-32 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-3 group-hover:translate-x-0">
                      <img src={entry.photoSrc} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </section>

      {/* ── Fecho ── */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="px-6 md:px-12 py-28 max-w-4xl mx-auto">
        <div>
          <p className="font-italic-serif text-3xl text-copper mb-4">—</p>
          <p className="font-display text-xl md:text-2xl leading-relaxed text-foreground/50 max-w-sm">
            Vai crescendo à medida que ando —<br />
            <span className="font-italic-serif text-copper">e à medida que paro</span>.
          </p>
          <p className="font-mono-label text-[9px] text-foreground/20 mt-8 uppercase tracking-[0.38em]">
            Coimbra · caderno de matcha · L.R.
          </p>
          <p className="font-italic-serif text-sm text-foreground/35 mt-6 italic leading-relaxed max-w-xs">
            este caderno tem mais páginas do que as que aparecem.
          </p>
          <p className="font-mono-label text-[9px] text-foreground/25 mt-4 lowercase tracking-[0.3em] max-w-xs">
            alguns textos só existem para quem chega até eles.
          </p>
          <p className="font-italic-serif text-sm text-foreground/35 mt-3 italic max-w-xs">
            escrever abre coisas. sempre.
          </p>
        </div>
      </motion.section>

      <SiteFooter />
    </div>
  );
}
