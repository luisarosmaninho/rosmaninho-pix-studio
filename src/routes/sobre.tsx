import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import villageAlley from "@/assets/village-alley.jpg";
import stoneVillage from "@/assets/stone-village.jpg";
import river from "@/assets/river.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Luísa Rosmaninho" },
      { name: "description", content: "A história, o olhar e o método por trás da Rosmaninho Fotografia." },
      { property: "og:title", content: "Sobre — Luísa Rosmaninho" },
      { property: "og:description", content: "Muito mais do que uma lente, uma conexão." },
    ],
  }),
  component: SobrePage,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: "easeOut" } },
};

function SobrePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* Hero intro */}
      <section className="px-6 md:px-12 pt-32 md:pt-44 pb-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="md:col-span-7">
          <p className="font-italic-serif text-3xl md:text-4xl text-copper mb-4">olá</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">
            Sou a <span className="italic">Luísa</span>.<br />
            Fotografo memórias.
          </h1>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }} className="md:col-span-5">
          <p className="font-mono-label text-copper mb-3">Autora · Coimbra</p>
          <p className="text-foreground/70 leading-relaxed">
            Há mais de cinco anos que vivo entre câmaras, cadernos de campo e a luz que muda a toda a hora. A fotografia, para mim, é uma forma educada de prestar atenção ao mundo.
          </p>
        </motion.div>
      </section>

      {/* Hero image */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="px-6 md:px-12 max-w-6xl mx-auto">
        <div className="hover-zoom relative aspect-[16/9]">
          <img src={villageAlley} alt="Luísa Rosmaninho" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </motion.section>

      {/* Manifesto citação */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="px-6 md:px-12 py-28 max-w-3xl mx-auto text-center">
        <p className="font-mono-label text-copper mb-6">Manifesto</p>
        <p className="font-display italic text-3xl md:text-5xl leading-[1.2]">
          "Acredito que cada detalhe — desde o reflexo da luz num olhar até ao movimento mais subtil num abraço — conta uma história. A minha fotografia não é sobre posar; é sobre <span className="text-copper">sentir</span>."
        </p>
      </motion.section>

      {/* Texto biográfico principal */}
      <section className="px-6 md:px-12 pb-28 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="md:col-span-5 md:sticky md:top-36">
          <div className="hover-zoom relative aspect-[3/4]">
            <img src={stoneVillage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.15 }} className="md:col-span-7 space-y-10">
          <div>
            <p className="font-mono-label text-copper mb-6">§ 01 — O começo</p>
            <p className="font-display text-3xl md:text-4xl leading-[1.15] mb-8">
              Nunca consegui olhar para a fotografia como apenas "tirar fotografias". Para mim, sempre foi muito mais do que isso.
            </p>
            <p className="text-foreground/72 leading-relaxed text-base">
              A fotografia tornou-se a minha forma de guardar emoções, ambientes e pequenos momentos que normalmente passam demasiado depressa. Gosto de reparar nos detalhes que muitas vezes passam despercebidos: a maneira como a luz entra por uma janela ao final da tarde, um olhar distraído, um sorriso inesperado, o silêncio confortável entre duas pessoas — ou aquela sensação impossível de explicar que certos momentos conseguem ter.
            </p>
          </div>

          <div className="border-l-2 border-copper/30 pl-8 py-2">
            <p className="font-italic-serif text-2xl md:text-3xl text-foreground/80 leading-relaxed">
              "Sou uma pessoa bastante emocional e criativa, e acho que isso acaba inevitavelmente por se refletir no meu trabalho."
            </p>
          </div>

          <div>
            <p className="font-mono-label text-copper mb-4">§ 02 — O olhar</p>
            <p className="text-foreground/72 leading-relaxed">
              Não procuro criar imagens demasiado perfeitas ou forçadas. Procuro criar fotografias que pareçam verdadeiras. Naturais. Honestamente reais. Quero que as pessoas se revejam nelas, que sintam alguma coisa quando as olham e que consigam voltar àquele momento mesmo muitos anos depois.
            </p>
            <p className="text-foreground/72 leading-relaxed mt-5">
              Grande parte daquilo que faço nasce da observação. Gosto de perceber as pessoas, os ambientes, a luz e as emoções antes sequer de pegar na câmara. E talvez seja exatamente isso que mais gosto na fotografia: obriga-me a olhar para o mundo com mais calma, mais atenção e mais sensibilidade.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Processo criativo — secção escura */}
      <section className="bg-foreground text-cream px-6 md:px-12 py-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="md:col-span-6 space-y-8">
            <p className="font-mono-label text-copper mb-2">§ 03 — O processo</p>
            <p className="font-display text-4xl md:text-5xl text-cream leading-[1.1]">
              O perfeccionismo<br />que ninguém vê.
            </p>
            <p className="text-cream/70 leading-relaxed">
              Existe um lado muito pessoal em tudo isto. Sou extremamente perfeccionista com os detalhes, mesmo os mais pequenos. Muitas vezes passo horas a pensar numa composição, numa edição, numa cor, numa sombra ou numa sensação específica que quero transmitir. Provavelmente muita gente nunca irá reparar conscientemente nesses detalhes… mas eu reparo. E para mim, isso faz toda a diferença.
            </p>
            <p className="text-cream/70 leading-relaxed">
              Ao mesmo tempo, quero que tudo pareça leve e natural. Não gosto de transformar momentos em algo artificial. Prefiro conversas genuínas, movimentos espontâneos, gargalhadas inesperadas e aquela beleza imperfeita que torna cada pessoa diferente.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:col-span-6">
            <div className="hover-zoom relative aspect-[4/5]">
              <img src={river} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* O propósito */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="px-6 md:px-12 py-28 max-w-4xl mx-auto">
        <p className="font-mono-label text-copper mb-8">§ 04 — O porquê</p>
        <p className="font-display text-4xl md:text-6xl leading-[1.1] mb-12">
          A Rosmaninho Fotografia nasceu de uma vontade: criar algo <span className="font-italic-serif text-copper">íntimo</span>, artístico e emocional.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <p className="text-foreground/70 leading-relaxed">
            Um espaço onde a fotografia não serve apenas para mostrar como um momento parecia, mas principalmente como ele se <em>sentia</em>. Um arquivo onde cada imagem é uma forma de manter vivo o que o tempo quer apagar.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            No fundo, aquilo que procuro capturar é simples: emoções verdadeiras, momentos sinceros e memórias que continuam vivas muito depois do clique.
          </p>
        </div>
      </motion.section>

      {/* Séries */}
      <section className="bg-foreground text-cream px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
          {[
            { n: "01", l: "Urbanas" },
            { n: "02", l: "Natureza" },
            { n: "03", l: "Retratos" },
            { n: "04", l: "Comida" },
          ].map((s) => (
            <motion.div key={s.l} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="font-display text-6xl md:text-7xl text-copper">{s.n}</p>
              <p className="font-mono-label mt-4 text-cream/70">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="px-6 md:px-12 py-32 text-center max-w-3xl mx-auto">
        <p className="font-italic-serif text-4xl text-copper mb-6">obrigada</p>
        <h2 className="font-display text-4xl md:text-5xl">
          Por chegares até aqui.
        </h2>
        <p className="mt-6 text-foreground/70">Se quiseres trocar duas palavras sobre uma imagem, escreve.</p>
        <Link to="/contacto" className="mt-10 inline-block bg-foreground text-cream px-10 py-4 text-xs uppercase tracking-[0.28em] hover:bg-copper transition-colors duration-500">
          Iniciar diálogo
        </Link>
      </motion.section>

      <SiteFooter />
    </div>
  );
}
