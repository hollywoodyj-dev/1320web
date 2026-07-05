import { getSql } from "@/lib/db/client";
import type { ExpressionProfileRow } from "@/lib/db/types";
import type { DomainAuthorship, ExpressionState } from "@/lib/platform-domain";

export async function getExpressionProfile(
  userId: string,
  reportId: string,
): Promise<ExpressionProfileRow | null> {
  const db = getSql();
  const rows = await db<ExpressionProfileRow[]>`
    SELECT *
    FROM expression_profiles
    WHERE user_id = ${userId}
      AND report_id = ${reportId}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function ensureExpressionProfile(input: {
  userId: string;
  reportId: string;
  state?: ExpressionState;
  authorship?: DomainAuthorship;
}): Promise<ExpressionProfileRow> {
  const existing = await getExpressionProfile(input.userId, input.reportId);
  if (existing) return existing;

  const db = getSql();
  const rows = await db<ExpressionProfileRow[]>`
    INSERT INTO expression_profiles (user_id, report_id, state, authorship)
    VALUES (
      ${input.userId},
      ${input.reportId},
      ${input.state ?? "dormant"},
      ${input.authorship ?? "system"}
    )
    RETURNING *
  `;
  return rows[0];
}

export async function updateExpressionState(input: {
  userId: string;
  reportId: string;
  state: ExpressionState;
  authorship?: DomainAuthorship;
}): Promise<ExpressionProfileRow | null> {
  const db = getSql();
  const rows = await db<ExpressionProfileRow[]>`
    UPDATE expression_profiles
    SET state = ${input.state},
        authorship = ${input.authorship ?? "wisewave"},
        updated_at = NOW()
    WHERE user_id = ${input.userId}
      AND report_id = ${input.reportId}
    RETURNING *
  `;
  return rows[0] ?? null;
}
