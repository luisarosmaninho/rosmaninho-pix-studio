import { createServerFn } from "@tanstack/react-start";
import fs from "fs";
import path from "path";
import { readConfig, writeConfig } from "./db";
import { categories as staticCategories, photos as staticPhotos } from "./photos";
import type { Category, Photo } from "./photos";
import { journal as staticJournal } from "./journal";
import type { JournalEntry } from "./journal";
import { notas as staticNotas } from "./notas";
import type { Nota } from "./notas";

// ── Helpers ──────────────────────────────────────────────────────────────────

function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD not configured.");
  if (password !== expected) throw new Error("Password incorrecta.");
}

/**
 * Read a config from DB. If not in DB, migrate from legacy JSON file and write
 * it to DB so future reads skip the file. Falls back to codeDefault if neither
 * DB nor file has data.
 */
async function cfg<T>(key: string, legacyPath: string, codeDefault: T): Promise<T> {
  const fromDb = await readConfig<T | null>(key, null);
  if (fromDb !== null) return fromDb;

  // Migration: try to pull existing JSON file into DB
  try {
    const raw = JSON.parse(fs.readFileSync(legacyPath, "utf-8")) as T;
    await writeConfig(key, raw);
    return raw;
  } catch {
    return codeDefault;
  }
}

// ── Categories ────────────────────────────────────────────────────────────────

export type CategoryOverrides = Partial<Omit<Category, "slug" | "cover">>;
type CategoriesConfig = Record<string, CategoryOverrides>;

const CATEGORIES_JSON = path.join(process.cwd(), "categories-config.json");

export const getCategories = createServerFn({ method: "GET" }).handler(async (): Promise<Category[]> => {
  const overrides = await cfg<CategoriesConfig>("categories", CATEGORIES_JSON, {});
  return staticCategories.map((cat) => ({ ...cat, ...overrides[cat.slug] }));
});

export const saveCategoryTexts = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string; slug: string; data: CategoryOverrides })
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const overrides = await cfg<CategoriesConfig>("categories", CATEGORIES_JSON, {});
    overrides[data.slug] = data.data;
    await writeConfig("categories", overrides);
    return { ok: true };
  });

// ── Photos meta ───────────────────────────────────────────────────────────────

export type PhotoMetaOverride = { title: string; description: string; conditions: string; date: string; location: string };
type PhotosMetaConfig = Record<string, Partial<PhotoMetaOverride>>;

const PHOTOS_META_JSON = path.join(process.cwd(), "photos-meta-config.json");
const NEW_PHOTOS_JSON = path.join(process.cwd(), "new-photos-config.json");

export type NewPhotoEntry = {
  id: string;
  src: string;
  title: string;
  category: string;
  orientation: "portrait" | "landscape" | "square";
  description: string;
  conditions: string;
  date: string;
  location: string;
};

async function readNewPhotos(): Promise<NewPhotoEntry[]> {
  return cfg<NewPhotoEntry[]>("new_photos", NEW_PHOTOS_JSON, []);
}

export const getPhotosWithMeta = createServerFn({ method: "GET" }).handler(async (): Promise<Photo[]> => {
  const overrides = await cfg<PhotosMetaConfig>("photos_meta", PHOTOS_META_JSON, {});
  const staticWithMeta = staticPhotos.map((photo) => {
    const ov = overrides[photo.id];
    if (!ov) return photo;
    return {
      ...photo,
      title: ov.title ?? photo.title,
      meta: {
        description: ov.description ?? photo.meta.description,
        ...(ov.conditions ? { conditions: ov.conditions } : photo.meta.conditions ? { conditions: photo.meta.conditions } : {}),
        ...(ov.date ? { date: ov.date } : {}),
        ...(ov.location ? { location: ov.location } : {}),
      },
    };
  });
  const newPhotos = (await readNewPhotos()).map((np) => ({
    id: np.id,
    src: np.src,
    title: np.title,
    category: np.category as Photo["category"],
    orientation: (np.orientation ?? "landscape") as Photo["orientation"],
    meta: {
      description: np.description,
      ...(np.conditions ? { conditions: np.conditions } : {}),
      ...(np.date ? { date: np.date } : {}),
      ...(np.location ? { location: np.location } : {}),
    },
  }));
  return [...staticWithMeta, ...newPhotos];
});

export const getNewPhotos = createServerFn({ method: "GET" }).handler(async (): Promise<NewPhotoEntry[]> => {
  return readNewPhotos();
});

