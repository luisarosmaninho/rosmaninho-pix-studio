import { createServerFn } from "@tanstack/react-start";
import fs from "fs";
import path from "path";

export type PhotoConfig = {
  hidden: string[];
  order: string[];
};

const CONFIG_PATH = path.join(process.cwd(), "photos-config.json");

function readConfig(): PhotoConfig {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { hidden: [], order: [] };
  }
}

export const getPhotoConfig = createServerFn({ method: "GET" }).handler(
  () => readConfig()
);

export const savePhotoConfig = createServerFn({ method: "POST" })
  .inputValidator(
    (data: unknown) =>
      data as { password: string; hidden: string[]; order: string[] }
  )
  .handler(({ data }) => {
    const expected = process.env.ADMIN_PASSWORD ?? "rosmaninho";
    if (data.password !== expected) {
      throw new Error("Password incorrecta.");
    }
    const config: PhotoConfig = { hidden: data.hidden, order: data.order };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    return { ok: true };
  });
