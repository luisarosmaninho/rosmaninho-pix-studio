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

/* ──────────────────────────────────────────────────────────────
   Manchas de café — SVG orgânico, como se a chávena caísse mesmo
   ────────────────────────────────────────────────────────────── */

const C = "#5C2F0E"; /* cor do café derramado */

/*
 * Poça principal — blob irregular com fill muito faint e borda seca
 * Cada instância usa um path diferente para nenhuma mancha ser igual
 */
function CoffeePuddle({
  variant = 1,
  size = 110,
  opacity = 0.18,
  rotate = 0,
  style,
}: {
  variant?: 1 | 2 | 3;
  size?: number;
  opacity?: number;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  /* Três blobs distintos — todos irregulares, nenhum simétrico */
  const paths: Record<1 | 2 | 3, { outer: string; inner: string }> = {
    1: {
      outer: "M 52 6 C 74 1, 96 16, 96 42 C 96 63, 84 82, 62 90 C 42 97, 16 90, 7 68 C -1 48, 8 24, 28 12 C 38 6, 44 7, 52 6 Z",
      inner: "M 50 18 C 68 14, 82 26, 81 46 C 80 62, 70 76, 54 80 C 38 84, 22 76, 16 62 C 10 48, 14 32, 28 24 C 38 18, 44 20, 50 18 Z",
    },
    2: {
      outer: "M 44 4 C 62 -2, 90 10, 94 36 C 98 56, 84 80, 60 88 C 38 96, 10 86, 4 62 C -2 38, 14 12, 44 4 Z",
      inner: "M 44 16 C 60 11, 80 22, 82 42 C 84 58, 72 74, 52 78 C 34 82, 16 70, 14 52 C 12 36, 24 22, 44 16 Z",
    },
    3: {
      outer: "M 58 8 C 80 2, 98 22, 95 46 C 92 68, 74 90, 50 92 C 28 94, 6 78, 5 56 C 4 34, 20 12, 40 6 C 48 4, 54 9, 58 8 Z",
      inner: "M 54 20 C 72 16, 84 30, 82 50 C 80 66, 66 80, 48 82 C 30 84, 16 70, 16 52 C 16 36, 28 22, 44 18 C 50 16, 52 21, 54 20 Z",
    },
  };

  const { outer, inner } = paths[variant];

  return (
    <svg
      width={size} height={size}
      viewBox="0 0 100 100"
      className="absolute pointer-events-none select-none"
      aria-hidden="true"
      style={{ opacity, transform: `rotate(${rotate}deg)`, ...style }}
    >
      {/* corpo da mancha — fill muito faint */}
      <path d={outer} fill={C} fillOpacity="0.09" stroke={C} strokeWidth="1.6" strokeOpacity="0.85" />
      {/* anel interior seco — linha irregular onde o café cristalizou */}
      <path d={inner} fill="none" stroke={C} strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="9 4 5 2" />
    </svg>
  );
}

/*
 * Risco de escorrimento — como o café que correu pela mesa em linha
 */
function CoffeeDrip({
  width = 120,
  height = 38,
  opacity = 0.15,
  rotate = 0,
  style,
}: {
  width?: number;
  height?: number;
  opacity?: number;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={width} height={height}
      viewBox="0 0 120 38"
      className="absolute pointer-events-none select-none"
      aria-hidden="true"
      style={{ opacity, transform: `rotate(${rotate}deg)`, ...style }}
    >
      {/* risco principal */}
      <path
        d="M 4 14 C 18 6, 72 8, 100 14 C 116 18, 118 28, 104 34 C 82 40, 24 36, 8 28 C -2 22, -4 18, 4 14 Z"
        fill={C} fillOpacity="0.07" stroke={C} strokeWidth="1.3" strokeOpacity="0.75"
      />
      {/* borda de evaporação — mais escura */}
      <path
        d="M 6 15 C 20 9, 70 10, 98 16 C 112 20, 114 28, 100 32"
        fill="none" stroke={C} strokeWidth="0.6" strokeOpacity="0.5"
      />
    </svg>
  );
}

/*
 * Pingo de salpico — gotas irregulares espalhadas pelo impacto
 */
function CoffeeDrop({
  size = 18,
  opacity = 0.22,
  rotate = 0,
  style,
}: {
  size?: number;
  opacity?: number;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  /* path de uma gota orgânica — ligeiramente amendoada, não círculo */
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 30 30"
      className="absolute pointer-events-none select-none"
      aria-hidden="true"
      style={{ opacity, transform: `rotate(${rotate}deg)`, ...style }}
    >
      <path
        d="M 15 2 C 22 2, 28 9, 28 16 C 28 24, 22 29, 14 28 C 7 27, 2 21, 3 14 C 4 7, 9 2, 15 2 Z"
        fill={C} fillOpacity="0.55" stroke={C} strokeWidth="0.8" strokeOpacity="0.6"
      />
    </svg>
  );
}

/*
 * Arco de chávena — arco parcial onde o bordo da chávena tocou antes de tombar
 */
function CoffeeArc({
  size = 90,
  opacity = 0.16,
  rotate = 0,
  style,
}: {
  size?: number;
  opacity?: number;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 100 100"
      className="absolute pointer-events-none select-none"
      aria-hidden="true"
      style={{ opacity, transform: `rotate(${rotate}deg)`, ...style }}
    >
      {/* arco exterior — onde o aro da chávena pousou */}
      <path d="M 8 52 A 42 42 0 0 1 92 52" fill="none" stroke={C} strokeWidth="2" strokeOpacity="0.9" strokeLinecap="round" />
      {/* arco interior ligeiramente irregular */}
      <path d="M 16 54 A 34 34 0 0 1 84 54" fill="none" stroke={C} strokeWidth="0.9" strokeOpacity="0.45" strokeDasharray="12 5 8 3" strokeLinecap="round" />
      {/* manchinha de impacto — onde o fundo bateu */}
      <ellipse cx="50" cy="90" rx="8" ry="5" fill={C} fillOpacity="0.18" />
    </svg>
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
      <section className="relative px-6 md:px-12 pt-32 md:pt-44 pb-20 max-w-6xl mx-auto">

        {/* poça grande — como se a chávena tivesse tombado no canto direito */}
        <CoffeePuddle variant={1} size={148} opacity={0.15} rotate={18}
          style={{ top: 36, right: -10 }} />
        {/* dois pingos de salpico perto da poça */}
        <CoffeeDrop size={14} opacity={0.28} rotate={-30}
          style={{ top: 52, right: 148 }} />
        <CoffeeDrop size={9} opacity={0.20} rotate={45}
          style={{ top: 38, right: 162 }} />
        <CoffeeDrop size={11} opacity={0.24} rotate={12}
          style={{ top: 82, right: 140 }} />
        {/* risco de escorrimento abaixo da poça */}
        <CoffeeDrip width={100} height={32} opacity={0.13} rotate={-8}
          style={{ top: 170, right: 18 }} />
        {/* arco pequeno — onde outra chávena pousou antes */}
        <CoffeeArc size={68} opacity={0.14} rotate={-15}
          style={{ bottom: 48, left: -8 }} />

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
      <section className="relative px-6 md:px-12 py-20 max-w-6xl mx-auto">

        {/* escorrimento longo — como o café que correu pela margem da folha */}
        <CoffeeDrip width={140} height={40} opacity={0.11} rotate={-5}
          style={{ top: 40, left: -30 }} />
        {/* pingo isolado — ficou ali do salto */}
        <CoffeeDrop size={22} opacity={0.20} rotate={-18}
          style={{ top: 80, left: 18 }} />
        <CoffeeDrop size={12} opacity={0.16} rotate={60}
          style={{ top: 64, left: 44 }} />

        {/* poça média — lado direito, entrada para a grelha */}
        <CoffeePuddle variant={2} size={118} opacity={0.13} rotate={-22}
          style={{ top: 200, right: -14 }} />
        <CoffeeDrop size={16} opacity={0.22} rotate={30}
          style={{ top: 196, right: 110 }} />
        <CoffeeDrop size={10} opacity={0.18} rotate={-12}
          style={{ top: 222, right: 130 }} />

        {/* arco — outra chávena que pousou a meio da sessão de escrita */}
        <CoffeeArc size={86} opacity={0.13} rotate={12}
          style={{ top: 520, left: 10 }} />
        {/* risco abaixo do arco */}
        <CoffeeDrip width={90} height={28} opacity={0.10} rotate={8}
          style={{ top: 596, left: 24 }} />

        {/* poça pequena — mais abaixo, canto esquerdo */}
        <CoffeePuddle variant={3} size={88} opacity={0.12} rotate={5}
          style={{ top: 880, left: -6 }} />
        <CoffeeDrop size={14} opacity={0.20} rotate={-45}
          style={{ top: 876, left: 86 }} />
        <CoffeeDrop size={8} opacity={0.15} rotate={20}
          style={{ top: 900, left: 100 }} />

        {/* escorrimento lateral direito — mais abaixo */}
        <CoffeeDrip width={110} height={32} opacity={0.09} rotate={-12}
          style={{ top: 1180, right: -20 }} />
        <CoffeeDrop size={18} opacity={0.17} rotate={35}
          style={{ top: 1172, right: 100 }} />

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
        className="relative px-6 md:px-12 py-40 text-center max-w-2xl mx-auto"
      >
        {/* arco + poça final — última chávena do dia */}
        <CoffeeArc size={78} opacity={0.14} rotate={-30}
          style={{ top: 32, right: 8 }} />
        <CoffeePuddle variant={2} size={72} opacity={0.11} rotate={22}
          style={{ bottom: 56, left: 0 }} />
        <CoffeeDrop size={12} opacity={0.18} rotate={-10}
          style={{ bottom: 82, left: 74 }} />
        <CoffeeDrop size={7} opacity={0.14} rotate={55}
          style={{ bottom: 72, left: 88 }} />

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
