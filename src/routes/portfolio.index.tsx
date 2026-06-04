import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { photos, categories, getCategory, type CategorySlug, type Photo } from "@/lib/photos";
import { getPhotoConfig } from "@/lib/photo-config-fns";

export const Route = createFileRoute("/portfolio/")({
  loader: async () => {
    const config = await getPhotoConfig();
    return { config };
  },
  head: () => ({
    meta: [
      { title: "Portfólio — Rosmaninho Fotografia" },
      { name: "description", content: "Arquivo fotográfico: urbanas, natureza, retratos e iguarias." },
      { property: "og:title", content: "Portfólio — Rosmaninho" },
      { property: "og:description", content: "Urbanas, natureza, retratos e iguarias." },
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

function PortfolioPage() {
  const { config } = Route.useLoaderData();
  const allPhotos = applyConfig(photos, config);

  const [filter, setFilter] = useState<CategorySlug | "all">("all");
  const [hovered, setHovered] = useState<Photo | null>(null);
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const visible = filter === "all" ? allPhotos : allPhotos.filter((p) => p.category === filter);

  /* Group photos by category for the "all" view */
  const grouped =
    filter === "all"
      ? categories.map((c) => ({
          cat: c,
          items: visible.filter((p) => p.category === c.slug),
        })).filter((g) => g.items.length > 0)
      : [{ cat: getCategory(filter)!, items: visible }];

  /* Lightbox keyboard nav */
  const lightboxIndex = lightbox ? visible.indexOf(lightbox) : -1;
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const goPrev = useCallback(() => {
    if (lightboxIndex > 0) setLightbox(visible[lightboxIndex - 1]);
  }, [lightboxIndex, visible]);
  const goNext = useCallback(() => {
    if (lightboxIndex < visible.length - 1) setLightbox(visible[lightboxIndex + 1]);
  }, [lightboxIndex, visible]);

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

  /* Global photo counter for index numbering */
  let globalIdx = 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* ── Page header ── */}
      <header className="px-6 md:px-16 pt-36 pb-16 md:pt-48 md:pb-20 border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <p className="font-italic-serif text-copper text-3xl md:text-4xl mb-3">índice</p>
            <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.9]">Portfólio.</h1>
          </div>
          <p className="font-mono-label text-foreground/35 text-[11px] uppercase tracking-[0.35em] max-w-xs leading-loose">
            {allPhotos.length} fotografias<br />
            {categories.length} séries<br />
            Luísa Rosmaninho
          </p>
        </div>
      </header>

      {/* ── Filter strip ── */}
      <div className="px-6 md:px-16 py-6 border-b border-border sticky top-0 bg-background z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-8 gap-y-3">
          <button
            onClick={() => setFilter("all")}
            className={`font-mono-label text-[10px] uppercase tracking-[0.35em] transition-colors ${filter === "all" ? "text-foreground" : "text-foreground/30 hover:text-foreground/70"}`}
          >
            Tudo ({allPhotos.length})
          </button>
          {categories.map((c) => {
            const count = allPhotos.filter((p) => p.category === c.slug).length;
            return (
              <button
                key={c.slug}
                onClick={() => setFilter(c.slug)}
                className={`font-mono-label text-[10px] uppercase tracking-[0.35em] transition-colors ${filter === c.slug ? "text-foreground" : "text-foreground/30 hover:text-foreground/70"}`}
              >
                {c.title} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main: index list + sticky photo panel ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex gap-0 md:gap-16 relative">

        {/* Index list — scrollable */}
        <div className="flex-1 py-12 min-w-0">
          {grouped.map(({ cat, items }) => (
            <div key={cat.slug} className="mb-14">
              {/* Series header — links to series page */}
              <div className="flex items-baseline justify-between mb-6 border-b border-border pb-4">
                <Link
                  to="/portfolio/$category"
                  params={{ category: cat.slug }}
                  className="font-display text-2xl md:text-3xl hover:text-copper transition-colors"
                >
                  {cat.title}
                </Link>
                <span className="font-mono-label text-foreground/30 text-[10px] uppercase tracking-[0.35em]">
                  {items.length} fotografias →
                </span>
              </div>

              {/* Photo title rows */}
              <ul>
                {items.map((photo) => {
                  const num = ++globalIdx;
                  return (
                    <li key={photo.id}>
                      <button
                        className="w-full text-left group flex items-baseline gap-5 py-3 border-b border-border/40 hover:border-foreground/20 transition-all"
                        onMouseEnter={() => setHovered(photo)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => setLightbox(photo)}
                      >
                        <span className="font-mono-label text-foreground/20 text-[10px] w-6 shrink-0 group-hover:text-foreground/40 transition-colors">
                          {String(num).padStart(2, "0")}
                        </span>
                        <span className="font-display text-lg md:text-xl leading-tight group-hover:translate-x-1 transition-transform duration-300">
                          {photo.title}
                        </span>
                        <span className="font-italic-serif text-foreground/25 text-sm italic ml-auto hidden md:block truncate max-w-xs group-hover:text-foreground/50 transition-colors">
                          {photo.meta.description}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Sticky photo panel — desktop only */}
        <aside className="hidden md:block w-[38%] shrink-0">
          <div className="sticky top-[calc(var(--nav-h,4rem)+4rem)] pt-12 pb-12">
            <AnimatePresence mode="wait">
              {hovered ? (
                <motion.div
                  key={hovered.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="cursor-zoom-in"
                  onClick={() => setLightbox(hovered)}
                >
                  <img
                    src={hovered.src}
                    alt={hovered.title}
                    className="w-full object-cover max-h-[60vh]"
                    style={{ objectPosition: "center" }}
                  />
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-xl leading-tight">{hovered.title}</p>
                      <p className="font-italic-serif text-foreground/40 text-sm italic mt-2 leading-relaxed">
                        {hovered.meta.description}
                      </p>
                    </div>
                    <span className="font-mono-label text-foreground/20 text-[10px] uppercase tracking-[0.35em] shrink-0 pt-1">
                      {hovered.category}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-center h-64 border border-dashed border-foreground/10"
                >
                  <p className="font-mono-label text-foreground/15 text-[10px] uppercase tracking-[0.4em]">
                    passe o cursor
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>
      </div>

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
                {String(lightboxIndex + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
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
            {lightboxIndex < visible.length - 1 && (
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
                  <p className="font-italic-serif text-cream/40 mt-3 text-sm italic max-w-xl mx-auto leading-relaxed">
                    "{lightbox.meta.description}"
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
