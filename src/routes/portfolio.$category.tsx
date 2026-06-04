import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { categories, getCategory, photosByCategory, type CategorySlug, type Photo } from "@/lib/photos";
import { getPhotoConfig } from "@/lib/photo-config-fns";

const BASE_URL = "https://rosmaninhofotografia.pt";

export const Route = createFileRoute("/portfolio/$category")({
  parseParams: (params) => ({ category: params.category as CategorySlug }),
  beforeLoad: ({ params }) => {
    if (!getCategory(params.category)) throw notFound();
  },
  loader: async () => {
    const config = await getPhotoConfig();
    return { config };
  },
  head: ({ params }) => {
    const cat = getCategory(params.category as CategorySlug);
    return {
      meta: [
        { title: `${cat?.title ?? "Colecção"} — Rosmaninho Fotografia` },
        { name: "description", content: cat?.description ?? "" },
      ],
      links: [
        { rel: "canonical", href: `${BASE_URL}/portfolio/${params.category}` },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />
      <div className="flex items-center justify-center min-h-screen px-6">
        <div>
          <p className="font-mono-label text-copper mb-6">Colecção não encontrada</p>
          <p className="font-display text-3xl md:text-5xl mb-10 leading-[1.1]">
            Esta série<br />
            <span className="font-italic-serif text-copper">não existe aqui</span>.
          </p>
          <Link to="/portfolio" className="text-[11px] uppercase tracking-[0.32em] border-b border-foreground pb-1 hover:text-copper hover:border-copper transition-colors">
            Ver Fragmentos →
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

/* ── Hover-reveal photo card ── */
function RevealPhoto({
  photo,
  onClick,
  className = "",
  loading = "lazy",
}: {
  photo: Photo;
  onClick: () => void;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const [revealed, setRevealed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    timer.current = setTimeout(() => setRevealed(true), 2200);
  };
  const handleLeave = () => {
    if (timer.current) clearTimeout(timer.current);
    setRevealed(false);
  };

  return (
    <figure
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group relative cursor-zoom-in overflow-hidden ${className}`}
    >
      <img
        src={photo.src}
        alt={photo.title}
        loading={loading}
        className="w-full h-full object-cover block transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
      />

      <div className="absolute inset-x-0 bottom-0 px-6 py-5 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <p className="font-display text-xl text-cream">{photo.title}</p>
        <p className="font-italic-serif text-cream/60 mt-1 text-sm italic">{photo.meta.description}</p>
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-[1200ms]"
        style={{ opacity: revealed ? 1 : 0 }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <p className="relative font-display italic text-cream text-center text-2xl md:text-3xl px-10 leading-relaxed max-w-md">
          "{photo.meta.description}"
        </p>
      </div>
    </figure>
  );
}

/* ── Lightbox ── */
function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const photo = photos[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) { dx < 0 ? onNext() : onPrev(); }
    touchStartX.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] bg-black flex flex-col"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex items-center justify-between px-8 py-6 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-mono-label text-cream/40">
          {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </span>
        <button
          onClick={onClose}
          className="font-mono-label text-cream/60 hover:text-cream transition-colors tracking-[0.28em] uppercase text-[10px]"
        >
          Fechar ✕
        </button>
      </div>

      <div
        className="flex-1 flex items-center justify-center px-6 pb-4 min-h-0 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={photo.src}
            src={photo.src}
            alt={photo.title}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-h-full max-w-full object-contain cursor-default"
          />
        </AnimatePresence>

        {index > 0 && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 font-mono-label text-cream/40 hover:text-cream transition-colors text-[10px] uppercase tracking-[0.28em] px-3 py-2"
          >
            ← Anterior
          </button>
        )}
        {index < photos.length - 1 && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 font-mono-label text-cream/40 hover:text-cream transition-colors text-[10px] uppercase tracking-[0.28em] px-3 py-2"
          >
            Seguinte →
          </button>
        )}
      </div>

      <div
        className="px-8 pb-8 shrink-0 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-display text-2xl text-cream">{photo.title}</p>
        <p className="font-italic-serif text-cream/40 mt-3 text-sm italic">
          "{photo.meta.description}"
        </p>
      </div>
    </motion.div>
  );
}

/* ── Quote interstitial ── */
function QuoteBlock({ text, source }: { text: string; source: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="py-28 md:py-36 px-6 text-center max-w-3xl mx-auto"
    >
      <p className="font-italic-serif text-5xl text-copper mb-6">"</p>
      <p className="font-display text-3xl md:text-4xl leading-[1.2] text-foreground/80">
        {text}
      </p>
      <p className="font-mono-label text-foreground/35 mt-8 uppercase tracking-[0.3em]">— {source}</p>
    </motion.section>
  );
}

/* ── Editorial metadata strip ── */
function MetaStrip({ photo: _photo, index }: { photo: Photo; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2 }}
      className="px-6 md:px-0 py-3"
    >
      <span className="font-mono-label text-foreground/25">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

/* ── Editorial text interstitial ── */
function EditorialPause({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.3, ease: "easeOut" }}
      className="py-20 md:py-28 px-6 max-w-2xl"
    >
      <div className="w-8 h-px bg-copper mb-8" />
      <p className="font-display text-2xl md:text-3xl leading-[1.35] text-foreground/70">
        {text}
      </p>
    </motion.div>
  );
}

/*
  Editorial sequence engine
  Cycles through 5 layout patterns indefinitely:
    0 — full-width wide (21:9)
    1 — two-column equal (4:3 each)
    2 — single centred (offset left, 16:9)
    3 — asymmetric pair (3fr + 2fr, portrait + landscape)
    4 — single full-bleed (16:9)
*/
function EditorialBlock({
  photos,
  startIndex,
  pattern,
  onOpen,
}: {
  photos: Photo[];
  startIndex: number;
  pattern: number;
  onOpen: (i: number) => void;
}) {
  const p = pattern % 5;

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 1.2, delay, ease: "easeOut" as const },
  });

  if (p === 0) {
    const ph = photos[startIndex];
    if (!ph) return null;
    return (
      <motion.div {...fade()} className="mb-1">
        <RevealPhoto photo={ph} onClick={() => onOpen(startIndex)} className="w-full aspect-[21/9]" />
        <MetaStrip photo={ph} index={startIndex} />
      </motion.div>
    );
  }

  if (p === 1) {
    const a = photos[startIndex];
    const b = photos[startIndex + 1];
    if (!a) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-1">
        {[a, b].filter(Boolean).map((ph, i) => (
          <motion.div key={ph.src} {...fade(i * 0.15)} className="bg-background">
            <RevealPhoto photo={ph} onClick={() => onOpen(startIndex + i)} className="w-full aspect-[4/3]" />
            <MetaStrip photo={ph} index={startIndex + i} />
          </motion.div>
        ))}
      </div>
    );
  }

  if (p === 2) {
    const ph = photos[startIndex];
    if (!ph) return null;
    return (
      <motion.div {...fade()} className="mb-1 md:pr-[20%]">
        <RevealPhoto photo={ph} onClick={() => onOpen(startIndex)} className="w-full aspect-[16/9]" />
        <MetaStrip photo={ph} index={startIndex} />
      </motion.div>
    );
  }

  if (p === 3) {
    const a = photos[startIndex];
    const b = photos[startIndex + 1];
    if (!a) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-px bg-border mb-1">
        {[a, b].filter(Boolean).map((ph, i) => (
          <motion.div key={ph.src} {...fade(i * 0.2)} className="bg-background">
            <RevealPhoto
              photo={ph}
              onClick={() => onOpen(startIndex + i)}
              className={`w-full ${i === 0 ? "aspect-[4/5]" : "aspect-[3/2]"}`}
            />
            <MetaStrip photo={ph} index={startIndex + i} />
          </motion.div>
        ))}
      </div>
    );
  }

  // p === 4: full-bleed, slightly inset right
  const ph = photos[startIndex];
  if (!ph) return null;
  return (
    <motion.div {...fade()} className="mb-1 md:pl-[15%]">
      <RevealPhoto photo={ph} onClick={() => onOpen(startIndex)} className="w-full aspect-[16/9]" />
      <MetaStrip photo={ph} index={startIndex} />
    </motion.div>
  );
}

/* How many photos does each pattern consume */
function patternConsumes(p: number): number {
  return [1, 2, 1, 2, 1][p % 5];
}

/* ── Main page ── */
function CategoryPage() {
  const { category } = Route.useParams();
  const { config } = Route.useLoaderData();
  const cat = getCategory(category)!;
  const pics = photosByCategory(category).filter((p) => !config.hidden.includes(p.id));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const otherCats = categories.filter((c) => c.slug !== category);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((i) => (i != null && i > 0 ? i - 1 : i));
  const nextPhoto = () => setLightboxIndex((i) => (i != null && i < pics.length - 1 ? i + 1 : i));

  /* Build editorial blocks for the whole sequence */
  const blocks: { startIndex: number; pattern: number }[] = [];
  let cursor = 0;
  let patternIdx = 0;
  while (cursor < pics.length) {
    blocks.push({ startIndex: cursor, pattern: patternIdx });
    cursor += patternConsumes(patternIdx);
    patternIdx++;
  }

  /* Quote appears roughly in the middle */
  const quoteAfterBlock = Math.floor(blocks.length / 2);
  /* Second interstitial from intro body (paragraph 1) appears after 1/4 of blocks */
  const pauseAfterBlock = Math.floor(blocks.length / 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* ── Hero / Intro ── */}
      <section className="bg-foreground text-cream px-6 md:px-16 pt-36 pb-24 md:pt-48 md:pb-32">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <Link
            to="/portfolio"
            className="font-mono-label text-cream/40 hover:text-cream transition-colors text-[10px] uppercase tracking-[0.32em]"
          >
            ← Fragmentos
          </Link>
        </motion.div>

        <div className="mt-12 max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="font-italic-serif text-3xl md:text-4xl text-copper mb-4"
          >
            colecção
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25 }}
            className="font-display text-[clamp(4rem,12vw,9rem)] leading-[0.9]"
          >
            {cat.title}.
          </motion.h1>

          {/* Intro lead + body */}
          <div className="mt-16 grid md:grid-cols-[1fr_auto] gap-12 md:gap-24 items-start">
            <div className="space-y-8 max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-cream/80 leading-relaxed text-xl font-display"
              >
                {cat.intro}
              </motion.p>
              {cat.introBody.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.55 + i * 0.12 }}
                  className="text-cream/50 leading-relaxed text-base"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.65 }}
              className="flex flex-col gap-3 md:min-w-[220px]"
            >
              <div className="h-px bg-cream/15 w-full" />
              <div className="flex justify-between font-mono-label text-cream/35 gap-8">
                <span>{pics.length} fotografias</span>
                <span>arquivo lento</span>
              </div>
              <div className="flex justify-between font-mono-label text-cream/35 gap-8">
                <span>Luísa Rosmaninho</span>
                <span>Portugal</span>
              </div>
              <div className="h-px bg-cream/15 w-full" />
              <p className="font-mono-label text-cream/25 text-[10px] leading-relaxed pt-1">
                {cat.note}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Editorial photo sequence — all photos, no grid ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20">
        {blocks.map((block, bi) => (
          <div key={`block-${bi}`}>
            <EditorialBlock
              photos={pics}
              startIndex={block.startIndex}
              pattern={block.pattern}
              onOpen={openLightbox}
            />

            {/* Quote interstitial in the middle */}
            {bi === quoteAfterBlock && (
              <QuoteBlock text={cat.quote} source={cat.quoteSource} />
            )}

            {/* Editorial text pause at 1/4 */}
            {bi === pauseAfterBlock && cat.introBody[1] && (
              <EditorialPause text={cat.introBody[1]} />
            )}
          </div>
        ))}
      </div>

      {/* ── Fim da série ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="text-center py-20 border-t border-border mt-16"
      >
        <p className="font-mono-label text-foreground/25 uppercase tracking-[0.4em]">
          fim da série · {cat.title.toLowerCase()} · {pics.length} fotografias
        </p>
      </motion.div>

      {/* ── Continuar a ver ── */}
      <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <p className="font-mono-label text-foreground/40 mb-10 uppercase tracking-[0.32em]">Continuar a ver</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {otherCats.map((c) => {
            const cover = photosByCategory(c.slug)[0];
            return (
              <Link
                key={c.slug}
                to="/portfolio/$category"
                params={{ category: c.slug }}
                className="group block relative aspect-[4/3] overflow-hidden bg-background"
              >
                {cover && (
                  <img
                    src={cover.src}
                    alt={c.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]"
                  />
                )}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-700" />
                <div className="relative h-full flex flex-col justify-end p-8 text-cream">
                  <p className="font-mono-label text-cream/40 text-[10px] uppercase tracking-[0.32em] mb-2">Colecção</p>
                  <h3 className="font-display text-4xl">{c.title}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <SiteFooter />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={pics}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
