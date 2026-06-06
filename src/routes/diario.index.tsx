import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { getJournal } from "@/lib/content-fns";

const aberturasPool = [
  "às vezes escrevo antes de saber o que quero dizer.",
  "o caderno não tem ordem — assim como os dias.",
  "algumas notas ficam. outras desaparecem como a espuma do matcha.",
  "escrevo devagar. leio mais devagar ainda.",
  "nem todas as entradas têm fotografia. nem todas as fotografias têm entrada.",
  "começo sempre com uma chávena. raramente termino antes de ela arrefecer.",
  "há dias em que o silêncio é a única coisa que vale a pena guardar.",
  "um pensamento que não cabe numa fotografia acaba aqui.",
  "o caderno tem manchas de café. assim deve ser.",
  "não sei se escrevo para mim ou para quem um dia vier aqui.",
  "às vezes a entrada mais curta é a que diz mais.",
  "guardo o que não fotografei também — às vezes é o que fica mais.",
  "o tempo demora mais quando se escreve devagar.",
  "alguns dias não têm título. ficam assim.",
];

const rasurasPorSlug: Record<string, string[]> = {
  "o-cafe-antes-de-tudo": [
    "o ritual antes da fotografia",
    "esperar antes de começar",
  ],
  "figura-no-mondego": [
    "havia alguém no rio essa manhã",
    "não estava à espera de encontrar ninguém",
  ],
  "telhados-com-nevoa": [
    "acordei e a cidade tinha mudado",
    "a névoa chegou durante a noite",
  ],
  "matcha-da-manha": [
    "havia um verde que não esperava",
    "a cor dentro da chávena",
  ],
  "retrato-na-esplanada": [
    "a luz mudou e eu peguei na câmara",
    "ela não reparou",
  ],
  "ribeiro-e-musgo": [
    "encontrei água onde não esperava",
    "o bosque que não estava no mapa",
  ],
  "barco-no-douro": [
    "o porto em janeiro tem frio de pedra",
    "fui antes dos turistas",
  ],
};

function rasuraParaEntrada(slug: string, seed: number): string {
  const pool = rasurasPorSlug[slug] ?? ["uma tentativa que não ficou"];
  return pool[seed % pool.length];
}

function Rasura({ texto }: { texto: string }) {
  return (
    <span
      className="block font-italic-serif text-[0.8rem] leading-snug mb-1.5 select-none pointer-events-none"
      style={{
        textDecoration: "line-through",
        textDecorationColor: "rgba(255,255,255,0.18)",
        textDecorationThickness: "1px",
        opacity: 0.18,
        letterSpacing: "0.01em",
        fontStyle: "italic",
      }}
      aria-hidden="true"
    >
      {texto}
    </span>
  );
}

function AberturaDoDia() {
  const [frase, setFrase] = useState(aberturasPool[0]);
  useEffect(() => {
    setFrase(aberturasPool[Math.floor(Math.random() * aberturasPool.length)]);
  }, []);
  return (
    <p className="font-italic-serif text-foreground/25 text-sm mt-8 italic">
      {frase}
    </p>
  );
}

export const Route = createFileRoute("/diario/")({
  head: () => ({
    meta: [
      { title: "Caderno de Matcha — Rosmaninho Fotografia" },
      { name: "description", content: "Escrevo aqui quando há uma pausa longa o suficiente — com uma chávena à frente. Notas sobre fotografias que fiz e sobre o que estava a sentir quando as fiz." },
    ],
    links: [{ rel: "canonical", href: "https://rosmaninhofotografia.pt/diario" }],
  }),
  loader: async () => {
    const journal = await getJournal();
    return { journal };
  },
  component: JournalIndex,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: "easeOut" } },
};

function mesAbrev(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", { month: "short" }).replace(".", "");
}

