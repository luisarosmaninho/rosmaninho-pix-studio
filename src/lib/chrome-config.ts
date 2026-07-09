// Client-safe chrome (menu + footer) config.
// Shared by the server functions (content-fns.ts) and the UI (SiteChrome.tsx),
// so it MUST stay free of server-only imports (fs, path, createServerFn) — this
// module is bundled to the client.

export type ChromeConfig = {
  // Menu (topo) — apenas as etiquetas; as ligações são fixas
  navInicio: string;
  navAutora: string;
  navFragmentos: string;
  navDiario: string;
  navNotas: string;
  navDialogo: string;

  // Contactos & redes (usados no menu e no rodapé)
  email: string;
  instagramHandle: string; // sem @
  locationLine: string;

  // Rodapé
  footerBrand: string;
  footerDescription: string;
  footerEst: string;
  footerNavHeading: string;
  footerLinkInicio: string;
  footerLinkAutora: string;
  footerLinkFragmentos: string;
  footerLinkDiario: string;
  footerLinkNotas: string;
  footerLinkDialogo: string;
  footerContactHeading: string;
  footerCopyright: string;
  footerTagline: string;
  footerBotanical: string;
  footerSecret1: string;
  footerSecret2: string;
};

export const CHROME_DEFAULTS: ChromeConfig = {
  navInicio: "Início",
  navAutora: "Autora",
  navFragmentos: "Fragmentos",
  navDiario: "Diário",
  navNotas: "Notas",
  navDialogo: "Diálogo",

  email: "ola@rosmaninhofotografia.pt",
  instagramHandle: "luisarosmanih",
  locationLine: "Coimbra · Portugal",

  footerBrand: "Rosmaninho",
  footerDescription:
    "Um arquivo lento de imagens e notas — urbanas, natureza, retratos e iguarias. Feito devagar, em Coimbra.",
  footerEst: "est. 2020 · Coimbra · Portugal",
  footerNavHeading: "Navegação",
  footerLinkInicio: "Início",
  footerLinkAutora: "Autora",
  footerLinkFragmentos: "Fragmentos",
  footerLinkDiario: "Diário",
  footerLinkNotas: "Notas de Campo",
  footerLinkDialogo: "Diálogo",
  footerContactHeading: "Contacto",
  footerCopyright: "Rosmaninho Fotografia",
  footerTagline: "Feito com luz, café e paciência",
  footerBotanical: "rosmarinus officinalis · a planta que dá nome a tudo isto.",
  footerSecret1: "algumas entradas não estão no menu. estão escondidas no nome.",
  footerSecret2: "este arquivo tem uma sala que não aparece na navegação.",
};
