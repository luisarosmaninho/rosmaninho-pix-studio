import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { getJournalEntry, journal, formatJournalDate } from "@/lib/journal";

export const Route = createFileRoute("/diario/$slug")({
  beforeLoad: ({ params }) => {
    if (!getJournalEntry(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const e = getJournalEntry(params.slug);
    return {
      meta: [
        { title: `${e?.title ?? "Diário"} — Rosmaninho` },
        { name: "description", content: e?.excerpt ?? "" },
        { property: "og:image", content: e?.photoSrc ?? "" },
      ],
    };
  },
  component: EntryPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <p className="font-mono-label">Entrada não encontrada</p>
    </div>
  ),
});

function EntryPage() {
  const { slug } = Route.useParams();
  const entry = getJournalEntry(slug)!;

  return (
    <div className="bg-background text-foreground">
      <SiteNav variant="solid" />

      <article>
        {/* Header */}
        <header className="px-6 md:px-12 pt-32 md:pt-44 pb-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            <Link to="/diario" className="font-mono-label text-foreground/35 hover:text-copper transition-colors inline-block mb-16">
              ← Diário
            </Link>

            <h1 className="font-display italic text-4xl md:text-8xl leading-[1.0] max-w-4xl">
              {entry.title}
            </h1>
          </motion.div>
        </header>

        {/* Excerpt — large pull */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="px-6 md:px-24 pb-24 max-w-4xl mx-auto"
        >
          <p className="font-italic-serif text-2xl md:text-4xl leading-[1.6] text-foreground/60">
            {entry.excerpt}
          </p>
        </motion.div>

        <div className="hairline mx-6 md:mx-12 mb-24" />

        {/* First paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="px-6 md:px-12 pb-28 max-w-2xl mx-auto"
        >
          {entry.body.slice(0, 1).map((p, i) => (
            <p key={i} className="body-text text-base md:text-lg leading-[1.9] text-foreground/80">
              {p}
            </p>
          ))}
        </motion.div>

        {/* Full-width image */}
        <motion.figure
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="mb-28"
        >
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
        </motion.figure>

        {/* Second paragraph */}
        {entry.body.slice(1, 2).map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="px-6 md:px-12 pb-24 max-w-2xl mx-auto"
          >
            <p className="body-text text-base md:text-lg leading-[1.9] text-foreground/80">{p}</p>
          </motion.div>
        ))}

        {/* Remaining paragraphs */}
        <div className="px-6 md:px-12 pb-40 max-w-2xl mx-auto">
          {entry.body.slice(2).map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="body-text text-base md:text-lg leading-[1.9] text-foreground/80 mb-12"
            >
              {p}
            </motion.p>
          ))}

          {/* Ending */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="mt-20"
          >
            <div className="w-12 h-px bg-foreground/20 mb-8" />
            <p className="font-italic-serif text-copper text-2xl">L.R.</p>
          </motion.div>
        </div>

        {/* Continuar */}
        <section className="px-6 md:px-12 py-24 border-t border-foreground/8">
          <p className="font-mono-label text-foreground/30 mb-16">continuar a ler</p>
          <div className="grid md:grid-cols-2 gap-16 max-w-4xl">
            {journal.filter((e) => e.slug !== slug).slice(0, 2).map((e) => (
              <Link
                key={e.slug}
                to="/diario/$slug"
                params={{ slug: e.slug }}
                className="group block"
              >
                <h3 className="font-display italic text-3xl md:text-4xl leading-tight group-hover:text-copper transition-colors duration-500">
                  {e.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <SiteFooter />
    </div>
  );
}
