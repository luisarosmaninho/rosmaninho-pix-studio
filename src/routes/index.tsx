import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { photos, categories } from "@/lib/photos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rosmaninho — Arquivo Visual" },
      { name: "description", content: "Arquivo visual de Luísa Rosmaninho. Fotografia analógica e digital — Porto, Coimbra, Aveiro." },
    ],
  }),
  component: Index,
});

function Index() {
  const heroPhoto = photos[0];
  const visorPhoto = photos[4]; // bloco 4
  const series = [
    { num: "I", title: "Fragmentos Urbanos", cover: photos[0] },
    { num: "II", title: "Luz Silenciosa", cover: photos[1] },
    { num: "III", title: "Entre Espaços", cover: photos[3] },
    { num: "IV", title: "Margens", cover: photos[2] },
    { num: "V", title: "Presença", cover: photos[5] },
  ];

  return (
    <div className="bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* ============= BLOCO 1 — HERO ASSIMÉTRICO ============= */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="grid grid-cols-12 min-h-screen">
          {/* Esquerda — texto monumental */}
          <div className="col-span-12 md:col-span-7 flex flex-col justify-between px-6 md:px-12 pt-28 pb-12 fade-up">
            <p className="font-mono-label">[ ARQUIVO VISUAL // ED. 2026 ]</p>
            <h1 className="font-display uppercase leading-[0.85] tracking-[0.02em] text-[18vw] md:text-[14vw] lg:text-[11vw]">
              Rosmaninho
            </h1>
            <p className="font-mono-label">
              [ LUÍSA ROSMANINHO &mdash; FOTOGRAFIA &mdash; COIMBRA, PT ]
            </p>
          </div>

          {/* Direita — moldura vertical desalinhada */}
          <div className="col-span-12 md:col-span-5 relative md:pt-32 md:pb-8 px-6 md:pr-12 md:pl-0 fade-in">
            <figure className="relative w-full aspect-[2/3] overflow-hidden">
              <img
                src={heroPhoto.src}
                alt={heroPhoto.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <figcaption className="absolute left-0 right-0 -bottom-7 flex justify-between font-mono-label">
                <span>[ 41.1579° N, 8.6291° W ]</span>
                <span>[ PORTO // CHUVA DE OUTONO ]</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ============= BLOCO 2 — MANIFESTO ============= */}
      <section className="px-6 md:px-12 py-40 md:py-56 flex flex-col items-center">
        <p className="font-mono-label mb-16">[ MANIFESTO &mdash; N.001 ]</p>
        <p
          className="max-w-xl text-center md:text-justify font-display text-2xl md:text-3xl italic leading-[1.5] text-foreground"
          style={{ textAlignLast: "center" }}
        >
          “Observar o quotidiano devagar. Documentar o silêncio da luz que toca o
          betão, a geometria oculta na névoa do Porto, a nostalgia intemporal das
          ruas de Coimbra e a volatilidade dos reflexos na água de Aveiro. Este
          espaço não é um portefólio comercial; é um arquivo de presença, uma
          pausa visual onde a fotografia respira através da película e do espaço
          vazio.”
        </p>
        <div className="mt-20 w-full max-w-5xl mx-auto hairline" />
      </section>

      {/* ============= BLOCO 3 — SÉRIES VISUAIS ============= */}
      <section className="px-6 md:px-12 py-32 max-w-6xl mx-auto w-full">
        <div className="flex items-end justify-between mb-20">
          <p className="font-mono-label">[ ÍNDICE DE SÉRIES ]</p>
          <Link to="/portfolio" className="font-mono-label hover:text-accent transition-colors">
            Ver arquivo &rarr;
          </Link>
        </div>

        <ul>
          {series.map((s, i) => (
            <li key={s.num} className={i === 0 ? "" : "border-t border-border"}>
              <SeriesRow num={s.num} title={s.title} cover={s.cover.src} />
            </li>
          ))}
        </ul>
      </section>

      {/* ============= BLOCO 4 — VISOR EDITORIAL ============= */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={visorPhoto.src}
          alt={visorPhoto.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "translateZ(0)" }}
        />
        {/* Hairline viewfinders */}
        <span className="absolute top-6 left-6 w-8 h-8 border-l border-t border-background" />
        <span className="absolute top-6 right-6 w-8 h-8 border-r border-t border-background" />
        <span className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-background" />
        <span className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-background" />

        <p className="absolute bottom-10 left-10 font-mono-label text-background">
          [ VISOR_S02 // ARQUIVO_TÁTIL ]
        </p>
      </section>

      {/* Pequena ponte ao journal — discreta */}
      <section className="px-6 md:px-12 py-32 max-w-3xl mx-auto text-center">
        <p className="font-mono-label mb-6">[ JOURNAL EDITORIAL ]</p>
        <h2 className="font-display text-4xl md:text-5xl italic leading-tight">
          Pequenos textos sobre uma imagem, um lugar, uma luz.
        </h2>
        <Link
          to="/diario"
          className="font-mono-label inline-block mt-12 hover:text-accent transition-colors"
        >
          Abrir journal &rarr;
        </Link>
      </section>

      <SiteFooter />

      {/* hidden semantic list of categories for SEO */}
      <ul className="sr-only">
        {categories.map((c) => <li key={c.slug}>{c.title}</li>)}
      </ul>
    </div>
  );
}

function SeriesRow({ num, title, cover }: { num: string; title: string; cover: string }) {
  return (
    <Link
      to="/portfolio"
      className="group relative flex items-center py-8 md:py-10 transition-colors"
    >
      <span className="font-mono-label w-24 md:w-32 shrink-0 group-hover:text-accent transition-colors">
        [ SÉRIE {num} ]
      </span>
      <span className="font-display text-3xl md:text-5xl uppercase tracking-wide group-hover:text-accent transition-colors">
        {title}
      </span>
      <span className="ml-auto font-mono-label opacity-0 group-hover:opacity-100 transition-opacity">
        Entrar &rarr;
      </span>

      {/* miniatura flutuante */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-44 top-1/2 -translate-y-1/2 w-28 h-36 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 overflow-hidden hidden md:block"
        style={{ boxShadow: "0 20px 60px -20px rgba(17,17,18,0.4)" }}
      >
        <img src={cover} alt="" className="w-full h-full object-cover" style={{ filter: "contrast(0.95) saturate(0.85)" }} />
      </span>
    </Link>
  );
}
