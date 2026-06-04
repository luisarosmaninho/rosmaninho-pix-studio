import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { photos, categories, type Photo, type Category } from "@/lib/photos";
import { getPhotoConfig } from "@/lib/photo-config-fns";

export const Route = createFileRoute("/portfolio/")({
  loader: async () => {
    const config = await getPhotoConfig();
    return { config };
  },
  head: () => ({
    meta: [
      { title: "Arquivo — Rosmaninho Fotografia" },
      { name: "description", content: "Um arquivo vivo de momentos, imagens e fragmentos de tempo guardados com intenção." },
      { property: "og:title", content: "Arquivo — Rosmaninho" },
      { property: "og:description", content: "Fotografias guardadas com intenção." },
    ],
    links: [{ rel: "canonical", href: "https://rosmaninhofotografia.pt/portfolio" }],
  }),
  component: PortfolioPage,
});

function applyConfig(all: Photo[], config: { hidden: string[]; order: string[] }): Photo[] {
  let result = all.filter((p) => !config.hidden.includes(p.id));
  if (config.order.length > 0) {
    result = [...result].sort((a, b) => {
      const ai = config.order.indexOf(a.id);
      const bi = config.order.indexOf(b.id);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }
  return result;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" as const } },
};

/* ─── Separador editorial de série ─── */
function SeriesHeader({ cat, index, count }: { cat: Category; index: number; count: number }) {
  const romanIdx = ["I", "II", "III", "IV", "V"][index] ?? String(index + 1);
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="pt-32 md:pt-44 pb-16 md:pb-20 border-t-2 border-foreground/12"
    >
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
        <div className="md:col-span-8">
          <p className="font-mono-label text-copper/60 text-[9px] tracking-[0.52em] uppercase mb-6">
            série {romanIdx} · {count} {count === 1 ? "fotografia" : "fotografias"}
          </p>
          <h2 className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] tracking-tight">
            {cat.title}
            <span className="font-italic-serif text-copper">.</span>
          </h2>
          <p className="mt-6 text-foreground/50 text-lg leading-relaxed max-w-xl font-italic-serif italic">
            {cat.description}
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col gap-4 md:pb-2">
          <p className="font-mono-label text-foreground/25 text-[9px] tracking-[0.38em] uppercase leading-relaxed">
            {cat.note}
          </p>
          {cat.quote && (
            <p className="font-italic-serif text-foreground/30 text-sm italic leading-relaxed border-l border-foreground/12 pl-4">
              "{cat.quote}"
            </p>
          )}
          <Link
            to="/portfolio/$category"
            params={{ category: cat.slug }}
            className="mt-2 inline-flex items-center gap-3 font-mono-label text-[9px] uppercase tracking-[0.38em] text-copper/70 hover:text-copper transition-colors duration-300"
          >
            Ver série completa →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Layout pattern 0: grande, alinhada à esquerda, legenda em baixo ─── */
function PatternFull({ photo, num, onOpen }: { photo: Photo; num: string; onOpen: () => void }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      className="py-20 md:py-28 border-t border-foreground/8"
    >
      <p className="font-mono-label text-foreground/18 text-[10px] tracking-[0.48em] mb-8">{num}</p>
      <button onClick={onOpen} className="block w-full group text-left focus:outline-none">
        <div className="overflow-hidden">
          <img
            src={photo.src}
            alt={photo.title}
            loading="lazy"
            className="w-full object-cover max-h-[76vh] group-hover:scale-[1.015] transition-transform duration-700 ease-out"
          />
        </div>
      </button>
      <div className="mt-8 max-w-2xl">
        <h3 className="font-display text-3xl md:text-4xl leading-[1.05]">{photo.title}</h3>
        {photo.meta.description && (
          <p className="font-italic-serif text-foreground/42 mt-4 text-lg leading-relaxed italic">
            {photo.meta.description}
          </p>
        )}
      </div>
    </motion.article>
  );
}

/* ─── Layout pattern 1: número grande, texto esquerda, foto direita ─── */
function PatternRight({ photo, num, onOpen }: { photo: Photo; num: string; onOpen: () => void }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      className="py-20 md:py-28 border-t border-foreground/8"
    >
      <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
        <div className="md:col-span-3 flex flex-col gap-5 md:pt-14">
          <p className="font-display text-[5rem] md:text-[7rem] leading-none text-foreground/7 select-none -ml-1">{num}</p>
          <h3 className="font-display text-2xl md:text-[1.75rem] leading-tight">{photo.title}</h3>
          {photo.meta.description && (
            <p className="font-italic-serif text-foreground/42 text-base leading-relaxed italic">
              {photo.meta.description}
            </p>
          )}
        </div>
        <div className="md:col-span-9">
          <button onClick={onOpen} className="block w-full group text-left focus:outline-none">
            <div className="overflow-hidden">
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="w-full object-cover max-h-[72vh] group-hover:scale-[1.015] transition-transform duration-700 ease-out"
              />
            </div>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Layout pattern 2: foto esquerda (7 cols), texto direita (4 cols) ─── */
function PatternSplit({ photo, num, onOpen }: { photo: Photo; num: string; onOpen: () => void }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      className="py-20 md:py-28 border-t border-foreground/8"
    >
      <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-7">
          <button onClick={onOpen} className="block w-full group text-left focus:outline-none">
            <div className="overflow-hidden">
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="w-full object-cover max-h-[68vh] group-hover:scale-[1.015] transition-transform duration-700 ease-out"
              />
            </div>
          </button>
        </div>
        <div className="md:col-span-4 md:col-start-9 flex flex-col gap-5">
          <p className="font-mono-label text-foreground/18 text-[10px] tracking-[0.48em]">{num}</p>
          <h3 className="font-display text-2xl md:text-[1.75rem] leading-tight">{photo.title}</h3>
          <div className="h-px bg-foreground/10 w-10" />
          {photo.meta.description && (
            <p className="font-italic-serif text-foreground/42 text-base leading-relaxed italic">
              {photo.meta.description}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Layout pattern 3: foto estreita centrada, texto centrado em baixo ─── */
function PatternCenter({ photo, num, onOpen }: { photo: Photo; num: string; onOpen: () => void }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      className="py-20 md:py-28 border-t border-foreground/8"
    >
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-mono-label text-foreground/18 text-[10px] tracking-[0.48em] mb-8">{num}</p>
        <button onClick={onOpen} className="block w-full group text-left focus:outline-none">
          <div className="overflow-hidden">
            <img
              src={photo.src}
              alt={photo.title}
              loading="lazy"
              className="w-full object-cover max-h-[65vh] group-hover:scale-[1.015] transition-transform duration-700 ease-out"
            />
          </div>
        </button>
        <div className="mt-7">
          <h3 className="font-display text-2xl md:text-3xl leading-tight">{photo.title}</h3>
          {photo.meta.description && (
            <p className="font-italic-serif text-foreground/42 mt-4 text-base leading-relaxed italic">
              {photo.meta.description}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ArchiveEntry({
  photo,
  globalIndex,
  onOpen,
}: {
  photo: Photo;
  globalIndex: number;
  onOpen: (p: Photo) => void;
}) {
  const num = String(globalIndex + 1).padStart(2, "0");
  const pattern = globalIndex % 4;
  const props = { photo, num, onOpen: () => onOpen(photo) };

  if (pattern === 0) return <PatternFull {...props} />;
  if (pattern === 1) return <PatternRight {...props} />;
  if (pattern === 2) return <PatternSplit {...props} />;
  return <PatternCenter {...props} />;
}

function PortfolioPage() {
  const { config } = Route.useLoaderData();
  const allPhotos = applyConfig(photos, config);

  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const lightboxIndex = lightbox ? allPhotos.indexOf(lightbox) : -1;

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const goPrev = useCallback(() => {
    if (lightboxIndex > 0) setLightbox(allPhotos[lightboxIndex - 1]);
  }, [lightboxIndex, allPhotos]);
  const goNext = useCallback(() => {
    if (lightboxIndex < allPhotos.length - 1) setLightbox(allPhotos[lightboxIndex + 1]);
  }, [lightboxIndex, allPhotos]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, goPrev, goNext]);

  const touchStartX = useRef<number | null>(null);

  /* Build series groups preserving global index for numbering */
  const grouped = categories.map((cat) => ({
    cat,
    items: allPhotos.filter((p) => p.category === cat.slug),
  })).filter((g) => g.items.length > 0);

  /* Compute starting global index for each group */
  const groupOffsets: number[] = [];
  let offset = 0;
  for (const g of grouped) {
    groupOffsets.push(offset);
    offset += g.items.length;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* ── Abertura ── */}
      <header className="px-6 md:px-16 pt-36 pb-20 md:pt-48 md:pb-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-5xl mx-auto"
        >
          <p className="font-mono-label text-copper/70 mb-6 text-[10px] uppercase tracking-[0.45em]">arquivo fotográfico</p>
          <h1 className="font-display text-[clamp(4rem,12vw,9rem)] leading-[0.9]">
            Arquivo<span className="font-italic-serif text-copper">.</span>
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-3"
          >
            <p className="font-italic-serif text-foreground/38 text-xl leading-relaxed">
              {allPhotos.length} fotografias · {grouped.length} séries
            </p>
            <p className="font-mono-label text-foreground/20 text-[10px] uppercase tracking-[0.38em] self-center">
              percorre devagar
            </p>
          </motion.div>
        </motion.div>
      </header>

      {/* ── Séries + fichas de arquivo ── */}
      <main className="px-6 md:px-16 max-w-5xl mx-auto pb-20">
        {grouped.map(({ cat, items }, gi) => (
          <div key={cat.slug}>
            <SeriesHeader cat={cat} index={gi} count={items.length} />
            {items.map((photo, li) => (
              <ArchiveEntry
                key={photo.id}
                photo={photo}
                globalIndex={groupOffsets[gi] + li}
                onOpen={setLightbox}
              />
            ))}
          </div>
        ))}
      </main>

      {/* ── Fecho ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="px-6 md:px-16 py-32 md:py-44 text-center max-w-xl mx-auto"
      >
        <p className="font-italic-serif text-foreground/25 text-3xl mb-10">—</p>
        <p className="font-mono-label text-foreground/18 text-[9px] uppercase tracking-[0.48em]">
          fim do arquivo · {allPhotos.length} entradas · {grouped.length} séries
        </p>
      </motion.div>

      <SiteFooter />

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[200] bg-black/96 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 48) { diff > 0 ? goNext() : goPrev(); }
              touchStartX.current = null;
            }}
          >
            <div className="flex items-center justify-between px-6 py-5 absolute top-0 inset-x-0">
              <span className="font-mono-label text-cream/30 text-[10px] tracking-[0.35em]">
                {String(lightboxIndex + 1).padStart(2, "0")} / {String(allPhotos.length).padStart(2, "0")}
              </span>
              <button
                onClick={closeLightbox}
                className="font-mono-label text-cream/50 hover:text-cream text-[10px] uppercase tracking-[0.32em] transition-colors"
              >
                Fechar ✕
              </button>
            </div>

            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 md:left-8 font-mono-label text-cream/30 hover:text-cream transition-colors text-[10px] uppercase tracking-[0.28em] px-3 py-6"
              >
                ← Anterior
              </button>
            )}
            {lightboxIndex < allPhotos.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 md:right-8 font-mono-label text-cream/30 hover:text-cream transition-colors text-[10px] uppercase tracking-[0.28em] px-3 py-6"
              >
                Seguinte →
              </button>
            )}

            <AnimatePresence mode="wait">
              <motion.figure
                key={lightbox.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-5xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="max-h-[75vh] w-auto mx-auto object-contain"
                />
                <figcaption className="text-center mt-7">
                  <p className="font-display text-cream text-2xl md:text-3xl">{lightbox.title}</p>
                  {lightbox.meta.description && (
                    <p className="font-italic-serif text-cream/40 mt-3 text-sm italic max-w-xl mx-auto leading-relaxed">
                      "{lightbox.meta.description}"
                    </p>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
