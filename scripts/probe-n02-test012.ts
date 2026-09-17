/**
 * N0.2 eyewitness for test012@yy.com
 * Run: npx tsx --env-file=.env.local scripts/probe-n02-test012.ts
 */
import { getSql } from "../lib/db/client";
import { isQaTaggedConversionEvent } from "../lib/funnel/qa-traffic-exclusion";

const EMAIL = "test012@yy.com";
const EVENTS = [
  "booking_page_view",
  "booking_option_selected",
  "booking_started",
  "booking_completed",
] as const;

async function main() {
  const db = getSql();

  const users = await db<
    { id: string; email: string; first_name: string | null; last_name: string | null; created_at: Date }[]
  >`
    SELECT id, email, first_name, last_name, created_at
    FROM users
    WHERE LOWER(email) = LOWER(${EMAIL})
  `;

  console.log("=== user ===");
  console.log(users[0] ?? "NONE");
  if (!users[0]) return;

  const userId = users[0].id;

  const purchases = await db<
    {
      id: string;
      status: string;
      product: string | null;
      stripe_checkout_session_id: string | null;
      amount_cents: number | null;
      currency: string | null;
      completed_at: Date | null;
      created_at: Date;
    }[]
  >`
    SELECT id, status, product, stripe_checkout_session_id, amount_cents, currency, completed_at, created_at
    FROM purchases
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT 3
  `;

  console.log("\n=== purchases ===");
  for (const p of purchases) console.log(p);

  const sessionId = purchases[0]?.stripe_checkout_session_id ?? null;

  for (const eventName of EVENTS) {
    const rows = await db<
      {
        id: string;
        event_name: string;
        created_at: Date;
        session_id: string | null;
        path: string | null;
        source: string | null;
        metadata: Record<string, unknown> | null;
      }[]
    >`
      SELECT id, event_name, created_at, session_id, path, source, metadata
      FROM marketing_conversion_events
      WHERE event_name = ${eventName}
        AND (
          user_id = ${userId}
          OR (${sessionId}::text IS NOT NULL AND session_id = ${sessionId})
        )
      ORDER BY created_at DESC
      LIMIT 3
    `;

    console.log(`\n=== ${eventName} ===`);
    if (!rows.length) {
      console.log("NONE");
      continue;
    }
    for (const row of rows) {
      const meta = row.metadata ?? {};
      console.log({
        created_at: row.created_at.toISOString(),
        session_id: row.session_id,
        path: row.path,
        session_type: meta.session_type ?? null,
        duration: meta.duration ?? null,
        amount: meta.amount ?? null,
        currency: meta.currency ?? null,
        report_purchase_status: meta.report_purchase_status ?? null,
        first_touch_source: meta.first_touch_source ?? meta.utm_source ?? null,
        first_touch_campaign: meta.first_touch_campaign ?? meta.utm_campaign ?? null,
        source_page: meta.source_page ?? null,
        qaTagged: isQaTaggedConversionEvent({ source: row.source, metadata: meta }),
      });
    }
  }

  if (sessionId) {
    const allForSession = await db<
      { event_name: string; created_at: Date; path: string | null }[]
    >`
      SELECT event_name, created_at, path
      FROM marketing_conversion_events
      WHERE session_id = ${sessionId}
      ORDER BY created_at ASC
    `;
    console.log("\n=== all events for stripe session ===");
    for (const row of allForSession) {
      console.log({
        event: row.event_name,
        created_at: row.created_at.toISOString(),
        path: row.path,
      });
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
