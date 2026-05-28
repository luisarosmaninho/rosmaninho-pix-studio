import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { z } from "zod";
import { sendContactEmail } from "@/lib/contact-fn";
import sunsetBeach from "@/assets/sunset-beach.jpg";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Diálogo — Rosmaninho Fotografia" },
      { name: "description", content: "Uma conversa aberta. Escreve sobre uma imagem, um lugar ou uma ideia." },
    ],
  }),
  component: ContactoPage,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Diz-me o teu nome").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  mensagem: z.string().trim().min(10, "Conta-me um pouco mais").max(1500),
});

function ContactoPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    setServerError("");
    setSending(true);
    try {
      await sendContactEmail({ data: parsed.data });
      setSent(true);
    } catch {
      setServerError("Não consegui enviar a mensagem. Tenta por email directamente.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* ── Coluna esquerda: texto + formulário ── */}
        <div className="px-6 md:px-12 lg:px-20 pt-36 pb-24 flex flex-col justify-between">

          {/* Abertura */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="max-w-lg"
          >
            <p className="font-mono-label text-copper mb-8">Diálogo · Coimbra</p>
            <h1 className="font-display text-[clamp(3.5rem,8vw,6rem)] leading-[0.92]">
              Se algo ficou,<br />
              <span className="font-italic-serif text-copper">escreve</span>.
            </h1>
            <p className="mt-8 text-foreground/65 leading-relaxed max-w-sm text-lg">
              Não há tabelas nem pacotes. Não há respostas automáticas. Há uma conversa possível — sobre uma imagem, um lugar, um momento, ou uma impressão que queiras ter à parede.
            </p>
            <p className="mt-4 text-foreground/65 leading-relaxed max-w-sm">
              Respondo quando o tempo deixar, com calma.
            </p>
          </motion.div>

          {/* Formulário ou confirmação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3 }}
            className="mt-16 max-w-lg"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="py-12 border-t border-b border-foreground/15"
                >
                  <p className="font-italic-serif text-4xl text-copper mb-4">Recebido.</p>
                  <p className="text-foreground/65 leading-relaxed">
                    Fica descansado — li com atenção. Volto a ti em breve, por email, sem pressa.
                  </p>
                  <p className="font-mono-label text-foreground/30 mt-8">L.R. · Rosmaninho</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  className="space-y-8"
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <Field label="Nome" name="nome" error={errors.nome} placeholder="o teu nome" />
                    <Field label="Email" name="email" type="email" error={errors.email} placeholder="o teu email" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="font-mono-label text-foreground/50">Mensagem</label>
                    <textarea
                      name="mensagem"
                      rows={6}
                      placeholder="Escreve o que te trouxe até aqui — uma imagem que ficou, um lugar, uma ideia, ou simplesmente algo que quiseres partilhar."
                      className="bg-transparent border-b border-foreground/20 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-copper focus:outline-none transition-colors duration-500 resize-none leading-relaxed"
                    />
                    {errors.mensagem && (
                      <span className="text-xs text-copper">{errors.mensagem}</span>
                    )}
                  </div>

                  {serverError && (
                    <p className="text-xs text-copper border border-copper/20 px-4 py-3">{serverError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="group flex items-center gap-4 bg-foreground text-cream px-8 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-copper transition-colors duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? "A enviar…" : "Enviar"}
                    {!sending && <span className="opacity-40 group-hover:opacity-100 transition-opacity">→</span>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Contactos directos */}
            {!sent && (
              <div className="mt-16 pt-8 border-t border-foreground/10 flex flex-wrap gap-x-12 gap-y-4 text-sm">
                <div>
                  <p className="font-mono-label text-foreground/35 mb-1">Email directo</p>
                  <a href="mailto:ola@rosmaninhofotografia.pt" className="hover:text-copper transition-colors">
                    ola@rosmaninhofotografia.pt
                  </a>
                </div>
                <div>
                  <p className="font-mono-label text-foreground/35 mb-1">Instagram</p>
                  <a href="https://instagram.com/luisarosmaninh" target="_blank" rel="noreferrer" className="hover:text-copper transition-colors">
                    @luisarosmaninh
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Coluna direita: imagem atmosférica ── */}
        <div className="relative hidden lg:block">
          <img
            src={sunsetBeach}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/20 via-foreground/50 to-foreground/80" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.8 }}
            className="absolute bottom-12 left-12 right-12 text-cream"
          >
            <p className="font-italic-serif text-5xl text-copper mb-3">"</p>
            <p className="font-display text-3xl md:text-4xl leading-[1.15] max-w-sm">
              Não há pressa. Há uma conversa, se quiseres tê-la.
            </p>
            <div className="mt-8 h-px bg-cream/20 max-w-xs" />
            <p className="font-mono-label text-cream/35 mt-4">Coimbra · Portugal</p>
          </motion.div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

function Field({
  label, name, type = "text", error, placeholder,
}: {
  label: string; name: string; type?: string; error?: string; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-mono-label text-foreground/50">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="bg-transparent border-b border-foreground/20 py-3 text-sm placeholder:text-foreground/30 focus:border-copper focus:outline-none transition-colors duration-500"
      />
      {error && <span className="text-xs text-copper">{error}</span>}
    </div>
  );
}