export const savePhotoMeta = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string; photoId: string; title: string; description: string; conditions: string; date: string; location: string })
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const staticIds = new Set(staticPhotos.map((p) => p.id));
    if (staticIds.has(data.photoId)) {
      const overrides = await cfg<PhotosMetaConfig>("photos_meta", PHOTOS_META_JSON, {});
      overrides[data.photoId] = { title: data.title, description: data.description, conditions: data.conditions, date: data.date, location: data.location };
      await writeConfig("photos_meta", overrides);
    } else {
      const newPhotos = await readNewPhotos();
      const idx = newPhotos.findIndex((p) => p.id === data.photoId);
      if (idx !== -1) {
        newPhotos[idx] = { ...newPhotos[idx], title: data.title, description: data.description, conditions: data.conditions, date: data.date, location: data.location };
        await writeConfig("new_photos", newPhotos);
      }
    }
    return { ok: true };
  });

export const addNewPhoto = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string; photo: NewPhotoEntry })
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const existing = await readNewPhotos();
    if (existing.find((p) => p.id === data.photo.id)) throw new Error("Já existe uma foto com este ID.");
    existing.push(data.photo);
    await writeConfig("new_photos", existing);
    return { ok: true };
  });

export const deleteNewPhoto = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string; photoId: string })
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const updated = (await readNewPhotos()).filter((p) => p.id !== data.photoId);
    await writeConfig("new_photos", updated);
    return { ok: true };
  });

// ── Journal ───────────────────────────────────────────────────────────────────

export type JournalEntryEditable = Pick<JournalEntry, "slug" | "date" | "location" | "title" | "excerpt" | "body" | "photoTitle">;

type JournalFileConfig = {
  overrides: Record<string, Partial<JournalEntryEditable>>;
  newEntries: JournalEntry[];
};

const JOURNAL_JSON = path.join(process.cwd(), "journal-config.json");

function legacyJournalFallback(): JournalFileConfig {
  try {
    const raw = JSON.parse(fs.readFileSync(JOURNAL_JSON, "utf-8")) as Record<string, unknown>;
    if (raw && typeof raw.overrides === "object" && !Array.isArray(raw.overrides)) {
      return {
        overrides: (raw.overrides ?? {}) as Record<string, Partial<JournalEntryEditable>>,
        newEntries: Array.isArray(raw.newEntries) ? (raw.newEntries as JournalEntry[]) : [],
      };
    }
    return { overrides: raw as Record<string, Partial<JournalEntryEditable>>, newEntries: [] };
  } catch {
    return { overrides: {}, newEntries: [] };
  }
}

async function readJournalConfig(): Promise<JournalFileConfig> {
  const fromDb = await readConfig<JournalFileConfig | null>("journal", null);
  if (fromDb !== null) return fromDb;
  const legacy = legacyJournalFallback();
  await writeConfig("journal", legacy);
  return legacy;
}

const STATIC_SLUGS = new Set(staticJournal.map((e) => e.slug));

export const getJournal = createServerFn({ method: "GET" }).handler(async (): Promise<JournalEntry[]> => {
  const { overrides, newEntries } = await readJournalConfig();
  const withOverrides = staticJournal.map((entry) => {
    const ov = overrides[entry.slug];
    return ov ? { ...entry, ...ov } : entry;
  });
  return [...withOverrides, ...newEntries].sort((a, b) => b.date.localeCompare(a.date));
});

export const getNewJournalEntries = createServerFn({ method: "GET" }).handler(async (): Promise<JournalEntry[]> => {
  return (await readJournalConfig()).newEntries;
});

export const saveJournalEntry = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string; slug: string; data: Partial<JournalEntryEditable> })
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const cfg = await readJournalConfig();
    if (STATIC_SLUGS.has(data.slug)) {
      cfg.overrides[data.slug] = data.data;
    } else {
      const idx = cfg.newEntries.findIndex((e) => e.slug === data.slug);
      if (idx !== -1) {
        cfg.newEntries[idx] = { ...cfg.newEntries[idx], ...data.data, slug: data.slug };
      }
    }
    await writeConfig("journal", cfg);
    return { ok: true };
  });

export const addNewJournalEntry = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string; entry: JournalEntry })
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const config = await readJournalConfig();
    const existing = config.newEntries.findIndex((e) => e.slug === data.entry.slug);
    if (existing !== -1) throw new Error("Já existe uma entrada com este slug.");
    if (STATIC_SLUGS.has(data.entry.slug)) throw new Error("Este slug já está em uso.");
    config.newEntries.push(data.entry);
    await writeConfig("journal", config);
    return { ok: true };
  });

export const deleteNewJournalEntry = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string; slug: string })
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const config = await readJournalConfig();
    config.newEntries = config.newEntries.filter((e) => e.slug !== data.slug);
    await writeConfig("journal", config);
    return { ok: true };
  });

// ── Notas ─────────────────────────────────────────────────────────────────────

const NOTAS_JSON = path.join(process.cwd(), "notas-config.json");

export const getNotas = createServerFn({ method: "GET" }).handler(async (): Promise<Nota[]> => {
  return cfg<Nota[]>("notas", NOTAS_JSON, staticNotas);
});

export const saveNotas = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string; notas: Nota[] })
  .handler(async ({ data }) => {
    checkPassword(data.password);
    await writeConfig("notas", data.notas);
    return { ok: true };
  });

