/**
 * N0.2 — read booking funnel events (PII stripped).
 * Run: npx tsx --env-file=.env.local scripts/probe-n02-booking-events.ts
 * Optional: npx tsx --env-file=.env.local scripts/probe-n02-booking-events.ts <stripe_session_id>
 */
import { getSql } from "../lib/db/client";
import { isQaTaggedConversionEvent } from "../lib/funnel/qa-traffic-exclusion";

const BOOKING_EVENTS = [
  "booking_page_view",
  "booking_option_selected",
  "booking_started",
  "booking_completed",
] as const;

async function main() {
  const sessionFilter = process.argv[2]?.trim();
  const db = getSql();

  console.log("=== N0.2 booking funnel events (all time) ===\n");

  for (const eventName of BOOKING_EVENTS) {
    const rows = await db<
      {
        id: string;
        created_at: Date;
        session_id: string | null;
        path: string | null;
        source: string | null;
        metadata: Record<string, unknown> | null;
      }[]
    >`
      SELECT id, created_at, session_id, path, source, metadata
      FROM marketing_conversion_events
      WHERE event_name = ${eventName}
      ORDER BY created_at DESC
      LIMIT 5
    `;
    console.log(`${eventName}: ${rows.length ? "" : "NONE"}`);
    for (const row of rows) {
      const meta = row.metadata ?? {};
      const qa = isQaTaggedConversionEvent({ source: row.source, metadata: meta });
      console.log({
        created_at: row.created_at.toISOString(),
        session_id: row.session_id,
        path: row.path,
        session_type: meta.session_type ?? null,
        amount: meta.amount ?? null,
        report_purchase_status: meta.report_purchase_status ?? null,
        first_touch_source: meta.first_touch_source ?? meta.utm_source ?? null,
        first_touch_campaign: meta.first_touch_campaign ?? meta.utm_campaign ?? null,
        qaTagged: qa,
      });
    }
    console.log("");
  }

  if (sessionFilter) {
    console.log(`=== Events for Stripe session ${sessionFilter} ===\n`);
    const scoped = await db<
      {
        event_name: string;
        created_at: Date;
        path: string | null;
        metadata: Record<string, unknown> | null;
      }[]
    >`
      SELECT event_name, created_at, path, metadata
      FROM marketing_conversion_events
      WHERE session_id = ${sessionFilter}
        AND event_name = ANY(${BOOKING_EVENTS})
      ORDER BY created_at ASC
    `;
    if (!scoped.length) {
      console.log("NONE — payment may still be pending or webhook not processed.");
    } else {
      for (const row of scoped) {
        console.log({
          event: row.event_name,
          created_at: row.created_at.toISOString(),
          path: row.path,
          stripe_checkout_session_id: row.metadata?.stripe_checkout_session_id ?? null,
        });
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
