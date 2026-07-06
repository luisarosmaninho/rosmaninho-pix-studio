import { createServerFn } from "@tanstack/react-start";
import fs from "fs";
import path from "path";
import { readConfig, writeConfig } from "./db";

const VISITS_JSON = path.join(process.cwd(), "visits-config.json");

async function readVisits(): Promise<Record<string, number>> {
  const fromDb = await readConfig<Record<string, number> | null>("visit_counts", null);
  if (fromDb !== null) return fromDb;
  // Migration from legacy JSON file
  try {
    const legacy = JSON.parse(fs.readFileSync(VISITS_JSON, "utf-8")) as Record<string, number>;
    await writeConfig("visit_counts", legacy);
    return legacy;
  } catch {
    return {};
  }
}

export const getVisitCounts = createServerFn({ method: "GET" }).handler(
  async () => readVisits()
);

export const incrementVisit = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { slug: string })
  .handler(async ({ data }) => {
    const visits = await readVisits();
    visits[data.slug] = (visits[data.slug] ?? 0) + 1;
    await writeConfig("visit_counts", visits);
    return { count: visits[data.slug] };
  });
