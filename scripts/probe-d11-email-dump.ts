import { getSql } from "../lib/db/client";

async function main() {
  const email = process.argv[2]?.trim();
  if (!email) process.exit(1);
  const db = getSql();
  const rows = await db<
    {
      event_name: string;
      created_at: Date;
      session_id: string | null;
      path: string | null;
      metadata: Record<string, unknown> | null;
    }[]
  >`
    SELECT event_name, created_at, session_id, path, metadata
    FROM marketing_conversion_events
    WHERE user_id IN (SELECT id::text FROM users WHERE LOWER(email) = LOWER(${email}))
    ORDER BY created_at ASC
  `;
  for (const r of rows) {
    console.log(
      JSON.stringify({
        at: r.created_at.toISOString(),
        event: r.event_name,
        path: r.path,
        referrer: r.metadata?.referrer_into_booking ?? null,
        session: r.session_id,
      }),
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
