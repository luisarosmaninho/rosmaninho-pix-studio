import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rosmaninho — Fotografia por Luísa Rosmaninho" },
      { name: "description", content: "Portefólio de fotografia de Luísa Rosmaninho: paisagens, cidades e instantes de Portugal." },
    ],
  }),
  component: Index,
});

function Index() {
  const hero = photos[0];
  const featured = [photos[2], photos[4], photos[5], photos[1]];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <img src={hero.src} alt={hero.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 md:px-12 pb-16 text-white fade-up">
          <p className="font-mono-label mb-6 opacity-80">Portefólio · 2020 — 2026</p>
          <h1 className="font-display text-5xl md:text-8xl lg:text-9xl leading-[0.95] max-w-5xl">
            Instantes que ficam<br /><em className="text-accent not-italic">entre a luz</em> e o silêncio.
          </h1>
          <div className="mt-10 flex items-center gap-8">
            <Link to="/portfolio" className="font-mono-label border-b border-white pb-1 hover:text-accent hover:border-accent transition-colors">
              Ver portefólio →
            </Link>
            <span className="font-mono-label opacity-70">Luísa Rosmaninho</span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 md:px-12 py-24 md:py-32 max-w-6xl">
        <p className="font-mono-label text-muted-foreground mb-8">— Sobre o trabalho</p>
        <p className="font-display text-3xl md:text-5xl leading-tight">
          Fotografo lugares como quem escuta. Procuro a luz que cai devagar sobre as
          coisas vulgares — pedra, água, telhado — e devolvo-a em imagens onde Portugal
          se reconhece em silêncio.
        </p>
      </section>

      {/* Featured grid */}
      <section className="px-6 md:px-12 pb-24">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-display text-4xl md:text-5xl">Selecção</h2>
          <Link to="/portfolio" className="font-mono-label hover:text-accent">Tudo →</Link>
        </div>
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <FeaturedItem photo={featured[0]} className="col-span-12 md:col-span-8 aspect-[4/3]" />
          <FeaturedItem photo={featured[1]} className="col-span-12 md:col-span-4 aspect-[3/4]" />
          <FeaturedItem photo={featured[2]} className="col-span-12 md:col-span-5 aspect-[4/3]" />
          <FeaturedItem photo={featured[3]} className="col-span-12 md:col-span-7 aspect-[5/4]" />
        </div>
      </section>

      {/* Diário teaser */}
      <section className="px-6 md:px-12 py-32 border-t border-border">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <p className="font-mono-label text-muted-foreground">— Diário</p>
            <h2 className="font-display text-4xl md:text-6xl mt-4 leading-tight">
              Notas sobre <em className="text-accent not-italic">o que vejo</em>.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Pequenos textos sobre uma fotografia, um lugar, uma luz. Um caderno
              em aberto que vai crescendo devagar.
            </p>
            <Link to="/diario" className="font-mono-label inline-block mt-8 border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors">
              Abrir o diário →
            </Link>
          </div>
          <div className="md:col-span-7">
            <blockquote>
              <p className="font-display text-2xl md:text-3xl italic leading-snug">
                “A fotografia é a memória do que ainda não soubemos nomear.”
              </p>
              <footer className="font-mono-label text-muted-foreground mt-8">— L.R.</footer>
            </blockquote>
          </div>
        </div>
      </section>



      <SiteFooter />
    </div>
  );
}

function FeaturedItem({ photo, className }: { photo: typeof photos[number]; className: string }) {
  return (
    <figure className={`group relative overflow-hidden ${className}`}>
      <img
        src={photo.src}
        alt={photo.title}
        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
      />
      <figcaption className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="font-mono-label">{photo.category} · {photo.year}</p>
        <p className="font-display text-2xl mt-1">{photo.title}</p>
        <p className="text-sm opacity-80">{photo.location}</p>
      </figcaption>
    </figure>
  );
}
