import { createServerFn } from "@tanstack/react-start";
import fs from "fs";
import path from "path";
import { readConfig, writeConfig } from "./db";

export type NesteMomento = {
  aLer: string;
  aLerUrl?: string;
  aEscutar: string;
  aEscutarUrl?: string;
  aFotografar: string;
  aPensarEm: string;
};

const MOMENTO_JSON = path.join(process.cwd(), "momento-config.json");

const DEFAULT: NesteMomento = {
  aLer: "Central Park, de Guillaume Musso — comecei numa tarde e ainda não consegui parar.",
  aLerUrl: "https://www.bertrand.pt/livro/central-park-guillaume-musso/16613027",
  aEscutar: "a minha playlist de 2026 no Spotify, feita por mim ao longo do ano.",
  aEscutarUrl: "https://open.spotify.com/playlist/5gVgViaBeZPuLPwYtDQZWS?si=cR3NzMnJSn-gIyW1vznRKQ&pi=bx8aUmcUQfKXd",
  aFotografar: "os telhados ao entardecer. sempre os telhados — como se houvesse sempre mais um ângulo que ainda não vi.",
  aPensarEm: "Bruges. e numa caminhada de novembro que ainda não aconteceu mas que já tem rota definida na cabeça.",
};

async function readMomento(): Promise<NesteMomento> {
  const fromDb = await readConfig<Partial<NesteMomento> | null>("momento", null);
  if (fromDb !== null) return { ...DEFAULT, ...fromDb };
  // Migration from legacy JSON file
  try {
    const legacy = JSON.parse(fs.readFileSync(MOMENTO_JSON, "utf-8")) as Partial<NesteMomento>;
    const merged = { ...DEFAULT, ...legacy };
    await writeConfig("momento", merged);
    return merged;
  } catch {
    return DEFAULT;
  }
}

export const getNesteMomento = createServerFn({ method: "GET" }).handler(
  async () => readMomento()
);

export const saveNesteMomento = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { password: string } & NesteMomento)
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD ?? "rosmaninho";
    if (data.password !== expected) {
      throw new Error("Password incorrecta.");
    }
    const momento: NesteMomento = {
      aLer: data.aLer,
      aLerUrl: data.aLerUrl ?? "",
      aEscutar: data.aEscutar,
      aEscutarUrl: data.aEscutarUrl ?? "",
      aFotografar: data.aFotografar,
      aPensarEm: data.aPensarEm,
    };
    await writeConfig("momento", momento);
    return { ok: true };
  });
