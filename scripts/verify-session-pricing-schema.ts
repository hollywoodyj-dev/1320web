import postgres from "postgres";

async function main() {
  const url = process.env.POSTGRES_URL?.trim() || process.env.DATABASE_URL?.trim();
  if (!url) {
    console.error("POSTGRES_URL missing");
    process.exit(1);
  }

  const sql = postgres(url, { max: 1 });
  const cols = await sql`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'platform_sessions'
      AND column_name IN ('session_title', 'duration_minutes', 'price_amount', 'currency', 'pricing_version')
    ORDER BY 1
  `;
  console.log("columns:", cols.map((r) => r.column_name).join(", "));
  const c = await sql`
    SELECT pg_get_constraintdef(oid) AS def
    FROM pg_constraint
    WHERE conname = 'platform_sessions_session_variant_check'
  `;
  console.log("constraint:", c[0]?.def ?? "(missing)");
  await sql.end({ timeout: 5 });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