// ── Contacto ──────────────────────────────────────────────────────────────────

export type ContactoConfig = {
  tagline: string;
  introText: string;
  responseNote: string;
  notasPool: string[];
  email: string;
  instagram: string;
  sidebarQuote: string;
  footerLine1: string;
  footerLine2: string;
  footerLine3: string;
  confirmTitle: string;
  confirmText: string;
};

export const CONTACTO_DEFAULTS: ContactoConfig = {
  tagline: "Diálogo · Coimbra",
  introText: "Não há tabelas nem pacotes. Não há respostas automáticas. Há uma conversa possível — sobre uma imagem, um lugar, um momento, ou uma impressão que queiras ter à parede.",
  responseNote: "Respondo quando o tempo deixar, com calma.",
  notasPool: [
    "Respondo melhor à tarde. De manhã o silêncio ainda não acabou.",
    "Leio cada mensagem duas vezes antes de responder.",
    "As melhores conversas começaram com muito pouco.",
    "Não tenho respostas automáticas. Tenho pausas.",
    "Prefiro uma mensagem longa a uma curta — mas aceito as duas.",
  ],
  email: "ola@rosmaninhofotografia.pt",
  instagram: "@luisarosmanih",
  sidebarQuote: "Não há pressa. Há uma conversa, se quiseres tê-la.",
  footerLine1: "não é só para contacto. é também para quem sabe o que procura.",
  footerLine2: "se souberes o nome certo, o arquivo abre-se.",
  footerLine3: "escrever aqui não é a única forma de entrar.",
  confirmTitle: "Recebido.",
  confirmText: "Fica descansado — li com atenção. Volto a ti em breve, por email, sem pressa.",
};

const CONTACTO_JSON = path.join(process.cwd(), "contacto-config.json");

export const getContactoTexts = createServerFn({ method: "GET" }).handler(async (): Promise<ContactoConfig> => {
  const saved = await cfg<Partial<ContactoConfig>>("contacto", CONTACTO_JSON, {});
  return { ...CONTACTO_DEFAULTS, ...saved };
});

export const saveContactoTexts = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string } & Partial<ContactoConfig>)
  .handler(async ({ data }) => {
    const { password, ...rest } = data;
    checkPassword(password);
    const current = await cfg<Partial<ContactoConfig>>("contacto", CONTACTO_JSON, {});
    await writeConfig("contacto", { ...current, ...rest });
    return { ok: true };
  });

// ── Portfolio Page ─────────────────────────────────────────────────────────────

export type PortfolioPageConfig = {
  headerTagline: string;
  headerQuote: string;
  closingLine1: string;
  closingLine2: string;
  closingLine3: string;
};

export const PORTFOLIO_PAGE_DEFAULTS: PortfolioPageConfig = {
  headerTagline: "arquivo · quatro séries abertas",
  headerQuote: "Algumas imagens ficaram por causa da luz. Outras por causa das pessoas. Outras simplesmente recusaram desaparecer.",
  closingLine1: "fotografias são apenas metade do arquivo.",
  closingLine2: "o que não está na imagem pode estar noutro sítio.",
  closingLine3: "há um lado deste arquivo que não se vê — escreve-se.",
};

const PORTFOLIO_PAGE_JSON = path.join(process.cwd(), "portfolio-page-config.json");

export const getPortfolioPageTexts = createServerFn({ method: "GET" }).handler(async (): Promise<PortfolioPageConfig> => {
  const saved = await cfg<Partial<PortfolioPageConfig>>("portfolio_page", PORTFOLIO_PAGE_JSON, {});
  return { ...PORTFOLIO_PAGE_DEFAULTS, ...saved };
});

export const savePortfolioPageTexts = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string } & Partial<PortfolioPageConfig>)
  .handler(async ({ data }) => {
    const { password, ...rest } = data;
    checkPassword(password);
    const current = await cfg<Partial<PortfolioPageConfig>>("portfolio_page", PORTFOLIO_PAGE_JSON, {});
    await writeConfig("portfolio_page", { ...current, ...rest });
    return { ok: true };
  });

// ── Notas Page ────────────────────────────────────────────────────────────────

export type NotasPageConfig = {
  introLabel: string;
  introText: string;
  closingQuote: string;
  closingLine1: string;
  closingLine2: string;
  closingLine3: string;
};

export const NOTAS_PAGE_DEFAULTS: NotasPageConfig = {
  introLabel: "campo",
  introText: "Pequenas observações arrancadas de um caderno — escritas no terreno, à mesa, algures entre uma fotografia e a próxima. Não cabem numa imagem, mas também não desaparecem.",
  closingQuote: "O campo não é apenas o lugar onde se fotografa. É o estado de atenção que se leva para qualquer sítio.",
  closingLine1: "escreve. às vezes é assim que se chega a sítios novos.",
  closingLine2: "algumas notas não estão aqui. estão noutro sítio qualquer.",
  closingLine3: "há pensamentos que só aparecem quando os procuras pelo nome.",
};

