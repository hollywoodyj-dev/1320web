import { getSql } from "@/lib/db/client";
import type { EntitlementRow } from "@/lib/db/types";
import { FULL_REPORT_PRODUCT } from "@/lib/platform-config";

export async function grantEntitlement(input: {
  userId: string;
  reportId: string;
  product?: string;
}): Promise<EntitlementRow> {
  const db = getSql();
  const product = input.product ?? FULL_REPORT_PRODUCT;
  const rows = await db<EntitlementRow[]>`
    INSERT INTO entitlements (user_id, report_id, product, status)
    VALUES (${input.userId}, ${input.reportId}, ${product}, 'active')
    ON CONFLICT (user_id, report_id, product) DO UPDATE SET
      status = 'active',
      granted_at = NOW()
    RETURNING id, user_id, report_id, product, status
  `;
  return rows[0];
}

export async function userHasEntitlement(input: {
  userId: string;
  reportId: string;
  product?: string;
}): Promise<boolean> {
  const db = getSql();
  const product = input.product ?? FULL_REPORT_PRODUCT;
  const rows = await db<{ ok: number }[]>`
    SELECT 1 AS ok
    FROM entitlements
    WHERE user_id = ${input.userId}
      AND report_id = ${input.reportId}
      AND product = ${product}
      AND status = 'active'
      AND (expires_at IS NULL OR expires_at > NOW())
    LIMIT 1
  `;
  return rows.length > 0;
}

export async function userHasEntitlementForSignature(input: {
  userId: string;
  combinationSignature: string;
  product?: string;
}): Promise<{ entitled: boolean; reportId?: string }> {
  const db = getSql();
  const product = input.product ?? FULL_REPORT_PRODUCT;
  const rows = await db<{ report_id: string }[]>`
    SELECT e.report_id
    FROM entitlements e
    INNER JOIN soul_reports r ON r.id = e.report_id
    WHERE e.user_id = ${input.userId}
      AND r.combination_signature = ${input.combinationSignature}
      AND e.product = ${product}
      AND e.status = 'active'
      AND (e.expires_at IS NULL OR e.expires_at > NOW())
    ORDER BY e.granted_at DESC
    LIMIT 1
  `;
  if (!rows[0]) return { entitled: false };
  return { entitled: true, reportId: rows[0].report_id };
}
