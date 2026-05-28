import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { Whisper } from "@/components/Whisper";
import { journal } from "@/lib/journal";

export const Route = createFileRoute("/diario/")({
  head: () => ({
    meta: [
      { title: "Diário — Rosmaninho Fotografia" },
      { name: "description", content: "Caderno em aberto. Ensaios curtos sobre fotografias e sobre os lugares onde aconteceram." },
    ],
  }),
  component: JournalIndex,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

function JournalIndex() {
  const sorted = [...journal].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-background text-foreground min-h-screen">
      <SiteNav variant="solid" />

      {/* ── Abertura ── */}
      <section className="px-6 md:px-12 pt-32 md:pt-48 pb-20 max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-5xl"
        >
          <p className="font-italic-serif text-3xl md:text-4xl text-copper mb-4">diário</p>
          <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.92] tracking-tight">
            Caderno<br />
            <span className="font-italic-serif text-copper">em aberto</span>.
          </h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="mt-10 max-w-md text-foreground/55 leading-relaxed body-text"
          >
            Ensaios curtos sobre fotografias e sobre os lugares onde aconteceram. Não há pressa.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-foreground/15 pt-8 max-w-sm"
        >
          <div>
            <p className="font-display text-4xl text-copper">{sorted.length}</p>
            <p className="font-mono-label mt-1">Entradas</p>
          </div>
          <div>
            <p className="font-display text-4xl text-copper">04</p>
            <p className="font-mono-label mt-1">Séries</p>
          </div>
        </motion.div>
      </section>

      <div className="hairline mx-6 md:mx-12" />

      {/* ── Lista de entradas ── */}
      <section className="px-6 md:px-12 pt-4 pb-4 max-w-6xl mx-auto">
        {sorted.map((entry, i) => (
          <motion.div
            key={entry.slug}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              to="/diario/$slug"
              params={{ slug: entry.slug }}
              className="group relative flex flex-col md:grid md:grid-cols-12 gap-6 py-16 md:py-20 border-b border-foreground/8 overflow-hidden"
            >
              {/* Nº */}
              <div className="md:col-span-1">
                <p className="font-mono-label text-copper">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>

              {/* Conteúdo */}
              <div className="md:col-span-9">
                <h2 className="font-display text-3xl md:text-5xl leading-[1.05] group-hover:text-copper transition-colors duration-500">
                  {entry.title}
                </h2>
                <p className="mt-5 text-foreground/60 max-w-xl leading-relaxed body-text">
                  {entry.excerpt}
                </p>
                <span className="font-mono-label mt-8 inline-block text-foreground/35 group-hover:text-copper transition-colors duration-500">
                  ler entrada →
                </span>
              </div>

              {/* Miniatura ao hover */}
              <div className="md:col-span-2 hidden md:flex items-center justify-end">
                <div className="w-24 h-32 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-3 group-hover:translate-x-0 shrink-0">
                  <img
                    src={entry.photoSrc}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* ── Fecho ── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="px-6 md:px-12 py-40 text-center max-w-2xl mx-auto"
      >
        <p className="font-italic-serif text-4xl text-copper mb-8">—</p>
        <p className="font-display text-2xl md:text-3xl leading-relaxed text-foreground/65">
          Um arquivo que vai crescendo devagar,<br />
          <span className="font-italic-serif text-copper">à medida que ando</span>.
        </p>
        <Whisper text="Coimbra · diário aberto · L.R." delay={1.5} className="mt-10 justify-center" />
      </motion.section>

      <SiteFooter />
    </div>
  );
}