const NOTAS_PAGE_JSON = path.join(process.cwd(), "notas-page-config.json");

export const getNotasPageTexts = createServerFn({ method: "GET" }).handler(async (): Promise<NotasPageConfig> => {
  const saved = await cfg<Partial<NotasPageConfig>>("notas_page", NOTAS_PAGE_JSON, {});
  return { ...NOTAS_PAGE_DEFAULTS, ...saved };
});

export const saveNotasPageTexts = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string } & Partial<NotasPageConfig>)
  .handler(async ({ data }) => {
    const { password, ...rest } = data;
    checkPassword(password);
    const current = await cfg<Partial<NotasPageConfig>>("notas_page", NOTAS_PAGE_JSON, {});
    await writeConfig("notas_page", { ...current, ...rest });
    return { ok: true };
  });

// ── Homepage ──────────────────────────────────────────────────────────────────

export type HomepageConfig = {
  heroTagline: string;
  heroHeadlinePart1: string;
  heroHeadlineItalicWord: string;
  heroHeadlinePart2: string;
  heroSubtitle: string;
  archiveWhisper: string;
  coordinatesWhisper: string;
  manifestoText: string;
  autoraP1: string;
  autoraP2: string;
};

export const HOMEPAGE_DEFAULTS: HomepageConfig = {
  heroTagline: "Arquivo lento · Coimbra",
  heroHeadlinePart1: "Onde o tempo",
  heroHeadlineItalicWord: "para",
  heroHeadlinePart2: ", e a emoção fica.",
  heroSubtitle: "Um caderno aberto de imagens — ruas, paisagens, rostos e mesas — feito devagar, com câmara e palavra. Por Luísa Rosmaninho.",
  archiveWhisper: "arquivo lento · Coimbra · MMXX —",
  coordinatesWhisper: "40°12′N · 8°25′O",
  manifestoText: "Não fotografo para mostrar — fotografo para demorar. Cada imagem é uma forma educada de pedir ao mundo que fique mais um momento.",
  autoraP1: "A fotografia tornou-se a minha forma de guardar emoções, ambientes e pequenos momentos que normalmente passam demasiado depressa.",
  autoraP2: "Procuro criar fotografias que pareçam verdadeiras. Naturais. Honestamente reais.",
};

const HOMEPAGE_JSON = path.join(process.cwd(), "homepage-config.json");

export const getHomepageTexts = createServerFn({ method: "GET" }).handler(async (): Promise<HomepageConfig> => {
  const saved = await cfg<Partial<HomepageConfig>>("homepage", HOMEPAGE_JSON, {});
  return { ...HOMEPAGE_DEFAULTS, ...saved };
});

export const saveHomepageTexts = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string } & Partial<HomepageConfig>)
  .handler(async ({ data }) => {
    const { password, ...rest } = data;
    checkPassword(password);
    const current = await cfg<Partial<HomepageConfig>>("homepage", HOMEPAGE_JSON, {});
    await writeConfig("homepage", { ...current, ...rest });
    return { ok: true };
  });

// ── Sobre ─────────────────────────────────────────────────────────────────────

export type SobreConfig = {
  introParagraphs: string[];
  introQuote: string;
  secaoGuardarTitulo: string;
  secaoGuardarTexto: string;
  secaoGuardarCitacao: string;
  secaoVerdadeirasTexto1: string;
  secaoVerdadeirasTexto2: string;
  secaoDetalheTexto1: string;
  secaoDetalheTexto2: string;
  percurso: { ano: string; titulo: string; texto: string }[];
  pequenasConstancias: { titulo: string; texto: string }[];
  ritmos: { quando: string; recurso: string }[];
  cartografiaVisitadas: { cidade: string; nota: string }[];
  cartografiaSonhadas: { cidade: string; nota: string }[];
};

