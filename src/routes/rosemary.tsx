import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BotanicalMark } from "@/components/BotanicalMark";
import { getRosemary } from "@/lib/content-fns";

export const Route = createFileRoute("/rosemary")({
  head: () => ({
    meta: [
      { title: "Rosmaninho Fotografia" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  loader: async () => {
    const rosemary = await getRosemary();
    return { rosemary };
  },
  component: RosemaryPage,
});

function RosemaryPage() {
  const { rosemary } = Route.useLoaderData();
  const router = useRouter();

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.09 0.01 45)", color: "oklch(0.78 0.022 65)" }}
    >
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between"
        style={{ background: "oklch(0.09 0.01 45 / 92%)", backdropFilter: "blur(8px)" }}
      >
        <span
          className="font-mono-label text-[9px] uppercase tracking-[0.5em]"
          style={{ color: "oklch(0.45 0.018 65)" }}
        >
          § — interior
        </span>
        <button
          onClick={() => router.history.back()}
          className="font-mono-label text-[9px] uppercase tracking-[0.4em] transition-colors duration-200"
          style={{ color: "oklch(0.40 0.016 65)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.66 0.115 55)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.40 0.016 65)")}
        >
          ← fechar
        </button>
      </nav>

      <main className="max-w-2xl mx-auto px-8 pt-32 pb-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="mb-20"
        >
          <p
            className="font-mono-label text-[8px] uppercase tracking-[0.6em] mb-8"
            style={{ color: "oklch(0.35 0.015 45)" }}
          >
            reservado · não indexado · encontrado
          </p>
          <h1
            className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.95] tracking-tight mb-8"
            style={{ color: "oklch(0.88 0.018 70)" }}
          >
            O QUE NÃO CABE<br />NUMA FOTOGRAFIA.
          </h1>
          <div
            className="w-10 h-px mb-8"
            style={{ background: "oklch(0.66 0.115 55 / 40%)" }}
          />
          <p
            className="font-italic-serif text-xl leading-relaxed"
            style={{ color: "oklch(0.58 0.025 60)" }}
          >
            Há lugares que só existem em palavras.
          </p>
          <p
            className="font-italic-serif text-xl leading-relaxed mt-1"
            style={{ color: "oklch(0.45 0.018 60)" }}
          >
            Este é um deles.
          </p>
        </motion.div>

        {/* Sections from DB */}
        <div className="space-y-16">
          {rosemary.sections.map((section, si) => (
            <motion.section
              key={si}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15 + si * 0.12, ease: "easeOut" }}
            >
              <h2
                className="font-mono-label text-[9px] uppercase tracking-[0.5em] mb-6"
                style={{ color: "oklch(0.50 0.022 55)" }}
              >
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.body.map((paragraph, pi) => (
                  <p
                    key={pi}
                    style={{
                      fontSize: "clamp(0.96rem, 2vw, 1.08rem)",
                      color: pi === 0 && si === 0
                        ? "oklch(0.88 0.018 70)"
                        : "oklch(0.70 0.013 62)",
                      whiteSpace: "pre-line",
                      fontWeight: pi === 0 && si === 0 ? "500" : "normal",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Closing mark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.2 }}
          className="pt-20 border-t"
          style={{ borderColor: "oklch(0.88 0.018 70 / 6%)" }}
        >
          <p
            className="font-italic-serif text-2xl md:text-3xl mb-4"
            style={{ color: "oklch(0.66 0.115 55)" }}
          >
            L. Rosmaninho
          </p>
          <p
            className="font-mono-label text-[9px] uppercase tracking-[0.45em]"
            style={{ color: "oklch(0.35 0.015 45)" }}
          >
            Coimbra · 40°12′N · 8°25′O
          </p>
          <p
            className="font-italic-serif text-[11px] mt-8 italic"
            style={{ color: "oklch(0.30 0.012 45)" }}
          >
            rosmarinus officinalis — persistência, memória, retorno.
          </p>
          <div className="mt-10 flex justify-center">
            <BotanicalMark size={22} className="opacity-65" style={{ color: "oklch(0.66 0.115 55)" }} />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
