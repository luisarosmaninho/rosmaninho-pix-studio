import { createServerFn } from "@tanstack/react-start";
import fs from "fs";
import path from "path";

const VISITS_PATH = path.join(process.cwd(), "visits-config.json");

function readVisits(): Record<string, number> {
  try {
    return JSON.parse(fs.readFileSync(VISITS_PATH, "utf-8"));
  } catch {
    return {};
  }
}

export const getVisitCounts = createServerFn({ method: "GET" }).handler(
  () => readVisits()
);

export const incrementVisit = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as { slug: string })
  .handler(({ data }) => {
    const visits = readVisits();
    visits[data.slug] = (visits[data.slug] ?? 0) + 1;
    fs.writeFileSync(VISITS_PATH, JSON.stringify(visits, null, 2));
    return { count: visits[data.slug] };
  });
