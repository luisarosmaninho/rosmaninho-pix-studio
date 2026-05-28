import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { categories, getCategory, photosByCategory, type CategorySlug, type Photo } from "@/lib/photos";
import { getPhotoConfig } from "@/lib/photo-config-fns";

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
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <p className="font-mono-label">Colecção não encontrada</p>
    </div>
  ),
});

/* ---- Hover-reveal photo card ---- */
function RevealPhoto({
  photo,
  onClick,
  className = "",
  imgClass = "",
}: {
  photo: Photo;
  onClick: () => void;
  className?: string;
  imgClass?: string;
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
        className={`w-full h-full object-cover block transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04] ${imgClass}`}
      />

      {/* Standard caption on hover */}
      <div className="absolute inset-x-0 bottom-0 px-6 py-5 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <p className="font-display text-xl text-cream">{photo.title}</p>
        <p className="font-italic-serif text-cream/60 mt-1 text-sm italic">{photo.meta.description}</p>
      </div>

      {/* Hidden phrase — revealed after 2.2s of hover */}
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

/* ---- Lightbox ---- */
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] bg-black flex flex-col"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-8 py-6 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-6">
          <span className="font-mono-label text-cream/40">
            {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
        </div>
        <button
          onClick={onClose}
          className="font-mono-label text-cream/60 hover:text-cream transition-colors tracking-[0.28em] uppercase text-[10px]"
        >
          Fechar ✕
        </button>
      </div>

      {/* Image */}
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

        {/* Prev / Next */}
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

      {/* Caption */}
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

/* ---- Quote interstitial ---- */
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

/* ---- Editorial metadata strip ---- */
function MetaStrip({ photo, index }: { photo: Photo; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2 }}
      className="flex items-center justify-between px-6 md:px-0 py-4"
    >
      <span className="font-mono-label text-foreground/30">
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="font-italic-serif text-foreground/40 text-sm italic">{photo.meta.description}</p>
    </motion.div>
  );
}

/* ---- Main page ---- */
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* ── Hero section ── */}
      <section className="bg-foreground text-cream px-6 md:px-16 pt-36 pb-24 md:pt-48 md:pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/portfolio"
            className="font-mono-label text-cream/40 hover:text-cream transition-colors text-[10px] uppercase tracking-[0.32em]"
          >
            ← Arquivo
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

          <div className="mt-16 grid md:grid-cols-2 gap-12 md:gap-24 items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-cream/60 leading-relaxed text-lg max-w-prose"
            >
              {cat.intro}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col gap-3"
            >
              <div className="h-px bg-cream/15 w-full" />
              <div className="flex justify-between font-mono-label text-cream/35">
                <span>{pics.length} fotografias</span>
                <span>
                  {pics.reduce((min, p) => Math.min(min, parseInt(p.year)), Infinity)}–
                  {pics.reduce((max, p) => Math.max(max, parseInt(p.year)), 0)}
                </span>
              </div>
              <div className="flex justify-between font-mono-label text-cream/35">
                <span>Luísa Rosmaninho</span>
                <span>Portugal</span>
              </div>
              <div className="h-px bg-cream/15 w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Editorial photo sequence ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Photo 1 — Large opener */}
        {pics[0] && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="mt-20"
          >
            <RevealPhoto
              photo={pics[0]}
              onClick={() => openLightbox(0)}
              className="w-full aspect-[16/9] md:aspect-[21/9]"
            />
            <MetaStrip photo={pics[0]} index={0} />
          </motion.div>
        )}

        {/* Photos 2 + 3 — Two column */}
        {pics.length >= 3 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {[1, 2].map((i) =>
              pics[i] ? (
                <motion.div
                  key={pics[i].src}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 1.1, delay: i === 1 ? 0 : 0.15, ease: "easeOut" }}
                  className="bg-background"
                >
                  <RevealPhoto
                    photo={pics[i]}
                    onClick={() => openLightbox(i)}
                    className="w-full aspect-[4/3]"
                  />
                  <MetaStrip photo={pics[i]} index={i} />
                </motion.div>
              ) : null
            )}
          </div>
        )}
      </div>

      {/* Quote interstitial */}
      <QuoteBlock text={cat.quote} source={cat.quoteSource} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Photo 4 — Single large */}
        {pics[3] && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="mb-6"
          >
            <RevealPhoto
              photo={pics[3]}
              onClick={() => openLightbox(3)}
              className="w-full aspect-[16/9]"
            />
            <MetaStrip photo={pics[3]} index={3} />
          </motion.div>
        )}

        {/* Photos 5 + 6 — Asymmetric: tall left, short right */}
        {pics.length >= 5 && (
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-px bg-border mb-20">
            {[4, 5].map((i) =>
              pics[i] ? (
                <motion.div
                  key={pics[i].src}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 1.1, delay: i === 4 ? 0 : 0.2, ease: "easeOut" }}
                  className="bg-background"
                >
                  <RevealPhoto
                    photo={pics[i]}
                    onClick={() => openLightbox(i)}
                    className={`w-full ${i === 4 ? "aspect-[4/5]" : "aspect-[4/5]"}`}
                  />
                  <MetaStrip photo={pics[i]} index={i} />
                </motion.div>
              ) : null
            )}
          </div>
        )}

        {/* Overflow photos (retratos: only 2) shown as wide pair */}
        {pics.length === 2 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-20">
            {pics.map((p, i) => (
              <motion.div
                key={p.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.1, delay: i * 0.15, ease: "easeOut" }}
                className="bg-background"
              >
                <RevealPhoto
                  photo={p}
                  onClick={() => openLightbox(i)}
                  className="w-full aspect-[3/4]"
                />
                <MetaStrip photo={p} index={i} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── Archive close note ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="text-center py-20 border-t border-border"
      >
        <p className="font-mono-label text-foreground/25 uppercase tracking-[0.4em]">fim do arquivo · {cat.title.toLowerCase()}</p>
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
