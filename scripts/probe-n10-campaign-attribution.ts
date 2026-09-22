/**
 * Phase 1A · N1.0 eyewitness probe — after browser flow with:
 * /what-is-my-life-path-number?utm_source=operator&utm_medium=cpc&utm_campaign=probe_n10&utm_content=lp_ad_01&gclid=probe_n10_fake_click_id
 * → Guide CTA → Free Blueprint → submit birth date (generate_code_started).
 *
 * Run: npx tsx --env-file=.env.local scripts/probe-n10-campaign-attribution.ts [session_id]
 */
import { getSql, withDb } from "../lib/db/client";
import { readMetadataAttributionField } from "../lib/funnel/campaign-attribution-metadata";

const SESSION_FILTER = process.argv[2]?.trim() ?? "";

function fieldOk(
  meta: Record<string, unknown> | null,
  field: Parameters<typeof readMetadataAttributionField>[1],
  expected?: string,
): boolean {
  const value = readMetadataAttributionField(meta, field);
  if (!value) return false;
  if (expected && value !== expected) return false;
  return true;
}

async function main() {
  await withDb(async () => {
    const db = getSql();
  const since = new Date(Date.now() - 2 * 60 * 60 * 1000);

  let rows = await db<
    {
      event_name: string;
      session_id: string | null;
      path: string | null;
      metadata: Record<string, unknown> | null;
      created_at: Date;
    }[]
  >`
    SELECT event_name, session_id, path, metadata, created_at
    FROM marketing_conversion_events
    WHERE created_at >= ${since}
      AND (
        metadata->>'utm_campaign' = 'probe_n10'
        OR metadata->>'first_touch_campaign' = 'probe_n10'
        OR metadata->>'campaign' = 'probe_n10'
      )
    ORDER BY created_at ASC
  `;

  if (SESSION_FILTER) {
    rows = rows.filter(
      (r) =>
        r.session_id === SESSION_FILTER ||
        r.session_id?.startsWith(SESSION_FILTER),
    );
  }

  if (!rows.length) {
    console.log("No probe_n10 rows in last 2h. Run browser flow first.");
    process.exit(1);
  }

  const sessionIds = [...new Set(rows.map((r) => r.session_id).filter(Boolean))];
  console.log(`Sessions: ${sessionIds.join(", ") || "(none)"}`);
  console.log(`Rows: ${rows.length}\n`);

  const guideLanding = "/what-is-my-life-path-number";
  let pass = true;

  for (const row of rows) {
    const meta = row.metadata;
    const content = readMetadataAttributionField(meta, "first_touch_content");
    const medium = readMetadataAttributionField(meta, "first_touch_medium");
    const landing = readMetadataAttributionField(meta, "landing_path");
    const gclid = readMetadataAttributionField(meta, "gclid");

    const checks = {
      content: fieldOk(meta, "first_touch_content", "lp_ad_01"),
      medium: medium === "cpc",
      landing: landing === guideLanding,
      gclid: Boolean(gclid),
    };
    if (!Object.values(checks).every(Boolean)) pass = false;

    console.log(
      [
        row.created_at.toISOString(),
        row.event_name.padEnd(22),
        `session=${row.session_id?.slice(0, 8) ?? "—"}`,
        `landing=${landing ?? "—"}`,
        `content=${content ?? "—"}`,
        `medium=${medium ?? "—"}`,
        `gclid=${gclid ? "yes" : "no"}`,
        checks.landing ? "OK" : "LANDING_FAIL",
      ].join(" | "),
    );
  }

  const started = rows.filter((r) => r.event_name === "generate_code_started");
  const guideCta = rows.filter((r) => r.event_name === "guide_cta_click");
  const pageViews = rows.filter((r) => r.event_name === "page_view");

  if (sessionIds.length === 1 && started.length > 0 && guideCta.length > 0) {
    console.log("\nSession continuity: single session_id across guide + free_start — OK");
  } else {
    console.log("\nSession continuity: verify guide_cta_click + generate_code_started share session_id");
    pass = false;
  }

  if (pageViews.some((r) => readMetadataAttributionField(r.metadata, "landing_path") !== guideLanding)) {
    console.log("page_view landing_path must stay on guide URL");
    pass = false;
  }

  if (started.some((r) => readMetadataAttributionField(r.metadata, "landing_path") !== guideLanding)) {
    console.log("generate_code_started landing_path must NOT rewrite to /free-soul-blueprint");
    pass = false;
  }

  process.exit(pass ? 0 : 1);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