export const SOBRE_DEFAULTS: SobreConfig = {
  introParagraphs: [
    "Nem sempre sei explicar quem sou de forma direta.",
    "Gosto de observar antes de falar. De chegar um pouco mais tarde, mas chegar com atenção.",
    "Sinto devagar. Confio devagar. E foi exactamente por isso que comecei a fotografar — porque precisava de uma forma de demorar mais tempo nas coisas.",
    "Se houver um fio condutor entre tudo o que encontras aqui, talvez seja este: a crença de que as coisas mais importantes raramente se revelam à primeira vista.",
  ],
  introQuote: "Nunca consegui olhar para a fotografia como apenas tirar fotografias. Para mim, sempre foi muito mais do que isso.",
  secaoGuardarTitulo: "Guardar o que não espera.",
  secaoGuardarTexto: "A fotografia é a forma que encontrei de demorar mais tempo num momento. A luz que entra por uma janela. Um olhar para o lado. O silêncio entre duas pessoas. Coisas que passam sem avisar — e que eu precisava de guardar.",
  secaoGuardarCitacao: "Sou emocional. Sou criativa. Isso entra em tudo o que faço — sem que eu precise de decidir.",
  secaoVerdadeirasTexto1: "Não procuro o perfeito. Procuro o verdadeiro. Imagens a que se possa voltar daqui a dez anos e ainda sentir alguma coisa.",
  secaoVerdadeirasTexto2: "Antes de pegar na câmara, observo. As pessoas, a luz, o que está no ar. É aí que tudo começa — muito antes do clique.",
  secaoDetalheTexto1: "Passo tempo a pensar numa sombra. Numa cor. Numa sensação que quero que fique. A maior parte das pessoas não vai reparar. Eu reparo — e isso chega.",
  secaoDetalheTexto2: "Ao mesmo tempo, não quero que se note o esforço. O que é forçado cansa. Prefiro a imperfeição que torna cada lugar — e cada pessoa — diferente.",
  percurso: [
    { ano: "2020", titulo: "O começo", texto: "Uma câmara, Coimbra, disponibilidade para esperar. A fotografia começa como necessidade — guardar emoções, lugares, rostos." },
    { ano: "2022–23", titulo: "As séries tomam forma", texto: "Urbanas, natureza, retratos, iguarias. Quatro direcções. Cada uma ao seu ritmo, sem pressa de fechar." },
    { ano: "2024 →", titulo: "Porto entra no mapa", texto: "As viagens multiplicam-se. Azulejos, ribeira, luz de janeiro. Porto torna-se um segundo laboratório." },
  ],
  pequenasConstancias: [
    { titulo: "A câmara", texto: "A câmara não é um instrumento de captura. É uma desculpa para demorar mais tempo num sítio sem que ninguém pergunte o porquê. Isso vale muito mais do que qualquer fotografia." },
    { titulo: "Coimbra de manhã", texto: "Coimbra tem ruas que só existem de manhã cedo. Depois disso, a luz muda, as pessoas chegam, e aquela versão específica da cidade desaparece. Só volta no dia seguinte — se houver paciência para ir lá." },
    { titulo: "Livros", texto: "Há livros para começos de viagem, livros para regresso a casa, e livros para as tardes em que não acontece nada de especial. Não os confundo. Cada um sabe onde pertence." },
    { titulo: "Música", texto: "Alguns músicos têm a capacidade de fazer com que o quotidiano pareça mais lento do que é. Preciso disso mais vezes do que admito. Não gosto de os nomear — perdem qualquer coisa quando se faz isso." },
    { titulo: "Cafés", texto: "Não vou a cafés para trabalhar. Vou para observar. O trabalho é apenas um pretexto para ficar sentada tempo suficiente até que alguma coisa interessante aconteça." },
    { titulo: "Matcha e escrita", texto: "O matcha tem um sabor que obriga a parar. Não consigo bebê-lo depressa. Talvez seja essa a razão pela qual o encomendo sempre que preciso de escrever algo que ainda não sei como começa." },
    { titulo: "Cidades sonhadas", texto: "Há cidades que já visitei nas fotografias de outras pessoas: Bergen, Bruges, Verona. Já conheço algumas ruas. Ainda não fui. Mas quando for, vai parecer um regresso." },
    { titulo: "Luz de novembro", texto: "Existe uma forma específica de luz às dezasseis horas de novembro que não acontece em mais nenhum mês. Já tentei descrever várias vezes. Não consigo. Por isso fotografo." },
    { titulo: "Alecrim", texto: "Há um vaso de alecrim na janela que não me lembro de ter plantado. Cresce sem que eu precise de o chamar. Algumas coisas são assim — persistem sem atenção, aguardam sem pressa, aparecem quando menos se espera. Às vezes basta escrever o nome." },
  ],
  ritmos: [
    { quando: "Quando preciso de começar:", recurso: "café." },
    { quando: "Quando preciso de abrandar:", recurso: "matcha." },
    { quando: "Quando preciso de desaparecer um pouco:", recurso: "livros." },
    { quando: "Quando preciso de compreender:", recurso: "caminhar." },
    { quando: "Quando preciso de guardar:", recurso: "fotografar." },
    { quando: "Quando não preciso de nada:", recurso: "silêncio." },
  ],
  cartografiaVisitadas: [
    { cidade: "Coimbra.", nota: "Onde tudo começa. As ruas antigas, o Mondego, a luz de tarde que não muda. O sítio a que sempre volto." },
    { cidade: "Porto.", nota: "O azulejo, a chuva de janeiro, a Ribeira às seis da manhã quando não há ninguém. Um segundo laboratório." },
    { cidade: "Lisboa.", nota: "Luz diferente. Mais horizontal, mais directa. Ainda a aprender a vê-la." },
  ],
  cartografiaSonhadas: [
    { cidade: "Bergen.", nota: "Casas de madeira colorida, água por todo o lado, luz do norte. Já conheço algumas ruas através de fotografias." },
    { cidade: "Bruges.", nota: "Canais, reflexos, pedra antiga. Uma cidade que parece existir fora do tempo." },
    { cidade: "Verona.", nota: "Arena, ruelas, a luz de Itália que é diferente de todas as outras." },
  ],
};

