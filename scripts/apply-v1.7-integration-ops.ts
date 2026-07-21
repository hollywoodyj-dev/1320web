import fs from "node:fs";
import postgres from "postgres";

async function main() {
  const env = fs.readFileSync(".env.local", "utf8");
  const match = env.split(/\r?\n/).find((line) => line.startsWith("POSTGRES_URL="));
  if (!match) throw new Error("no POSTGRES_URL");
  const url = match.slice("POSTGRES_URL=".length).trim().replace(/^"|"$/g, "");
  const sql = postgres(url, { prepare: false, max: 1 });
  const migration = fs.readFileSync("db/platform-domain-v1.7-integration-ops.sql", "utf8");
  await sql.unsafe(migration);
  const cols = await sql`
    select column_name
    from information_schema.columns
    where table_name = 'platform_sessions'
      and column_name in ('intake_status', 'summary_status', 'assigned_facilitator_id')
    order by 1
  `;
  const tables = await sql`
    select table_name
    from information_schema.tables
    where table_schema = 'public'
      and table_name in ('integration_intakes', 'integration_session_notes', 'integration_summaries')
    order by 1
  `;
  console.log(
    "cols",
    cols.map((row) => row.column_name).join(","),
  );
  console.log(
    "tables",
    tables.map((row) => row.table_name).join(","),
  );
  await sql.end();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
