import { getSql } from "@/lib/db/client";
import type { JourneyRow } from "@/lib/db/types";
import type { DomainAuthorship } from "@/lib/platform-domain";

export const MEMBERSHIP_TIERS = ["living_blueprint", "integration_circle"] as const;
export type MembershipTier = (typeof MEMBERSHIP_TIERS)[number];

export function isMembershipTier(value: string): value is MembershipTier {
  return (MEMBERSHIP_TIERS as readonly string[]).includes(value);
}

export async function getJourney(userId: string, reportId: string): Promise<JourneyRow | null> {
  const db = getSql();
  const rows = await db<JourneyRow[]>`
    SELECT *
    FROM journeys
    WHERE user_id = ${userId}
      AND report_id = ${reportId}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function ensureJourney(input: {
  userId: string;
  reportId: string;
  membershipTier?: MembershipTier;
  authorship?: DomainAuthorship;
}): Promise<JourneyRow> {
  const existing = await getJourney(input.userId, input.reportId);
  if (existing) return existing;

  const db = getSql();
  const rows = await db<JourneyRow[]>`
    INSERT INTO journeys (
      user_id,
      report_id,
      status,
      membership_tier,
      authorship,
      meta
    )
    VALUES (
      ${input.userId},
      ${input.reportId},
      'active',
      ${input.membershipTier ?? "living_blueprint"},
      ${input.authorship ?? "system"},
      ${db.json({ activatedAt: new Date().toISOString() })}
    )
    RETURNING *
  `;
  return rows[0];
}

export async function recordLivingBlueprintReview(input: {
  userId: string;
  reportId: string;
  note?: string;
}): Promise<JourneyRow | null> {
  const db = getSql();
  const now = new Date().toISOString();
  const rows = await db<JourneyRow[]>`
    UPDATE journeys
    SET last_review_at = NOW(),
        updated_at = NOW(),
        meta = COALESCE(meta, '{}'::jsonb) || ${db.json({
          lastReviewNote: input.note ?? null,
          lastReviewAt: now,
        })}
    WHERE user_id = ${input.userId}
      AND report_id = ${input.reportId}
    RETURNING *
  `;
  return rows[0] ?? null;
}