const SOBRE_JSON = path.join(process.cwd(), "sobre-config.json");

export const getSobre = createServerFn({ method: "GET" }).handler(async (): Promise<SobreConfig> => {
  const saved = await cfg<Partial<SobreConfig>>("sobre", SOBRE_JSON, {});
  return { ...SOBRE_DEFAULTS, ...saved };
});

export const saveSobre = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string } & Partial<SobreConfig>)
  .handler(async ({ data }) => {
    const { password, ...rest } = data;
    checkPassword(password);
    const current = await cfg<Partial<SobreConfig>>("sobre", SOBRE_JSON, {});
    await writeConfig("sobre", { ...current, ...rest });
    return { ok: true };
  });

// Aliases used by admin.tsx
export const getSobreTexts = getSobre;
export const saveSobreTexts = saveSobre;

// ── Neste Momento ─────────────────────────────────────────────────────────────

export type NestesMomentoItem = { label: string; value: string };
export type NesteMomentoConfig = { items: NestesMomentoItem[] };

export const NESTE_MOMENTO_DEFAULTS: NesteMomentoConfig = {
  items: [
    { label: "a fotografar", value: "Coimbra ao final da tarde" },
    { label: "a ler", value: "um livro que não termina" },
    { label: "a beber", value: "café, como sempre" },
    { label: "a pensar em", value: "luz de inverno" },
  ],
};

const NESTE_MOMENTO_JSON = path.join(process.cwd(), "momento-config.json");

export const getNesteMomento = createServerFn({ method: "GET" }).handler(async (): Promise<NesteMomentoConfig> => {
  const saved = await cfg<Partial<NesteMomentoConfig>>("neste_momento", NESTE_MOMENTO_JSON, {});
  return { ...NESTE_MOMENTO_DEFAULTS, ...saved };
});

export const saveNesteMomento = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string } & Partial<NesteMomentoConfig>)
  .handler(async ({ data }) => {
    const { password, ...rest } = data;
    checkPassword(password);
    await writeConfig("neste_momento", rest);
    return { ok: true };
  });

// ── Visits ────────────────────────────────────────────────────────────────────

export type VisitsConfig = { count: number; lastReset: string };

const VISITS_JSON = path.join(process.cwd(), "visits-config.json");

export const getVisits = createServerFn({ method: "GET" }).handler(async (): Promise<VisitsConfig> => {
  return cfg<VisitsConfig>("visits", VISITS_JSON, { count: 0, lastReset: new Date().toISOString() });
});

export const incrementVisit = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as Record<string, never>)
  .handler(async () => {
    const current = await cfg<VisitsConfig>("visits", VISITS_JSON, { count: 0, lastReset: new Date().toISOString() });
    const updated = { ...current, count: current.count + 1 };
    await writeConfig("visits", updated);
    return updated;
  });

export const resetVisits = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string })
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const reset: VisitsConfig = { count: 0, lastReset: new Date().toISOString() };
    await writeConfig("visits", reset);
    return reset;
  });

// ── Photos config (ordering / visibility) ────────────────────────────────────

export type PhotoConfig = { id: string; hidden?: boolean; order?: number };
type PhotosConfig = PhotoConfig[];

const PHOTOS_CONFIG_JSON = path.join(process.cwd(), "photos-config.json");

export const getPhotoConfig = createServerFn({ method: "GET" }).handler(async (): Promise<PhotosConfig> => {
  return cfg<PhotosConfig>("photos_config", PHOTOS_CONFIG_JSON, []);
});

export const savePhotoConfig = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string; config: PhotosConfig })
  .handler(async ({ data }) => {
    checkPassword(data.password);
    await writeConfig("photos_config", data.config);
    return { ok: true };
  });

// ── Diário Config (aberturas + rasuras) ───────────────────────────────────────

export type DiarioConfig = {
  aberturasPool: string[];
  rasurasPorSlug: Record<string, string[]>;
};

