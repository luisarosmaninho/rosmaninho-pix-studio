import { Link } from "@tanstack/react-router";

/**
 * Micro navigation — links textuais espalhados nos cantos superiores.
 * variant "overlay" -> texto branco sobre imagem
 * variant "solid"   -> texto carvão sobre fundo papel
 */
export function SiteNav({ variant = "solid" }: { variant?: "overlay" | "solid" }) {
  const isOverlay = variant === "overlay";
  const color = isOverlay ? "text-background" : "text-foreground";
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 pointer-events-none ${color}`}>
      <div className="flex items-start justify-between px-6 md:px-10 pt-6">
        {/* Top-left: edição */}
        <Link
          to="/"
          className="pointer-events-auto font-mono-label hover:text-accent transition-colors"
          style={{ color: "inherit" }}
        >
          [ ROSMANINHO // ED. 2026 ]
        </Link>

        {/* Top-right: micro-nav textual */}
        <nav className="pointer-events-auto flex gap-6 md:gap-8 font-mono-label">
          <Link to="/" activeOptions={{ exact: true }} className="hover:text-accent transition-colors" style={{ color: "inherit" }}>
            Index
          </Link>
          <Link to="/portfolio" className="hover:text-accent transition-colors" style={{ color: "inherit" }}>
            Arquivo
          </Link>
          <Link to="/sobre" className="hover:text-accent transition-colors" style={{ color: "inherit" }}>
            Autora
          </Link>
          <Link to="/diario" className="hover:text-accent transition-colors" style={{ color: "inherit" }}>
            Journal
          </Link>
          <Link to="/contacto" className="hover:text-accent transition-colors" style={{ color: "inherit" }}>
            Diálogo
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="px-6 md:px-12 pt-24 pb-10 border-t border-border mt-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Coluna esquerda — Links */}
        <div className="md:col-span-4 flex flex-col gap-8">
          <p className="font-mono-label">[ ROSMANINHO ]</p>
          <ul className="flex flex-col gap-3 font-display text-2xl">
            <li><a href="/" className="hover:text-accent transition-colors">Index</a></li>
            <li><a href="/portfolio" className="hover:text-accent transition-colors">Arquivo</a></li>
            <li><a href="/sobre" className="hover:text-accent transition-colors">Autora</a></li>
            <li><a href="/diario" className="hover:text-accent transition-colors">Journal</a></li>
            <li><a href="/contacto" className="hover:text-accent transition-colors">Diálogo</a></li>
            <li>
              <a
                href="https://instagram.com/luisarosmaninh"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition-colors"
              >
                Instagram @luisarosmaninh
              </a>
            </li>
          </ul>
        </div>

        {/* Coluna direita — Mapa monocromático (estático) */}
        <div className="md:col-span-8">
          <p className="font-mono-label mb-4">[ COORDENADAS // 40.2033° N, 8.4103° W ]</p>
          <div className="relative w-full aspect-[16/9] overflow-hidden border border-border">
            <iframe
              title="Coimbra"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-8.45%2C40.18%2C-8.37%2C40.23&amp;layer=mapnik&amp;marker=40.2033%2C-8.4103"
              className="absolute inset-0 w-full h-full grayscale contrast-125"
              style={{ filter: "grayscale(1) contrast(1.1) brightness(0.95)" }}
            />
            <div className="absolute inset-0 pointer-events-none mix-blend-multiply bg-background/10" />
          </div>
        </div>
      </div>

      <div className="mt-16 hairline" />

      <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
        <p className="font-mono-label">
          © {new Date().getFullYear()} ROSMANINHO. TODOS OS DIREITOS RESERVADOS.
        </p>
        <p className="font-mono-label">[ COIMBRA // PORTUGAL ]</p>
      </div>
    </footer>
  );
}
