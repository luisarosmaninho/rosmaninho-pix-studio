import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { Whisper, WhisperLight } from "@/components/Whisper";
import { getNesteMomento } from "@/lib/momento-fns";
import { getSobreTexts, getCategories } from "@/lib/content-fns";
import portoRuaCalcada from "@/assets/porto-rua-calcada.jpg";
import farolPeniche from "@/assets/farol-peniche.jpg";
import barcoDouro from "@/assets/barco-douro.jpg";
import portoAzulejos from "@/assets/porto-azulejos.jpg";
import marTetrapodos from "@/assets/mar-tetrapodos.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Autora — Luísa Rosmaninho" },
      { name: "description", content: "Sou a Luísa, ando muito a pé. Vivo em Coimbra, tenho sempre uma câmara comigo." },
      { property: "og:title", content: "Autora — Luísa Rosmaninho" },
      { property: "og:description", content: "Sou a Luísa, ando muito a pé. Vivo em Coimbra, tenho sempre uma câmara comigo." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rosmaninhofotografia.pt/sobre" },
      { property: "og:image", content: "https://rosmaninhofotografia.pt/og/sobre.jpg" },
      { property: "og:image:alt", content: "Luísa Rosmaninho — fotógrafa, Coimbra" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://rosmaninhofotografia.pt/og/sobre.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://rosmaninhofotografia.pt/sobre" }],
  }),
  loader: async () => {
    const [momento, sobreTexts, categories] = await Promise.all([
      getNesteMomento(),
      getSobreTexts(),
      getCategories(),
    ]);
    return { momento, sobreTexts, categories };
  },
  component: SobrePage,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

function Fade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show"
      viewport={{ once: true, amount: 0.2 }} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

