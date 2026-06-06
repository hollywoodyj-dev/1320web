/**
 * Apply `db/schema.sql` to POSTGRES_URL.
 * Run: npm run db:migrate
 */
import fs from "node:fs";
import path from "node:path";
import postgres from "postgres";

const url = (process.env.POSTGRES_URL?.trim() || process.env.DATABASE_URL?.trim()) ?? "";
if (!url) {
  console.error("Set POSTGRES_URL or DATABASE_URL before running db:migrate.");
  process.exit(1);
}

const schemaPath = path.join(process.cwd(), "db", "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

async function main() {
  const sql = postgres(url, { max: 1 });
  await sql.unsafe(schema);
  await sql.end({ timeout: 5 });
  console.log("Applied schema:", schemaPath);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
