import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import { getSql, withDb } from "@/lib/db/client";
import {
  CONVERSION_EVENT_CATALOG,
  getGa4MeasurementId,
  PRIMARY_KPI_EVENT,
} from "@/lib/soulcode-conversion-tracking";

export const dynamic = "force-dynamic";

const WINDOW_DAYS = 30;

type CountRow = { event_name: string; count: string | number };
type LpRow = { lp: string; count: string | number };
type PathRow = { path: string; count: string | number };
type RecentRow = {
  id: string;
  event_name: string;
  user_id: string | null;
  session_id: string | null;
  source: string | null;
  lp: string | null;
  ad_group: string | null;
  platform: string | null;
  path: string | null;
  created_at: Date;
};

function toCount(value: string | number): number {
  return typeof value === "number" ? value : Number(value) || 0;
}

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  try {
    const payload = await withDb(async () => {
      const db = getSql();
      const since = new Date(Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000);

      const [counts, recent, paidLpBreakdown, pageViewBreakdown] = await Promise.all([
        db<CountRow[]>`
          SELECT event_name, COUNT(*)::int AS count
          FROM marketing_conversion_events
          WHERE created_at >= ${since}
          GROUP BY event_name
        `,
        db<RecentRow[]>`
          SELECT
            id, event_name, user_id, session_id, source, lp, ad_group, platform, path, created_at
          FROM marketing_conversion_events
          WHERE created_at >= ${since}
          ORDER BY created_at DESC
          LIMIT 80
        `,
        db<LpRow[]>`
          SELECT lp, COUNT(*)::int AS count
          FROM marketing_conversion_events
          WHERE created_at >= ${since}
            AND lp IS NOT NULL
            AND lp <> ''
          GROUP BY lp
          ORDER BY count DESC
          LIMIT 20
        `,
        db<PathRow[]>`
          SELECT path, COUNT(*)::int AS count
          FROM marketing_conversion_events
          WHERE created_at >= ${since}
            AND event_name = 'page_view'
            AND path IS NOT NULL
            AND path <> ''
          GROUP BY path
          ORDER BY count DESC
          LIMIT 12
        `,
      ]);

      const countMap = new Map(
        counts.map((row) => [row.event_name, toCount(row.count)]),
      );

      const catalog = CONVERSION_EVENT_CATALOG.map((entry) => ({
        ...entry,
        count30d: countMap.get(entry.name) ?? 0,
      }));

      const ga4MeasurementId = getGa4MeasurementId();

      return {
        windowDays: WINDOW_DAYS,
        generatedAt: new Date().toISOString(),
        ga4Configured: Boolean(ga4MeasurementId),
        ga4MeasurementId,
        primaryKpi: {
          event: PRIMARY_KPI_EVENT,
          count30d: countMap.get(PRIMARY_KPI_EVENT) ?? 0,
        },
        catalog,
        paidLpBreakdown: paidLpBreakdown.map((row) => ({
          lp: row.lp,
          count: toCount(row.count),
        })),
        pageViewBreakdown: pageViewBreakdown.map((row) => ({
          path: row.path,
          count: toCount(row.count),
        })),
        recentEvents: recent.map((row) => ({
          id: row.id,
          eventName: row.event_name,
          userId: row.user_id,
          sessionId: row.session_id,
          source: row.source,
          lp: row.lp,
          adGroup: row.ad_group,
          platform: row.platform,
          path: row.path,
          createdAt: row.created_at.toISOString(),
        })),
      };
    });

    if (!payload) {
      return NextResponse.json(
        { error: "Database is not configured" },
        { status: 503 },
      );
    }

    return NextResponse.json(payload);
  } catch (error) {
    console.error("[admin/conversion-tracking]", error);
    const message =
      error instanceof Error ? error.message : "Failed to load tracking data";
    const tableMissing =
      message.includes("marketing_conversion_events") ||
      message.includes("does not exist");
    return NextResponse.json(
      {
        error: tableMissing
          ? "Conversion tracking table missing. Run: npm run db:migrate"
          : "Failed to load conversion tracking",
        details: process.env.NODE_ENV !== "production" ? message : undefined,
      },
      { status: 500 },
    );
  }
}
