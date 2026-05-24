import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Diálogo — Rosmaninho" },
      { name: "description", content: "Diálogo: ensaios autorais, publicações independentes, curadoria e aquisição de impressões Fine Art." },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      <section className="px-6 md:px-12 pt-32 md:pt-40 pb-32 grid grid-cols-12 gap-8">
        {/* Coluna esquerda — info */}
        <div className="col-span-12 md:col-span-4">
          <p className="font-mono-label">[ ESPAÇO DE DIÁLOGO ]</p>
          <h1 className="font-display uppercase text-6xl md:text-8xl leading-[0.9] mt-6 tracking-wide">
            Diálogo
          </h1>

          <p className="mt-12 body-text max-w-sm" style={{ textAlign: "justify" }}>
            Para ensaios autorais, publicações independentes, curadoria ou
            aquisição de impressões Fine Art.
          </p>

          <div className="mt-16 space-y-6">
            <div>
              <p className="font-mono-label">[ EMAIL ]</p>
              <a href="mailto:ola@rosmaninho.pt" className="font-display text-2xl mt-2 inline-block hover:text-accent transition-colors">
                ola@rosmaninho.pt
              </a>
            </div>
            <div>
              <p className="font-mono-label">[ FUSO HORÁRIO ]</p>
              <p className="font-display text-2xl mt-2">GMT+00 · Lisboa</p>
            </div>
            <div>
              <p className="font-mono-label">[ INSTAGRAM ]</p>
              <a href="https://instagram.com/luisarosmaninh" target="_blank" rel="noreferrer" className="font-display text-2xl mt-2 inline-block hover:text-accent transition-colors">
                @luisarosmaninh
              </a>
            </div>
          </div>
        </div>

        {/* Coluna direita — formulário sem caixas */}
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="col-span-12 md:col-span-7 md:col-start-6 md:pt-32 space-y-16"
        >
          <LineField label="O teu nome" name="nome" />
          <LineField label="O teu e-mail" name="email" type="email" />
          <LineField label="A tua mensagem" name="mensagem" multiline />

          <button
            type="submit"
            disabled={sent}
            className="font-mono-label hover:text-accent transition-colors"
          >
            [ {sent ? "MENSAGEM ENVIADA ✓" : "ENVIAR MENSAGEM"} ]
          </button>
        </form>
      </section>

      <SiteFooter />
    </div>
  );
}

function LineField({
  label, name, type = "text", multiline = false,
}: { label: string; name: string; type?: string; multiline?: boolean }) {
  return (
    <div className="relative">
      <label htmlFor={name} className="font-mono-label block mb-4">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          required
          rows={3}
          className="w-full bg-transparent border-0 border-b border-foreground focus:border-accent focus:outline-none py-3 text-lg resize-none font-display italic"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required
          className="w-full bg-transparent border-0 border-b border-foreground focus:border-accent focus:outline-none py-3 text-lg font-display italic"
        />
      )}
      <span aria-hidden className="absolute right-0 bottom-3 font-mono-label">————————</span>
    </div>
  );
}
