import postgres from "postgres";
import { getDatabaseUrl, isDatabaseConfigured } from "@/lib/platform-config";

let sql: ReturnType<typeof postgres> | null = null;

export function getSql() {
  if (!isDatabaseConfigured()) {
    throw new Error("Database is not configured. Set POSTGRES_URL.");
  }

  if (!sql) {
    const url = getDatabaseUrl();
    if (!url) throw new Error("Database URL missing.");
    sql = postgres(url, { max: 5, prepare: false });
  }

  return sql;
}

export async function withDb<T>(fn: (db: ReturnType<typeof postgres>) => Promise<T>): Promise<T | null> {
  if (!isDatabaseConfigured()) return null;
  return fn(getSql());
}
