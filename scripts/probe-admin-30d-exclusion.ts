/**
 * Mirrors admin conversion-tracking 30d raw vs clean counts.
 * Run: npx tsx --env-file=.env.local scripts/probe-admin-30d-exclusion.ts
 */
import { getSql } from "../lib/db/client";
import { QA_EXCLUSION_SQL } from "../lib/funnel/qa-traffic-exclusion";

const WINDOW_DAYS = 30;

async function main() {
  const db = getSql();
  const since = new Date(Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000);

  const [raw, clean] = await Promise.all([
    db<{ event_name: string; count: number }[]>`
      SELECT event_name, COUNT(*)::int AS count
      FROM marketing_conversion_events
      WHERE created_at >= ${since}
      GROUP BY event_name
    `,
    db<{ event_name: string; count: number }[]>`
      SELECT event_name, COUNT(*)::int AS count
      FROM marketing_conversion_events
      WHERE created_at >= ${since}
        AND NOT (${db.unsafe(QA_EXCLUSION_SQL)})
      GROUP BY event_name
    `,
  ]);

  const rawMap = new Map(raw.map((r) => [r.event_name, r.count]));
  const cleanMap = new Map(clean.map((r) => [r.event_name, r.count]));

  const purchaseRaw = rawMap.get("purchase_completed") ?? 0;
  const purchaseClean = cleanMap.get("purchase_completed") ?? 0;

  console.log("=== 30d admin toggle effect (purchase_completed) ===");
  console.log(
    JSON.stringify({
      windowDays: WINDOW_DAYS,
      since: since.toISOString(),
      raw: purchaseRaw,
      clean: purchaseClean,
      qaTaggedExcluded: purchaseRaw - purchaseClean,
      pass: purchaseRaw > purchaseClean,
    }),
  );

  const signups = await db<{ entry: string; count: number }[]>`
    SELECT COALESCE(metadata->>'entry', '') AS entry, COUNT(*)::int AS count
    FROM marketing_conversion_events
    WHERE event_name = 'signup_completed'
      AND created_at >= ${since}
    GROUP BY 1
    ORDER BY 1
  `;
  console.log("=== 30d signup_completed by entry ===");
  console.log(JSON.stringify(signups));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
