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
      { name: "description", content: "Sou a Luísa, ando muito a pé. Vivo em Coimbra, tenho sempre uma câmara comigo." },
    ],
  }),
  component: SobrePage,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

function Fade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SobrePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* ── Abertura ── */}
      <section className="px-6 md:px-12 pt-32 md:pt-48 pb-20 max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-5xl"
        >
          <p className="font-mono-label text-copper mb-8">Luísa Rosmaninho · Coimbra</p>
          <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.92] tracking-tight">
            Prefiro<br />
            chegar<br />
            <span className="font-italic-serif text-copper">mais tarde</span>.
          </h1>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.35 }}
          className="mt-20 grid md:grid-cols-12 gap-12 items-start"
        >
          <div className="md:col-span-6 space-y-6 text-foreground/68 text-lg leading-relaxed">
            <p>
              Vivo em Coimbra. Tenho sempre uma câmara comigo. Trabalho em quatro séries abertas que vão crescendo à medida que ando, observo e disparo.
            </p>
            <p>
              Este sítio não é um portefólio comercial — é o lugar onde as séries vivem enquanto crescem, onde o diário fica guardado, onde as notas de campo vão aparecendo.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-8 flex flex-col gap-4">
            <div className="h-px bg-foreground/15 w-full" />
            <div className="flex justify-between font-mono-label text-foreground/32">
              <span>Fotografia de autor</span>
              <span>desde 2020</span>
            </div>
            <div className="flex justify-between font-mono-label text-foreground/32">
              <span>Coimbra, Portugal</span>
              <span>40°12'N · 8°25'O</span>
            </div>
            <div className="h-px bg-foreground/15 w-full" />
            <p className="font-italic-serif text-foreground/35 text-base mt-2">
              "só atenção ao que insiste em ficar"
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Imagem ── */}
      <Fade className="px-6 md:px-12 max-w-6xl mx-auto">
        <div className="hover-zoom relative aspect-[16/9]">
          <img src={villageAlley} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </Fade>

      {/* ── Frase de abertura ── */}
      <Fade className="px-6 md:px-12 py-28 md:py-36 max-w-3xl mx-auto">
        <p className="font-display italic text-4xl md:text-5xl leading-[1.15] text-foreground/80">
          "Nunca consegui olhar para a fotografia como apenas tirar fotografias. Para mim, sempre foi muito mais do que isso."
        </p>
      </Fade>

      <div className="hairline mx-6 md:mx-12" />

      {/* ── O começo ── */}
      <section className="px-6 md:px-12 py-28 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
        <Fade className="md:col-span-5 md:sticky md:top-36">
          <div className="hover-zoom relative aspect-[3/4]">
            <img src={stoneVillage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </Fade>

        <div className="md:col-span-7 space-y-12">
          <Fade>
            <p className="font-mono-label text-copper mb-6">§ 01 — Guardar</p>
            <p className="font-display text-3xl md:text-4xl leading-[1.15] mb-8">
              A minha forma de guardar o que passa demasiado depressa.
            </p>
            <p className="text-foreground/68 leading-relaxed">
              A fotografia tornou-se a minha forma de guardar emoções, ambientes e pequenos momentos que normalmente passam demasiado depressa. Gosto de reparar nos detalhes que muitas vezes passam despercebidos: a maneira como a luz entra por uma janela ao final da tarde, um olhar distraído, um sorriso inesperado, o silêncio confortável entre duas pessoas — ou aquela sensação impossível de explicar que certos momentos conseguem ter.
            </p>
          </Fade>

          <Fade delay={0.1}>
            <div className="border-l-2 border-copper/30 pl-8 py-2">
              <p className="font-italic-serif text-2xl md:text-3xl text-foreground/75 leading-relaxed">
                "Sou uma pessoa bastante emocional e criativa, e acho que isso acaba inevitavelmente por se refletir no meu trabalho."
              </p>
            </div>
          </Fade>

          <Fade delay={0.15}>
            <p className="font-mono-label text-copper mb-4">§ 02 — Verdadeiras</p>
            <p className="text-foreground/68 leading-relaxed mb-5">
              Não procuro criar imagens demasiado perfeitas ou forçadas. Procuro criar fotografias que pareçam verdadeiras. Naturais. Honestamente reais. Quero que as pessoas se revejam nelas, que sintam alguma coisa quando as olham e que consigam voltar àquele momento mesmo muitos anos depois.
            </p>
            <p className="text-foreground/68 leading-relaxed">
              Grande parte daquilo que faço nasce da observação. Gosto de perceber as pessoas, os ambientes, a luz e as emoções antes sequer de pegar na câmara. E talvez seja exatamente isso que mais gosto na fotografia: obriga-me a olhar para o mundo com mais calma, mais atenção e mais sensibilidade.
            </p>
          </Fade>
        </div>
      </section>

      {/* ── Secção escura — O detalhe ── */}
      <section className="bg-foreground text-cream px-6 md:px-12 py-28 md:py-36">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <Fade className="md:col-span-6 space-y-8">
            <p className="font-mono-label text-copper mb-2">§ 03 — O detalhe</p>
            <p className="font-display text-4xl md:text-5xl text-cream leading-[1.1]">
              Provavelmente<br />ninguém repara.<br /><span className="font-italic-serif text-copper">Eu reparo.</span>
            </p>
            <p className="text-cream/65 leading-relaxed">
              Existe um lado muito pessoal em tudo isto. Sou extremamente perfeccionista com os detalhes, mesmo os mais pequenos. Muitas vezes passo horas a pensar numa composição, numa edição, numa cor, numa sombra ou numa sensação específica que quero transmitir. Provavelmente muita gente nunca irá reparar conscientemente nesses detalhes… mas eu reparo. E para mim, isso faz toda a diferença.
            </p>
            <p className="text-cream/65 leading-relaxed">
              Ao mesmo tempo, quero que tudo pareça leve e natural. Não gosto de transformar momentos em algo artificial. Prefiro conversas genuínas, movimentos espontâneos, gargalhadas inesperadas e aquela beleza imperfeita que torna cada pessoa diferente.
            </p>
          </Fade>

          <Fade delay={0.2} className="md:col-span-6">
            <div className="hover-zoom relative aspect-[4/5]">
              <img src={river} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </Fade>
        </div>
      </section>

      {/* ── As quatro séries ── */}
      <Fade className="px-6 md:px-12 py-28 max-w-6xl mx-auto">
        <p className="font-mono-label text-copper mb-10">§ 04 — As séries</p>
        <p className="font-display text-4xl md:text-6xl leading-[1.05] mb-16 max-w-3xl">
          Quatro séries paralelas.<br /><span className="font-italic-serif text-copper">Nenhuma fechada.</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10">
          {[
            { n: "01", t: "Urbanas", d: "Ruas, pontes e telhados — a cidade enquanto matéria viva. Porto e Coimbra, principalmente." },
            { n: "02", t: "Natureza", d: "Água, luz e paisagem. O tempo lento dos lugares que não precisam de pessoas para existir." },
            { n: "03", t: "Retratos", d: "Rostos, pedra e silêncio. Quem é, e onde está — que às vezes é a mesma coisa." },
            { n: "04", t: "Comida", d: "Mesas, texturas e o instante antes do primeiro garfo. A beleza do ordinário." },
          ].map((s) => (
            <div key={s.n} className="bg-background px-8 py-10 group">
              <p className="font-mono-label text-copper mb-6">{s.n}</p>
              <p className="font-display text-4xl mb-5">{s.t}</p>
              <p className="text-foreground/60 leading-relaxed text-sm">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link to="/portfolio" className="inline-block text-[11px] uppercase tracking-[0.32em] border-b border-foreground pb-1 hover:text-copper hover:border-copper transition-colors">
            Ver o arquivo →
          </Link>
        </div>
      </Fade>

      {/* ── Propósito ── */}
      <Fade className="px-6 md:px-12 py-28 max-w-6xl mx-auto">
        <p className="font-mono-label text-copper mb-8">§ 05 — O porquê</p>
        <p className="font-display text-4xl md:text-6xl leading-[1.05] mb-12 max-w-4xl">
          A Rosmaninho Fotografia nasceu exatamente dessa vontade: criar algo <span className="font-italic-serif text-copper">íntimo</span>, artístico e emocional.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
          <p className="text-foreground/68 leading-relaxed">
            Um espaço onde a fotografia não serve apenas para mostrar como um momento parecia, mas principalmente como ele se <em>sentia</em>.
          </p>
          <p className="text-foreground/68 leading-relaxed">
            No fundo, aquilo que procuro capturar é simples: emoções verdadeiras, momentos sinceros e memórias que continuam vivas muito depois do clique.
          </p>
        </div>
      </Fade>

      {/* ── Fecho ── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="px-6 md:px-12 py-32 text-center max-w-2xl mx-auto"
      >
        <p className="font-italic-serif text-5xl text-copper mb-10">—</p>
        <p className="text-foreground/60 leading-relaxed text-lg">
          Se algo aqui te ficou, escreve. Não há formulários nem preços. Há uma conversa possível, sobre uma imagem ou um lugar.
        </p>
        <Link
          to="/contacto"
          className="mt-12 inline-block bg-foreground text-cream px-10 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-copper transition-colors duration-500"
        >
          Escrever
        </Link>
      </motion.section>

      <SiteFooter />
    </div>
  );
}
