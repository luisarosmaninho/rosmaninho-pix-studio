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

/* ── Coffee ring SVG ── */
function CoffeeRing({
  size = 90,
  opacity = 0.10,
  rotate = 0,
  style,
}: {
  size?: number;
  opacity?: number;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  const cx = size / 2;
  const r1 = cx - 1.5;          /* outer ring */
  const r2 = r1 * 0.80;         /* inner ring — creates the double-ring stain effect */
  const r3 = r1 * 0.92;         /* faint mid-ring for depth */

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute pointer-events-none select-none"
      aria-hidden="true"
      style={{
        opacity,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {/* outer edge — hard ring left by the cup */}
      <circle
        cx={cx} cy={cx} r={r1}
        fill="none"
        stroke="#7C4520"
        strokeWidth="1.8"
      />
      {/* faint mid halo */}
      <circle
        cx={cx} cy={cx} r={r3}
        fill="none"
        stroke="#7C4520"
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />
      {/* inner ring — where the liquid pooled */}
      <circle
        cx={cx} cy={cx} r={r2}
        fill="none"
        stroke="#7C4520"
        strokeWidth="1.1"
        strokeOpacity="0.65"
        strokeDasharray={`${r2 * 5.5} ${r2 * 0.6}`}
      />
    </svg>
  );
}

/* ── Scattered stains layer for a section ── */
function HeaderStains() {
  return (
    <>
      {/* top-right, large faint */}
      <CoffeeRing size={138} opacity={0.07} rotate={12}
        style={{ top: "18%", right: "3%"}} />
      {/* small, near kicker text — like a quick coffee put down */}
      <CoffeeRing size={52} opacity={0.12} rotate={-8}
        style={{ top: "38%", right: "22%" }} />
      {/* medium, left margin */}
      <CoffeeRing size={80} opacity={0.065} rotate={5}
        style={{ bottom: "8%", left: "1%" }} />
    </>
  );
}

function GridStains() {
  return (
    <>
      {/* mid-left, overlapping a card gap */}
      <CoffeeRing size={104} opacity={0.075} rotate={-14}
        style={{ top: "12%", left: "-1%" }} />
      {/* right column, upper area */}
      <CoffeeRing size={66} opacity={0.10} rotate={20}
        style={{ top: "28%", right: "1%" }} />
      {/* large ghost ring, centre-right */}
      <CoffeeRing size={160} opacity={0.04} rotate={3}
        style={{ top: "44%", right: "8%" }} />
      {/* bottom-left corner — two rings close together */}
      <CoffeeRing size={58} opacity={0.09} rotate={-5}
        style={{ bottom: "18%", left: "4%" }} />
      <CoffeeRing size={46} opacity={0.07} rotate={30}
        style={{ bottom: "22%", left: "7%" }} />
      {/* bottom-right */}
      <CoffeeRing size={88} opacity={0.06} rotate={-18}
        style={{ bottom: "6%", right: "2%" }} />
    </>
  );
}

function ClosingStains() {
  return (
    <>
      <CoffeeRing size={96} opacity={0.07} rotate={8}
        style={{ top: "20%", right: "5%" }} />
      <CoffeeRing size={50} opacity={0.10} rotate={-22}
        style={{ bottom: "15%", left: "8%" }} />
    </>
  );
}

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
      <section className="relative px-6 md:px-12 pt-32 md:pt-44 pb-20 max-w-6xl mx-auto overflow-hidden">
        <HeaderStains />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative z-10"
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
          className="relative z-10 mt-12 flex flex-wrap gap-3"
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
      <section className="relative px-6 md:px-12 py-20 max-w-6xl mx-auto overflow-hidden">
        <GridStains />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag ?? "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative z-10 columns-1 md:columns-2 lg:columns-3 gap-3"
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
        className="relative px-6 md:px-12 py-40 text-center max-w-2xl mx-auto overflow-hidden"
      >
        <ClosingStains />

        <div className="relative z-10">
          <p className="font-italic-serif text-4xl text-copper mb-8">—</p>
          <p className="font-display text-2xl md:text-3xl leading-relaxed text-foreground/65">
            O campo não é apenas o lugar onde se fotografa. É o estado de atenção que se leva para qualquer sítio.
          </p>
          <p className="font-mono-label text-foreground/30 mt-10">L.R. · Coimbra</p>
        </div>
      </motion.section>

      <SiteFooter />
    </div>
  );
}
