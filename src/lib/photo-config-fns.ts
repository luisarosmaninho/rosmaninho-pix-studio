import { createServerFn } from "@tanstack/react-start";
import fs from "fs";
import path from "path";
import { readConfig, writeConfig } from "./db";

export type PhotoConfig = {
  hidden: string[];
  order: string[];
};

const PHOTOS_CONFIG_JSON = path.join(process.cwd(), "photos-config.json");

async function readPhotoConfig(): Promise<PhotoConfig> {
  const fromDb = await readConfig<PhotoConfig | null>("photo_config", null);
  if (fromDb !== null) return fromDb;
  // Migration from legacy JSON file
  try {
    const legacy = JSON.parse(fs.readFileSync(PHOTOS_CONFIG_JSON, "utf-8")) as PhotoConfig;
    await writeConfig("photo_config", legacy);
    return legacy;
  } catch {
    return { hidden: [], order: [] };
  }
}

export const getPhotoConfig = createServerFn({ method: "GET" }).handler(
  async () => readPhotoConfig()
);

function checkAdminPassword(password: string) {
  const envPassword = process.env.ADMIN_PASSWORD;
  const isProduction = process.env.NODE_ENV === "production";
  if (!envPassword && isProduction) {
    throw new Error(
      "ADMIN_PASSWORD não está configurado. Configura o segredo antes de usar o painel admin em produção."
    );
  }
  const expected = envPassword ?? "rosmaninho";
  if (!envPassword) {
    console.warn("[admin] ADMIN_PASSWORD não definido — a usar palavra-passe por omissão. OBRIGATÓRIO definir em produção!");
  }
  if (password !== expected) throw new Error("Password incorrecta.");
}

export const verifyAdminPassword = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { password: string })
  .handler(({ data }) => {
    checkAdminPassword(data.password);
    return { ok: true };
  });

export const savePhotoConfig = createServerFn({ method: "POST" })
  .validator(
    (data: unknown) =>
      data as { password: string; hidden: string[]; order: string[] }
  )
  .handler(async ({ data }) => {
    checkAdminPassword(data.password);
    const config: PhotoConfig = { hidden: data.hidden, order: data.order };
    await writeConfig("photo_config", config);
    return { ok: true };
  });
