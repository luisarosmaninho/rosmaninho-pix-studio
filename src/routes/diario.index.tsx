import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { Whisper } from "@/components/Whisper";
import { journal } from "@/lib/journal";

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

function AberturaDoDia() {
  const [frase, setFrase] = useState(aberturasPool[0]);
  useEffect(() => {
    setFrase(aberturasPool[Math.floor(Math.random() * aberturasPool.length)]);
  }, []);
  return (
    <p className="font-italic-serif text-foreground/30 text-sm mt-6 italic">{frase}</p>
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
  component: JournalIndex,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

function JournalIndex() {
  const sorted = [...journal].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-background text-foreground min-h-screen">
      <SiteNav variant="solid" />

      {/* ── Abertura ── */}
      <section className="px-6 md:px-12 pt-32 md:pt-48 pb-20 max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-5xl"
        >
          <p className="font-mono-label text-copper/70 mb-4 tracking-[0.38em] uppercase text-[10px]">caderno de matcha</p>
          <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.92] tracking-tight">
            Caderno<br />
            <span className="font-italic-serif text-copper">de Matcha</span>.
          </h1>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="mt-10 max-w-2xl space-y-5 text-foreground/55 leading-relaxed body-text"
          >
            <p>Nem tudo fica dentro de uma fotografia. Algumas coisas acabam escritas aqui. Este é um espaço onde guardo observações, memórias, pensamentos e pequenos momentos que fui encontrando pelo caminho. Muitas destas notas nasceram enquanto fotografava; outras surgiram mais tarde, quando tive tempo para olhar para as imagens com mais calma e perceber o que realmente me ficou daquele dia.</p>
            <p>Escrevo sobre lugares, luz, cidades, caminhadas, pessoas e sobre os detalhes que muitas vezes passam despercebidos. Às vezes começo por uma fotografia e acabo numa memória. Outras vezes acontece o contrário. Não procuro contar grandes histórias nem encontrar conclusões. Gosto mais de guardar fragmentos: uma rua silenciosa, um céu carregado, uma conversa esquecida, uma janela iluminada ao fim da tarde.</p>
            <p>Normalmente escrevo com uma chávena de café ou matcha por perto e sem grande pressa de chegar ao fim. Talvez por isso este caderno não tenha uma ordem definida. É apenas um arquivo pessoal de coisas que vi, senti ou pensei e que, por alguma razão, achei que valia a pena guardar.</p>
            <AberturaDoDia />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="mt-16 border-t border-foreground/15 pt-8 max-w-sm"
        >
          <p className="font-display text-5xl text-copper">{sorted.length}</p>
          <p className="font-mono-label mt-1">entradas escritas até hoje</p>
          <p className="font-italic-serif text-foreground/35 mt-2 text-sm">ao café, ao matcha, e às vezes a seco.</p>
        </motion.div>
      </section>

      <div className="hairline mx-6 md:mx-12" />

      {/* ── Lista de entradas ── */}
      <section className="px-6 md:px-12 pt-4 pb-4 max-w-6xl mx-auto">
        {sorted.map((entry, i) => (
          <motion.div
            key={entry.slug}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              to="/diario/$slug"
              params={{ slug: entry.slug }}
              className="group relative flex flex-col md:grid md:grid-cols-12 gap-6 py-16 md:py-20 border-b border-foreground/8 overflow-hidden"
            >
              {/* Nº */}
              <div className="md:col-span-1">
                <p className="font-mono-label text-copper">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>

              {/* Conteúdo */}
              <div className="md:col-span-9">
                <h2 className="font-display text-3xl md:text-5xl leading-[1.05] group-hover:text-copper transition-colors duration-500">
                  {entry.title}
                </h2>
                <p className="mt-5 text-foreground/60 max-w-xl leading-relaxed body-text">
                  {entry.excerpt}
                </p>
                <span className="font-mono-label mt-8 inline-block text-foreground/35 group-hover:text-copper transition-colors duration-500">
                  ler →
                </span>
              </div>

              {/* Miniatura ao hover */}
              <div className="md:col-span-2 hidden md:flex items-center justify-end">
                <div className="w-24 h-32 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-3 group-hover:translate-x-0 shrink-0">
                  <img
                    src={entry.photoSrc}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* ── Fecho ── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="px-6 md:px-12 py-40 text-center max-w-2xl mx-auto"
      >
        <p className="font-italic-serif text-4xl text-copper mb-8">—</p>
        <p className="font-display text-2xl md:text-3xl leading-relaxed text-foreground/65">
          Vai crescendo à medida que ando —<br />
          <span className="font-italic-serif text-copper">e à medida que paro</span>.
        </p>
        <Whisper text="Coimbra · caderno de matcha · L.R." delay={1.5} className="mt-10 justify-center" />
      </motion.section>

      <SiteFooter />
    </div>
  );
}
