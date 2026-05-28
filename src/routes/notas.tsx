import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { notas, formatNotaDate, type Nota } from "@/lib/notas";

export const Route = createFileRoute("/notas")({
  head: () => ({
    meta: [
      { title: "Notas de Campo — Rosmaninho" },
      { name: "description", content: "Pensamentos curtos, observações poéticas e reflexões sobre fotografia, luz, cidades e momentos." },
    ],
  }),
  component: NotasPage,
});

const tags: { value: Nota["tag"]; label: string }[] = [
  { value: "luz", label: "Luz" },
  { value: "cidade", label: "Cidade" },
  { value: "tempo", label: "Tempo" },
  { value: "silêncio", label: "Silêncio" },
  { value: "água", label: "Água" },
  { value: "olhar", label: "Olhar" },
];

function NotasPage() {
  const sorted = [...notas].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* Header */}
      <section className="px-6 md:px-12 pt-32 md:pt-44 pb-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <p className="font-italic-serif text-3xl md:text-4xl text-copper mb-4">campo</p>
          <h1 className="font-display text-5xl md:text-8xl leading-[0.95]">Notas de Campo.</h1>
          <p className="mt-8 max-w-xl text-foreground/65 leading-relaxed">
            Pequenas observações feitas no terreno. Pensamentos que não cabem numa fotografia mas que precisam de um sítio para ficar.
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          {tags.map((t) => (
            <span
              key={t.value}
              className="text-[10px] uppercase tracking-[0.32em] border border-foreground/20 px-4 py-2 text-foreground/60"
            >
              {t.label}
            </span>
          ))}
        </motion.div>
      </section>

      <div className="hairline mx-6 md:mx-12" />

      {/* Notas grid */}
      <section className="px-6 md:px-12 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
          {sorted.map((nota, i) => (
            <motion.article
              key={nota.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: "easeOut" }}
              className="bg-background p-8 md:p-10 flex flex-col gap-6 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-label text-copper">{nota.tag}</span>
                <span className="font-mono-label text-foreground/35">{formatNotaDate(nota.date)}</span>
              </div>
              <p className="font-display italic text-xl md:text-2xl leading-[1.35] text-foreground/90 flex-1">
                "{nota.text}"
              </p>
              <div className="w-8 h-px bg-copper/40 group-hover:w-16 transition-all duration-700" />
            </motion.article>
          ))}
        </div>
      </section>

      {/* Nota final */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="px-6 md:px-12 py-32 text-center max-w-2xl mx-auto"
      >
        <p className="font-italic-serif text-4xl text-copper mb-6">—</p>
        <p className="font-display text-2xl md:text-3xl leading-relaxed text-foreground/70">
          O campo não é apenas o lugar onde se fotografa. É o estado de atenção que se leva para qualquer sítio.
        </p>
        <p className="font-mono-label text-foreground/40 mt-8">L.R. · Coimbra</p>
      </motion.section>

      <SiteFooter />
    </div>
  );
}
