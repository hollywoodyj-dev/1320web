/**
 * Probe S0 recordConversionEvent + read-back (ME Spec v1).
 * Usage: npx tsx scripts/probe-marketing-conversion.ts
 */
import { recordConversionEvent } from "../lib/record-conversion-event";
import { getSql } from "../lib/db/client";

async function main() {
  const stamp = Date.now();
  await recordConversionEvent({
    eventName: "page_view",
    sessionId: `probe_${stamp}`,
    path: "/",
    platform: "web",
    metadata: { page: "homepage", probe: true },
  });
  await recordConversionEvent({
    eventName: "page_view",
    sessionId: `probe_${stamp}`,
    path: "/lp/test",
    lp: "test",
    platform: "web",
    metadata: { page: "lp/test", probe: true },
  });
  await recordConversionEvent({
    eventName: "paid_landing_view",
    sessionId: `probe_${stamp}`,
    path: "/lp/test",
    lp: "test",
    platform: "web",
  });

  const db = getSql();
  const rows = await db<{ event_name: string; path: string | null; lp: string | null }[]>`
    SELECT event_name, path, lp
    FROM marketing_conversion_events
    WHERE session_id = ${`probe_${stamp}`}
    ORDER BY created_at ASC
  `;

  console.log("Inserted rows:", rows.length);
  for (const row of rows) {
    console.log(`  ${row.event_name} path=${row.path} lp=${row.lp}`);
  }

  const ok =
    rows.some((r) => r.event_name === "page_view" && r.path === "/") &&
    rows.some((r) => r.event_name === "page_view" && r.path === "/lp/test") &&
    rows.some((r) => r.event_name === "paid_landing_view" && r.lp === "test");

  if (!ok) {
    console.error("Probe FAILED — expected / and /lp/test page_view + paid_landing_view");
    process.exit(1);
  }
  console.log("Probe OK");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