const DIARIO_CONFIG_DEFAULTS: DiarioConfig = {
  aberturasPool: [
    "às vezes escrevo antes de saber o que quero dizer.",
    "o caderno não tem ordem — assim como os dias.",
    "algumas notas ficam. outras desaparecem como a espuma do matcha.",
    "escrevo devagar. leio mais devagar ainda.",
    "nem todas as entradas têm fotografia. nem todas as fotografias têm entrada.",
    "começo sempre com uma chávena. raramente termino antes de ela arrefecer.",
    "há dias em que o silêncio é a única coisa que vale a pena guardar.",
    "um pensamento que não cabe numa fotografia acaba aqui.",
    "o caderno tem manchas de café. assim deve ser.",
    "não sei se escrevo para mim ou para quem um dia vier aqui.",
    "às vezes a entrada mais curta é a que diz mais.",
    "guardo o que não fotografei também — às vezes é o que fica mais.",
    "o tempo demora mais quando se escreve devagar.",
    "alguns dias não têm título. ficam assim.",
  ],
  rasurasPorSlug: {
    "o-cafe-antes-de-tudo": ["o ritual antes da fotografia", "esperar antes de começar"],
    "figura-no-mondego": ["havia alguém no rio essa manhã", "não estava à espera de encontrar ninguém"],
    "telhados-com-nevoa": ["acordei e a cidade tinha mudado", "a névoa chegou durante a noite"],
    "matcha-da-manha": ["havia um verde que não esperava", "a cor dentro da chávena"],
    "retrato-na-esplanada": ["a luz mudou e eu peguei na câmara", "ela não reparou"],
    "ribeiro-e-musgo": ["encontrei água onde não esperava", "o bosque que não estava no mapa"],
    "barco-no-douro": ["o porto em fevereiro tem frio de pedra", "fui antes dos turistas"],
  },
};

const DIARIO_CONFIG_JSON = path.join(process.cwd(), "diario-config.json");

export const getDiarioConfig = createServerFn({ method: "GET" }).handler(async (): Promise<DiarioConfig> => {
  const saved = await cfg<Partial<DiarioConfig>>("diario_config", DIARIO_CONFIG_JSON, {});
  return {
    aberturasPool: saved.aberturasPool ?? DIARIO_CONFIG_DEFAULTS.aberturasPool,
    rasurasPorSlug: saved.rasurasPorSlug ?? DIARIO_CONFIG_DEFAULTS.rasurasPorSlug,
  };
});

export const saveDiarioConfig = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string } & Partial<DiarioConfig>)
  .handler(async ({ data }) => {
    const { password, ...rest } = data;
    checkPassword(password);
    const current = await cfg<Partial<DiarioConfig>>("diario_config", DIARIO_CONFIG_JSON, {});
    await writeConfig("diario_config", { ...current, ...rest });
    return { ok: true };
  });

// ── Rosemary (página interior) ────────────────────────────────────────────────

export type RosemarySection = { heading: string; body: string[] };
export type RosemaryConfig = { sections: RosemarySection[] };

export const ROSEMARY_DEFAULTS: RosemaryConfig = {
  sections: [
    {
      heading: "I — O QUE FICOU POR DIZER",
      body: [
        "Encontraste isto. Isso já diz algo de ti.",
        "Há pessoas que passam pelo arquivo inteiro e não param para escutar o silêncio entre as imagens. Tu ficaste. Procuraste. Escreveste.",
        "Por isso mereces o que está aqui dentro.",
      ],
    },
    {
      heading: "II — SOBRE O RITMO",
      body: [
        "Não sou rápida. Nunca fui.",
        "Sinto devagar, como quem deixa a fotografia revelar em câmara escura — sem pressa, sem certezas, esperando que a imagem apareça quando estiver pronta.",
        "Durante muito tempo achei que isso era uma falha. Agora sei que é a única forma que conheço de fazer as coisas com verdade.",
        "O mundo apressado não sabe o que perde por não esperar.",
      ],
    },
    {
      heading: "III — SOBRE OS LUGARES QUE AINDA NÃO VI",
      body: [
        "A Irlanda existe dentro de mim em verde e chuva fina.\nA Escócia em pedra e nevoeiro que não se dissipa.\nVerona em varandas e cartas não enviadas.\nBruges em canais que reflectem uma luz que imagino dourada.",
        "Já percorri estas cidades nas fotografias de outras pessoas, nas páginas de livros que ficaram dobrados em lugares errados, nas músicas que soam a chegada.",
        "Quando for — e vou — vai parecer um regresso.",
        "Guardar um lugar dentro de mim antes de o visitar é a coisa mais estranha e mais minha que faço.",
      ],
    },
    {
      heading: "IV — SOBRE O QUE A LENTE NÃO ALCANÇA",
      body: [
        "Há uma tensão antes do clique que não cabe em nenhuma imagem.",
        "É a respiração suspensa. A decisão de ficar quieta mais um segundo. A consciência de que este momento específico — esta luz, esta sombra, este ar — nunca vai voltar exactamente assim.",
        "Fotografo porque não confio na memória. Ela romanticiza, apaga, reescreve sem avisar.",
        "A imagem não deixa. Fica onde a pus.",
      ],
    },
    {
      heading: "V — SOBRE OS LIVROS E A MÚSICA",
      body: [
        "Tom Walker canta como se soubesse de algo que eu ainda não disse em voz alta. Há artistas assim — que chegam antes das palavras.",
        "Os livros são o sítio onde me escondo quando o mundo fica barulhento demais. Guillaume Musso, Tolkien, Rowling — não são apenas histórias. São arquitecturas onde aprendi que o invisível importa, que a amizade salva, que a coragem não é a ausência do medo.",
        "Algumas noites o silêncio só é suportável com música a baixo volume e um livro que ainda não acabei.",
        "Isso é o suficiente. Mais do que o suficiente.",
      ],
    },
    {
      heading: "VI — SOBRE AQUILO QUE AINDA QUERO",
      body: [
        "Quero trabalho que faça sentido com o que sou — não apenas com o que aprendi.",
        "Quero fotografar sem justificar porquê. Quero construir algo que seja completamente meu, feito com as mãos e com a atenção e com o tempo que as coisas precisam.",
        "Imagino-me algures entre o Porto e o mar. Talvez Aveiro. Talvez um sítio que ainda não existe no meu mapa.",
        "Não sei o caminho exacto. Sei a direcção.",
      ],
    },
    {
      heading: "VII — PARA QUEM CHEGOU ATÉ AQUI",
      body: [
        "Este é o arquivo dentro do arquivo.",
        "Se chegaste aqui é porque és do género de pessoas que lê até ao fim. Que fica quando os outros já foram. Que ouve o silêncio depois da música parar.",
        "Obrigada por isso.",
        "Cuida-te.",
      ],
    },
  ],
};

