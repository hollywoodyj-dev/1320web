/**
 * Stamp historical bundled-consent leads. Does not send email. Does not set marketing_opt_in_at.
 * Run: npx tsx --env-file=.env.local scripts/stamp-legacy-bundled-consent.ts
 */
import postgres from "postgres";
import { getConnectionUrl } from "../lib/db/client";
import { getDatabaseUrl } from "../lib/platform-config";

async function main() {
  const raw = getDatabaseUrl();
  if (!raw) throw new Error("No DATABASE_URL");
  const db = postgres(getConnectionUrl(raw), { max: 1, connect_timeout: 30, prepare: false });

  await db.unsafe(`
    ALTER TABLE leads
      ADD COLUMN IF NOT EXISTS return_link_requested_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS marketing_opt_in_at TIMESTAMPTZ
  `);

  const labeledAt = new Date().toISOString();
  const stamped = await db<{ n: number }[]>`
    WITH updated AS (
      UPDATE leads
      SET payload = COALESCE(payload, '{}'::jsonb) || jsonb_build_object(
        'consent_status', 'legacy_bundled',
        'legacy_bundled_labeled_at', ${labeledAt}::text
      )
      WHERE payload->>'consent_status' IS NULL
        AND (
          type = 'newsletter'
          OR (type = 'email_capture' AND source = 'result_email_code')
        )
      RETURNING 1
    )
    SELECT COUNT(*)::int AS n FROM updated
  `;
  console.log("stamped_legacy_bundled", stamped[0]?.n ?? 0);

  const remaining = await db<{ n: number }[]>`
    SELECT COUNT(*)::int AS n
    FROM leads
    WHERE payload->>'consent_status' IS NULL
      AND (
        type = 'newsletter'
        OR (type = 'email_capture' AND source = 'result_email_code')
      )
  `;
  console.log("unstamped_remaining", remaining[0]?.n ?? 0);

  await db.end({ timeout: 5 });
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
