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

export const verifyAdminPassword = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { password: string })
  .handler(({ data }) => {
    const expected = process.env.ADMIN_PASSWORD ?? "rosmaninho";
    if (data.password !== expected) {
      throw new Error("Password incorrecta.");
    }
    return { ok: true };
  });

export const savePhotoConfig = createServerFn({ method: "POST" })
  .validator(
    (data: unknown) =>
      data as { password: string; hidden: string[]; order: string[] }
  )
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD ?? "rosmaninho";
    if (data.password !== expected) {
      throw new Error("Password incorrecta.");
    }
    const config: PhotoConfig = { hidden: data.hidden, order: data.order };
    await writeConfig("photo_config", config);
    return { ok: true };
  });