const ROSEMARY_JSON = path.join(process.cwd(), "rosemary-config.json");

export const getRosemary = createServerFn({ method: "GET" }).handler(async (): Promise<RosemaryConfig> => {
  const saved = await cfg<Partial<RosemaryConfig>>("rosemary", ROSEMARY_JSON, {});
  return { sections: saved.sections ?? ROSEMARY_DEFAULTS.sections };
});

export const saveRosemary = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string } & Partial<RosemaryConfig>)
  .handler(async ({ data }) => {
    const { password, ...rest } = data;
    checkPassword(password);
    const current = await cfg<Partial<RosemaryConfig>>("rosemary", ROSEMARY_JSON, {});
    await writeConfig("rosemary", { ...current, ...rest });
    return { ok: true };
  });

// ── Git Info & Push ───────────────────────────────────────────────────────────

export type GitCommitInfo = { hash: string; message: string; date: string };
export type GitInfo = {
  branch: string;
  remote: string;
  lastCommits: GitCommitInfo[];
  dirty: boolean;
  dirtyCount: number;
};

export const getGitInfo = createServerFn({ method: "GET" }).handler(async (): Promise<GitInfo> => {
  const { spawnSync } = await import("child_process");
  const opts = { cwd: process.cwd(), stdio: "pipe" as const };
  const read = (cmd: string, args: string[]): string =>
    (spawnSync(cmd, args, opts).stdout?.toString() ?? "").trim();
  try {
    const branch = read("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
    const remote = read("git", ["remote", "get-url", "origin"]);
    const logRaw = read("git", ["log", "--format=%H\x1f%s\x1f%cr", "-5"]);
    const statusRaw = read("git", ["status", "--porcelain"]);
    const lastCommits: GitCommitInfo[] = logRaw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [hash = "", message = "", date = ""] = line.split("\x1f");
        return { hash: hash.slice(0, 7), message, date };
      });
    const dirtyLines = statusRaw.split("\n").filter(Boolean);
    return { branch, remote, lastCommits, dirty: dirtyLines.length > 0, dirtyCount: dirtyLines.length };
  } catch {
    return { branch: "—", remote: "—", lastCommits: [], dirty: false, dirtyCount: 0 };
  }
});

export const gitCommitAndPush = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { password: string; message?: string })
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { spawnSync } = await import("child_process");
    const msg = data.message?.trim()
      || `Atualização de conteúdo — ${new Date().toLocaleDateString("pt-PT")}`;
    const opts = { cwd: process.cwd(), stdio: "pipe" as const };
    const run = (cmd: string, args: string[]) => {
      const r = spawnSync(cmd, args, opts);
      if (r.status !== 0) throw new Error((r.stderr?.toString() ?? "").slice(0, 400) || `${cmd} failed`);
      return (r.stdout?.toString() ?? "").trim();
    };
    run("git", ["add", "-A"]);
    run("git", ["commit", "--allow-empty", "-m", msg]);
    const token = process.env.GITHUB_TOKEN;
    const originUrl = run("git", ["remote", "get-url", "origin"]);
    const pushUrl = token ? originUrl.replace("https://", `https://x-access-token:${token}@`) : "origin";
    run("git", ["push", pushUrl]);
    const logLine = run("git", ["log", "--format=%H\x1f%s", "-1"]);
    const [fullHash = "", subject = ""] = logLine.split("\x1f");
    return { ok: true, message: "Publicado no GitHub com sucesso.", commitHash: fullHash.slice(0, 7), commitMessage: subject };
  });
