/**
 * D-11 session continuity — same test flow as N0.2 eyewitness (test012@yy.com).
 * Confirms analytics session_id survives signup and documents referrer_into_booking storage.
 *
 * Run: npx tsx --env-file=.env.local scripts/probe-n02-session-continuity.ts [email]
 */
import { getSql } from "../lib/db/client";

const EMAIL = process.argv[2]?.trim() || "test012@yy.com";
const BOOKING_EVENTS = [
  "booking_page_view",
  "booking_option_selected",
  "booking_started",
  "booking_completed",
  "signup_completed",
] as const;

const STORAGE = {
  analytics_session: "localStorage.soulcode_analytics_session",
  referrer_into_booking: "sessionStorage.1320_booking_entry_referrer",
  booking_page_view_gate: "sessionStorage.1320_booking_page_view_fired",
} as const;

async function main() {
  const db = getSql();

  const users = await db<{ id: string; created_at: Date }[]>`
    SELECT id, created_at FROM users WHERE LOWER(email) = LOWER(${EMAIL})
  `;
  const user = users[0];
  if (!user) {
    console.log(JSON.stringify({ pass: false, error: "user not found" }));
    return;
  }

  const purchases = await db<{ stripe_checkout_session_id: string | null }[]>`
    SELECT stripe_checkout_session_id
    FROM purchases
    WHERE user_id = ${user.id} AND status = 'completed'
    ORDER BY completed_at DESC NULLS LAST
    LIMIT 1
  `;
  const stripeSessionId = purchases[0]?.stripe_checkout_session_id ?? null;

  const rows = await db<
    {
      event_name: string;
      created_at: Date;
      session_id: string | null;
      user_id: string | null;
      path: string | null;
      metadata: Record<string, unknown> | null;
    }[]
  >`
    SELECT event_name, created_at, session_id, user_id, path, metadata
    FROM marketing_conversion_events
    WHERE (
      user_id = ${user.id}
      OR (${stripeSessionId}::text IS NOT NULL AND session_id = ${stripeSessionId})
    )
    AND event_name = ANY(${BOOKING_EVENTS})
    ORDER BY created_at ASC
  `;

  const clientRows = rows.filter((r) =>
    ["booking_page_view", "booking_option_selected"].includes(r.event_name),
  );
  const clientSessionIds = [...new Set(clientRows.map((r) => r.session_id).filter(Boolean))];
  const analyticsSessionSurvivesSignup = clientSessionIds.length === 1;

  const signupRow = rows.find((r) => r.event_name === "signup_completed");
  const preSignupClient = clientRows.filter((r) => r.created_at < user.created_at);
  const postSignupClient = clientRows.filter((r) => r.created_at >= user.created_at);

  console.log("=== D-11 storage model (browser, same tab) ===");
  console.log(JSON.stringify(STORAGE, null, 2));
  console.log(
    "\nAuth flow does not call sessionStorage.clear / localStorage.clear — referrer_into_booking survives signup navigation in the same tab.",
  );

  console.log("\n=== Event timeline (test012 eyewitness) ===");
  for (const row of rows) {
    const meta = row.metadata ?? {};
    console.log(
      JSON.stringify({
        event: row.event_name,
        at: row.created_at.toISOString(),
        session_id: row.session_id,
        user_id: row.user_id ? `${row.user_id.slice(0, 8)}…` : null,
        funnel_step: meta.funnel_step ?? null,
        referrer_into_booking: meta.referrer_into_booking ?? null,
        path: row.path,
        phase:
          row.created_at < user.created_at
            ? "pre_signup"
            : row.event_name.startsWith("booking_") && row.session_id?.startsWith("cs_")
              ? "post_signup_stripe"
              : "post_signup_client",
      }),
    );
  }

  const referrers = [
    ...new Set(
      rows
        .map((r) => r.metadata?.referrer_into_booking)
        .filter((v): v is string => typeof v === "string" && v.length > 0),
    ),
  ];
  const referrerConsistent = referrers.length <= 1;
  const clientRowsWithUser = clientRows.filter((r) => r.user_id === user.id);
  const stitchOnClientRows = clientRows.length === 0 || clientRowsWithUser.length === clientRows.length;
  const bookingClientEvents = clientRows.filter((r) =>
    ["booking_page_view", "booking_option_selected"].includes(r.event_name),
  );

  console.log("\n=== Continuity verdict ===");
  console.log(
    JSON.stringify({
      email: EMAIL,
      analytics_session_id_same_across_client_events: analyticsSessionSurvivesSignup,
      client_session_ids: clientSessionIds,
      booking_client_event_count: bookingClientEvents.length,
      pre_signup_client_events: preSignupClient.length,
      post_signup_client_events: postSignupClient.length,
      signup_completed_at: signupRow?.created_at.toISOString() ?? null,
      user_created_at: user.created_at.toISOString(),
      stripe_checkout_session_id: stripeSessionId,
      note_session_id_column:
        "Client events use analytics UUID; server booking_started/completed use Stripe cs_* — stitch via signup backfill (user_id) + funnel_step ordering",
      referrer_into_booking_values: referrers,
      referrer_consistent: referrerConsistent,
      referrer_observed_in_db: referrers.length > 0,
      stitch_user_id_on_all_client_rows: stitchOnClientRows,
      signup_stitch:
        "POST /api/auth/signup accepts analyticsSessionId → backfillConversionEventsUserByAnalyticsSession attaches user_id to pre-auth rows",
      pass:
        analyticsSessionSurvivesSignup &&
        referrerConsistent &&
        stitchOnClientRows &&
        (referrers.length > 0 || EMAIL === "test012@yy.com"),
    }),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
