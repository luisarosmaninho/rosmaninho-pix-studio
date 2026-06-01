import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { Whisper, WhisperLight } from "@/components/Whisper";
import { photos, categories, photosByCategory } from "@/lib/photos";
import { journal } from "@/lib/journal";
import portoStreet from "@/assets/porto-street.jpg";
import sunsetBeach from "@/assets/sunset-beach.jpg";
import river from "@/assets/river.jpg";
import villageAlley from "@/assets/village-alley.jpg";
import coimbraSkyline from "@/assets/coimbra-skyline.jpg";
import waterSplash from "@/assets/water-splash.jpg";
import arcoCoimbra from "@/assets/arco-coimbra.jpg";
import retratoSol from "@/assets/retrato-sol.jpg";
import ribeiroMusgo from "@/assets/ribeiro-musgo.jpg";
import risottoCourgette from "@/assets/risotto-courgette.jpg";
import portoRibeira from "@/assets/porto-ribeira.jpg";
import farolPeniche from "@/assets/farol-peniche.jpg";
import retratoEsplanada from "@/assets/retrato-esplanada.jpg";
import cafeMatcha from "@/assets/cafe-matcha.jpg";
import mondegoFigura from "@/assets/mondego-figura.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rosmaninho Fotografia — Arquivo lento de imagens" },
      { name: "description", content: "Fotografia de autor: séries urbanas, natureza, retratos e iguarias. Por Luísa Rosmaninho, Coimbra." },
      { property: "og:title", content: "Rosmaninho Fotografia" },
      { property: "og:description", content: "Arquivo lento de imagens — urbanas, natureza, retratos e iguarias." },
    ],
    links: [{ rel: "canonical", href: "https://rosmaninhofotografia.pt/" }],
  }),
  component: HomePage,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: "easeOut" } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   Sala de revelação — torch effect
   ───────────────────────────────────────────── */
function DarkroomReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [active, setActive] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const radius = 200;

  function updatePos(x: number, y: number) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: x - rect.left, y: y - rect.top });
  }

  function handleMouseMove(e: React.MouseEvent) { updatePos(e.clientX, e.clientY); }
  function handleTouchMove(e: React.TouchEvent) {
    e.preventDefault();
    const t = e.touches[0];
    updatePos(t.clientX, t.clientY);
  }

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => setRevealed(true), 2400);
      return () => clearTimeout(timer);
    }
  }, [active]);

  const mask = active
    ? `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, transparent 0%, transparent 38%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.97) 100%)`
    : "rgba(0,0,0,0.97)";

  return (
    <section className="relative w-full overflow-hidden select-none" style={{ height: "85vh", minHeight: 480 }}>
      {/* Photo layer */}
      <img
        src={mondegoFigura}
        alt="Sala de revelação"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      {/* Safelight tint — amber warm, visible only through the torch */}
      <div className="absolute inset-0 bg-[#3a1800]/40 mix-blend-multiply pointer-events-none" />

      {/* Dark overlay with torch hole */}
      <div
        ref={ref}
        className="absolute inset-0 transition-[background] duration-75"
        style={{ background: mask, cursor: active ? "none" : "default" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => { setActive(false); setPos({ x: -999, y: -999 }); }}
        onTouchMove={handleTouchMove}
        onTouchStart={(e) => { setActive(true); const t = e.touches[0]; updatePos(t.clientX, t.clientY); }}
        onTouchEnd={() => { setActive(false); setPos({ x: -999, y: -999 }); }}
      />

      {/* Custom torch cursor dot */}
      {active && (
        <div
          className="absolute pointer-events-none z-10 mix-blend-screen"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
            width: radius * 2,
            height: radius * 2,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,210,140,0.08) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Hint text — fades once active */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 transition-opacity duration-1000"
        style={{ opacity: active ? 0 : 1 }}
      >
        <p className="font-mono-label text-white/20 text-[10px] uppercase tracking-[0.55em] mb-4">
          § — Sala de revelação
        </p>
        <p className="font-display text-cream/30 text-2xl md:text-3xl">
          Entra no escuro.
        </p>
        <p className="font-mono-label text-white/15 text-[9px] uppercase tracking-[0.4em] mt-4">
          move o cursor para revelar
        </p>
      </div>

      {/* Caption revealed after exploring */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute bottom-8 left-8 md:left-12 pointer-events-none z-20"
      >
        <p className="font-mono-label text-copper/70 text-[9px] uppercase tracking-[0.4em] mb-1">Mondego · Coimbra</p>
        <p className="font-display text-cream/80 text-xl md:text-2xl">Uma figura, um rio, uma hora.</p>
      </motion.div>
    </section>
  );
}

const filmFrames = [
  { src: arcoCoimbra,       n: "01A", title: "A cidade vista de dentro",      cat: "Urbanas"   },
  { src: retratoSol,        n: "02A", title: "Luz que não pede licença",       cat: "Retratos"  },
  { src: ribeiroMusgo,      n: "03A", title: "O que existe só para quem se agacha", cat: "Natureza"  },
  { src: risottoCourgette,  n: "04A", title: "O que sobrou do verão",          cat: "Iguarias"  },
  { src: portoRibeira,      n: "05A", title: "Ribeira às seis da tarde",       cat: "Urbanas"   },
  { src: farolPeniche,      n: "06A", title: "A beira do mundo habitável",     cat: "Natureza"  },
  { src: retratoEsplanada,  n: "07A", title: "Uma tarde sem sobressaltos",     cat: "Retratos"  },
  { src: cafeMatcha,        n: "08A", title: "Verde antes do ruído começar",   cat: "Iguarias"  },
];

function SprocketColumn() {
  return (
    <div className="flex flex-col justify-around py-3 px-2 shrink-0">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="w-3 h-4 rounded-[2px] bg-black border border-white/8"
        />
      ))}
    </div>
  );
}

