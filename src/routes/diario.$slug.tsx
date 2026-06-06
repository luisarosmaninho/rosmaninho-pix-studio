import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { getJournalEntry } from "@/lib/journal";
import { getJournal } from "@/lib/content-fns";

export const Route = createFileRoute("/diario/$slug")({
  beforeLoad: ({ params }) => {
    if (!getJournalEntry(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const e = getJournalEntry(params.slug);
    return {
      meta: [
        { title: `${e?.title ?? "Diário"} — Rosmaninho Fotografia` },
        { name: "description", content: e?.excerpt ?? "" },
        { property: "og:title", content: `${e?.title ?? "Diário"} — Rosmaninho Fotografia` },
        { property: "og:description", content: e?.excerpt ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://rosmaninhofotografia.pt/diario/${params.slug}` },
        { property: "og:image", content: "https://rosmaninhofotografia.pt/og/diario.jpg" },
        { property: "og:image:alt", content: `${e?.title ?? "Caderno de Matcha"} — Rosmaninho Fotografia` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${e?.title ?? "Diário"} — Rosmaninho Fotografia` },
        { name: "twitter:description", content: e?.excerpt ?? "" },
        { name: "twitter:image", content: "https://rosmaninhofotografia.pt/og/diario.jpg" },
      ],
      links: [{ rel: "canonical", href: `https://rosmaninhofotografia.pt/diario/${params.slug}` }],
    };
  },
  loader: async () => {
    const journal = await getJournal();
    return { journal };
  },
  component: EntryPage,
  notFoundComponent: DiarioNotFound,
});

function DiarioNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />
      <div className="flex items-center justify-center min-h-screen px-6">
        <div>
          <p className="font-mono-label text-copper mb-6">Entrada não encontrada</p>
          <p className="font-display text-3xl md:text-5xl mb-10 leading-[1.1]">
            Esta página<br />
            <span className="font-italic-serif text-copper">não existe no caderno</span>.
          </p>
          <Link to="/diario" className="text-[11px] uppercase tracking-[0.32em] border-b border-foreground pb-1 hover:text-copper hover:border-copper transition-colors">
            Voltar ao caderno →
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: "easeOut" } },
};

function Fade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show"
      viewport={{ once: true, amount: 0.15 }} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

function mesAbrev(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", { month: "short" }).replace(".", "");
}

function EntryPage() {
  const { slug } = Route.useParams();
  const { journal } = Route.useLoaderData();
  const entry = journal.find((e) => e.slug === slug) ?? journal[0];
  const sorted = [...journal].sort((a, b) => b.date.localeCompare(a.date));
  const currentIdx = sorted.findIndex((e) => e.slug === slug);
  const olderEntry = currentIdx < sorted.length - 1 ? sorted[currentIdx + 1] : null;
  const newerEntry = currentIdx > 0 ? sorted[currentIdx - 1] : null;

  const d = new Date(entry.date);
  const dia = d.getDate();
  const mes = mesAbrev(entry.date);
  const ano = d.getFullYear();

  return (
    <div className="bg-background text-foreground">
      <SiteNav variant="solid" />

      <article>
        {/* ── Cabeçalho ── */}
        <header className="px-6 md:px-12 pt-32 md:pt-48 pb-12 max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <Link to="/diario" className="font-mono-label text-foreground/28 hover:text-copper transition-colors inline-block mb-14 text-[10px] uppercase tracking-[0.38em]">
              ← caderno de matcha
            </Link>

            {/* Layout com margem — caderno */}
            <div className="flex gap-6 md:gap-10">
              {/* Margem */}
              <div className="shrink-0 w-16 md:w-24 border-r border-foreground/8 pr-4 pt-2 text-right select-none flex flex-col items-end gap-1.5">
                <span className="font-mono-label text-[10px] text-foreground/30 tabular-nums">{dia} {mes}.</span>
                <span className="font-mono-label text-[8px] text-foreground/20 tabular-nums">{ano}</span>
                <span className="font-mono-label text-[8px] text-copper/30 uppercase tracking-widest mt-1">{entry.relatedCategory}</span>
                {entry.location && (
                  <span className="font-mono-label text-[8px] text-foreground/22 uppercase tracking-widest mt-1">{entry.location}</span>
                )}
              </div>

              {/* Título */}
              <div className="flex-1">
                <h1 className="font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.95] tracking-tight max-w-3xl">
                  {entry.title}
                </h1>
              </div>
            </div>
          </motion.div>
        </header>

        {/* ── Excerto ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
          <div className="flex gap-6 md:gap-10">
            <div className="shrink-0 w-16 md:w-24 border-r border-foreground/8" />
            <p className="font-italic-serif text-2xl md:text-4xl leading-[1.45] text-foreground/55 max-w-2xl">
              {entry.excerpt}
            </p>
          </div>
        </motion.div>

        <div className="hairline mx-6 md:mx-12 mb-0" />

        {/* ── Corpo — com linhas de caderno ── */}
        <div
          className="relative py-16"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 33px, rgba(255,255,255,0.032) 33px, rgba(255,255,255,0.032) 34px)",
          }}
        >
          {/* Primeira parte do corpo */}
          <Fade className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
            <div className="flex gap-6 md:gap-10">
              <div className="shrink-0 w-16 md:w-24 border-r border-foreground/8 pr-4 text-right select-none pt-1">
                <span className="font-mono-label text-[8px] text-foreground/15">p.1</span>
              </div>
              <div className="flex-1 max-w-2xl space-y-8">
                {entry.body.slice(0, 1).map((p, i) => (
                  <p key={i} className="body-text text-xl md:text-2xl leading-[1.85] text-foreground/75">{p}</p>
                ))}
              </div>
            </div>
          </Fade>

          {/* Imagem — aparece directamente */}
          <Fade delay={0.1} className="mb-16">
            <figure>
              <motion.div
                className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden"
                initial={{ opacity: 0, scale: 1.03 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <img
                  src={entry.photoSrc}
                  alt={entry.photoTitle}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>

              <div className="max-w-6xl mx-auto px-6 md:px-12 mt-4 flex gap-6 md:gap-10">
                <div className="shrink-0 w-16 md:w-24 border-r border-foreground/8" />
                <figcaption className="font-mono-label text-foreground/22 text-[10px] italic">
                  {entry.photoTitle}
                </figcaption>
              </div>
            </figure>
          </Fade>

          {/* Restante corpo */}
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="flex gap-6 md:gap-10">
              <div className="shrink-0 w-16 md:w-24 border-r border-foreground/8 pr-4 text-right select-none pt-1">
                {entry.body.length > 1 && (
                  <span className="font-mono-label text-[8px] text-foreground/15">p.2</span>
                )}
              </div>
              <div className="flex-1 max-w-2xl space-y-10 pb-24">
                {entry.body.slice(1).map((p, i) => (
                  <Fade key={i}>
                    <p className="body-text text-xl md:text-2xl leading-[1.85] text-foreground/75">{p}</p>
                  </Fade>
                ))}
                <Fade delay={0.1}>
                  <div className="pt-12">
                    <div className="w-8 h-px bg-foreground/15 mb-6" />
                    <p className="font-italic-serif text-copper text-xl">L.R.</p>
                    <p className="font-mono-label text-[9px] text-foreground/20 mt-2 uppercase tracking-[0.3em]">
                      {dia} {mes}. {ano}{entry.location ? ` · ${entry.location}` : ""}
                    </p>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ── Navegação entre entradas ── */}
      {(olderEntry || newerEntry) && (
        <nav className="border-t border-foreground/8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {olderEntry ? (
              <Link to="/diario/$slug" params={{ slug: olderEntry.slug }}
                className="group block px-6 md:px-10 py-12 border-b md:border-b-0 md:border-r border-foreground/8 hover:bg-foreground/[0.018] transition-colors">
                <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  <p className="font-mono-label text-foreground/22 mb-4 text-[9px] uppercase tracking-[0.38em]">← entrada anterior</p>
                  <h3 className="font-display text-xl md:text-2xl leading-tight group-hover:text-copper transition-colors duration-500 max-w-sm">
                    {olderEntry.title}
                  </h3>
                </motion.div>
              </Link>
            ) : <div className="hidden md:block" />}

            {newerEntry ? (
              <Link to="/diario/$slug" params={{ slug: newerEntry.slug }}
                className="group block px-6 md:px-10 py-12 md:text-right hover:bg-foreground/[0.018] transition-colors">
                <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  <p className="font-mono-label text-foreground/22 mb-4 text-[9px] uppercase tracking-[0.38em]">entrada seguinte →</p>
                  <h3 className="font-display text-xl md:text-2xl leading-tight group-hover:text-copper transition-colors duration-500 max-w-sm md:ml-auto">
                    {newerEntry.title}
                  </h3>
                </motion.div>
              </Link>
            ) : <div className="hidden md:block" />}
          </div>
        </nav>
      )}

      <SiteFooter />
    </div>
  );
}
