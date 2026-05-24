import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Arquivo — Rosmaninho" },
      { name: "description", content: "Arquivo visual: fotografias de Luísa Rosmaninho em fluxo editorial assimétrico." },
    ],
  }),
  component: Portfolio,
});

// Lê metadados a partir do índice do arquivo
function refCode(i: number) {
  return `REF_${String((i + 1) * 9).padStart(3, "0")}`;
}

function locationTag(loc: string) {
  return loc.toUpperCase().split(",")[0];
}

// Define o layout assimétrico para cada foto (alterna full, vertical, pequena)
type Slot = { width: string; align: "left" | "right" | "center"; aspect: string };
const layout: Slot[] = [
  { width: "w-full",                align: "center", aspect: "aspect-[16/9]" },
  { width: "w-full md:w-[42%]",     align: "left",   aspect: "aspect-[3/4]" },
  { width: "w-full md:w-[55%]",     align: "right",  aspect: "aspect-[4/3]" },
  { width: "w-full md:w-[70%]",     align: "center", aspect: "aspect-[16/10]" },
  { width: "w-full md:w-[38%]",     align: "right",  aspect: "aspect-[3/4]" },
  { width: "w-full md:w-[48%]",     align: "left",   aspect: "aspect-[5/4]" },
  { width: "w-full",                align: "center", aspect: "aspect-[21/9]" },
  { width: "w-full md:w-[45%]",     align: "right",  aspect: "aspect-[4/5]" },
  { width: "w-full md:w-[58%]",     align: "left",   aspect: "aspect-[4/3]" },
  { width: "w-full md:w-[50%]",     align: "center", aspect: "aspect-[5/4]" },
];

const tags = ["TEXTURA URBANA", "LUZ SILENCIOSA", "MARGENS", "ARQUITETURA", "REFLEXOS", "PRESENÇA", "VAZIO", "PELÍCULA", "GEOMETRIA", "NÉVOA"];
const formats = ["ANALOG_50MM", "DIGITAL_35MM", "ANALOG_28MM", "FILM_135", "DIGITAL_85MM"];

function Portfolio() {
  return (
    <div className="bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* Header */}
      <section className="px-6 md:px-12 pt-32 md:pt-40 pb-20 max-w-6xl">
        <p className="font-mono-label">[ ARQUIVO VISUAL // 2020 — 2026 ]</p>
        <h1 className="font-display uppercase text-6xl md:text-9xl leading-[0.9] mt-6 tracking-wide">
          Arquivo
        </h1>
        <p className="mt-10 max-w-xl text-foreground body-text">
          Um fluxo irregular de imagens, sem grelha. Cada fotografia ocupa o espaço
          que pede. Deixa o olhar respirar entre os silêncios.
        </p>
      </section>

      <div className="hairline mx-6 md:mx-12 mb-20" />

      {/* Fluxo editorial assimétrico */}
      <section className="px-6 md:px-12 pb-32 flex flex-col gap-[120px] md:gap-[180px]">
        {photos.map((photo, i) => {
          const slot = layout[i % layout.length];
          const justify =
            slot.align === "left" ? "justify-start"
            : slot.align === "right" ? "justify-end"
            : "justify-center";

          return (
            <div key={i} className={`flex ${justify}`}>
              <figure className={`${slot.width} fade-up`}>
                <div className={`relative overflow-hidden ${slot.aspect}`}>
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-5 font-mono-label">
                  [ {refCode(i)} // {locationTag(photo.location)} // {tags[i % tags.length]} // {formats[i % formats.length]} ]
                </figcaption>
              </figure>
            </div>
          );
        })}
      </section>

      <SiteFooter />
    </div>
  );
}
