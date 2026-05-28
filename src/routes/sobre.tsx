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
          className="max-w-4xl"
        >
          <p className="font-mono-label text-copper mb-8">Autora · Coimbra</p>
          <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.92] tracking-tight">
            Sou a <span className="font-italic-serif text-copper">Luísa</span>,<br />
            ando muito a pé.
          </h1>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3 }}
          className="mt-16 grid md:grid-cols-12 gap-12 items-start"
        >
          <div className="md:col-span-7 space-y-6 text-foreground/70 text-lg leading-relaxed">
            <p>
              Vivo em Coimbra, tenho sempre uma câmara comigo, e o passo de quem prefere chegar mais tarde.
            </p>
            <p>
              Este sítio é o meu caderno aberto — sem clientes, sem pressa, só atenção ao que insiste em ficar.
            </p>
            <p>
              Trabalho em quatro séries paralelas. Vão crescendo à medida que ando, observo e disparo.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="h-px bg-foreground/15 w-full" />
            <div className="flex justify-between font-mono-label text-foreground/35">
              <span>Fotografia de autor</span>
              <span>desde 2020</span>
            </div>
            <div className="flex justify-between font-mono-label text-foreground/35">
              <span>Coimbra, Portugal</span>
              <span>40°12'N</span>
            </div>
            <div className="h-px bg-foreground/15 w-full" />
          </div>
        </motion.div>
      </section>

      {/* ── Imagem ── */}
      <Fade className="px-6 md:px-12 max-w-6xl mx-auto">
        <div className="hover-zoom relative aspect-[16/9]">
          <img src={villageAlley} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </Fade>

      {/* ── Frase simples ── */}
      <Fade className="px-6 md:px-12 py-28 md:py-36 max-w-3xl mx-auto">
        <p className="font-display italic text-4xl md:text-6xl leading-[1.1] text-foreground/80">
          "A fotografia ensinou-me a reparar. Antes de tudo o resto."
        </p>
        <p className="font-mono-label text-foreground/30 mt-8">L.R.</p>
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
            <p className="font-mono-label text-copper mb-6">§ 01 — O começo</p>
            <p className="font-display text-3xl md:text-4xl leading-[1.15] mb-8">
              Comecei sem método. Saía, andava, parava.
            </p>
            <p className="text-foreground/68 leading-relaxed">
              Às vezes voltava para casa sem uma imagem que prestasse. Isso não me acontecia para desistir — acontecia para aprender a olhar antes de disparar. A câmara foi chegando ao lugar onde o caderno sempre esteve: ao lado, em silêncio, à espera.
            </p>
          </Fade>

          <Fade delay={0.1}>
            <div className="border-l-2 border-copper/30 pl-8 py-2">
              <p className="font-italic-serif text-2xl md:text-3xl text-foreground/75 leading-relaxed">
                "Sou uma pessoa bastante emocional e criativa, e acho que isso acaba inevitavelmente por se refletir no trabalho."
              </p>
            </div>
          </Fade>

          <Fade delay={0.15}>
            <p className="font-mono-label text-copper mb-4">§ 02 — O olhar</p>
            <p className="text-foreground/68 leading-relaxed mb-5">
              Não procuro imagens perfeitas. Procuro imagens verdadeiras. A diferença não está na técnica — está em perceber quando um momento ainda não acabou de acontecer.
            </p>
            <p className="text-foreground/68 leading-relaxed">
              Grande parte daquilo que faço nasce da observação. Gosto de perceber os lugares, a luz e o que está no ar antes de pegar na câmara. E talvez seja exatamente isso que mais gosto na fotografia: obriga-me a andar mais devagar.
            </p>
          </Fade>
        </div>
      </section>

      {/* ── Secção escura — O caderno ── */}
      <section className="bg-foreground text-cream px-6 md:px-12 py-28 md:py-36">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <Fade className="md:col-span-6 space-y-8">
            <p className="font-mono-label text-copper mb-2">§ 03 — O caderno</p>
            <p className="font-display text-4xl md:text-5xl text-cream leading-[1.1]">
              Sem clientes,<br />sem pressa.
            </p>
            <p className="text-cream/65 leading-relaxed">
              Este sítio não é um portefólio comercial. É um caderno aberto — o lugar onde as séries vivem enquanto crescem, onde o diário fica guardado, onde as notas de campo vão aparecendo.
            </p>
            <p className="text-cream/65 leading-relaxed">
              Não há pressa de acabar nenhuma série. Elas vão crescendo à medida que ando. Algumas imagens ficam a amadurecer durante meses antes de aparecerem aqui.
            </p>
            <div className="h-px bg-cream/15 max-w-xs" />
            <p className="font-italic-serif text-cream/50 text-xl">
              "só atenção ao que insiste em ficar"
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

      {/* ── Fecho — muito simples ── */}
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
