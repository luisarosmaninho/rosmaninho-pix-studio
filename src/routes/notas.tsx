import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import type { Nota, NotaSize } from "@/lib/notas";
import { getNotas } from "@/lib/content-fns";

export const Route = createFileRoute("/notas")({
  head: () => ({
    meta: [
      { title: "Notas de Campo — Rosmaninho" },
      { name: "description", content: "Pensamentos curtos, observações poéticas e reflexões sobre fotografia, luz, cidades e momentos." },
    ],
    links: [{ rel: "canonical", href: "https://rosmaninhofotografia.pt/notas" }],
  }),
  loader: async () => {
    const notas = await getNotas();
    return { notas };
  },
  component: NotasPage,
});

/* ── Post-it palette per tag ─────────────────────────────────────────────── */
const TAG_COLORS: Record<string, { bg: string; lines: string; tape: string; dot: string }> = {
  luz:       { bg: "#fefce8", lines: "rgba(202,138,4,0.08)",   tape: "#fef9c3", dot: "#eab308" },
  cidade:    { bg: "#eff6ff", lines: "rgba(59,130,246,0.08)",  tape: "#dbeafe", dot: "#3b82f6" },
  tempo:     { bg: "#f0fdf4", lines: "rgba(22,163,74,0.08)",   tape: "#dcfce7", dot: "#16a34a" },
  "silêncio":{ bg: "#faf5ff", lines: "rgba(147,51,234,0.08)",  tape: "#ede9fe", dot: "#9333ea" },
  água:      { bg: "#f0fdfa", lines: "rgba(20,184,166,0.08)",  tape: "#ccfbf1", dot: "#14b8a6" },
  olhar:     { bg: "#fdf2f8", lines: "rgba(219,39,119,0.08)",  tape: "#fce7f3", dot: "#db2777" },
};

/* ── SSR-safe deterministic tilts ────────────────────────────────────────── */
const TILTS   = [-2.4, 1.7, -1.1, 3.0, -0.7, 2.2, -2.0, 1.4, -2.8, 0.9, -1.6, 2.7, -0.4, 3.3, -2.7, 1.0];
const OFFSETS = [0, 8, -6, 12, -4, 10, -8, 6, -10, 4, 8, -4, 12, -6, 2, -12];

/* ── Size config ─────────────────────────────────────────────────────────── */
const SIZE_CONFIG: Record<NotaSize, { textSize: string; minH: string; px: string; py: string }> = {
  large:    { textSize: "text-xl md:text-2xl",   minH: "min-h-[180px]", px: "px-6 md:px-8", py: "py-8 md:py-10" },
  medium:   { textSize: "text-lg md:text-xl",    minH: "min-h-[140px]", px: "px-5 md:px-7", py: "py-6 md:py-8"  },
  small:    { textSize: "text-base md:text-lg",  minH: "min-h-[110px]", px: "px-5 md:px-6", py: "py-5 md:py-7"  },
  fragment: { textSize: "text-sm md:text-base",  minH: "min-h-[80px]",  px: "px-4 md:px-5", py: "py-4 md:py-5"  },
};

const tags: { value: Nota["tag"]; label: string }[] = [
  { value: "luz",       label: "Luz"      },
  { value: "cidade",    label: "Cidade"   },
  { value: "tempo",     label: "Tempo"    },
  { value: "silêncio",  label: "Silêncio" },
  { value: "água",      label: "Água"     },
  { value: "olhar",     label: "Olhar"    },
];