function JournalIndex() {
  const { journal } = Route.useLoaderData();
  const sorted = [...journal].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-background text-foreground min-h-screen">
      <SiteNav variant="solid" />

      {/* ── Abertura ── */}
      <section className="px-6 md:px-12 pt-32 md:pt-48 pb-16 max-w-4xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl">
          <p className="font-mono-label text-copper/50 mb-4 tracking-[0.38em] uppercase text-[10px]">caderno de matcha</p>
          <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.92] tracking-tight">
            Caderno<br />
            <span className="font-italic-serif text-copper">de Matcha</span>.
          </h1>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}
          className="mt-10 max-w-md">
          <div className="space-y-2.5 text-foreground/50 body-text text-sm leading-loose">
            <p>— não começo a escrever com intenção.</p>
            <p>— começo com uma frase que não sei onde vai.</p>
            <p>rabisco. recomeço. às vezes resulta.</p>
            <p>este caderno é o intermédio — entre a fotografia e a palavra certa.</p>
            <p className="text-foreground/28 italic">nem todas as entradas ficam prontas.</p>
          </div>
          <AberturaDoDia />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 0.7 }}
          className="mt-12 max-w-xs">
          <div className="flex items-baseline gap-4 border-t border-foreground/10 pt-5">
            <p className="font-display text-4xl text-copper tabular-nums">{sorted.length}</p>
            <div>
              <p className="font-mono-label text-[10px] text-foreground/40 leading-relaxed">entradas</p>
              <p className="font-italic-serif text-foreground/25 text-xs italic">ao café, ao matcha, e às vezes a seco.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Lista de entradas — caderno ── */}
      <section className="px-6 md:px-12 max-w-4xl mx-auto pb-10">

        {sorted.map((entry, i) => {
          const d = new Date(entry.date);
          const dia = d.getDate();
          const mes = mesAbrev(entry.date);
          const rasura = rasuraParaEntrada(entry.slug, i);

          return (
            <motion.div
              key={entry.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.08 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to="/diario/$slug"
                params={{ slug: entry.slug }}
                className="group relative block py-7 border-b border-foreground/6 overflow-hidden"
              >
                {/* Data — pequena, no canto superior, sem linha lateral */}
                <div className="flex items-start gap-5 md:gap-8">

                  {/* Coluna data */}
                  <div className="shrink-0 w-14 md:w-20 pt-0.5 select-none flex flex-col items-start gap-0.5">
                    <span className="font-mono-label text-[9px] text-foreground/25 tabular-nums leading-tight">
                      {dia} {mes}.
                    </span>
                    <span className="font-mono-label text-[7px] text-copper/25 uppercase tracking-widest leading-tight">
                      {entry.relatedCategory}
                    </span>
                    <span className="font-mono-label text-[7px] text-foreground/12 mt-1.5 leading-tight">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Conteúdo com rasura */}
                  <div className="flex-1 min-w-0">

                    {/* Rasura — tentativa descartada */}
                    <Rasura texto={rasura} />

                    {/* Título real */}
                    <h2 className="font-display text-xl md:text-[1.85rem] leading-[1.1] group-hover:text-copper transition-colors duration-500">
                      {entry.title}
                    </h2>

                    <p className="mt-3 text-foreground/42 leading-relaxed body-text text-sm max-w-xl">
                      {entry.excerpt}
                    </p>

                    <span className="font-mono-label mt-5 inline-block text-foreground/20 group-hover:text-copper transition-colors duration-500 text-[9px] uppercase tracking-widest">
                      ler →
                    </span>
                  </div>

                  {/* Imagem ao hover */}
                  <div className="hidden md:flex items-center shrink-0">
                    <div className="w-16 h-24 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-2 group-hover:translate-x-0">
                      <img src={entry.photoSrc} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </section>

      {/* ── Fecho ── */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="px-6 md:px-12 py-28 max-w-4xl mx-auto">
        <div>
          <p className="font-italic-serif text-3xl text-copper mb-4">—</p>
          <p className="font-display text-xl md:text-2xl leading-relaxed text-foreground/50 max-w-sm">
            Vai crescendo à medida que ando —<br />
            <span className="font-italic-serif text-copper">e à medida que paro</span>.
          </p>
          <p className="font-mono-label text-[9px] text-foreground/20 mt-8 uppercase tracking-[0.38em]">
            Coimbra · caderno de matcha · L.R.
          </p>
        </div>
      </motion.section>

      <SiteFooter />
    </div>
  );
}
