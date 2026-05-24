import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-rosmaninho.png";

export function SiteNav({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const isOverlay = variant === "overlay";
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isOverlay ? "" : "bg-background/90 backdrop-blur border-b border-border"}`}>
      <nav className={`flex items-center justify-between px-6 md:px-12 py-5 ${isOverlay ? "text-white" : "text-foreground"}`}>
        <Link to="/" className="flex items-center" aria-label="Rosmaninho — início">
          {isOverlay ? (
            <span className="font-display text-2xl md:text-3xl italic tracking-wide">
              Rosmaninho<span className="text-accent">.</span>
            </span>
          ) : (
            <img src={logo} alt="Rosmaninho" className="h-12 md:h-14 w-auto" />
          )}
        </Link>
        <ul className="hidden md:flex items-center gap-10 font-mono-label">
          <li><Link to="/" activeOptions={{ exact: true }} className="hover:text-accent transition-colors">Início</Link></li>
          <li><Link to="/portfolio" className="hover:text-accent transition-colors">Portefólio</Link></li>
          <li><Link to="/diario" className="hover:text-accent transition-colors">Diário</Link></li>
          <li><Link to="/sobre" className="hover:text-accent transition-colors">Sobre</Link></li>
          <li><Link to="/contacto" className="hover:text-accent transition-colors">Contacto</Link></li>
        </ul>
        <Link to="/contacto" className="md:hidden font-mono-label">Contacto</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 md:px-12 py-12 mt-24">
      <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
        <div>
          <img src={logo} alt="Rosmaninho" className="h-20 w-auto -ml-4" />
          <p className="font-mono-label text-muted-foreground mt-2">Luísa Rosmaninho · Fotografia</p>
        </div>
        <div className="flex gap-10 font-mono-label">
          <a href="mailto:ola@rosmaninho.pt" className="hover:text-accent">Email</a>
          <a href="#" className="hover:text-accent">Instagram</a>
          <a href="#" className="hover:text-accent">Behance</a>
        </div>
      </div>
      <p className="font-mono-label text-muted-foreground mt-12">© {new Date().getFullYear()} — Todos os direitos reservados</p>
    </footer>
  );
}
