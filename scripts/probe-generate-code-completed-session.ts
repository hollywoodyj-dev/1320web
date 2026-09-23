/**
 * Verify generate_code_completed has at most one row per session_id.
 * Run: npx tsx --env-file=.env.local scripts/probe-generate-code-completed-session.ts [session_id]
 */
import { getSql, withDb } from "../lib/db/client";

const SESSION = process.argv[2]?.trim() ?? "";

async function main() {
  await withDb(async () => {
    const db = getSql();
    if (SESSION) {
      const rows = await db<{ id: string; created_at: Date }[]>`
        SELECT id, created_at FROM marketing_conversion_events
        WHERE event_name = 'generate_code_completed'
          AND session_id = ${SESSION}
        ORDER BY created_at ASC
      `;
      console.log(`session_id=${SESSION} rows=${rows.length}`);
      for (const row of rows) {
        console.log(`  ${row.created_at.toISOString()} ${row.id}`);
      }
      process.exit(rows.length <= 1 ? 0 : 1);
    }

    const dupes = await db<{ session_id: string; count: string }[]>`
      SELECT session_id, COUNT(*)::int AS count
      FROM marketing_conversion_events
      WHERE event_name = 'generate_code_completed'
        AND session_id IS NOT NULL
        AND created_at >= NOW() - INTERVAL '7 days'
      GROUP BY session_id
      HAVING COUNT(*) > 1
      ORDER BY count DESC
      LIMIT 20
    `;
    if (!dupes.length) {
      console.log("No duplicate generate_code_completed per session_id in last 7d.");
      process.exit(0);
    }
    console.log("Sessions with >1 generate_code_completed (last 7d):");
    for (const row of dupes) {
      console.log(`  ${row.session_id} count=${row.count}`);
    }
    process.exit(1);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
