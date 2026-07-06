import postgres from "postgres";
import { getDatabaseUrl, isDatabaseConfigured } from "@/lib/platform-config";

let sql: ReturnType<typeof postgres> | null = null;

function isServerlessRuntime(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

/** Prefer Neon/Vercel pooler host when a direct connection URL is configured. */
export function getConnectionUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    if (host.includes(".neon.tech") && !host.includes("-pooler")) {
      const parts = host.split(".");
      parts[0] = `${parts[0]}-pooler`;
      parsed.hostname = parts.join(".");
      return parsed.toString();
    }
  } catch {
    // Keep original URL when parsing fails.
  }
  return url;
}

export function getSql() {
  if (!isDatabaseConfigured()) {
    throw new Error("Database is not configured. Set POSTGRES_URL.");
  }

  if (!sql) {
    const rawUrl = getDatabaseUrl();
    if (!rawUrl) throw new Error("Database URL missing.");
    const url = isServerlessRuntime() ? getConnectionUrl(rawUrl) : rawUrl;
    sql = postgres(url, {
      max: isServerlessRuntime() ? 1 : 5,
      idle_timeout: 20,
      max_lifetime: 60 * 30,
      connect_timeout: 10,
      prepare: false,
    });
  }

  return sql;
}

export async function withDb<T>(fn: (db: ReturnType<typeof postgres>) => Promise<T>): Promise<T | null> {
  if (!isDatabaseConfigured()) return null;
  return fn(getSql());
}
