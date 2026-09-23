/**
 * Probe BA01 p01 first_touch_content in production DB.
 * Run: npx tsx --env-file=.env.local scripts/probe-ba01-p01.ts
 */
import { getSql, withDb } from "../lib/db/client";
import { readMetadataAttributionField } from "../lib/funnel/campaign-attribution-metadata";

async function main() {
  await withDb(async () => {
    const db = getSql();
    const since = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const rows = await db<
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
          metadata->>'first_touch_content' = 'ba01_p01'
          OR metadata->>'utm_content' = 'ba01_p01'
          OR metadata->>'content' = 'ba01_p01'
        )
      ORDER BY created_at ASC
      LIMIT 40
    `;

    console.log(`ba01_p01 rows (48h): ${rows.length}`);
    for (const r of rows) {
      const m = r.metadata;
      console.log(
        [
          r.created_at.toISOString(),
          r.event_name.padEnd(22),
          `content=${readMetadataAttributionField(m, "first_touch_content")}`,
          `source=${readMetadataAttributionField(m, "first_touch_source")}`,
          `campaign=${readMetadataAttributionField(m, "first_touch_campaign")}`,
          `medium=${readMetadataAttributionField(m, "first_touch_medium")}`,
          `landing=${readMetadataAttributionField(m, "landing_path")}`,
          `path=${r.path ?? "—"}`,
        ].join(" | "),
      );
    }

    process.exit(rows.length > 0 ? 0 : 1);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
