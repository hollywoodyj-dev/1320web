import { NextResponse } from "next/server";
import { getEntitledReportAccess } from "@/lib/auth/access";
import { auditLivingBlueprintContinuity, buildLivingBlueprintSnapshot } from "@/lib/living-blueprint";

/** FS-008 — Living Blueprint snapshot for entitled members. */
export async function GET(request: Request) {
  const reportId = new URL(request.url).searchParams.get("reportId")?.trim();
  if (!reportId) {
    return NextResponse.json({ ok: false, error: "reportId required." }, { status: 400 });
  }

  const access = await getEntitledReportAccess(reportId);
  if (!access.allowed) {
    return NextResponse.json({ ok: false, error: access.reason }, { status: 403 });
  }

  try {
    const snapshot = await buildLivingBlueprintSnapshot({
      userId: access.user.id,
      reportId,
      clientName: access.user.first_name ?? undefined,
    });
    if (!snapshot) {
      return NextResponse.json({ ok: false, error: "Report not found." }, { status: 404 });
    }

    const continuityQa = auditLivingBlueprintContinuity(snapshot);
    return NextResponse.json({ ok: true, snapshot, continuityQa });
  } catch (error) {
    console.error("[membership/living-blueprint] failed", error);
    return NextResponse.json({ ok: false, error: "Failed to load Living Blueprint." }, { status: 500 });
  }
}
