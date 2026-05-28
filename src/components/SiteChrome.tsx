import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import logo from "@/assets/logo-rosmaninho.png";

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

/* ---------------- Loading screen ---------------- */
export function LoadingScreen() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2000);
    return () => clearTimeout(t);
  }, []);
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

/* ---------------- Floating WhatsApp ---------------- */
export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/351900000000?text=Olá%20Luísa%2C%20gostava%20de%20saber%20mais%20sobre%20as%20sessões."
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-transform duration-300"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor"><path d="M19.11 17.21c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.13-.42-2.16-1.33-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.13-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.63 1.11 2.81.13.18 1.91 2.92 4.63 4.09.65.28 1.15.45 1.55.57.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.28.22-.63.22-1.17.16-1.28-.06-.11-.24-.18-.51-.31zM16.02 5.33c-5.89 0-10.67 4.78-10.67 10.67 0 1.88.49 3.72 1.43 5.34L5 27l5.83-1.53a10.6 10.6 0 005.18 1.32h.01c5.89 0 10.67-4.78 10.67-10.67 0-2.85-1.11-5.53-3.12-7.55a10.6 10.6 0 00-7.55-3.24zm0 19.55h-.01a8.86 8.86 0 01-4.51-1.24l-.32-.19-3.46.91.92-3.37-.21-.34a8.85 8.85 0 0114.78-9.65 8.79 8.79 0 012.6 6.25c0 4.89-3.98 8.87-8.87 8.87z"/></svg>
    </a>
  );
}

/* ---------------- Navigation ---------------- */
export function SiteNav({ variant = "solid" }: { variant?: "overlay" | "solid" }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const isOverlay = variant === "overlay" && !scrolled;
  const headerBg = scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : isOverlay ? "bg-transparent" : "bg-background";
  const text = isOverlay ? "text-cream" : "text-foreground";

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${headerBg} ${text}`}>
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <Link to="/" className="flex items-baseline gap-3" style={{ color: "inherit" }}>
          <span className="font-italic-serif text-3xl md:text-[34px] leading-none">Rosmaninho</span>
          <span className="hidden md:block text-[10px] tracking-[0.4em] uppercase opacity-60">Fotografia</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.32em] uppercase">
          <Link to="/" activeOptions={{ exact: true }} className="link-underline hover:text-copper transition-colors" style={{ color: "inherit" }}>Início</Link>
          <Link to="/sobre" className="link-underline hover:text-copper transition-colors" style={{ color: "inherit" }}>Autora</Link>
          <Link to="/portfolio" className="link-underline hover:text-copper transition-colors" style={{ color: "inherit" }}>Séries</Link>
          <Link to="/diario" className="link-underline hover:text-copper transition-colors" style={{ color: "inherit" }}>Diário</Link>
          <Link to="/contacto" className="link-underline hover:text-copper transition-colors" style={{ color: "inherit" }}>Diálogo</Link>
        </nav>
        <Link
          to="/contacto"
          className="md:hidden text-[10px] tracking-[0.32em] uppercase border-b border-current pb-0.5"
          style={{ color: "inherit" }}
        >
          Diálogo
        </Link>
      </div>
    </header>
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
              Um arquivo lento de imagens e notas — urbanas, natureza, retratos e comida. Feito devagar, em Coimbra.
            </p>
            <p className="font-mono-label text-cream/40">est. 2020 · Coimbra · Portugal</p>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3 text-sm">
            <p className="font-mono-label text-cream/40 mb-3">Navegação</p>
            <Link to="/" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>Início</Link>
            <Link to="/sobre" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>Autora</Link>
            <Link to="/portfolio" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>Séries</Link>
            <Link to="/diario" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>Diário</Link>
            <Link to="/contacto" className="hover:text-copper transition-colors" style={{ color: "inherit" }}>Diálogo</Link>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3 text-sm">
            <p className="font-mono-label text-cream/40 mb-3">Contacto</p>
            <a href="mailto:ola@rosmaninhofotografia.pt" className="hover:text-copper transition-colors">ola@rosmaninhofotografia.pt</a>
            <a href="https://instagram.com/luisarosmaninh" target="_blank" rel="noreferrer" className="hover:text-copper transition-colors">Instagram</a>
            <a href="https://wa.me/351900000000" target="_blank" rel="noreferrer" className="hover:text-copper transition-colors">WhatsApp</a>
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
