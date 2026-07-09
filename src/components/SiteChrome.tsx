import { useEffect, useRef, useState, createContext, useContext, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { BotanicalMark } from "@/components/BotanicalMark";
import { motion, AnimatePresence } from "framer-motion";
import { isNightInPortugal, getSunTimes } from "@/lib/sun";
import Lenis from "lenis";
import logoHeaderLight from "@/assets/logo-header-light.png";
import logoHeaderDark from "@/assets/logo-header-dark.png";
import { type ChromeConfig, CHROME_DEFAULTS } from "@/lib/chrome-config";

/* ── Config global (menu + rodapé) via contexto ───────────────────────────────
   Alimentado pelo loader da rota raiz (__root). Fallback nos defaults para que
   qualquer componente que use SiteNav/SiteFooter funcione mesmo sem provider. */
const ChromeContext = createContext<ChromeConfig>(CHROME_DEFAULTS);
export function ChromeProvider({ value, children }: { value: ChromeConfig; children: ReactNode }) {
  return <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>;
}
export function useChrome(): ChromeConfig {
  return useContext(ChromeContext);
}

/* ── Informação solar ─────────────────────────────────────────────────────── */
interface SunInfo {
  isDark: boolean;
  sunrise: string;
  sunset: string;
  nextLabel: string;   // "Amanhecer" | "Anoitecer"
  nextTime: string;    // "HH:MM"
  nextIn: string;      // "em Xh Ymin" | "em Ymin"
}

function useSunInfo(): SunInfo | null {
  const [info, setInfo] = useState<SunInfo | null>(null);

  useEffect(() => {
    function compute() {
      const now = new Date();
      const t = getSunTimes(now);
      const dark = isNightInPortugal();

      const fmt = (d: Date) =>
        d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });

      let next: Date;
      let nextLabel: string;
      if (dark) {
        nextLabel = "Amanhecer";
        next = t.sunrise;
        if (next.getTime() <= now.getTime()) {
          next = new Date(next.getTime() + 86_400_000);
        }
      } else {
        nextLabel = "Anoitecer";
        next = t.sunset;
      }

      const diffMs = next.getTime() - now.getTime();
      const diffH  = Math.floor(diffMs / 3_600_000);
      const diffM  = Math.floor((diffMs % 3_600_000) / 60_000);
      const nextIn = diffH > 0 ? `em ${diffH}h ${diffM}min` : `em ${diffM}min`;

      setInfo({
        isDark: dark,
        sunrise: fmt(t.sunrise),
        sunset:  fmt(t.sunset),
        nextLabel,
        nextTime: fmt(next),
        nextIn,
      });
    }

    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);

  return info;
}

/* ── Ícones SVG mínimos ───────────────────────────────────────────────────── */
function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="10" height="10" viewBox="0 0 10 10"
      fill="currentColor" aria-hidden="true">
      <path d="M5 1.5A3.5 3.5 0 0 0 5 8.5 3 3 0 0 1 5 1.5z" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="11" height="11" viewBox="0 0 11 11"
      fill="currentColor" aria-hidden="true">
      <circle cx="5.5" cy="5.5" r="1.7" />
      {([0,45,90,135,180,225,270,315] as const).map((deg) => {
        const r  = (deg * Math.PI) / 180;
        const x1 = +(5.5 + Math.cos(r) * 2.7).toFixed(2);
        const y1 = +(5.5 + Math.sin(r) * 2.7).toFixed(2);
        const x2 = +(5.5 + Math.cos(r) * 3.9).toFixed(2);
        const y2 = +(5.5 + Math.sin(r) * 3.9).toFixed(2);
        return (
          <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
        );
      })}
    </svg>
  );
}

/* ── Modo noturno automático (Portugal — nascer/pôr do sol real) ─────────── */
export function NightMode() {
  useEffect(() => {
    function apply() {
      document.documentElement.classList.toggle("dark", isNightInPortugal());
    }
    apply();
    const id = setInterval(apply, 60_000); // verifica a cada minuto
    return () => clearInterval(id);
  }, []);
  return null;
}

