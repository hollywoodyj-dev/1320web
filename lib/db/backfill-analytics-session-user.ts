import { getSql } from "@/lib/db/client";

/**
 * D-11 stitch — attach user_id to pre-auth beacon events that share the
 * browser analytics session id (localStorage) across signup in the same tab.
 */
export async function backfillConversionEventsUserByAnalyticsSession(input: {
  analyticsSessionId: string;
  userId: string;
}): Promise<number> {
  const sessionId = input.analyticsSessionId.trim();
  if (!sessionId || sessionId.length < 8) return 0;

  const db = getSql();
  const rows = await db<{ id: string }[]>`
    UPDATE marketing_conversion_events
    SET user_id = ${input.userId}
    WHERE session_id = ${sessionId}
      AND user_id IS NULL
      AND created_at > NOW() - INTERVAL '24 hours'
    RETURNING id
  `;
  return rows.length;
}
