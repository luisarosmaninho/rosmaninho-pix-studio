import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { photos, type Photo } from "@/lib/photos";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portefólio — Rosmaninho Fotografia" },
      { name: "description", content: "Colecção completa de fotografias de Luísa Rosmaninho." },
    ],
  }),
  component: Portfolio,
});

const categories = ["Tudo", "Urbano", "Paisagem", "Água", "Arquitetura"] as const;

function Portfolio() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("Tudo");
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const visible = filter === "Tudo" ? photos : photos.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="px-6 md:px-12 pt-32 md:pt-40 pb-12">
        <p className="font-mono-label text-muted-foreground">Arquivo · {photos.length} obras</p>
        <h1 className="font-display text-6xl md:text-8xl mt-4">Portefólio</h1>
      </section>

      <div className="px-6 md:px-12 flex flex-wrap gap-6 border-b border-border pb-6 mb-12">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`font-mono-label transition-colors ${
              filter === c ? "text-accent" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <section className="px-6 md:px-12 pb-24 columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
        {visible.map((p) => (
          <figure
            key={p.src}
            onClick={() => setLightbox(p)}
            className="group break-inside-avoid cursor-pointer relative overflow-hidden"
          >
            <img src={p.src} alt={p.title} className="w-full h-auto block transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
            <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="font-display text-xl">{p.title}</p>
              <p className="font-mono-label opacity-80">{p.location} · {p.year}</p>
            </figcaption>
          </figure>
        ))}
      </section>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 cursor-zoom-out fade-up"
        >
          <button className="absolute top-6 right-6 text-white font-mono-label">Fechar ✕</button>
          <figure className="max-w-6xl max-h-full">
            <img src={lightbox.src} alt={lightbox.title} className="max-h-[85vh] w-auto mx-auto object-contain" />
            <figcaption className="text-white text-center mt-6">
              <p className="font-display text-2xl">{lightbox.title}</p>
              <p className="font-mono-label opacity-70 mt-1">{lightbox.location} · {lightbox.year} · {lightbox.category}</p>
            </figcaption>
          </figure>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
