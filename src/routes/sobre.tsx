import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const } },
};

function SobrePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* Intro */}
      <section className="px-6 md:px-12 pt-32 md:pt-44 pb-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="md:col-span-7">
          <p className="font-script text-3xl md:text-4xl text-gold mb-4">olá</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">
            Sou a <span className="italic">Luísa</span>.<br />
            Fotografo memórias.
          </h1>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }} className="md:col-span-5">
          <p className="font-mono-label text-gold mb-3">Autora · Coimbra</p>
          <p className="text-foreground/70 leading-relaxed">
            Há mais de cinco anos que vivo entre câmaras, copos de chá e cadernos de campo. A fotografia, para mim, é uma forma educada de prestar atenção ao mundo.
          </p>
        </motion.div>
      </section>

      {/* Image */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="px-6 md:px-12 max-w-6xl mx-auto">
        <div className="hover-zoom relative aspect-[16/9]">
          <img src={villageAlley} alt="Luísa Rosmaninho" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </motion.section>

      {/* Manifesto */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="px-6 md:px-12 py-32 max-w-3xl mx-auto text-center">
        <p className="font-mono-label text-gold mb-6">Manifesto</p>
        <p className="font-display italic text-3xl md:text-5xl leading-[1.2]">
          “Acredito que cada detalhe — desde o reflexo da luz num olhar até ao movimento mais subtil num abraço — conta uma história. A minha fotografia não é sobre posar; é sobre <span className="text-gold">sentir</span>.”
        </p>
      </motion.section>

      {/* Duo */}
      <section className="px-6 md:px-12 pb-32 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="hover-zoom relative aspect-[3/4]">
          <img src={stoneVillage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.2 }} className="hover-zoom relative aspect-[3/4] md:mt-20">
          <img src={river} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-foreground text-cream px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { n: "+200", l: "Sessões" },
            { n: "+50", l: "Casamentos" },
            { n: "+5", l: "Anos de experiência" },
          ].map((s) => (
            <motion.div key={s.l} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="font-display text-6xl md:text-7xl text-gold">{s.n}</p>
              <p className="font-mono-label mt-4 text-cream/70">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="px-6 md:px-12 py-32 text-center max-w-3xl mx-auto">
        <p className="font-script text-4xl text-gold mb-6">obrigada</p>
        <h2 className="font-display text-4xl md:text-5xl">
          Por chegares até aqui.
        </h2>
        <p className="mt-6 text-foreground/70">Se sentes que faz sentido, conta-me a tua história.</p>
        <Link to="/contacto" className="mt-10 inline-block bg-foreground text-cream px-10 py-4 text-xs uppercase tracking-[0.28em] hover:bg-gold transition-colors duration-500">
          Vamos falar
        </Link>
      </motion.section>

      <SiteFooter />
    </div>
  );
}
