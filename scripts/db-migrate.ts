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

const schemaFiles = [
  "schema.sql",
  "platform-domain-v1.sql",
  "platform-domain-v1.1-authorship.sql",
  "platform-domain-v1.2-personal-integration.sql",
  "platform-domain-v1.3-follow-up.sql",
  "platform-domain-v1.4-wisewave.sql",
  "platform-domain-v1.5-membership.sql",
  "schema-v2-user-profile.sql",
  "schema-v2-password-auth.sql",
];

async function main() {
  const sql = postgres(url, { max: 1 });
  for (const file of schemaFiles) {
    const schemaPath = path.join(process.cwd(), "db", file);
    const schema = fs.readFileSync(schemaPath, "utf8");
    await sql.unsafe(schema);
    console.log("Applied schema:", schemaPath);
  }
  await sql.end({ timeout: 5 });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
