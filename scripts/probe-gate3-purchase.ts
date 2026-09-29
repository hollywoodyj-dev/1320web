/**
 * Gate #3 witness — purchase half.
 * After Holly completes one-browser checkout from:
 *   /what-is-my-life-path-number?utm_source=google&utm_medium=cpc&utm_campaign=life_path_au&utm_content=gate3_probe&gclid=probe_gate3_01
 *
 * Run: npx tsx --env-file=.env.local scripts/probe-gate3-purchase.ts
 */
import { getSql, withDb } from "../lib/db/client";
import { readMetadataAttributionField } from "../lib/funnel/campaign-attribution-metadata";

const EXPECT = {
  gclid: "probe_gate3_01",
  first_touch_source: "google",
  first_touch_medium: "cpc",
  first_touch_campaign: "life_path_au",
  first_touch_content: "gate3_probe",
  landing_path: "/what-is-my-life-path-number",
} as const;

async function main() {
  await withDb(async () => {
    const db = getSql();

    const purchases = await db<
      {
        id: string;
        event_name: string;
        session_id: string | null;
        path: string | null;
        metadata: Record<string, unknown> | null;
        created_at: Date;
      }[]
    >`
      SELECT id, event_name, session_id, path, metadata, created_at
      FROM marketing_conversion_events
      WHERE event_name = 'purchase_completed'
        AND (
          metadata->>'gclid' = ${EXPECT.gclid}
          OR metadata->>'utm_content' = ${EXPECT.first_touch_content}
          OR metadata->>'first_touch_content' = ${EXPECT.first_touch_content}
        )
      ORDER BY created_at DESC
      LIMIT 5
    `;

    if (!purchases.length) {
      console.log("FAIL · no purchase_completed with gclid=probe_gate3_01 or content=gate3_probe");
      console.log("Gate #3 remains OPEN. Complete the one-browser checkout, then re-run this probe.");
      process.exit(1);
    }

    const row = purchases[0];
    const m = row.metadata;
    const got = {
      session_id: row.session_id,
      gclid: readMetadataAttributionField(m, "gclid"),
      first_touch_source: readMetadataAttributionField(m, "first_touch_source"),
      first_touch_medium: readMetadataAttributionField(m, "first_touch_medium"),
      first_touch_campaign: readMetadataAttributionField(m, "first_touch_campaign"),
      first_touch_content: readMetadataAttributionField(m, "first_touch_content"),
      landing_path: readMetadataAttributionField(m, "landing_path"),
    };

    console.log("purchase_completed id=", row.id);
    console.log("created_at=", row.created_at.toISOString());
    console.log(got);

    const fieldPass =
      got.gclid === EXPECT.gclid &&
      got.first_touch_source === EXPECT.first_touch_source &&
      got.first_touch_medium === EXPECT.first_touch_medium &&
      got.first_touch_campaign === EXPECT.first_touch_campaign &&
      got.first_touch_content === EXPECT.first_touch_content &&
      got.landing_path === EXPECT.landing_path &&
      Boolean(got.session_id);

    if (!fieldPass) {
      console.log("\nFAIL · purchase exists but handoff fields wrong/empty (broken Stripe hop)");
      process.exit(1);
    }

    // Same session_id as guide page_view
    const guideViews = await db<{ session_id: string | null; created_at: Date }[]>`
      SELECT session_id, created_at
      FROM marketing_conversion_events
      WHERE event_name = 'page_view'
        AND session_id = ${got.session_id}
        AND COALESCE(
          NULLIF(TRIM(metadata->>'landing_path'), ''),
          NULLIF(TRIM(metadata->>'landingPath'), ''),
          path
        ) = ${EXPECT.landing_path}
      ORDER BY created_at ASC
      LIMIT 3
    `;

    if (!guideViews.length) {
      console.log(
        "\nWARN · purchase fields OK but no page_view on guide with same session_id",
      );
      console.log(
        "Note: Stripe purchase_completed often uses cs_* as session_id; analytics session may differ.",
      );
      console.log("Checking analytics session_id inside metadata...");
      const analyticsSession =
        typeof m?.session_id === "string" ? m.session_id : null;
      if (analyticsSession) {
        const byMeta = await db<{ event_name: string; created_at: Date }[]>`
          SELECT event_name, created_at
          FROM marketing_conversion_events
          WHERE session_id = ${analyticsSession}
            OR metadata->>'session_id' = ${analyticsSession}
          ORDER BY created_at ASC
        `;
        console.log(
          "chain for metadata.session_id=",
          analyticsSession,
          byMeta.map((r) => `${r.created_at.toISOString()} ${r.event_name}`),
        );
      }
    } else {
      console.log(
        "\nPASS · guide page_view shares session_id with purchase row:",
        got.session_id,
      );
    }

    // booking can stay 0
    const booking = await db<{ c: number }[]>`
      SELECT COUNT(*)::int AS c FROM marketing_conversion_events
      WHERE event_name = 'booking_completed'
        AND metadata->>'gclid' = ${EXPECT.gclid}
    `;
    console.log(`booking_completed with gclid: ${booking[0]?.c ?? 0} (0 allowed)`);

    if (fieldPass) {
      console.log("\nPASS · Gate #3 purchase witness — gclid survived to purchase_completed");
      process.exit(0);
    }
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
