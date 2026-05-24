import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import portrait from "@/assets/sunset-beach.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Luísa Rosmaninho" },
      { name: "description", content: "Sobre Luísa Rosmaninho, fotógrafa portuguesa de paisagens e arquitetura." },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="px-6 md:px-12 pt-32 md:pt-40 pb-24 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <img src={portrait} alt="Luísa Rosmaninho" className="w-full h-[70vh] object-cover" />
        </div>
        <div className="md:col-span-7 md:pl-12">
          <p className="font-mono-label text-muted-foreground">— Sobre</p>
          <h1 className="font-display text-5xl md:text-7xl mt-4 leading-none">Luísa<br />Rosmaninho</h1>
          <div className="mt-12 space-y-6 text-lg leading-relaxed max-w-xl">
            <p>
              Nasci no centro de Portugal e cresci entre a serra e o rio. A fotografia
              chegou cedo, como uma forma de prestar atenção — primeiro às coisas
              pequenas, depois à luz que as torna grandes.
            </p>
            <p>
              Trabalho sobretudo paisagem, arquitetura vernacular e o gesto quase
              imóvel da água. Procuro imagens onde o tempo pareça ter parado um
              instante antes de seguir.
            </p>
            <p>
              Vivo e trabalho em Coimbra. Aceito encomendas para editorial, livros,
              hotelaria e projetos pessoais.
            </p>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-x-12 gap-y-8 font-mono-label">
            <div><dt className="text-muted-foreground">Base</dt><dd className="mt-1 text-foreground normal-case tracking-normal font-sans text-base">Coimbra, Portugal</dd></div>
            <div><dt className="text-muted-foreground">Desde</dt><dd className="mt-1 text-foreground normal-case tracking-normal font-sans text-base">2018</dd></div>
            <div><dt className="text-muted-foreground">Foco</dt><dd className="mt-1 text-foreground normal-case tracking-normal font-sans text-base">Paisagem · Arquitetura</dd></div>
            <div><dt className="text-muted-foreground">Equipamento</dt><dd className="mt-1 text-foreground normal-case tracking-normal font-sans text-base">Digital + 35mm</dd></div>
          </dl>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
