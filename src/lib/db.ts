import pg from "pg";

const { Pool } = pg;

let pool: pg.Pool | null = null;

export function getPool(): pg.Pool {
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pool;
}

export async function readConfig<T>(key: string, fallback: T): Promise<T> {
  try {
    const client = getPool();
    const result = await client.query<{ value: T }>(
      "SELECT value FROM admin_config WHERE key = $1",
      [key]
    );
    if (result.rows.length > 0) {
      return result.rows[0].value as T;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

export async function writeConfig(key: string, value: unknown): Promise<void> {
  const client = getPool();
  await client.query(
    `INSERT INTO admin_config (key, value, updated_at)
     VALUES ($1, $2::jsonb, NOW())
     ON CONFLICT (key) DO UPDATE
       SET value = EXCLUDED.value,
           updated_at = EXCLUDED.updated_at`,
    [key, JSON.stringify(value)]
  );
}
