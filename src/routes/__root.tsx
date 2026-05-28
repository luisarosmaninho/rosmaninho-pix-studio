import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SmoothScroll, CustomCursor, LoadingScreen, GrainOverlay, ScrollProgress } from "@/components/SiteChrome";

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <p className="font-mono-label text-copper mb-8 text-[10px] uppercase tracking-[0.4em]">
          Erro · 404
        </p>
        <h1 className="font-display text-[clamp(4rem,14vw,9rem)] leading-[0.92] tracking-tight text-foreground/15">
          404
        </h1>
        <p className="font-display text-3xl md:text-5xl mt-6 leading-[1.1]">
          Esta página não existe.<br />
          <span className="font-italic-serif text-copper">Ou existiu, e passou.</span>
        </p>
        <p className="mt-8 text-foreground/55 max-w-sm leading-relaxed">
          Às vezes as coisas desaparecem antes de as conseguirmos fotografar. É o risco de chegar tarde.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start">
          <Link
            to="/"
            className="text-[11px] uppercase tracking-[0.32em] border-b border-foreground pb-1 hover:text-copper hover:border-copper transition-colors"
          >
            Voltar ao início →
          </Link>
          <Link
            to="/portfolio"
            className="text-[11px] uppercase tracking-[0.32em] border-b border-foreground/30 pb-1 text-foreground/55 hover:text-copper hover:border-copper transition-colors"
          >
            Ver o arquivo
          </Link>
        </div>
        <p className="font-mono-label text-foreground/20 mt-20 text-[10px] uppercase tracking-[0.35em]">
          40°12'N · 8°25'O · Coimbra
        </p>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-6">
      <div className="max-w-md">
        <p className="font-mono-label text-copper mb-6 text-[10px] uppercase tracking-[0.4em]">Erro inesperado</p>
        <h1 className="font-display text-3xl md:text-4xl leading-[1.1]">
          Algo correu mal<br />
          <span className="font-italic-serif text-copper">por dentro</span>.
        </h1>
        <p className="mt-6 text-foreground/55 leading-relaxed text-sm">
          Não foi nada que fizeste. Às vezes o arquivo tem os seus dias.
        </p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-10 text-[11px] uppercase tracking-[0.32em] border-b border-foreground pb-1 hover:text-copper hover:border-copper transition-colors"
        >
          Tentar novamente →
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rosmaninho Fotografia — Onde o tempo para e a emoção fica" },
      { name: "description", content: "Fotografia de urbanas, natureza, retratos e iguarias por Luísa Rosmaninho. Coimbra, Portugal." },
      { property: "og:title", content: "Rosmaninho Fotografia" },
      { property: "og:description", content: "Arquivo lento de imagens — urbanas, natureza, retratos e iguarias. Por Luísa Rosmaninho, Coimbra." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_PT" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rosmaninho Fotografia" },
      { name: "twitter:description", content: "Arquivo lento de imagens — urbanas, natureza, retratos e iguarias." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingScreen />
      <SmoothScroll />
      <CustomCursor />
      <GrainOverlay />
      <ScrollProgress />
      <Outlet />
    </QueryClientProvider>
  );
}
