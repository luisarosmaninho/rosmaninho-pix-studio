import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { categories, photosByCategory } from "@/lib/photos";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portefólio — Rosmaninho Fotografia" },
      { name: "description", content: "Quatro colecções de fotografias de Luísa Rosmaninho: Luz que cai, Água viva, Pedra antiga e Horizontes." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      <section className="px-6 md:px-12 pt-32 md:pt-40 pb-16">
        <p className="font-mono-label text-muted-foreground">Quatro colecções</p>
        <h1 className="font-display text-6xl md:text-8xl mt-4 leading-[0.95]">
          Portefólio<span className="text-accent">.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          O trabalho organiza-se como quem arruma fotografias numa caixa de
          madeira — por matéria, por afecto, por luz. Escolhe uma porta.
        </p>
      </section>

      <section className="px-6 md:px-12 pb-24 grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, i) => {
          const pics = photosByCategory(cat.slug);
          const cover = pics[0];
          return (
            <Link
              key={cat.slug}
              to="/portfolio/$category"
              params={{ category: cat.slug }}
              className="group block relative overflow-hidden aspect-[4/5]"
            >
              {cover && (
                <img
                  src={cover.src}
                  alt={cover.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
              <div className="relative h-full flex flex-col justify-between p-8 md:p-10 text-white">
                <p className="font-mono-label opacity-80">0{i + 1} · {pics.length} obras</p>
                <div>
                  <p className="font-mono-label opacity-80 mb-3">{cat.subtitle}</p>
                  <h2 className="font-display text-4xl md:text-6xl leading-none">{cat.title}</h2>
                  <p className="mt-4 max-w-md text-sm opacity-90 leading-relaxed">{cat.description}</p>
                  <span className="font-mono-label inline-block mt-6 border-b border-white pb-1 group-hover:text-accent group-hover:border-accent transition-colors">
                    Entrar →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      <SiteFooter />
    </div>
  );
}
