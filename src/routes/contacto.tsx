import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { z } from "zod";
import { sendContactEmail } from "@/lib/contact-fn";
import { getContactoTexts, CONTACTO_DEFAULTS } from "@/lib/content-fns";
import sunsetBeach from "@/assets/sunset-beach.jpg";

const assuntoOpcoes = [
  { value: "uma imagem",          label: "Uma imagem"          },
  { value: "uma impressão",       label: "Uma impressão"       },
  { value: "uma conversa",        label: "Uma conversa"        },
  { value: "outra coisa",         label: "Outra coisa"         },
];

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Diálogo — Rosmaninho Fotografia" },
      { name: "description", content: "Uma conversa aberta. Escreve sobre uma imagem, um lugar ou uma ideia." },
    ],
    links: [{ rel: "canonical", href: "https://rosmaninhofotografia.pt/contacto" }],
  }),
  loader: async () => {
    const texts = await getContactoTexts().catch(() => CONTACTO_DEFAULTS);
    return { texts };
  },
  component: ContactoPage,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Diz-me o teu nome").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  assunto: z.string().optional(),
  mensagem: z.string().trim().min(10, "Conta-me um pouco mais").max(1500),
});

function ContactoPage() {
  const { texts } = Route.useLoaderData();
  const [sent, setSent] = useState(false);
  const [smtpMissing, setSmtpMissing] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [assunto, setAssunto] = useState<string | null>(null);

  const [notaPessoal, setNotaPessoal] = useState(texts.notasPool[0] ?? "");
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const pool = texts.notasPool.filter(Boolean);
    if (pool.length > 1) setNotaPessoal(pool[Math.floor(Math.random() * pool.length)]);
  }, [texts.notasPool]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (assunto) fd.set("assunto", assunto);
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
      const result = await sendContactEmail({ data: parsed.data });
      setSmtpMissing(result.smtpMissing === true);
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
            <p className="font-mono-label text-copper mb-8">{texts.tagline}</p>
            <h1 className="font-display text-[clamp(3.5rem,8vw,6rem)] leading-[0.92]">
              Se algo ficou,<br />
              <span className="font-italic-serif text-copper">escreve</span>.
            </h1>
            <p className="mt-8 text-foreground/65 leading-relaxed max-w-sm text-lg">
              {texts.introText}
            </p>
            <p className="mt-4 text-foreground/65 leading-relaxed max-w-sm">
              {texts.responseNote}
            </p>
            <p className="font-mono-label text-[9px] text-foreground/20 mt-8 lowercase tracking-[0.3em]">
              {texts.footerLine2}
            </p>
            {notaPessoal && (
              <p className="font-italic-serif text-foreground/30 text-sm mt-8 italic border-l border-copper/20 pl-4">
                {notaPessoal}
              </p>
            )}
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
                  {smtpMissing ? (
                    <>
                      <p className="font-italic-serif text-4xl text-foreground/50 mb-4">Recebido.</p>
                      <p className="text-foreground/55 leading-relaxed">
                        A tua mensagem chegou ao servidor, mas o envio por email ainda não está configurado.
                        Podes escrever directamente para{" "}
                        <a href="mailto:ola@rosmaninhofotografia.pt" className="text-copper underline underline-offset-4">
                          ola@rosmaninhofotografia.pt
                        </a>
                        .
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-italic-serif text-4xl text-copper mb-4">{texts.confirmTitle}</p>
                      <p className="text-foreground/65 leading-relaxed">
                        {texts.confirmText}
                      </p>
                      <p className="font-mono-label text-foreground/30 mt-8">L.R. · Rosmaninho</p>
                      <p className="font-italic-serif text-xs text-foreground/20 mt-6 italic">
                        {texts.footerLine3}
                      </p>
                    </>
                  )}
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

                  {/* Assunto — opcional */}
                  <div className="flex flex-col gap-3">
                    <p className="font-mono-label text-foreground/50">
                      Sobre o quê?
                      <span className="ml-2 text-foreground/25 normal-case tracking-normal" style={{ fontSize: "10px" }}>opcional</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {assuntoOpcoes.map((op) => {
                        const active = assunto === op.value;
                        return (
                          <button
                            key={op.value}
                            type="button"
                            onClick={() => setAssunto(active ? null : op.value)}
                            className={`px-4 py-2 text-[10px] uppercase tracking-[0.28em] border transition-all duration-300 ${
                              active
                                ? "border-copper bg-copper/10 text-copper"
                                : "border-foreground/15 text-foreground/40 hover:border-foreground/30 hover:text-foreground/70"
                            }`}
                          >
                            {op.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label htmlFor="mensagem" className="font-mono-label text-foreground/50">Mensagem</label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows={6}
                      placeholder="Escreve o que te trouxe até aqui — uma imagem que ficou, um lugar, uma ideia, ou simplesmente algo que quiseres partilhar."
                      className="bg-transparent border-b border-foreground/20 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-copper focus:outline-none transition-colors duration-500 resize-none leading-relaxed"
                      aria-describedby={errors.mensagem ? "mensagem-error" : undefined}
                    />
                    {errors.mensagem && (
                      <span id="mensagem-error" className="text-xs text-copper" role="alert">{errors.mensagem}</span>
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
                  <a href={`mailto:${texts.email}`} className="hover:text-copper transition-colors">
                    {texts.email}
                  </a>
                </div>
                <div>
                  <p className="font-mono-label text-foreground/35 mb-1">Instagram</p>
                  <a href={`https://instagram.com/${texts.instagram.replace(/^@/, "")}`} target="_blank" rel="noreferrer" className="hover:text-copper transition-colors">
                    {texts.instagram}
                  </a>
                </div>
              </div>
            )}

            <div className="mt-16">
              <p className="font-italic-serif text-sm text-foreground/35 italic">
                {texts.footerLine1}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Coluna direita: imagem atmosférica ── */}
        <div className="relative hidden lg:block">
          <img
            src={texts.sidebarImage || sunsetBeach}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/55 to-black/82" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.8 }}
            className="absolute bottom-12 left-12 right-12 text-cream"
          >
            <p className="font-italic-serif text-5xl text-copper mb-3">"</p>
            <p className="font-display text-3xl md:text-4xl leading-[1.15] max-w-sm">
              {texts.sidebarQuote}
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
  const id = `field-${name}`;
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="font-mono-label text-foreground/50">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className="bg-transparent border-b border-foreground/20 py-3 text-sm placeholder:text-foreground/30 focus:border-copper focus:outline-none transition-colors duration-500"
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <span id={`${id}-error`} className="text-xs text-copper" role="alert">{error}</span>}
    </div>
  );
}
