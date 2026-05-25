import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { z } from "zod";
import sunsetBeach from "@/assets/sunset-beach.jpg";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Reservar — Rosmaninho Fotografia" },
      { name: "description", content: "Pedido de sessão fotográfica: casamentos, retratos, lifestyle e branding." },
      { property: "og:title", content: "Reservar — Rosmaninho" },
      { property: "og:description", content: "Vamos criar algo juntos." },
    ],
  }),
  component: ContactoPage,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Diz-me o teu nome").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  tipo: z.string().min(1, "Escolhe o tipo de sessão"),
  data: z.string().max(30).optional().or(z.literal("")),
  mensagem: z.string().trim().min(10, "Conta-me um pouco mais").max(1500),
});

function ContactoPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen pt-24">
        {/* Left: form */}
        <div className="px-6 md:px-12 lg:px-20 py-16 lg:py-24 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-xl"
          >
            <p className="font-script text-3xl md:text-4xl text-gold mb-4">vamos falar</p>
            <h1 className="font-display text-4xl md:text-6xl leading-[1.05]">
              Reservar a tua <span className="italic">sessão</span>.
            </h1>
            <p className="mt-6 text-foreground/70 max-w-md">
              Preenche o pedido e respondo em 24 horas. Sem compromisso — só uma conversa.
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-12 border border-gold p-8 bg-cream"
              >
                <p className="font-display text-2xl text-gold">Recebido com carinho.</p>
                <p className="mt-3 text-foreground/70">Volto a ti em breve por email.</p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Nome" name="nome" error={errors.nome} />
                <Field label="Email" name="email" type="email" error={errors.email} />
                <div className="flex flex-col gap-2">
                  <label className="font-mono-label">Tipo de sessão</label>
                  <select
                    name="tipo"
                    defaultValue=""
                    className="bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold focus:outline-none transition-colors"
                  >
                    <option value="" disabled>Escolhe...</option>
                    <option value="casamento">Casamento</option>
                    <option value="retrato">Retrato</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="branding">Branding</option>
                    <option value="outro">Outro</option>
                  </select>
                  {errors.tipo && <span className="text-xs text-destructive">{errors.tipo}</span>}
                </div>
                <Field label="Data prevista" name="data" type="date" error={errors.data} />
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="font-mono-label">Mensagem</label>
                  <textarea
                    name="mensagem"
                    rows={5}
                    placeholder="Conta-me sobre ti e o que imaginas..."
                    className="bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                  {errors.mensagem && <span className="text-xs text-destructive">{errors.mensagem}</span>}
                </div>
                <button
                  type="submit"
                  className="md:col-span-2 mt-4 bg-foreground text-cream px-8 py-4 text-xs uppercase tracking-[0.28em] hover:bg-gold transition-colors duration-500 self-start"
                >
                  Enviar pedido
                </button>
              </form>
            )}

            <div className="mt-16 pt-8 border-t border-foreground/10 grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-mono-label mb-2">Email</p>
                <a href="mailto:ola@rosmaninhofotografia.pt" className="hover:text-gold">ola@rosmaninhofotografia.pt</a>
              </div>
              <div>
                <p className="font-mono-label mb-2">WhatsApp</p>
                <a href="https://wa.me/351900000000" target="_blank" rel="noreferrer" className="hover:text-gold">+351 900 000 000</a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: image */}
        <div className="relative hidden lg:block">
          <img src={sunsetBeach} alt="Reservar sessão" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/60" />
          <div className="absolute bottom-12 left-12 right-12 text-cream">
            <p className="font-script text-4xl text-gold">um instante</p>
            <p className="font-display text-3xl mt-3 max-w-md">Que dure para sempre.</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono-label">{label}</label>
      <input
        name={name}
        type={type}
        className="bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold focus:outline-none transition-colors"
      />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}
