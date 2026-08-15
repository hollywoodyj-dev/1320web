import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import { getSql, withDb } from "@/lib/db/client";
import { FULL_REPORT_PRODUCT } from "@/lib/platform-config";

export const dynamic = "force-dynamic";

type CountRow = { count: string | number };

function toCount(value: string | number | undefined): number {
  if (typeof value === "number") return value;
  return Number(value) || 0;
}

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  try {
    const payload = await withDb(async () => {
      const db = getSql();
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const product = FULL_REPORT_PRODUCT;

      const [
        totalUsersRows,
        newUsersRows,
        totalPurchasesRows,
        newPurchasesRows,
        activeEntitlementRows,
        pendingPurchaseRows,
        expiredEntitlementRows,
        byPlanRows,
      ] = await Promise.all([
        db<CountRow[]>`SELECT COUNT(*)::int AS count FROM users`,
        db<CountRow[]>`
          SELECT COUNT(*)::int AS count FROM users
          WHERE created_at >= ${thirtyDaysAgo}
        `,
        db<CountRow[]>`
          SELECT COUNT(*)::int AS count FROM purchases
          WHERE product = ${product} AND status = 'completed'
        `,
        db<CountRow[]>`
          SELECT COUNT(*)::int AS count FROM purchases
          WHERE product = ${product}
            AND status = 'completed'
            AND COALESCE(completed_at, created_at) >= ${thirtyDaysAgo}
        `,
        db<CountRow[]>`
          SELECT COUNT(*)::int AS count FROM entitlements
          WHERE product = ${product}
            AND status = 'active'
            AND (expires_at IS NULL OR expires_at > NOW())
        `,
        db<CountRow[]>`
          SELECT COUNT(*)::int AS count FROM purchases
          WHERE product = ${product} AND status = 'pending'
        `,
        db<CountRow[]>`
          SELECT COUNT(*)::int AS count FROM entitlements
          WHERE product = ${product}
            AND (
              status = 'expired'
              OR (expires_at IS NOT NULL AND expires_at <= NOW())
            )
        `,
        db<{ product: string; count: string | number }[]>`
          SELECT product, COUNT(*)::int AS count
          FROM entitlements
          WHERE status = 'active'
            AND (expires_at IS NULL OR expires_at > NOW())
          GROUP BY product
        `,
      ]);

      const byPlan: Record<string, number> = {};
      for (const row of byPlanRows) {
        byPlan[row.product] = toCount(row.count);
      }

      return {
        totals: {
          totalUsers: toCount(totalUsersRows[0]?.count),
          newUsers30d: toCount(newUsersRows[0]?.count),
          totalSubscriptions: toCount(totalPurchasesRows[0]?.count),
          newSubscriptions30d: toCount(newPurchasesRows[0]?.count),
          totalPurchases: toCount(totalPurchasesRows[0]?.count),
          newPurchases30d: toCount(newPurchasesRows[0]?.count),
        },
        byStatus: {
          active: toCount(activeEntitlementRows[0]?.count),
          pending: toCount(pendingPurchaseRows[0]?.count),
          expired: toCount(expiredEntitlementRows[0]?.count),
          trialing: 0,
          canceled: 0,
        },
        byPlan,
        byCountry: [] as Array<{ country: string | null; users: number }>,
        generatedAt: now.toISOString(),
      };
    });

    if (!payload) {
      return NextResponse.json({ error: "Database is not configured" }, { status: 503 });
    }

    return NextResponse.json(payload);
  } catch (error) {
    console.error("[admin/stats]", error);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
