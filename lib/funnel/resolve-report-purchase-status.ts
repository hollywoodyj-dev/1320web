import { getSql } from "@/lib/db/client";
import { FULL_REPORT_PRODUCT } from "@/lib/platform-config";

export type ReportPurchaseStatus = "full_report_active" | "none";

/** Whether the user holds any active Full Report entitlement (D-8 continuation signal). */
export async function resolveReportPurchaseStatus(userId: string): Promise<ReportPurchaseStatus> {
  const db = getSql();
  const rows = await db<{ ok: number }[]>`
    SELECT 1 AS ok
    FROM entitlements
    WHERE user_id = ${userId}
      AND product = ${FULL_REPORT_PRODUCT}
      AND status = 'active'
      AND (expires_at IS NULL OR expires_at > NOW())
    LIMIT 1
  `;
  return rows.length > 0 ? "full_report_active" : "none";
}