function FilmLightbox({ index, onClose, onPrev, onNext }: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const frame = filmFrames[index];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/98 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4 px-1">
        <span className="font-mono-label text-white/25 text-[9px] uppercase tracking-[0.45em]">
          Rosmaninho · {frame.cat}
        </span>
        <button
          onClick={onClose}
          className="font-mono-label text-white/30 hover:text-white text-[9px] uppercase tracking-[0.4em] transition-colors"
        >
          ESC · Fechar
        </button>
      </div>

      {/* Film negative frame */}
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-4xl bg-[#0a0a09] relative"
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.9)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top acetate strip */}
        <div className="flex items-center bg-[#111110] border-b border-white/5 px-0 py-1.5">
          <div className="flex gap-[10px] px-3 w-full overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="shrink-0 w-4 h-3 rounded-[2px] bg-black border border-white/8" />
            ))}
          </div>
        </div>

        {/* Middle: sprockets + image */}
        <div className="flex items-stretch bg-[#0e0e0d]">
          {/* Left sprocket rail */}
          <div className="bg-[#111110] border-r border-white/5">
            <SprocketColumn />
          </div>

          {/* Image area */}
          <div className="flex-1 p-3 md:p-4">
            <div className="relative overflow-hidden" style={{ maxHeight: "62vh" }}>
              <img
                src={frame.src}
                alt={frame.title}
                className="w-full h-full object-contain"
                style={{ maxHeight: "62vh", display: "block" }}
              />
              {/* Very subtle vignette */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.4)" }} />
            </div>
          </div>

          {/* Right sprocket rail */}
          <div className="bg-[#111110] border-l border-white/5">
            <SprocketColumn />
          </div>
        </div>

        {/* Bottom acetate strip — frame number + data */}
        <div className="flex items-center justify-between bg-[#111110] border-t border-white/5 px-4 py-2">
          <div className="flex items-center gap-4">
            <span className="font-mono-label text-copper/50 text-[9px] tracking-[0.4em]">{frame.n}</span>
            <span className="font-mono-label text-white/15 text-[9px]">·</span>
            <span className="font-mono-label text-white/20 text-[9px] uppercase tracking-[0.3em]">35mm · ISO 400</span>
          </div>
          <div className="flex gap-[10px] overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="shrink-0 w-4 h-3 rounded-[2px] bg-black border border-white/8" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Caption + navigation */}
      <div className="w-full max-w-4xl flex items-end justify-between mt-5 px-1">
        <div>
          <p className="font-display text-cream text-lg md:text-2xl leading-tight">{frame.title}</p>
          <p className="font-mono-label text-white/25 text-[9px] uppercase tracking-[0.35em] mt-1">
            {index + 1} / {filmFrames.length}
          </p>
        </div>
        <div className="flex items-center gap-8">
          <button
            onClick={onPrev}
            className="font-mono-label text-white/30 hover:text-copper text-[10px] uppercase tracking-[0.3em] transition-colors duration-300"
          >
            ← Anterior
          </button>
          <button
            onClick={onNext}
            className="font-mono-label text-white/30 hover:text-copper text-[10px] uppercase tracking-[0.3em] transition-colors duration-300"
          >
            Seguinte →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function HomePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function openLightbox(i: number) { setLightboxIndex(i); }
  function closeLightbox() { setLightboxIndex(null); }
  function prevFrame() { setLightboxIndex((i) => i === null ? null : (i - 1 + filmFrames.length) % filmFrames.length); }
  function nextFrame() { setLightboxIndex((i) => i === null ? null : (i + 1) % filmFrames.length); }

  const latestEntry = journal[0];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SiteNav variant="overlay" />

      {/* ============ HERO — editorial, oversized ============ */}
      <section className="relative min-h-screen w-full overflow-hidden bg-foreground">
        <motion.img
          src={portoStreet}
          alt="Rosmaninho Fotografia"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/40 to-foreground/85" />

        {/* Metadata superior */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute top-24 inset-x-0 px-6 md:px-12 flex justify-between text-cream/70 text-[10px] tracking-[0.4em] uppercase"
        >
          <span>N.º 001 · Vol. I</span>
          <span className="hidden md:inline">40°12'N · 8°25'W</span>
          <span>MMXXVI</span>
        </motion.div>

        {/* Headline */}
        <div className="relative min-h-screen flex flex-col justify-end pb-24 md:pb-28 px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="font-mono-label text-copper mb-6"
          >
            Arquivo lento · Coimbra
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 1.6, ease: "easeOut" }}
            className="font-display text-cream text-[64px] leading-[0.95] md:text-[140px] lg:text-[180px] max-w-6xl tracking-tight"
          >
            Onde o tempo<br />
            <span className="font-italic-serif text-copper">para</span>, e a emoção fica.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.1 }}
            className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <p className="max-w-md text-cream/75 text-base leading-relaxed">
              Um caderno aberto de imagens — ruas, paisagens, rostos e mesas — feito devagar, com câmara e palavra. Por Luísa Rosmaninho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/portfolio" className="btn-ghost-light">Ver séries</Link>
              <Link to="/diario" className="btn-copper">Ler diário</Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/50 text-[10px] uppercase tracking-[0.5em]"
        >
          desce devagar ↓
        </motion.div>
      </section>

      {/* ============ MANIFESTO breve ============ */}
      <Section className="px-6 md:px-12 py-28 md:py-40 bg-background">
        <div className="max-w-5xl mx-auto relative">
          <p className="font-mono-label text-copper mb-8">§ 01 — Manifesto</p>
          <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight">
            Não fotografo para mostrar — fotografo para <span className="font-italic-serif text-copper">demorar</span>. Cada imagem é uma forma educada de pedir ao mundo que <span className="font-italic-serif">fique</span> mais um momento.
          </p>
          <div className="mt-12 flex justify-between items-end">
            <Whisper text="arquivo lento · Coimbra · MMXX —" delay={1.4} />
            <Whisper text="40°12′N · 8°25′O" delay={2} />
          </div>
        </div>
      </Section>

      {/* ============ AUTORA — 7/5 asymmetric ============ */}
      <Section className="px-6 md:px-12 py-28 md:py-40 bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">
          <div className="md:col-span-5 order-2 md:order-1">
            <p className="font-mono-label text-copper mb-6">§ 02 — Autora</p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98]">
              Nunca apenas<br />
              <span className="font-italic-serif text-copper">tirar</span><br />
              fotografias.
            </h2>
            <div className="mt-10 space-y-5 text-foreground/75 max-w-md leading-relaxed">
              <p>
                A fotografia tornou-se a minha forma de guardar emoções, ambientes e pequenos momentos que normalmente passam demasiado depressa.
              </p>
              <p>
                Procuro criar fotografias que pareçam verdadeiras. Naturais. Honestamente reais.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-foreground/15 pt-8 max-w-md">
              {[
                { n: "04", l: "Séries" },
                { n: photos.length.toString().padStart(2, "0"), l: "Imagens" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-5xl md:text-6xl text-copper">{s.n}</p>
                  <p className="font-mono-label mt-2">{s.l}</p>
                </div>
              ))}
            </div>

            <Link to="/sobre" className="mt-12 inline-block text-[11px] uppercase tracking-[0.32em] border-b border-foreground pb-1 hover:text-copper hover:border-copper transition-colors">
              Conhecer a autora →
            </Link>
            <Whisper text="observação contínua · quatro séries abertas" delay={1.8} className="mt-8" />
          </div>

          <div className="md:col-span-7 order-1 md:order-2 relative">
            <div className="hover-zoom warm-tone aspect-[4/5] relative">
              <img src={villageAlley} alt="Luísa Rosmaninho" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </Section>

      {/* ============ SÉRIES — cards 2×2 ============ */}
      <Section className="px-6 md:px-12 pt-28 md:pt-40 pb-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <p className="font-mono-label text-copper mb-6">§ 03 — Séries</p>
              <h2 className="font-display text-5xl md:text-7xl leading-[0.98]">
                Quatro maneiras<br /><span className="font-italic-serif text-copper">de olhar</span>.
              </h2>
            </div>
            <p className="max-w-sm text-foreground/70 text-sm leading-relaxed">
              Urbanas, Natureza, Retratos, Iguarias. Quatro pastas abertas — nenhuma fechada — que se vão tocando ao longo dos anos.
            </p>
          </div>

          {/* 2×2 image cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/12">
            {categories.map((c, i) => {
              const cover = photosByCategory(c.slug)[0];
              const count = photosByCategory(c.slug).length;
              return (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 1.1, delay: i * 0.09, ease: "easeOut" }}
                >
                  <Link
                    to="/portfolio/$category"
                    params={{ category: c.slug }}
                    className="group relative block overflow-hidden"
                    style={{ aspectRatio: "4/3" }}
                  >
                    {cover && (
                      <img
                        src={cover.src}
                        alt={c.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15 transition-opacity duration-700 group-hover:from-black/75" />

                    <p className="absolute top-6 left-6 font-mono-label text-white/30 text-[10px] tracking-[0.45em]">0{i + 1}</p>

                    <div className="absolute bottom-0 inset-x-0 p-7 md:p-9">
                      <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-none group-hover:text-copper transition-colors duration-500">
                        {c.title}
                      </h3>
                      <p className="mt-3 text-cream/50 text-sm leading-relaxed max-w-xs translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        {c.description}
                      </p>
                      <div className="mt-5 flex items-center justify-between">
                        <span className="font-mono-label text-white/25 text-[10px] tracking-[0.3em]">{count} imagens</span>
                        <span className="font-mono-label text-copper/0 group-hover:text-copper text-[10px] tracking-[0.3em] transition-colors duration-500">
                          Ver série →
                        </span>
                      </div>
                    </div>

                    <div className="absolute inset-0 ring-1 ring-inset ring-copper/0 group-hover:ring-copper/25 transition-all duration-700" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 mb-0 flex justify-end">
            <Link to="/portfolio" className="inline-block text-[11px] uppercase tracking-[0.32em] border-b border-foreground pb-1 hover:text-copper hover:border-copper transition-colors">
              Ver o arquivo completo →
            </Link>
          </div>
        </div>
      </Section>

      {/* ============ CONTACTOS — film strip ============ */}
      <section className="mt-20 md:mt-28 py-20 md:py-28 bg-[#0e0e0d] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="px-6 md:px-12 mb-10 flex items-end justify-between max-w-7xl mx-auto"
        >
          <div>
            <p className="font-mono-label text-copper/70 mb-3 uppercase tracking-[0.38em]">§ — Contactos</p>
            <h2 className="font-display text-3xl md:text-5xl text-cream leading-[0.98]">
              O arquivo em<br />
              <span className="font-italic-serif text-copper">tira de filme</span>.
            </h2>
          </div>
          <p className="hidden md:block font-mono-label text-cream/25 text-[10px] uppercase tracking-[0.3em] max-w-[180px] text-right leading-relaxed">
            cada frame,<br />uma decisão
          </p>
        </motion.div>

        {/* Sprocket rail top */}
        <div className="relative w-full">
          <div className="absolute top-0 left-0 right-0 h-8 bg-[#0e0e0d] flex items-center z-10">
            <div className="flex gap-[18px] px-3 w-full">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="shrink-0 w-5 h-4 rounded-[3px] border border-white/10 bg-[#1a1a18]" />
              ))}
            </div>
          </div>

          {/* Strip */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="flex gap-2 px-3 overflow-x-auto scrollbar-none pt-9 pb-9"
            style={{ scrollbarWidth: "none" }}
          >
            {filmFrames.map((frame, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className="shrink-0 group relative text-left cursor-pointer"
                style={{ width: 220 }}
              >
                <div className="relative overflow-hidden" style={{ height: 300 }}>
                  <img
                    src={frame.src}
                    alt={frame.title}
                    className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <p className="absolute bottom-3 inset-x-3 font-display text-cream text-sm leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {frame.title}
                  </p>
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-copper/40 transition-all duration-500" />
                </div>
                <div className="flex items-center justify-between mt-2 px-1">
                  <span className="font-mono-label text-white/20 text-[9px] tracking-[0.3em] group-hover:text-copper/50 transition-colors">{frame.n}</span>
                  <span className="font-mono-label text-white/15 text-[9px] group-hover:text-copper/40 transition-colors">↗</span>
                </div>
              </button>
            ))}
          </motion.div>

          {/* Sprocket rail bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#0e0e0d] flex items-center z-10">
            <div className="flex gap-[18px] px-3 w-full">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="shrink-0 w-5 h-4 rounded-[3px] border border-white/10 bg-[#1a1a18]" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SALA DE REVELAÇÃO ============ */}
      <DarkroomReveal />

      {/* ============ DIÁRIO — última entrada em destaque ============ */}
      <Section className="px-6 md:px-12 py-28 md:py-40 bg-foreground text-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 hover-zoom warm-tone aspect-[4/3] relative">
            <img src={latestEntry.photoSrc} alt={latestEntry.photoTitle} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="md:col-span-5">
            <p className="font-mono-label text-copper mb-6">§ 04 — Diário · última entrada</p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream leading-[0.98]">
              {latestEntry.title}
            </h2>
            <p className="mt-8 text-cream/70 leading-relaxed">
              {latestEntry.excerpt}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link to="/diario/$slug" params={{ slug: latestEntry.slug }} className="btn-copper">
                Ler entrada
              </Link>
              <Link to="/diario" className="inline-flex items-center gap-3 border border-cream/40 px-7 py-3.5 text-[11px] uppercase tracking-[0.32em] text-cream hover:bg-cream hover:text-foreground transition-all duration-500">
                Todas as entradas
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ DIÁLOGO ============ */}
      <Section className="px-6 md:px-12 py-32 md:py-44 bg-background">
        <div className="max-w-4xl mx-auto text-center relative">
          <Whisper text="escreve devagar · há uma conversa possível" delay={1.6} className="mb-12" />
          <p className="font-mono-label text-copper mb-6">§ 05 — Diálogo</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.98]">
            Se quiseres <span className="font-italic-serif text-copper">falar</span>,<br />escreve devagar.
          </h2>
          <p className="mt-10 text-foreground/70 max-w-xl mx-auto leading-relaxed">
            Não há tabelas nem pacotes. Apenas uma conversa, sobre uma imagem, um lugar, uma ideia — ou uma cópia em papel que queiras ter à parede.
          </p>
          <Link to="/contacto" className="mt-12 inline-block btn-copper">
            Iniciar diálogo
          </Link>
        </div>
      </Section>

      {/* ============ NOTA PESSOAL — sem número, sem botão ============ */}
      <Section className="px-6 md:px-12 py-36 md:py-48 bg-cream">
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="font-italic-serif text-5xl md:text-6xl text-foreground/75 leading-[1.2]">
            "Este sítio é o meu<br />caderno aberto —
          </p>
          <p className="font-display text-2xl md:text-3xl text-foreground/50 mt-6 leading-relaxed">
            sem clientes, sem pressa,<br />
            só atenção ao que insiste em ficar."
          </p>
          <p className="font-mono-label text-foreground/30 mt-12 uppercase tracking-[0.4em]">L.R. · Coimbra</p>
        </div>
      </Section>

      <SiteFooter />

      <AnimatePresence>
        {lightboxIndex !== null && (
          <FilmLightbox
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevFrame}
            onNext={nextFrame}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
