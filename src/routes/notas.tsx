import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { notas, type Nota, type NotaSize } from "@/lib/notas";

export const Route = createFileRoute("/notas")({
  head: () => ({
    meta: [
      { title: "Notas de Campo — Rosmaninho" },
      { name: "description", content: "Pensamentos curtos, observações poéticas e reflexões sobre fotografia, luz, cidades e momentos." },
    ],
    links: [{ rel: "canonical", href: "https://rosmaninhofotografia.pt/notas" }],
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

const sizeConfig: Record<NotaSize, {
  padding: string;
  textSize: string;
  baseOpacity: number;
}> = {
  large:    { padding: "p-10 md:p-14",  textSize: "text-2xl md:text-3xl",  baseOpacity: 1    },
  medium:   { padding: "p-7 md:p-10",   textSize: "text-xl md:text-2xl",   baseOpacity: 0.92 },
  small:    { padding: "p-5 md:p-8",    textSize: "text-base md:text-xl",  baseOpacity: 0.75 },
  fragment: { padding: "p-5 md:p-7",    textSize: "text-sm md:text-base",  baseOpacity: 0.22 },
};

/* ── Nota card ── */
function NotaCard({ nota, index }: { nota: Nota; index: number }) {
  const config = sizeConfig[nota.size];
  const isFragment = nota.size === "fragment";

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: config.baseOpacity, y: 0 }}
      whileHover={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, delay: (index % 3) * 0.13, ease: "easeOut" }}
      className={`break-inside-avoid mb-3 group cursor-default ${isFragment ? "transition-opacity duration-700" : ""}`}
    >
      <div className={`border border-foreground/8 ${config.padding}`}>
        <div className="mb-5">
          <span className={`font-mono-label text-copper ${isFragment ? "opacity-50" : ""}`}>
            {nota.tag}
          </span>
        </div>
        <p className={`font-display italic leading-[1.45] text-foreground/90 ${config.textSize}`}>
          {nota.text}
        </p>
        <div className="mt-6 w-6 h-px bg-copper/25 group-hover:w-12 transition-all duration-700" />
      </div>
    </motion.article>
  );
}

/* ── Page ── */
function NotasPage() {
  const [activeTag, setActiveTag] = useState<Nota["tag"] | null>(null);
  const visible = activeTag ? notas.filter((n) => n.tag === activeTag) : notas;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* ── Header ── */}
      <section className="px-6 md:px-12 pt-32 md:pt-44 pb-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <p className="font-italic-serif text-3xl md:text-4xl text-copper mb-4">campo</p>
          <h1 className="font-display text-5xl md:text-8xl leading-[0.95]">Notas de Campo.</h1>
          <p className="mt-8 max-w-xl text-foreground/55 leading-relaxed body-text">
            Pequenas observações feitas no terreno — ou à mesa, com qualquer coisa quente ao lado. Pensamentos que não cabem numa fotografia mas que precisam de um sítio para ficar.
          </p>
        </motion.div>

        {/* Tags */}
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
                : "border-foreground/20 text-foreground/55 hover:border-foreground/45 hover:text-foreground/80"
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
                  : "border-foreground/20 text-foreground/55 hover:border-foreground/45 hover:text-foreground/80"
              }`}
            >
              {t.label}
            </button>
          ))}
        </motion.div>
      </section>

      <div className="hairline mx-6 md:mx-12" />

      {/* ── Notas masonry ── */}
      <section className="px-6 md:px-12 py-20 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag ?? "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="columns-1 md:columns-2 lg:columns-3 gap-3"
          >
            {visible.map((nota, i) => (
              <NotaCard key={nota.id} nota={nota} index={i} />
            ))}
            {visible.length === 0 && (
              <p className="font-mono-label text-foreground/35 py-16 text-sm col-span-full">
                Nenhuma nota nesta categoria por agora.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Closing ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="px-6 md:px-12 py-40 text-center max-w-2xl mx-auto"
      >
        <p className="font-italic-serif text-4xl text-copper mb-8">—</p>
        <p className="font-display text-2xl md:text-3xl leading-relaxed text-foreground/65">
          O campo não é apenas o lugar onde se fotografa. É o estado de atenção que se leva para qualquer sítio.
        </p>
        <p className="font-mono-label text-foreground/30 mt-10">L.R. · Coimbra</p>
      </motion.section>

      <SiteFooter />
    </div>
  );
}
