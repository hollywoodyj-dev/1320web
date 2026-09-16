/**
 * T32 purchase QA exclusion — read-only split (never deletes rows).
 * Run: npx tsx --env-file=.env.local scripts/probe-purchase-qa-exclusion.ts
 */
import { getSql } from "../lib/db/client";
import { isQaTaggedConversionEvent } from "../lib/funnel/qa-traffic-exclusion";

function prefix(value: string | null | undefined, n = 14): string | null {
  if (!value) return null;
  return value.length <= n ? value : `${value.slice(0, n)}…`;
}

async function main() {
  const db = getSql();
  const rows = await db<
    {
      created_at: Date;
      source: string | null;
      metadata: Record<string, unknown> | null;
      session_id: string | null;
    }[]
  >`
    SELECT created_at, source, metadata, session_id
    FROM marketing_conversion_events
    WHERE event_name = 'purchase_completed'
    ORDER BY created_at ASC
  `;

  let qa = 0;
  let clean = 0;
  console.log("=== purchase_completed QA split (all time) ===");
  for (const row of rows) {
    const tagged = isQaTaggedConversionEvent({ source: row.source, metadata: row.metadata });
    if (tagged) qa += 1;
    else clean += 1;
    const campaign =
      (row.metadata?.utm_campaign as string | undefined) ??
      (row.metadata?.campaign as string | undefined) ??
      null;
    console.log(
      JSON.stringify({
        at: row.created_at.toISOString(),
        session: prefix(row.session_id),
        source: row.source,
        campaign,
        qaTagged: tagged,
      }),
    );
  }
  console.log(
    JSON.stringify({ total: rows.length, qaTagged: qa, excludeQa: clean, rule: "campaign haze_* OR utm_source=operator" }),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
