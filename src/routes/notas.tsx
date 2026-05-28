import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [activeTag, setActiveTag] = useState<Nota["tag"] | null>(null);
  const sorted = [...notas].sort((a, b) => b.date.localeCompare(a.date));
  const visible = activeTag ? sorted.filter((n) => n.tag === activeTag) : sorted;

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

        {/* Tags — filterable */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          <button
            onClick={() => setActiveTag(null)}
            className={`text-[10px] uppercase tracking-[0.32em] border px-4 py-2 transition-colors duration-300 ${
              activeTag === null
                ? "bg-foreground text-background border-foreground"
                : "border-foreground/20 text-foreground/60 hover:border-foreground/50 hover:text-foreground/80"
            }`}
          >
            Todas
          </button>
          {tags.map((t) => (
            <button
              key={t.value}
              onClick={() => setActiveTag(activeTag === t.value ? null : t.value)}
              className={`text-[10px] uppercase tracking-[0.32em] border px-4 py-2 transition-colors duration-300 ${
                activeTag === t.value
                  ? "bg-foreground text-background border-foreground"
                  : "border-foreground/20 text-foreground/60 hover:border-foreground/50 hover:text-foreground/80"
              }`}
            >
              {t.label}
            </button>
          ))}
        </motion.div>
      </section>

      <div className="hairline mx-6 md:mx-12" />

      {/* Notas grid */}
      <section className="px-6 md:px-12 py-20 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag ?? "all"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10"
          >
            {visible.map((nota, i) => (
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
            {visible.length === 0 && (
              <div className="col-span-full bg-background p-16 text-center text-foreground/40 font-mono-label text-sm">
                Nenhuma nota nesta categoria por agora.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
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
