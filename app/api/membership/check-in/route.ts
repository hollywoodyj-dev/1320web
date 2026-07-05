import { NextResponse } from "next/server";
import { getEntitledReportAccess } from "@/lib/auth/access";
import { createMembershipCheckIn } from "@/lib/living-blueprint/membership-actions";
import { buildLivingBlueprintSnapshot } from "@/lib/living-blueprint/build-snapshot";

type CheckInBody = { reportId?: string; note?: string };

/** FS-008 — Membership check-in chapter. */
export async function POST(request: Request) {
  let body: CheckInBody;
  try {
    body = (await request.json()) as CheckInBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const reportId = body.reportId?.trim();
  const note = body.note?.trim();
  if (!reportId || !note) {
    return NextResponse.json({ ok: false, error: "reportId and note required." }, { status: 400 });
  }

  const access = await getEntitledReportAccess(reportId);
  if (!access.allowed) {
    return NextResponse.json({ ok: false, error: access.reason }, { status: 403 });
  }

  try {
    const session = await createMembershipCheckIn({
      userId: access.user.id,
      reportId,
      checkInNote: note,
      clientName: access.user.first_name ?? undefined,
    });
    const snapshot = await buildLivingBlueprintSnapshot({
      userId: access.user.id,
      reportId,
      clientName: access.user.first_name ?? undefined,
    });
    return NextResponse.json({ ok: true, sessionId: session.id, snapshot });
  } catch (error) {
    console.error("[membership/check-in] failed", error);
    return NextResponse.json({ ok: false, error: "Check-in failed." }, { status: 500 });
  }
}
