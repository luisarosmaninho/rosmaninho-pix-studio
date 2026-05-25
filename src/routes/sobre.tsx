import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import portrait from "@/assets/sunset-beach.jpg";
import detail from "@/assets/waterfall.jpg";
import room from "@/assets/village-alley.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Autora — Luísa Rosmaninho" },
      { name: "description", content: "Retrato breve de Luísa Rosmaninho — fotógrafa de paisagem, arquitetura vernacular e silêncio da luz. Coimbra, Portugal." },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <div className="bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* ============= BLOCO 1 — RETRATO MONUMENTAL ============= */}
      <section className="px-6 md:px-12 pt-32 md:pt-40 pb-24 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-7 flex flex-col justify-between">
          <p className="font-mono-label">[ NOTAS BIOGRÁFICAS // ED. 2026 ]</p>
          <h1 className="font-display uppercase text-7xl md:text-[11vw] leading-[0.85] tracking-[0.02em] mt-10">
            Luísa<br/>
            <span className="italic font-normal lowercase">rosmaninho</span>
          </h1>
          <p className="font-mono-label mt-10">
            [ COIMBRA — PT &nbsp;//&nbsp; ATIVA DESDE 2018 ]
          </p>
        </div>

        <div className="col-span-12 md:col-span-5 md:pt-12 fade-in">
          <figure className="relative w-full aspect-[3/4] overflow-hidden">
            <img src={portrait} alt="Luísa Rosmaninho" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "contrast(0.95) saturate(0.85)" }} />
            <figcaption className="absolute left-0 right-0 -bottom-7 flex justify-between font-mono-label">
              <span>[ AUTORRETRATO ]</span>
              <span>[ FILM_135 // 2025 ]</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="hairline mx-6 md:mx-12" />

      {/* ============= BLOCO 2 — MANIFESTO PESSOAL ============= */}
      <section className="px-6 md:px-12 py-32 md:py-48 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3">
          <p className="font-mono-label">[ N.001 — ORIGEM ]</p>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-5">
          <p className="font-display italic text-3xl md:text-4xl leading-[1.4]">
            Nasci no centro de Portugal e cresci entre a serra e o rio. A fotografia
            chegou cedo, como uma forma de prestar atenção — primeiro às coisas
            pequenas, depois à luz que as torna grandes.
          </p>
        </div>
      </section>

      {/* ============= BLOCO 3 — DUO ASSIMÉTRICO ============= */}
      <section className="px-6 md:px-12 pb-32 grid grid-cols-12 gap-8 md:gap-12">
        <figure className="col-span-12 md:col-span-5 md:col-start-2 fade-up">
          <div className="relative w-full aspect-[4/5] overflow-hidden">
            <img src={detail} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <figcaption className="mt-4 font-mono-label">[ DETALHE // ÁGUA // ANALOG_50MM ]</figcaption>
        </figure>
        <figure className="col-span-12 md:col-span-4 md:col-start-8 md:pt-32 fade-up">
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <img src={room} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <figcaption className="mt-4 font-mono-label">[ ALDEIA // INTERIOR // FILM_135 ]</figcaption>
        </figure>
      </section>

      <div className="hairline mx-6 md:mx-12" />

      {/* ============= BLOCO 4 — PROCESSO ============= */}
      <section className="px-6 md:px-12 py-32 md:py-48 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3">
          <p className="font-mono-label">[ N.002 — PROCESSO ]</p>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-5 space-y-8 body-text text-lg md:text-xl" style={{ lineHeight: 1.7 }}>
          <p>
            Trabalho sobretudo paisagem, arquitetura vernacular e o gesto quase imóvel
            da água. Procuro imagens onde o tempo pareça ter parado um instante antes
            de seguir.
          </p>
          <p>
            Fotografo devagar. Volto várias vezes ao mesmo lugar até reconhecer a
            luz certa. A película continua a ser o meu modo de medir paciência;
            o digital, a minha forma de ouvir o ruído.
          </p>
        </div>
      </section>

      <div className="hairline mx-6 md:mx-12" />

      {/* ============= BLOCO 5 — FICHA TÉCNICA ============= */}
      <section className="px-6 md:px-12 py-32">
        <p className="font-mono-label mb-16">[ FICHA TÉCNICA ]</p>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          <Spec label="Base" value="Coimbra · PT" />
          <Spec label="Ativa desde" value="2018" />
          <Spec label="Foco" value="Paisagem · Arquitetura" />
          <Spec label="Suporte" value="35mm + Digital" />
          <Spec label="Publicações" value="Umbigo · Gerador" />
          <Spec label="Exposições" value="Coimbra · Porto" />
          <Spec label="Encomendas" value="Editorial · Livro · Hotelaria" />
          <Spec label="Idiomas" value="PT · EN · FR" />
        </dl>
      </section>

      <div className="hairline mx-6 md:mx-12" />

      {/* ============= BLOCO 6 — CITAÇÃO / FECHO ============= */}
      <section className="px-6 md:px-12 py-32 md:py-48 max-w-3xl mx-auto text-center">
        <p className="font-mono-label mb-10">[ CODA ]</p>
        <p className="font-display italic text-3xl md:text-5xl leading-[1.3]">
          &ldquo;Fotografar é uma maneira lenta de habitar um lugar.&rdquo;
        </p>
        <Link
          to="/contacto"
          className="font-mono-label inline-block mt-16 hover:text-accent transition-colors"
        >
          [ ABRIR DIÁLOGO &rarr; ]
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono-label">[ {label} ]</dt>
      <dd className="mt-3 font-display text-xl md:text-2xl">{value}</dd>
    </div>
  );
}