function SobrePage() {
  const { momento, sobreTexts, categories } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* ── Abertura ── */}
      <section className="px-6 md:px-12 pt-32 md:pt-48 pb-20 max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-5xl">
          <p className="font-mono-label text-copper mb-8">Luísa Rosmaninho · Coimbra</p>
          <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.92] tracking-tight">
            Prefiro<br />chegar<br />
            <span className="font-italic-serif text-copper">mais tarde</span>.
          </h1>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.35 }}
          className="mt-20 grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-6 space-y-6 text-foreground/68 text-lg leading-relaxed">
            {sobreTexts.introParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="md:col-span-5 md:col-start-8 flex flex-col gap-4">
            <div className="h-px bg-foreground/15 w-full" />
            <div className="flex justify-between font-mono-label text-foreground/32">
              <span>Fotografia de autor</span><span>desde 2020</span>
            </div>
            <div className="flex justify-between font-mono-label text-foreground/32">
              <span>Coimbra, Portugal</span><span>40°12'N · 8°25'O</span>
            </div>
            <div className="flex justify-between font-mono-label text-foreground/32">
              <span>Quatro séries abertas</span><span>arquivo em aberto</span>
            </div>
            <div className="flex justify-between font-mono-label text-foreground/20">
              <span>nem tudo o que sou</span><span>cabe no menu</span>
            </div>
            <div className="h-px bg-foreground/15 w-full" />
            <p className="font-italic-serif text-foreground/35 text-base mt-2">
              "só atenção ao que insiste em ficar"
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Imagem de abertura ── */}
      <Fade className="px-6 md:px-12 max-w-6xl mx-auto">
        <div className="hover-zoom relative aspect-[16/9] overflow-hidden">
          <img src={portoRuaCalcada} alt="Rua ao entardecer, Porto" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute bottom-6 right-8 font-mono-label text-cream/50 text-[10px] uppercase tracking-[0.3em]">Porto · Fev 2026</div>
        </div>
      </Fade>

      {/* ── Frase de abertura ── */}
      <Fade className="px-6 md:px-12 py-28 md:py-36 max-w-3xl mx-auto">
        <p className="font-display italic text-4xl md:text-5xl leading-[1.15] text-foreground/80">
          "{sobreTexts.introQuote}"
        </p>
        <Whisper text="Coimbra · 2020 —" delay={2} className="mt-8" />
      </Fade>

      <div className="hairline mx-6 md:mx-12" />

      {/* ── O começo ── */}
      <section className="px-6 md:px-12 py-28 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
        <Fade className="md:col-span-5 md:sticky md:top-36">
          <div className="hover-zoom relative aspect-[3/4] overflow-hidden">
            <img src={farolPeniche} alt="Farol da fortaleza, Figueira da Foz" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <p className="font-mono-label text-foreground/30 text-[10px] mt-3 uppercase tracking-[0.25em]">Figueira da Foz · Mai 2026</p>
        </Fade>

        <div className="md:col-span-7 space-y-12">
          <Fade>
            <p className="font-mono-label text-copper mb-6">§ 01 — Guardar</p>
            <p className="font-display text-3xl md:text-4xl leading-[1.15] mb-8">{sobreTexts.secaoGuardarTitulo}</p>
            <p className="text-foreground/68 leading-relaxed">{sobreTexts.secaoGuardarTexto}</p>
          </Fade>

          <Fade delay={0.1}>
            <div className="border-l-2 border-copper/30 pl-8 py-2">
              <p className="font-italic-serif text-2xl md:text-3xl text-foreground/75 leading-relaxed">
                "{sobreTexts.secaoGuardarCitacao}"
              </p>
            </div>
          </Fade>

          <Fade delay={0.15}>
            <p className="font-mono-label text-copper mb-4">§ 02 — Verdadeiras</p>
            <p className="text-foreground/68 leading-relaxed mb-5">{sobreTexts.secaoVerdadeirasTexto1}</p>
            <p className="text-foreground/68 leading-relaxed">{sobreTexts.secaoVerdadeirasTexto2}</p>
            <Whisper text="a câmara ensinou-me a olhar antes de disparar" delay={1.5} style="italic" className="mt-8" />
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
            <p className="text-cream/65 leading-relaxed">{sobreTexts.secaoDetalheTexto1}</p>
            <p className="text-cream/65 leading-relaxed">{sobreTexts.secaoDetalheTexto2}</p>
            <WhisperLight text="muita gente nunca irá reparar · eu reparo" delay={1.8} style="italic" className="mt-8" />
          </Fade>
          <Fade delay={0.2} className="md:col-span-6">
            <div className="hover-zoom relative aspect-[4/5] overflow-hidden">
              <img src={barcoDouro} alt="Barco no Douro, Porto" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <p className="font-mono-label text-cream/25 text-[10px] mt-3 uppercase tracking-[0.25em]">Porto · Fev 2026</p>
          </Fade>
        </div>
      </section>

      {/* ── Percurso ── */}
      <section className="px-6 md:px-12 py-28 max-w-6xl mx-auto">
        <Fade>
          <p className="font-mono-label text-copper mb-10">§ 04 — Percurso</p>
          <p className="font-display text-4xl md:text-5xl leading-[1.05] mb-16 max-w-2xl">
            Não aconteceu de repente.<br /><span className="font-italic-serif text-copper">Foi acumulando.</span>
          </p>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10">
          {sobreTexts.percurso.map((item) => (
            <div key={item.ano} className="bg-background px-8 py-10">
              <p className="font-mono-label text-copper mb-4">{item.ano}</p>
              <p className="font-display text-2xl mb-4">{item.titulo}</p>
              <p className="text-foreground/60 leading-relaxed text-sm">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Imagem intermédia ── */}
      <div className="px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-2 gap-px bg-foreground/10 mb-0">
        <Fade>
          <div className="hover-zoom relative aspect-[4/3] overflow-hidden">
            <img src={portoAzulejos} alt="Esquina de azulejo, Porto" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </Fade>
        <Fade delay={0.1}>
          <div className="hover-zoom relative aspect-[4/3] overflow-hidden">
            <img src={marTetrapodos} alt="Linha de costa, Peniche" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </Fade>
      </div>

      {/* ── As quatro séries ── */}
      <Fade className="px-6 md:px-12 py-28 max-w-6xl mx-auto">
        <p className="font-mono-label text-copper mb-10">§ 05 — As séries</p>
        <p className="font-display text-4xl md:text-6xl leading-[1.05] mb-16 max-w-3xl">
          Quatro séries paralelas.<br /><span className="font-italic-serif text-copper">Nenhuma fechada.</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10">
          {categories.map((cat, i) => (
            <div key={cat.slug} className="bg-background px-8 py-10">
              <p className="font-mono-label text-copper mb-6">{String(i + 1).padStart(2, "0")}</p>
              <p className="font-display text-4xl mb-5">{cat.title}</p>
              <p className="text-foreground/60 leading-relaxed text-sm">{cat.description}</p>
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
        <p className="font-mono-label text-copper mb-8">§ 06 — O porquê</p>
        <p className="font-display text-4xl md:text-6xl leading-[1.05] mb-12 max-w-4xl">
          Nasceu de uma vontade simples: criar algo que se <span className="font-italic-serif text-copper">sinta</span> mais do que se veja.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
          <p className="text-foreground/68 leading-relaxed">
            A fotografia aqui não serve para mostrar como um momento parecia. Serve para guardar como ele se <em>sentia</em>. Este sítio não é um portefólio comercial — é o lugar onde as séries vivem enquanto crescem.
          </p>
          <p className="text-foreground/68 leading-relaxed">
            O que procuro é simples. Momentos que continuam vivos muito depois do clique. O arquivo cresce devagar — que é a única velocidade que faz sentido.
          </p>
        </div>
      </Fade>

      {/* ── Pequenas Constâncias ── */}
      <section className="px-6 md:px-12 py-28 max-w-6xl mx-auto">
        <Fade>
          <p className="font-mono-label text-copper mb-10">§ 07 — Pequenas constâncias</p>
          <p className="font-display text-4xl md:text-5xl leading-[1.05] mb-4 max-w-2xl">
            Coisas que ficam<br /><span className="font-italic-serif text-copper">sempre iguais.</span>
          </p>
          <p className="text-foreground/40 max-w-md mb-16 body-text leading-relaxed">
            Fragmentos de um caderno pessoal. Não são hobbies. São constâncias.
          </p>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-foreground/10">
          {sobreTexts.pequenasConstancias.map((item, i) => (
            <Fade key={item.titulo} delay={i * 0.05}
              className={`border-b border-foreground/10 py-10 ${i % 2 === 0 ? "md:pr-16 md:border-r md:border-foreground/10" : "md:pl-16"}`}>
              <p className="font-mono-label text-copper/60 mb-4 text-[9px] tracking-[0.38em] uppercase">{item.titulo}</p>
              <p className="text-foreground/65 leading-relaxed font-italic-serif text-lg">{item.texto}</p>
            </Fade>
          ))}
        </div>
      </section>

      <div className="hairline mx-6 md:mx-12" />

      {/* ── Ritmos ── */}
      <section className="bg-foreground text-cream px-6 md:px-12 py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <Fade>
            <p className="font-mono-label text-copper mb-10">§ 08 — Ritmos</p>
            <p className="font-display text-4xl md:text-5xl text-cream leading-[1.05] mb-16 max-w-xl">
              O que uso<br /><span className="font-italic-serif text-copper">consoante o dia</span>.
            </p>
          </Fade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/8 max-w-4xl">
            {sobreTexts.ritmos.map((r, i) => (
              <Fade key={r.recurso} delay={i * 0.07} className="bg-foreground px-8 py-10">
                <p className="font-mono-label text-cream/35 text-[9px] leading-relaxed mb-5 tracking-[0.2em]">{r.quando}</p>
                <p className="font-display text-3xl text-copper">{r.recurso}</p>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cartografia Pessoal ── */}
      <section className="px-6 md:px-12 py-28 max-w-6xl mx-auto">
        <Fade>
          <p className="font-mono-label text-copper mb-10">§ 09 — Cartografia pessoal</p>
          <p className="font-display text-4xl md:text-5xl leading-[1.05] mb-4 max-w-2xl">
            Lugares que habitam<br /><span className="font-italic-serif text-copper">o pensamento.</span>
          </p>
          <p className="text-foreground/40 leading-relaxed max-w-md mb-16 body-text">
            Não destinos. Não listas de viagem. Lugares que ficaram — alguns visitados, outros apenas sonhados.
          </p>
        </Fade>
        <div className="max-w-3xl space-y-12">
          <Fade>
            <p className="font-mono-label text-foreground/30 text-[9px] tracking-[0.45em] uppercase mb-4">visitadas</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10">
              {sobreTexts.cartografiaVisitadas.map((lugar, i) => (
                <Fade key={lugar.cidade} delay={i * 0.06} className="bg-background px-8 py-8">
                  <p className="font-display text-2xl mb-3">{lugar.cidade}</p>
                  <p className="text-foreground/50 text-sm leading-relaxed">{lugar.nota}</p>
                </Fade>
              ))}
            </div>
          </Fade>

          <Fade delay={0.15}>
            <p className="font-mono-label text-copper/50 text-[9px] tracking-[0.45em] uppercase mb-4">sonhadas</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10">
              {sobreTexts.cartografiaSonhadas.map((lugar, i) => (
                <Fade key={lugar.cidade} delay={i * 0.06} className="bg-background px-8 py-8">
                  <p className="font-display text-2xl mb-3">{lugar.cidade}</p>
                  <p className="text-foreground/50 text-sm leading-relaxed">{lugar.nota}</p>
                </Fade>
              ))}
            </div>
          </Fade>
        </div>
        <Whisper text="lugares reais · lugares imaginados · todos habitados" delay={1.8} className="mt-14" />
      </section>

      {/* ── Neste momento ── */}
      <Fade className="px-6 md:px-12 py-28 max-w-6xl mx-auto">
        <p className="font-mono-label text-copper mb-10">§ 10 — Neste momento</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 max-w-2xl">
          {[
            { label: "a ler", nota: momento.aLer, url: momento.aLerUrl, linkLabel: "ver no Bertrand" },
            { label: "à escuta", nota: momento.aEscutar, url: momento.aEscutarUrl, linkLabel: "abrir no Spotify" },
            { label: "a fotografar", nota: momento.aFotografar, url: undefined, linkLabel: "" },
            { label: "a pensar em", nota: momento.aPensarEm, url: undefined, linkLabel: "" },
          ].map((item) => (
            <div key={item.label} className="bg-background px-8 py-8">
              <p className="font-mono-label text-copper/50 text-[9px] tracking-[0.4em] uppercase mb-4">{item.label}</p>
              <p className="text-foreground/60 text-sm leading-relaxed">{item.nota}</p>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 group"
                >
                  <span className="font-mono-label text-[8px] uppercase tracking-[0.38em] text-foreground/25 group-hover:text-copper transition-colors duration-300">
                    {item.linkLabel}
                  </span>
                  <span className="text-foreground/20 group-hover:text-copper transition-colors duration-300 text-[9px]">→</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </Fade>

      <div className="hairline mx-6 md:mx-12" />

      <motion.p
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="font-mono-label text-[9px] text-foreground/20 lowercase tracking-[0.3em] text-center py-10 px-6"
      >
        algumas coisas ficam guardadas para quem procura de verdade.
      </motion.p>

      <div className="hairline mx-6 md:mx-12" />

      {/* ── Fecho ── */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="px-6 md:px-12 py-32 text-center max-w-2xl mx-auto">
        <p className="font-italic-serif text-5xl text-copper mb-10">—</p>
        <p className="text-foreground/60 leading-relaxed text-lg">
          Se algo aqui te ficou, escreve. Não há formulários nem preços. Há uma conversa possível, sobre uma imagem ou um lugar.
        </p>
        <Link to="/contacto"
          className="mt-12 inline-block border border-foreground/30 text-foreground px-10 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-copper hover:border-copper hover:text-cream transition-all duration-500">
          Escrever
        </Link>
        <p className="font-italic-serif text-sm text-foreground/35 mt-12 italic">
          há palavras que abrem portas.
        </p>
      </motion.section>

      <SiteFooter />
    </div>
  );
}
