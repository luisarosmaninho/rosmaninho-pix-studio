import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Rosmaninho Fotografia" },
      { name: "description", content: "Entre em contacto com Luísa Rosmaninho para encomendas, exposições e colaborações." },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="px-6 md:px-12 pt-32 md:pt-40 pb-24 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <p className="font-mono-label text-muted-foreground">— Contacto</p>
          <h1 className="font-display text-5xl md:text-7xl mt-4 leading-none">Vamos<br /><em className="text-accent not-italic">conversar</em>.</h1>
          <div className="mt-12 space-y-6">
            <div>
              <p className="font-mono-label text-muted-foreground">Email</p>
              <a href="mailto:ola@rosmaninho.pt" className="text-xl mt-1 inline-block border-b border-foreground pb-1">ola@rosmaninho.pt</a>
            </div>
            <div>
              <p className="font-mono-label text-muted-foreground">Telefone</p>
              <p className="text-xl mt-1">+351 910 000 000</p>
            </div>
            <div>
              <p className="font-mono-label text-muted-foreground">Estúdio</p>
              <p className="text-xl mt-1">Coimbra, Portugal</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="md:col-span-7 md:pl-12 space-y-8"
        >
          <Field label="Nome" name="nome" />
          <Field label="Email" name="email" type="email" />
          <Field label="Assunto" name="assunto" />
          <div>
            <label className="font-mono-label text-muted-foreground block mb-3">Mensagem</label>
            <textarea required rows={5} className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 text-lg resize-none" />
          </div>
          <button type="submit" disabled={sent} className="font-mono-label border-b border-foreground hover:text-accent hover:border-accent pb-1 transition-colors">
            {sent ? "Mensagem enviada ✓" : "Enviar mensagem →"}
          </button>
        </form>
      </section>
      <SiteFooter />
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="font-mono-label text-muted-foreground block mb-3">{label}</label>
      <input id={name} name={name} type={type} required className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 text-lg" />
    </div>
  );
}
