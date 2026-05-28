import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import logo from "@/assets/logo-rosmaninho.png";

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
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dot.current) dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) return null;
  return <div ref={dot} className="cursor-dot hidden md:block" />;
}

/* ---------------- Loading screen (only on first visit of session) ---------------- */
export function LoadingScreen() {
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("rf_loaded") === "1";
  });

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("rf_loaded", "1");
    }, 2000);
    return () => clearTimeout(t);
  }, [done]);

  if (done) return null;
  return (
    <div className="loader-screen fixed inset-0 z-[100] flex flex-col items-center justify-center bg-foreground">
      <motion.img
        src={logo}
        alt="Rosmaninho"
        className="w-24 h-24 object-contain opacity-90"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.95, scale: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.p
        className="mt-8 font-italic-serif text-4xl text-copper"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Rosmaninho
      </motion.p>
      <motion.span
        className="mt-3 text-[10px] uppercase tracking-[0.5em] text-cream/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        Fotografia · Arquivo lento
      </motion.span>
    </div>
  );
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
  { to: "/", label: "Início", exact: true },
  { to: "/sobre", label: "Autora" },
  { to: "/portfolio", label: "Séries" },
  { to: "/diario", label: "Diário" },
  { to: "/notas", label: "Notas" },
  { to: "/contacto", label: "Diálogo" },
] as const;

/* ---------------- Navigation ---------------- */
export function SiteNav({ variant = "solid" }: { variant?: "overlay" | "solid" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isOverlay = variant === "overlay" && !scrolled;
  const headerBg = scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : isOverlay ? "bg-transparent" : "bg-background";
  const text = isOverlay ? "text-cream" : "text-foreground";

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${headerBg} ${text}`}>
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <Link to="/" className="flex items-baseline gap-3" style={{ color: "inherit" }} onClick={() => setMenuOpen(false)}>
            <span className="font-italic-serif text-3xl md:text-[34px] leading-none">Rosmaninho</span>
            <span className="hidden md:block text-[10px] tracking-[0.4em] uppercase opacity-60">Fotografia</span>
          </Link>

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
                {l.label}
              </Link>
            ))}
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
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-16 pt-8 border-t border-cream/15">
              <a href="mailto:ola@rosmaninhofotografia.pt" className="font-mono-label text-cream/50 hover:text-copper transition-colors">
                ola@rosmaninhofotografia.pt
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Footer ---------------- */
export function SiteFooter() {
  return (
    <footer className="bg-foreground text-cream px-6 md:px-12 pt-28 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-cream/15">
          <div className="md:col-span-6 flex flex-col gap-6">
            <span className="font-italic-serif text-6xl md:text-7xl text-copper leading-none">Rosmaninho</span>
            <p className="text-sm leading-relaxed text-cream/65 max-w-md">
              Um arquivo lento de imagens e notas — urbanas, natureza, retratos e iguarias. Feito devagar, em Coimbra.
            </p>
            <p className="font-mono-label text-cream/40">est. 2020 · Coimbra · Portugal</p>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3 text-sm">
            <p className="font-mono-label text-cream/40 mb-3">Navegação</p>
            <Link to="/" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>Início</Link>
            <Link to="/sobre" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>Autora</Link>
            <Link to="/portfolio" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>Séries</Link>
            <Link to="/diario" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>Diário</Link>
            <Link to="/notas" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>Notas de Campo</Link>
            <Link to="/contacto" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>Diálogo</Link>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3 text-sm">
            <p className="font-mono-label text-cream/40 mb-3">Contacto</p>
            <a href="mailto:ola@rosmaninhofotografia.pt" className="hover:text-copper transition-colors">ola@rosmaninhofotografia.pt</a>
            <a href="https://instagram.com/luisarosmaninh" target="_blank" rel="noreferrer" className="hover:text-copper transition-colors">Instagram · @luisarosmaninh</a>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between gap-3 text-[10px] tracking-[0.32em] uppercase text-cream/40">
          <p>© {new Date().getFullYear()} Rosmaninho Fotografia</p>
          <p>Feito com luz, café e paciência</p>
        </div>
      </div>
    </footer>
  );
}
