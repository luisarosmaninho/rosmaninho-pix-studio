import { createServerFn } from "@tanstack/react-start";
import fs from "fs";
import path from "path";
import { categories as staticCategories, photos as staticPhotos } from "./photos";
import type { Category, Photo } from "./photos";
import { journal as staticJournal } from "./journal";
import type { JournalEntry } from "./journal";
import { notas as staticNotas } from "./notas";
import type { Nota } from "./notas";

// ── Helpers ──────────────────────────────────────────────────────────────────

function readJson<T>(filepath: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(filepath, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson(filepath: string, data: unknown) {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "rosmaninho";
  if (password !== expected) throw new Error("Password incorrecta.");
}

// ── Categories ────────────────────────────────────────────────────────────────

export type CategoryOverrides = Partial<Omit<Category, "slug" | "cover">>;
type CategoriesConfig = Record<string, CategoryOverrides>;

const CATEGORIES_CONFIG = path.join(process.cwd(), "categories-config.json");

export const getCategories = createServerFn({ method: "GET" }).handler((): Category[] => {
  const overrides = readJson<CategoriesConfig>(CATEGORIES_CONFIG, {});
  return staticCategories.map((cat) => ({ ...cat, ...overrides[cat.slug] }));
});

export const saveCategoryTexts = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as { password: string; slug: string; data: CategoryOverrides })
  .handler(({ data }) => {
    checkPassword(data.password);
    const overrides = readJson<CategoriesConfig>(CATEGORIES_CONFIG, {});
    overrides[data.slug] = data.data;
    writeJson(CATEGORIES_CONFIG, overrides);
    return { ok: true };
  });

// ── Photos meta ───────────────────────────────────────────────────────────────

export type PhotoMetaOverride = { title: string; description: string; conditions: string };
type PhotosMetaConfig = Record<string, PhotoMetaOverride>;

const PHOTOS_META_CONFIG = path.join(process.cwd(), "photos-meta-config.json");

export type NewPhotoEntry = {
  id: string;
  src: string;
  title: string;
  category: string;
  orientation: "portrait" | "landscape" | "square";
  description: string;
  conditions: string;
};

const NEW_PHOTOS_CONFIG = path.join(process.cwd(), "new-photos-config.json");

function readNewPhotos(): NewPhotoEntry[] {
  try {
    return JSON.parse(fs.readFileSync(NEW_PHOTOS_CONFIG, "utf-8")) as NewPhotoEntry[];
  } catch {
    return [];
  }
}

export const getPhotosWithMeta = createServerFn({ method: "GET" }).handler((): Photo[] => {
  const overrides = readJson<PhotosMetaConfig>(PHOTOS_META_CONFIG, {});
  const staticWithMeta = staticPhotos.map((photo) => {
    const ov = overrides[photo.id];
    if (!ov) return photo;
    return {
      ...photo,
      title: ov.title ?? photo.title,
      meta: {
        description: ov.description ?? photo.meta.description,
        ...(ov.conditions ? { conditions: ov.conditions } : photo.meta.conditions ? { conditions: photo.meta.conditions } : {}),
      },
    };
  });
  const newPhotos = readNewPhotos().map((np) => ({
    id: np.id,
    src: np.src,
    title: np.title,
    category: np.category as Photo["category"],
    orientation: (np.orientation ?? "landscape") as Photo["orientation"],
    meta: { description: np.description, ...(np.conditions ? { conditions: np.conditions } : {}) },
  }));
  return [...staticWithMeta, ...newPhotos];
});

export const getNewPhotos = createServerFn({ method: "GET" }).handler((): NewPhotoEntry[] => {
  return readNewPhotos();
});

export const savePhotoMeta = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as { password: string; photoId: string; title: string; description: string; conditions: string })
  .handler(({ data }) => {
    checkPassword(data.password);
    const staticIds = new Set(staticPhotos.map((p) => p.id));
    if (staticIds.has(data.photoId)) {
      const overrides = readJson<PhotosMetaConfig>(PHOTOS_META_CONFIG, {});
      overrides[data.photoId] = { title: data.title, description: data.description, conditions: data.conditions };
      writeJson(PHOTOS_META_CONFIG, overrides);
    } else {
      const newPhotos = readNewPhotos();
      const idx = newPhotos.findIndex((p) => p.id === data.photoId);
      if (idx !== -1) {
        newPhotos[idx] = { ...newPhotos[idx], title: data.title, description: data.description, conditions: data.conditions };
        writeJson(NEW_PHOTOS_CONFIG, newPhotos);
      }
    }
    return { ok: true };
  });

export const addNewPhoto = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as { password: string; photo: NewPhotoEntry })
  .handler(({ data }) => {
    checkPassword(data.password);
    const existing = readNewPhotos();
    if (existing.find((p) => p.id === data.photo.id)) throw new Error("Já existe uma foto com este ID.");
    existing.push(data.photo);
    writeJson(NEW_PHOTOS_CONFIG, existing);
    return { ok: true };
  });

export const deleteNewPhoto = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as { password: string; photoId: string })
  .handler(({ data }) => {
    checkPassword(data.password);
    const updated = readNewPhotos().filter((p) => p.id !== data.photoId);
    writeJson(NEW_PHOTOS_CONFIG, updated);
    return { ok: true };
  });

// ── Journal ───────────────────────────────────────────────────────────────────

export type JournalEntryEditable = Pick<JournalEntry, "slug" | "date" | "title" | "excerpt" | "body" | "photoTitle">;

type JournalFileConfig = {
  overrides: Record<string, Partial<JournalEntryEditable>>;
  newEntries: JournalEntry[];
};

