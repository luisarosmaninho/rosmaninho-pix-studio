import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { Whisper } from "@/components/Whisper";
import { getJournalEntry, journal } from "@/lib/journal";

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
        { property: "og:image", content: e?.photoSrc ?? "" },
      ],
      links: [{ rel: "canonical", href: `https://rosmaninhofotografia.pt/diario/${params.slug}` }],
    };
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
          <Link
            to="/diario"
            className="text-[11px] uppercase tracking-[0.32em] border-b border-foreground pb-1 hover:text-copper hover:border-copper transition-colors"
          >
            Voltar ao diário →
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
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function EntryPage() {
  const { slug } = Route.useParams();
  const entry = getJournalEntry(slug)!;
  const sorted = [...journal].sort((a, b) => b.date.localeCompare(a.date));
  const currentIdx = sorted.findIndex((e) => e.slug === slug);
  const olderEntry = currentIdx < sorted.length - 1 ? sorted[currentIdx + 1] : null;
  const newerEntry = currentIdx > 0 ? sorted[currentIdx - 1] : null;

  return (
    <div className="bg-background text-foreground">
      <SiteNav variant="solid" />

      <article>

        {/* ── Cabeçalho ── */}
        <header className="px-6 md:px-12 pt-32 md:pt-48 pb-16 max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <Link
              to="/diario"
              className="font-mono-label text-foreground/35 hover:text-copper transition-colors inline-block mb-14"
            >
              ← Caderno de Matcha
            </Link>

            <h1 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] tracking-tight max-w-4xl">
              {entry.title}
            </h1>
          </motion.div>
        </header>

        {/* ── Excerto em destaque ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          className="px-6 md:px-16 lg:px-24 pb-24 max-w-4xl mx-auto"
        >
          <p className="font-italic-serif text-2xl md:text-4xl leading-[1.55] text-foreground/60">
            {entry.excerpt}
          </p>
        </motion.div>

        <div className="hairline mx-6 md:mx-12 mb-24" />

        {/* ── Primeiro parágrafo ── */}
        <Fade className="px-6 md:px-12 pb-28 max-w-2xl mx-auto">
          {entry.body.slice(0, 1).map((p, i) => (
            <p key={i} className="body-text text-base md:text-lg leading-[1.9] text-foreground/78">
              {p}
            </p>
          ))}
        </Fade>

        {/* ── Imagem principal ── */}
        <Fade delay={0.1} className="mb-28">
          <figure>
            <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <img
                src={entry.photoSrc}
                alt={entry.photoTitle}
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="px-6 md:px-12 font-mono-label text-foreground/28 mt-5">
              {entry.photoTitle}
            </figcaption>
          </figure>
        </Fade>

        {/* ── Segundo parágrafo ── */}
        {entry.body.slice(1, 2).map((p, i) => (
          <Fade key={i} className="px-6 md:px-12 pb-24 max-w-2xl mx-auto">
            <p className="body-text text-base md:text-lg leading-[1.9] text-foreground/78">{p}</p>
          </Fade>
        ))}

        {/* ── Restantes parágrafos ── */}
        <div className="px-6 md:px-12 pb-40 max-w-2xl mx-auto space-y-12">
          {entry.body.slice(2).map((p, i) => (
            <Fade key={i}>
              <p className="body-text text-base md:text-lg leading-[1.9] text-foreground/78">{p}</p>
            </Fade>
          ))}

          {/* Assinatura */}
          <Fade delay={0.1} className="mt-20">
            <div className="w-12 h-px bg-foreground/20 mb-8" />
            <p className="font-italic-serif text-copper text-2xl">L.R.</p>
          </Fade>
        </div>

      </article>

      {/* ── Navegação prev/next ── */}
      {(olderEntry || newerEntry) && (
        <nav className="border-t border-foreground/8">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {olderEntry ? (
              <Link
                to="/diario/$slug"
                params={{ slug: olderEntry.slug }}
                className="group block px-6 md:px-12 py-14 border-b md:border-b-0 md:border-r border-foreground/8 hover:bg-foreground/[0.018] transition-colors"
              >
                <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  <p className="font-mono-label text-foreground/30 mb-5 text-[10px] uppercase tracking-[0.38em]">← entrada anterior</p>
                  <h3 className="font-display text-2xl md:text-3xl leading-tight group-hover:text-copper transition-colors duration-500 max-w-sm">
                    {olderEntry.title}
                  </h3>
                  <p className="mt-3 text-foreground/45 text-sm leading-relaxed line-clamp-2 max-w-sm">{olderEntry.excerpt}</p>
                </motion.div>
              </Link>
            ) : <div className="hidden md:block" />}

            {newerEntry ? (
              <Link
                to="/diario/$slug"
                params={{ slug: newerEntry.slug }}
                className="group block px-6 md:px-12 py-14 md:text-right hover:bg-foreground/[0.018] transition-colors"
              >
                <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  <p className="font-mono-label text-foreground/30 mb-5 text-[10px] uppercase tracking-[0.38em]">entrada seguinte →</p>
                  <h3 className="font-display text-2xl md:text-3xl leading-tight group-hover:text-copper transition-colors duration-500 max-w-sm md:ml-auto">
                    {newerEntry.title}
                  </h3>
                  <p className="mt-3 text-foreground/45 text-sm leading-relaxed line-clamp-2 max-w-sm md:ml-auto">{newerEntry.excerpt}</p>
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
