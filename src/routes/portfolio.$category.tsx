import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { categories, getCategory, photosByCategory, type CategorySlug, type Photo } from "@/lib/photos";

export const Route = createFileRoute("/portfolio/$category")({
  parseParams: (params) => ({ category: params.category as CategorySlug }),
  beforeLoad: ({ params }) => {
    if (!getCategory(params.category)) throw notFound();
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

function CategoryPage() {
  const { category } = Route.useParams();
  const cat = getCategory(category)!;
  const pics = photosByCategory(category);
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const otherCats = categories.filter((c) => c.slug !== category);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      <section className="px-6 md:px-12 pt-32 md:pt-40 pb-16 max-w-5xl">
        <Link to="/portfolio" className="font-mono-label text-muted-foreground hover:text-accent">
          ← Portefólio
        </Link>
        <p className="font-mono-label text-muted-foreground mt-8">Colecção</p>
        <h1 className="font-display text-6xl md:text-8xl mt-3 leading-[0.95]">{cat.title}</h1>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">{cat.description}</p>
      </section>

      <section className="px-6 md:px-12 pb-24 columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
        {pics.map((p) => (
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

      <section className="px-6 md:px-12 pb-24 border-t border-border pt-16">
        <p className="font-mono-label text-muted-foreground mb-8">Continuar a ver</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherCats.map((c) => {
            const cover = photosByCategory(c.slug)[0];
            return (
              <Link
                key={c.slug}
                to="/portfolio/$category"
                params={{ category: c.slug }}
                className="group block relative aspect-[4/3] overflow-hidden"
              >
                {cover && <img src={cover.src} alt={c.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="relative h-full flex items-end p-6 text-white">
                  <h3 className="font-display text-3xl">{c.title}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 cursor-zoom-out fade-up">
          <button className="absolute top-6 right-6 text-white font-mono-label">Fechar ✕</button>
          <figure className="max-w-6xl max-h-full">
            <img src={lightbox.src} alt={lightbox.title} className="max-h-[85vh] w-auto mx-auto object-contain" />
            <figcaption className="text-white text-center mt-6">
              <p className="font-display text-2xl">{lightbox.title}</p>
              <p className="font-mono-label opacity-70 mt-1">{lightbox.location} · {lightbox.year}</p>
            </figcaption>
          </figure>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
