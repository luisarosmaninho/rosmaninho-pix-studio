import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { Whisper } from "@/components/Whisper";
import portoStreet from "@/assets/porto-street.jpg";
import ribeiroMusgo from "@/assets/ribeiro-musgo.jpg";
import risottoCourgette from "@/assets/risotto-courgette.jpg";

export const Route = createFileRoute("/impressoes")({
  head: () => ({
    meta: [
      { title: "Impressões — Rosmaninho Fotografia" },
      { name: "description", content: "Fotografias em papel Fine Art, numeradas e assinadas. Uma imagem que pode durar décadas." },
    ],
    links: [{ rel: "canonical", href: "https://rosmaninhofotografia.pt/impressoes" }],
  }),
  component: ImpressoesPage,
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

const formatos = [
  { dim: "20 × 30 cm", desc: "Para uma secretária ou prateleira. Discreta, presente." },
  { dim: "30 × 45 cm", desc: "O formato mais comum. Cabe em qualquer parede." },
  { dim: "50 × 70 cm", desc: "Presença real. Uma parede que antes estava vazia." },
];

const passos = [
  { n: "01", title: "Escolhes", body: "Percorres o arquivo e identificas a imagem — ou descreves o que procuras e eu ajudo a encontrá-la." },
  { n: "02", title: "Conversamos", body: "Enviamos uma proposta com formato, papel e preço. Não há nada automatizado — é uma conversa." },
  { n: "03", title: "Imprimimos", body: "Cada cópia é impressa em papel Fine Art Hahnemühle Photo Rag 308g, revisada à mão, numerada e assinada." },
  { n: "04", title: "Chega até ti", body: "Embalada com cuidado, com o certificado de autenticidade da série." },
];

function ImpressoesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* ── Hero ── */}
      <section className="bg-foreground text-cream px-6 md:px-16 pt-36 pb-28 md:pt-48 md:pb-36">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-mono-label text-cream/40 mb-6 uppercase tracking-[0.38em]"
        >
          arquivo em papel
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease: "easeOut" }}
          className="font-display text-[clamp(4.5rem,13vw,10rem)] leading-[0.88] tracking-tight"
        >
          Impres<br />
          <span className="font-italic-serif text-copper">sões.</span>
        </motion.h1>

        <div className="mt-20 grid md:grid-cols-2 gap-12 md:gap-24 items-end max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-cream/65 text-lg leading-relaxed max-w-prose"
          >
            Uma fotografia no ecrã existe em silêncio. No papel, existe de outra forma — tem peso, tem textura, tem uma presença que o píxel não consegue imitar. Cada impressão é feita para durar décadas, não anos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col gap-3"
          >
            <div className="h-px bg-cream/15" />
            <div className="flex justify-between font-mono-label text-cream/35">
              <span>Fine Art · Hahnemühle 308g</span>
              <span>numeradas</span>
            </div>
            <div className="flex justify-between font-mono-label text-cream/35">
              <span>séries limitadas a 10 cópias</span>
              <span>assinadas</span>
            </div>
            <div className="h-px bg-cream/15" />
          </motion.div>
        </div>
      </section>

      {/* ── Imagens trio ── */}
      <section className="grid grid-cols-3 gap-px bg-border">
        {[
          { src: portoStreet, title: "Quando ainda havia luz" },
          { src: ribeiroMusgo, title: "O que existe só para quem se agacha" },
          { src: risottoCourgette, title: "O que sobrou do verão" },
        ].map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, delay: i * 0.12 }}
            className="aspect-[3/4] overflow-hidden relative group"
          >
            <img
              src={p.src}
              alt={p.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="absolute bottom-4 inset-x-4 font-display text-cream text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {p.title}
            </p>
          </motion.div>
        ))}
      </section>

      {/* ── Formatos ── */}
      <section className="px-6 md:px-12 py-28 md:py-40 max-w-6xl mx-auto">
        <Fade>
          <p className="font-mono-label text-copper mb-8 uppercase tracking-[0.38em]">formatos disponíveis</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] mb-16">
            Há um tamanho<br />
            <span className="font-italic-serif text-copper">certo para cada parede</span>.
          </h2>
        </Fade>

        <div className="border-t border-foreground/12">
          {formatos.map((f, i) => (
            <Fade key={i} delay={i * 0.08}>
              <div className="grid grid-cols-12 gap-6 py-10 border-b border-foreground/12 items-baseline">
                <span className="col-span-2 md:col-span-1 font-mono-label text-copper">0{i + 1}</span>
                <span className="col-span-10 md:col-span-3 font-display text-3xl md:text-4xl">{f.dim}</span>
                <p className="col-span-12 md:col-span-8 text-foreground/60 leading-relaxed md:pl-8">{f.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* ── Quote ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="py-28 md:py-36 px-6 text-center max-w-3xl mx-auto"
      >
        <p className="font-italic-serif text-5xl text-copper mb-6">"</p>
        <p className="font-display text-3xl md:text-4xl leading-[1.2] text-foreground/80">
          Uma fotografia em papel é a única forma de a ter verdadeiramente.
        </p>
        <p className="font-mono-label text-foreground/35 mt-8 uppercase tracking-[0.3em]">— L.R.</p>
      </motion.section>

      {/* ── Como funciona ── */}
      <section className="px-6 md:px-12 py-16 md:py-28 bg-foreground text-cream">
        <div className="max-w-6xl mx-auto">
          <Fade>
            <p className="font-mono-label text-cream/40 mb-8 uppercase tracking-[0.38em]">como funciona</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream mb-20 leading-[0.95]">
              Quatro passos.<br />
              <span className="font-italic-serif text-copper">Nenhum formulário.</span>
            </h2>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-cream/10">
            {passos.map((p, i) => (
              <Fade key={i} delay={i * 0.1} className="bg-foreground p-10 md:p-14">
                <p className="font-mono-label text-copper mb-4">{p.n}</p>
                <h3 className="font-display text-3xl text-cream mb-4">{p.title}</h3>
                <p className="text-cream/60 leading-relaxed">{p.body}</p>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certificado ── */}
      <section className="px-6 md:px-12 py-28 md:py-40 max-w-4xl mx-auto">
        <Fade>
          <p className="font-mono-label text-copper mb-8">Edições limitadas</p>
          <p className="font-display text-3xl md:text-4xl leading-[1.15] text-foreground/80">
            Cada fotografia é impressa em série de{" "}
            <span className="font-italic-serif text-copper">no máximo 10 exemplares</span>{" "}
            — depois disso, a edição encerra. Cada cópia tem número de série e certificado de autenticidade.
          </p>
          <Whisper text="arquivo fechado · impressão única · L.R." delay={1.2} className="mt-10" />
        </Fade>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 md:px-12 py-24 md:py-36 bg-cream text-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <Fade>
            <p className="font-mono-label text-copper mb-6 uppercase tracking-[0.38em]">pedir uma impressão</p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95]">
              Se queres uma imagem<br />
              <span className="font-italic-serif text-copper">em papel</span>, escreve.
            </h2>
            <p className="mt-10 text-foreground/65 leading-relaxed max-w-xl mx-auto">
              Indica a fotografia (ou descreve o que procuras), o formato e onde vai ficar. Respondo em menos de 48 horas com uma proposta.
            </p>
            <Link to="/contacto" className="mt-12 inline-block btn-copper">
              Iniciar conversa →
            </Link>
          </Fade>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
