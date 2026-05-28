import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { journal } from "@/lib/journal";

export const Route = createFileRoute("/diario/")({
  head: () => ({
    meta: [
      { title: "Diário — Rosmaninho" },
      { name: "description", content: "Caderno em aberto. Ensaios curtos sobre fotografias e sobre os lugares onde aconteceram." },
    ],
  }),
  component: JournalIndex,
});

function JournalIndex() {
  const sorted = [...journal].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-background text-foreground min-h-screen">
      <SiteNav variant="solid" />

      <section className="px-6 md:px-12 pt-32 md:pt-44 pb-28 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <p className="font-italic-serif text-3xl text-copper mb-6">diário</p>
          <h1 className="font-display text-6xl md:text-9xl leading-[0.9] tracking-tight">
            Diário.
          </h1>
          <p className="mt-10 max-w-md body-text text-foreground/55 leading-relaxed">
            Caderno em aberto. Ensaios curtos sobre fotografias e sobre os lugares onde aconteceram.
          </p>
        </motion.div>
      </section>

      <div className="hairline mx-6 md:mx-12" />

      <section className="px-6 md:px-12 py-4 max-w-6xl mx-auto">
        {sorted.map((entry, i) => (
          <motion.div
            key={entry.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 1.1, delay: i * 0.06, ease: "easeOut" }}
          >
            <Link
              to="/diario/$slug"
              params={{ slug: entry.slug }}
              className="group relative flex flex-col md:grid md:grid-cols-12 gap-4 py-16 md:py-20 border-b border-foreground/8 overflow-hidden"
            >
              {/* Left: empty spacer */}
              <div className="md:col-span-3" />

              {/* Center: content */}
              <div className="md:col-span-7 md:col-start-4">
                <h2 className="font-display italic text-3xl md:text-5xl leading-[1.1] group-hover:text-copper transition-colors duration-500">
                  {entry.title}
                </h2>
                <p className="mt-5 body-text text-foreground/60 max-w-xl leading-relaxed">
                  {entry.excerpt}
                </p>
                <span className="font-mono-label mt-8 inline-block text-foreground/35 group-hover:text-copper transition-colors duration-500">
                  ler →
                </span>
              </div>

              {/* Right: photo thumbnail on hover */}
              <div className="md:col-span-2 hidden md:flex items-center justify-end pr-2">
                <div className="w-20 h-20 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 shrink-0">
                  <img
                    src={entry.photoSrc}
                    alt=""
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      <div className="h-40" />
      <SiteFooter />
    </div>
  );
}