/* ── Detector da palavra secreta "rosemary" ──────────────────────────────── */
export function RosemaryListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const SECRET = "rosemary";
    let buffer = "";

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        buffer = "";
        return;
      }
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-SECRET.length);
      if (buffer === SECRET) {
        buffer = "";
        navigate({ to: "/rosemary" });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return null;
}

/* ---------------- Back to top ---------------- */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.35 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2 group hidden md:flex"
          aria-label="Voltar ao topo"
        >
          <span className="block w-px h-10 bg-foreground/20 group-hover:bg-copper transition-colors duration-300" />
          <span className="font-mono-label text-[9px] uppercase tracking-[0.4em] text-foreground/30 group-hover:text-copper transition-colors duration-300">topo</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Film grain overlay ---------------- */
export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}

/* ---------------- Scroll progress bar ---------------- */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div ref={barRef} className="scroll-progress" style={{ transform: "scaleX(0)" }} aria-hidden="true" />;
}

/* ---------------- Smooth scroll ---------------- */
export function SmoothScroll() {
  useEffect(() => {
    // Skip on touch/mobile devices and when the user prefers reduced motion.
    // Lenis on low-end phones causes jank and drains battery.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (prefersReduced || isTouch) return;

    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return null;
}

/* ---------------- Custom cursor ---------------- */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Só activa em dispositivos com rato (pointer fino)
    const mq = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    if (!mq.matches) return;
    setVisible(true);

    const move = (e: MouseEvent) => {
      if (dot.current) dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!visible) return null;
  return <div ref={dot} className="cursor-dot" />;
}

/* ---------------- Page transition ---------------- */
export function PageFade({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

const navLinks = [
  { to: "/", labelKey: "navInicio", exact: true },
  { to: "/sobre", labelKey: "navAutora" },
  { to: "/portfolio", labelKey: "navFragmentos" },
  { to: "/diario", labelKey: "navDiario" },
  { to: "/notas", labelKey: "navNotas" },
  { to: "/contacto", labelKey: "navDialogo" },
] as const;

/* ---------------- Navigation ---------------- */
export function SiteNav({ variant = "solid" }: { variant?: "overlay" | "solid" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sunInfo = useSunInfo();
  const chrome = useChrome();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isOverlay = variant === "overlay" && !scrolled;
  const headerBg = scrolled
    ? "bg-background/95 backdrop-blur-md border-b border-border"
    : isOverlay ? "bg-transparent" : "bg-background";
  const text = isOverlay ? "text-cream" : "text-foreground";

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-700 ${headerBg} ${text}`}>
        <div className="flex items-center justify-between px-6 md:px-12 py-5">

          {/* ── Logo + easter egg lua/sol ── */}
          <div className="relative group/logo">
            <Link
              to="/"
              className="flex items-center gap-3"
              style={{ color: "inherit" }}
              onClick={() => setMenuOpen(false)}
              aria-label="Rosmaninho Fotografia — início"
            >
              {/* Logótipo — versão clara sobre fundos escuros; versão escura sobre o tema claro (dia) */}
              {isOverlay ? (
                <img
                  src={logoHeaderLight}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="h-11 md:h-14 w-auto select-none"
                />
              ) : (
                <>
                  <img
                    src={logoHeaderDark}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="block dark:hidden h-11 md:h-14 w-auto select-none"
                  />
                  <img
                    src={logoHeaderLight}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="hidden dark:block h-11 md:h-14 w-auto select-none"
                  />
                </>
              )}

              {/* Ícone lunar/solar — aparece subtilmente ao hover */}
              {sunInfo && (
                <span
                  className="hidden md:inline-flex items-center ml-2 opacity-0 group-hover/logo:opacity-35 transition-opacity duration-700 ease-in-out"
                  aria-hidden="true"
                >
                  {sunInfo.isDark
                    ? <MoonIcon />
                    : <SunIcon />
                  }
                </span>
              )}
            </Link>

            {/* Tooltip — visível só em desktop ao hover, CSS puro */}
            {sunInfo && (
              <div
                className="
                  absolute top-full left-0 mt-3 z-50
                  hidden md:block pointer-events-none select-none
                  opacity-0 translate-y-1.5
                  group-hover/logo:opacity-100 group-hover/logo:translate-y-0
                  transition-all duration-[380ms] ease-out
                  delay-0 group-hover/logo:delay-[140ms]
                "
              >
                <div
                  className="px-5 py-4 text-cream min-w-[196px]"
                  style={{
                    backgroundColor: "oklch(0.14 0.026 36)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Cabeçalho */}
                  <p className="font-mono-label text-copper/55 text-[8px] uppercase tracking-[0.42em] mb-3.5 flex items-center gap-2">
                    {sunInfo.isDark
                      ? <MoonIcon className="text-copper/60" />
                      : <SunIcon className="text-copper/60" />
                    }
                    {sunInfo.isDark ? "Modo Noturno" : "Modo Diurno"}
                  </p>

                  {/* Horas */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-8">
                      <span className="font-mono-label text-cream/35 text-[9px] uppercase tracking-[0.18em]">
                        Amanhecer
                      </span>
                      <span className="font-mono-label text-cream/75 text-[10px] tabular-nums">
                        {sunInfo.sunrise}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                      <span className="font-mono-label text-cream/35 text-[9px] uppercase tracking-[0.18em]">
                        Anoitecer
                      </span>
                      <span className="font-mono-label text-cream/75 text-[10px] tabular-nums">
                        {sunInfo.sunset}
                      </span>
                    </div>
                  </div>

                  {/* Próxima mudança */}
                  <div className="mt-3.5 pt-3 border-t border-cream/8">
                    <p className="font-mono-label text-cream/28 text-[8px] uppercase tracking-[0.25em] mb-1">
                      Próxima mudança · {sunInfo.nextLabel}
                    </p>
                    <p className="font-mono-label text-copper/65 text-[9px] tabular-nums">
                      {sunInfo.nextTime}
                      <span className="text-cream/35 ml-2">{sunInfo.nextIn}</span>
                    </p>
                  </div>

                  {/* Coordenadas — rodapé discreto */}
                  <p className="font-mono-label text-cream/18 text-[7.5px] tracking-[0.22em] mt-3.5">
                    40°12′N · 8°25′O · Coimbra
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.32em] uppercase">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={"exact" in l ? { exact: true } : undefined}
                className="link-underline hover:text-copper transition-colors"
                style={{ color: "inherit" }}
              >
                {chrome[l.labelKey]}
              </Link>
            ))}
            <div className="relative group/ig hidden md:block">
              <a
                href={`https://instagram.com/${chrome.instagramHandle}`}
                target="_blank"
                rel="noreferrer"
                className="opacity-65 hover:opacity-100 hover:text-copper transition-all duration-300 block"
                aria-label="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/>
                </svg>
              </a>

              {/* Tooltip Instagram */}
              <div
                className="
                  absolute top-full right-0 mt-3 z-50
                  pointer-events-none select-none
                  opacity-0 translate-y-1.5
                  group-hover/ig:opacity-100 group-hover/ig:translate-y-0
                  transition-all duration-[380ms] ease-out
                  delay-0 group-hover/ig:delay-[140ms]
                "
              >
                <div
                  className="px-5 py-4 text-cream"
                  style={{
                    backgroundColor: "oklch(0.14 0.026 36)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05)",
                  }}
                >
                  <p className="font-mono-label text-copper/55 text-[8px] uppercase tracking-[0.42em] mb-3 flex items-center gap-2">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-copper/60">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/>
                    </svg>
                    Instagram
                  </p>
                  <p className="font-mono-label text-cream/75 text-[10px] tracking-[0.2em]">
                    @{chrome.instagramHandle}
                  </p>
                  <p className="font-mono-label text-cream/22 text-[7.5px] tracking-[0.22em] mt-3">
                    {chrome.locationLine}
                  </p>
                </div>
              </div>
            </div>
          </nav>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-[310] relative"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            style={{ color: menuOpen ? "var(--cream)" : "inherit" }}
          >
            <span className={`block w-6 h-px bg-current transition-all duration-500 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-6 h-px bg-current transition-all duration-500 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu md:hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="font-mono-label text-cream/30 mb-12">Rosmaninho Fotografia</p>
            <nav className="flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: "easeOut" }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-5xl text-cream hover:text-copper transition-colors duration-300 block py-2"
                  >
                    {chrome[l.labelKey]}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-16 pt-8 border-t border-cream/15 flex flex-col gap-3">
              <a href={`mailto:${chrome.email}`} className="font-mono-label text-cream/50 hover:text-copper transition-colors">
                {chrome.email}
              </a>
              <a href={`https://instagram.com/${chrome.instagramHandle}`} target="_blank" rel="noreferrer" className="font-mono-label text-cream/50 hover:text-copper transition-colors">
                @{chrome.instagramHandle}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* Year rendered client-side to avoid SSR/client mismatch.
   SSR renders nothing; client fills in the year after mount so
   the initial HTML always matches (no hydration warning). */
function ClientYear() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);
  return <>{year !== null ? year : null}</>;
}

/* ---------------- Footer ---------------- */
export function SiteFooter() {
  const chrome = useChrome();
  return (
    <footer className="bg-foreground text-cream px-6 md:px-12 pt-28 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-cream/15">
          <div className="md:col-span-6 flex flex-col gap-6">
            <span className="font-italic-serif text-6xl md:text-7xl text-copper leading-none">{chrome.footerBrand}</span>
            <p className="text-sm leading-relaxed text-cream/65 max-w-md">
              {chrome.footerDescription}
            </p>
            <p className="font-mono-label text-cream/40">{chrome.footerEst}</p>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3 text-sm">
            <p className="font-mono-label text-cream/40 mb-3">{chrome.footerNavHeading}</p>
            <Link to="/" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>{chrome.footerLinkInicio}</Link>
            <Link to="/sobre" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>{chrome.footerLinkAutora}</Link>
            <Link to="/portfolio" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>{chrome.footerLinkFragmentos}</Link>
            <Link to="/diario" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>{chrome.footerLinkDiario}</Link>
            <Link to="/notas" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>{chrome.footerLinkNotas}</Link>
            <Link to="/contacto" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>{chrome.footerLinkDialogo}</Link>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3 text-sm">
            <p className="font-mono-label text-cream/40 mb-3">{chrome.footerContactHeading}</p>
            <a href={`mailto:${chrome.email}`} className="hover:text-copper transition-colors">{chrome.email}</a>
            <a href={`https://instagram.com/${chrome.instagramHandle}`} target="_blank" rel="noreferrer" className="hover:text-copper transition-colors">Instagram · @{chrome.instagramHandle}</a>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between gap-3 text-[10px] tracking-[0.32em] uppercase text-cream/40">
          <p>© <ClientYear /> {chrome.footerCopyright}</p>
          <p>{chrome.footerTagline}</p>
        </div>
        <p className="mt-6 text-[9px] tracking-[0.18em] text-cream/30 italic font-italic-serif lowercase text-center">
          {chrome.footerBotanical}
        </p>
        <p className="mt-5 flex items-center justify-center gap-2.5 text-[9px] tracking-[0.18em] text-cream/35 font-mono-label lowercase">
          <BotanicalMark size={12} className="text-copper/70" />
          {chrome.footerSecret1}
          <BotanicalMark size={12} className="text-copper/70" />
        </p>
        <p className="mt-4 flex items-center justify-center gap-2.5 text-[9px] tracking-[0.18em] text-cream/35 font-mono-label lowercase">
          <BotanicalMark size={12} className="text-copper/70" />
          {chrome.footerSecret2}
          <BotanicalMark size={12} className="text-copper/70" />
        </p>
      </div>
    </footer>
  );
}
