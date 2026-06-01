import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { photos, categories, type CategorySlug, type Photo } from "@/lib/photos";
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
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const visible = filter === "all" ? allPhotos : allPhotos.filter((p) => p.category === filter);
  const lightboxIndex = lightbox ? visible.indexOf(lightbox) : -1;

  const sectionRef = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [active, setActive] = useState(false);
  const radius = 260;

  function updatePos(clientX: number, clientY: number) {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setPos({ x: clientX - rect.left, y: clientY - rect.top });
  }

  const mask = active
    ? `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, transparent 0%, transparent 32%, rgba(0,0,0,0.60) 65%, rgba(0,0,0,0.97) 100%)`
    : "rgba(0,0,0,0.97)";

  const touchStartX = useRef<number | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const goPrev = useCallback(() => {
    if (lightboxIndex > 0) setLightbox(visible[lightboxIndex - 1]);
  }, [lightboxIndex, visible]);

  const goNext = useCallback(() => {
    if (lightboxIndex < visible.length - 1) setLightbox(visible[lightboxIndex + 1]);
  }, [lightboxIndex, visible]);

  useEffect(() => {
    if (!lightbox) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, goPrev, goNext]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* ── Header + filters ── */}
      <section className="px-6 md:px-12 pt-32 md:pt-44 pb-12 max-w-7xl mx-auto">
        <p className="font-italic-serif text-3xl md:text-4xl text-copper mb-4">arquivo</p>
        <h1 className="font-display text-5xl md:text-7xl leading-tight">Portfólio.</h1>
        <p className="mt-6 max-w-2xl text-foreground/70">
          Uma selecção de momentos — urbanas, natureza, retratos e iguarias — em que o tempo decidiu ficar.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`text-[11px] uppercase tracking-[0.28em] border px-4 py-2 transition-colors ${filter === "all" ? "bg-foreground text-background border-foreground" : "border-foreground/20 hover:border-foreground"}`}
          >
            Tudo
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setFilter(c.slug)}
              className={`text-[11px] uppercase tracking-[0.28em] border px-4 py-2 transition-colors ${filter === c.slug ? "bg-foreground text-background border-foreground" : "border-foreground/20 hover:border-foreground"}`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </section>

      {/* ── Sala de revelação ── */}
      <section
        ref={sectionRef}
        className="relative bg-[#0e0e0d]"
        onMouseMove={(e) => updatePos(e.clientX, e.clientY)}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => { setActive(false); setPos({ x: -999, y: -999 }); }}
        onTouchMove={(e) => { const t = e.touches[0]; updatePos(t.clientX, t.clientY); setActive(true); }}
        onTouchEnd={() => setActive(false)}
      >
        {/* Hint — desaparece ao activar */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 transition-opacity duration-700"
          style={{ opacity: active ? 0 : 1 }}
        >
          <p className="font-mono-label text-white/20 text-[10px] uppercase tracking-[0.5em] text-center px-6">
            move o cursor para revelar · clica para ver
          </p>
        </div>

        {/* Grelha de fotos */}
        <div className="px-6 md:px-12 pt-10 pb-24 max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
          {visible.map((p, i) => (
            <motion.figure
              key={p.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
              onClick={() => setLightbox(p)}
              className="break-inside-avoid cursor-pointer group relative"
            >
              <img
                src={p.src}
                alt={p.title}
                loading={i < 6 ? "eager" : "lazy"}
                className="w-full h-auto block"
              />
              <figcaption className="pt-3 pb-1">
                <p className="font-display text-cream/80 text-lg leading-tight">{p.title}</p>
                <p className="font-italic-serif text-cream/35 text-sm italic mt-1 leading-relaxed">
                  {p.meta.description}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Overlay escura com tocha — pointer-events: none para cliques passarem */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-[background] duration-[55ms]"
          style={{ background: mask }}
        />
      </section>

      <SiteFooter />

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 48) { diff > 0 ? goNext() : goPrev(); }
            touchStartX.current = null;
          }}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 font-mono-label text-cream/50 hover:text-cream text-[10px] uppercase tracking-[0.32em] transition-colors z-10"
          >
            ESC · Fechar
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-8 font-mono-label text-cream/40 hover:text-cream transition-colors text-[10px] uppercase tracking-[0.28em] z-10 px-3 py-6"
            >
              ← Anterior
            </button>
          )}
          {lightboxIndex < visible.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-8 font-mono-label text-cream/40 hover:text-cream transition-colors text-[10px] uppercase tracking-[0.28em] z-10 px-3 py-6"
            >
              Seguinte →
            </button>
          )}

          <figure className="max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.title}
              className="max-h-[78vh] w-auto mx-auto object-contain"
            />
            <figcaption className="text-center mt-7">
              <p className="font-display text-cream text-3xl">{lightbox.title}</p>
              {lightbox.meta?.description && (
                <p className="font-italic-serif text-cream/45 mt-3 text-sm italic max-w-xl mx-auto leading-relaxed">
                  "{lightbox.meta.description}"
                </p>
              )}
            </figcaption>
          </figure>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono-label text-cream/25 text-[10px] tracking-[0.28em]">
            {lightboxIndex + 1} / {visible.length}
          </p>
        </div>
      )}
    </div>
  );
}
