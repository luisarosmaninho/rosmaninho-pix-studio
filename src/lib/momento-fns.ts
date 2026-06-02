import { createServerFn } from "@tanstack/react-start";
import fs from "fs";
import path from "path";

export type NesteMomento = {
  aLer: string;
  aEscutar: string;
  aFotografar: string;
  aPensarEm: string;
};

const MOMENTO_PATH = path.join(process.cwd(), "momento-config.json");

const DEFAULT: NesteMomento = {
  aLer: "Central Park, de Guillaume Musso — comecei numa tarde e ainda não consegui parar.",
  aEscutar: "a minha playlist de 2026 no Spotify, feita por mim ao longo do ano.",
  aFotografar: "os telhados ao entardecer. sempre os telhados — como se houvesse sempre mais um ângulo que ainda não vi.",
  aPensarEm: "Bruges. e numa caminhada de novembro que ainda não aconteceu mas que já tem rota definida na cabeça.",
};

function readMomento(): NesteMomento {
  try {
    const raw = fs.readFileSync(MOMENTO_PATH, "utf-8");
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

export const getNesteMomento = createServerFn({ method: "GET" }).handler(
  () => readMomento()
);

export const saveNesteMomento = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as { password: string } & NesteMomento)
  .handler(({ data }) => {
    const expected = process.env.ADMIN_PASSWORD ?? "rosmaninho";
    if (data.password !== expected) {
      throw new Error("Password incorrecta.");
    }
    const momento: NesteMomento = {
      aLer: data.aLer,
      aEscutar: data.aEscutar,
      aFotografar: data.aFotografar,
      aPensarEm: data.aPensarEm,
    };
    fs.writeFileSync(MOMENTO_PATH, JSON.stringify(momento, null, 2));
    return { ok: true };
  });
