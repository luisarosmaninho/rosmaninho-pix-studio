import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 text-white">
        <Link to="/" className="font-display text-xl tracking-wide">
          Rosmaninho<span className="text-accent">.</span>
        </Link>
        <ul className="hidden md:flex items-center gap-10 font-mono-label">
          <li><Link to="/" activeOptions={{ exact: true }} className="hover:text-accent transition-colors">Início</Link></li>
          <li><Link to="/portfolio" className="hover:text-accent transition-colors">Portefólio</Link></li>
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
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="font-display text-2xl">Rosmaninho<span className="text-accent">.</span></div>
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
