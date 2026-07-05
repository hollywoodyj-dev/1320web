import { NextResponse } from "next/server";
import { getEntitledReportAccess } from "@/lib/auth/access";
import { updateMemberExpression } from "@/lib/living-blueprint/membership-actions";
import { buildLivingBlueprintSnapshot } from "@/lib/living-blueprint/build-snapshot";
import type { ExpressionState } from "@/lib/platform-domain";

const EXPRESSION_STATES: ExpressionState[] = ["dormant", "emerging", "active", "embodied", "integrated"];

function isExpressionState(value: string): value is ExpressionState {
  return (EXPRESSION_STATES as string[]).includes(value);
}

type ExpressionBody = { reportId?: string; state?: string };

/** FS-008 — Member updates Expression Framework stage. */
export async function PATCH(request: Request) {
  let body: ExpressionBody;
  try {
    body = (await request.json()) as ExpressionBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const reportId = body.reportId?.trim();
  const state = body.state?.trim();
  if (!reportId || !state || !isExpressionState(state)) {
    return NextResponse.json({ ok: false, error: "reportId and valid state required." }, { status: 400 });
  }

  const access = await getEntitledReportAccess(reportId);
  if (!access.allowed) {
    return NextResponse.json({ ok: false, error: access.reason }, { status: 403 });
  }

  try {
    await updateMemberExpression({ userId: access.user.id, reportId, state });
    const snapshot = await buildLivingBlueprintSnapshot({
      userId: access.user.id,
      reportId,
      clientName: access.user.first_name ?? undefined,
    });
    return NextResponse.json({ ok: true, snapshot });
  } catch (error) {
    console.error("[membership/expression] failed", error);
    return NextResponse.json({ ok: false, error: "Expression update failed." }, { status: 500 });
  }
}