/* ── Nota card — post-it ─────────────────────────────────────────────────── */
function NotaCard({ nota, index }: { nota: Nota; index: number }) {
  const colors = TAG_COLORS[nota.tag] ?? TAG_COLORS["luz"];
  const size   = SIZE_CONFIG[nota.size];
  const tilt   = TILTS[index % TILTS.length];
  const offset = OFFSETS[index % OFFSETS.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 + Math.abs(offset) * 0.4, rotate: tilt }}
      whileInView={{ opacity: 1, y: offset, rotate: tilt }}
      whileHover={{ y: offset - 10, rotate: tilt * 0.3, scale: 1.03, zIndex: 20 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, delay: (index % 4) * 0.08, ease: [0.23, 1, 0.32, 1] }}
      className={`relative break-inside-avoid mb-8 cursor-default ${size.minH}`}
      style={{
        filter: "drop-shadow(2px 5px 14px rgba(0,0,0,0.13)) drop-shadow(0 1px 2px rgba(0,0,0,0.06))",
        zIndex: 1,
        transformOrigin: "center top",
      }}
    >
      {/* Tape strip */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-[22px] rounded-[2px]"
        style={{
          background: colors.tape,
          boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
          border: "1px solid rgba(0,0,0,0.05)",
          opacity: 0.85,
        }}
      />

      {/* Post-it body */}
      <div
        className={`relative w-full h-full ${size.px} ${size.py} flex flex-col justify-between overflow-hidden`}
        style={{
          background: colors.bg,
          backgroundImage: `
            repeating-linear-gradient(
              transparent,
              transparent 27px,
              ${colors.lines} 27px,
              ${colors.lines} 28px
            )
          `,
          backgroundPositionY: "36px",
          borderRadius: "2px",
          border: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        {/* Fold corner */}
        <div
          className="absolute bottom-0 right-0 w-6 h-6"
          style={{
            background: `linear-gradient(225deg, rgba(0,0,0,0.07) 50%, transparent 50%)`,
          }}
        />

        {/* Text */}
        <p
          className={`font-italic-serif italic leading-[1.55] text-foreground/85 ${size.textSize} relative z-10`}
          style={{ fontFamily: "var(--font-display), Georgia, serif" }}
        >
          {nota.text}
        </p>

        {/* Tag label */}
        <div className="flex items-center gap-1.5 mt-4 relative z-10">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: colors.dot, opacity: 0.8 }}
          />
          <span
            className="font-mono-label text-[9px] uppercase tracking-[0.38em]"
            style={{ color: colors.dot, opacity: 0.75 }}
          >
            {nota.tag}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Filter button ─────────────────────────────────────────────────────────── */
function TagButton({
  tag, label, active, onClick,
}: {
  tag: Nota["tag"] | "all"; label: string; active: boolean; onClick: () => void;
}) {
  const colors = tag !== "all" ? TAG_COLORS[tag] : null;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] uppercase tracking-[0.28em] transition-all duration-300 border ${
        active
          ? "border-foreground/30 bg-foreground text-cream"
          : "border-foreground/12 text-foreground/50 hover:text-foreground/80 hover:border-foreground/25"
      }`}
      style={active && colors ? { background: colors.bg, color: colors.dot, borderColor: colors.dot + "55" } : undefined}
    >
      {colors && (
        <span
          className="inline-block w-2 h-2 rounded-full shrink-0"
          style={{ background: colors.dot, opacity: active ? 1 : 0.5 }}
        />
      )}
      {label}
    </button>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
function NotasPage() {
  const { notas } = Route.useLoaderData();
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
            Pequenas observações arrancadas de um caderno — escritas no terreno, à mesa, algures entre uma fotografia e a próxima. Não cabem numa imagem, mas também não desaparecem.
          </p>
        </motion.div>

        {/* Filter tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-2"
        >
          <TagButton tag="all" label="Todas" active={activeTag === null} onClick={() => setActiveTag(null)} />
          {tags.map((t) => (
            <TagButton
              key={t.value} tag={t.value} label={t.label}
              active={activeTag === t.value}
              onClick={() => setActiveTag(activeTag === t.value ? null : t.value)}
            />
          ))}
        </motion.div>
      </section>

      <div className="hairline mx-6 md:mx-12" />

      {/* ── Post-its ── */}
      <section
        className="px-6 md:px-12 py-20 max-w-6xl mx-auto"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(254,249,195,0.18) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 70%, rgba(204,251,241,0.15) 0%, transparent 60%)
          `,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag ?? "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="columns-1 md:columns-2 lg:columns-3 gap-6"
            style={{ columnGap: "2rem" }}
          >
            {visible.map((nota, i) => (
              <NotaCard key={nota.id} nota={nota} index={i} />
            ))}
            {visible.length === 0 && (
              <p className="font-mono-label text-foreground/35 py-16 text-sm">
                Nenhuma nota nesta categoria por agora.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Fecho ── */}
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
