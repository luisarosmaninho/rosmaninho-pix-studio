import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { photos, categories, type CategorySlug, type Photo } from "@/lib/photos";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfólio — Rosmaninho Fotografia" },
      { name: "description", content: "Arquivo fotográfico: casamentos, retratos, lifestyle e branding." },
      { property: "og:title", content: "Portfólio — Rosmaninho" },
      { property: "og:description", content: "Casamentos, retratos, lifestyle e branding." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [filter, setFilter] = useState<CategorySlug | "all">("all");
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const visible = filter === "all" ? photos : photos.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      <section className="px-6 md:px-12 pt-32 md:pt-44 pb-12 max-w-7xl mx-auto">
        <p className="font-script text-3xl md:text-4xl text-gold mb-4">arquivo</p>
        <h1 className="font-display text-5xl md:text-7xl leading-tight">Portfólio.</h1>
        <p className="mt-6 max-w-2xl text-foreground/70">
          Uma selecção de momentos — casamentos, retratos, lifestyle e branding — em que o tempo decidiu ficar.
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

      <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
        {visible.map((p, i) => (
          <motion.figure
            key={p.src}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: (i % 6) * 0.08, ease: "easeOut" }}
            onClick={() => setLightbox(p)}
            className="group break-inside-avoid cursor-pointer relative hover-zoom"
          >
            <img src={p.src} alt={p.title} className="w-full h-auto block" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-cream bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="font-display text-2xl">{p.title}</p>
              <p className="font-mono-label text-cream/70 mt-1">{p.location} · {p.year}</p>
            </figcaption>
          </motion.figure>
        ))}
      </section>

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out">
          <button className="absolute top-6 right-6 text-cream text-xs uppercase tracking-[0.28em]">Fechar ✕</button>
          <figure className="max-w-6xl max-h-full">
            <img src={lightbox.src} alt={lightbox.title} className="max-h-[85vh] w-auto mx-auto object-contain" />
            <figcaption className="text-cream text-center mt-6">
              <p className="font-display text-3xl">{lightbox.title}</p>
              <p className="font-mono-label text-cream/60 mt-2">{lightbox.location} · {lightbox.year}</p>
            </figcaption>
          </figure>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