const JOURNAL_CONFIG = path.join(process.cwd(), "journal-config.json");

function readJournalConfig(): JournalFileConfig {
  try {
    const raw = JSON.parse(fs.readFileSync(JOURNAL_CONFIG, "utf-8")) as Record<string, unknown>;
    if (raw && typeof raw.overrides === "object" && !Array.isArray(raw.overrides)) {
      return {
        overrides: (raw.overrides ?? {}) as Record<string, Partial<JournalEntryEditable>>,
        newEntries: Array.isArray(raw.newEntries) ? (raw.newEntries as JournalEntry[]) : [],
      };
    }
    // Migrate old flat format
    return { overrides: raw as Record<string, Partial<JournalEntryEditable>>, newEntries: [] };
  } catch {
    return { overrides: {}, newEntries: [] };
  }
}

const STATIC_SLUGS = new Set(staticJournal.map((e) => e.slug));

export const getJournal = createServerFn({ method: "GET" }).handler((): JournalEntry[] => {
  const { overrides, newEntries } = readJournalConfig();
  const withOverrides = staticJournal.map((entry) => {
    const ov = overrides[entry.slug];
    return ov ? { ...entry, ...ov } : entry;
  });
  return [...withOverrides, ...newEntries].sort((a, b) => b.date.localeCompare(a.date));
});

export const getNewJournalEntries = createServerFn({ method: "GET" }).handler((): JournalEntry[] => {
  return readJournalConfig().newEntries;
});

export const saveJournalEntry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as { password: string; slug: string; data: Partial<JournalEntryEditable> })
  .handler(({ data }) => {
    checkPassword(data.password);
    const cfg = readJournalConfig();
    if (STATIC_SLUGS.has(data.slug)) {
      cfg.overrides[data.slug] = data.data;
    } else {
      const idx = cfg.newEntries.findIndex((e) => e.slug === data.slug);
      if (idx !== -1) {
        cfg.newEntries[idx] = { ...cfg.newEntries[idx], ...data.data, slug: data.slug };
      }
    }
    writeJson(JOURNAL_CONFIG, cfg);
    return { ok: true };
  });

export const addNewJournalEntry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as { password: string; entry: JournalEntry })
  .handler(({ data }) => {
    checkPassword(data.password);
    const cfg = readJournalConfig();
    const existing = cfg.newEntries.findIndex((e) => e.slug === data.entry.slug);
    if (existing !== -1) throw new Error("Já existe uma entrada com este slug.");
    if (STATIC_SLUGS.has(data.entry.slug)) throw new Error("Este slug já está em uso.");
    cfg.newEntries.push(data.entry);
    writeJson(JOURNAL_CONFIG, cfg);
    return { ok: true };
  });

export const deleteNewJournalEntry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as { password: string; slug: string })
  .handler(({ data }) => {
    checkPassword(data.password);
    const cfg = readJournalConfig();
    cfg.newEntries = cfg.newEntries.filter((e) => e.slug !== data.slug);
    writeJson(JOURNAL_CONFIG, cfg);
    return { ok: true };
  });

// ── Notas ─────────────────────────────────────────────────────────────────────

const NOTAS_CONFIG = path.join(process.cwd(), "notas-config.json");

export const getNotas = createServerFn({ method: "GET" }).handler((): Nota[] => {
  try {
    return JSON.parse(fs.readFileSync(NOTAS_CONFIG, "utf-8")) as Nota[];
  } catch {
    return staticNotas;
  }
});

export const saveNotas = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as { password: string; notas: Nota[] })
  .handler(({ data }) => {
    checkPassword(data.password);
    writeJson(NOTAS_CONFIG, data.notas);
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
    { cidade: "Aveiro.", nota: "Canal, bicicleta, silêncio. Uma escala perfeita que não precisa de justificação para existir." },
  ],
  cartografiaSonhadas: [
    { cidade: "Irlanda.", nota: "A neblina sobre os campos, uma cor de verde que não existe mais em lado nenhum. Ainda não fui. Mas já ando a imaginá-la há tempo suficiente para ter saudades." },
    { cidade: "Escócia.", nota: "Highlands, pedra, silêncio. Um sítio para onde se vai quando se precisa de muito espaço e poucas palavras. Ainda apenas sonhado." },
    { cidade: "Bruges.", nota: "Já conheço os canais das fotografias de outras pessoas. Quando for — e há de ser — vai parecer um regresso a algum lugar que não sei que conhecia." },
    { cidade: "Verona.", nota: "A luz italiana ao entardecer, o granito rosado, as pontes. Um lugar que habita o pensamento antes de habitar o mapa." },
    { cidade: "Noruega.", nota: "Os fiordes, os faróis, o sol da meia-noite. Ainda só imaginada — e talvez seja por isso que continua tão nítida." },
  ],
};

const SOBRE_CONFIG = path.join(process.cwd(), "sobre-config.json");

export const getSobreTexts = createServerFn({ method: "GET" }).handler((): SobreConfig => {
  const saved = readJson<Partial<SobreConfig>>(SOBRE_CONFIG, {});
  return { ...SOBRE_DEFAULTS, ...saved };
});

export const saveSobreTexts = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as { password: string } & Partial<SobreConfig>)
  .handler(({ data }) => {
    const { password, ...rest } = data;
    checkPassword(password);
    const current = readJson<Partial<SobreConfig>>(SOBRE_CONFIG, {});
    writeJson(SOBRE_CONFIG, { ...current, ...rest });
    return { ok: true };
  });
