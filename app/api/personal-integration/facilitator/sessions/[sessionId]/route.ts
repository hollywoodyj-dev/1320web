import { NextResponse } from "next/server";
import {
  isFacilitatorAccessConfigured,
  verifyFacilitatorRequest,
} from "@/lib/personal-integration/facilitator-auth";
import {
  getFacilitatorWorkspaceSession,
  reviewIntakeForSession,
  updateWorkspaceSessionStatus,
} from "@/lib/personal-integration/ops/workspace-service";
import { isPlatformSessionStatus } from "@/lib/personal-integration/facilitator-sessions";
import { SESSION_GUIDE_INTRO, SESSION_GUIDE_STAGES } from "@/lib/personal-integration/ops/session-guide";
import { isDatabaseConfigured } from "@/lib/platform-config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Ctx = { params: Promise<{ sessionId: string }> };

function noStore(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

function assertFacilitator(request: Request) {
  if (!isDatabaseConfigured()) return { ok: false as const, status: 503 as const };
  if (!isFacilitatorAccessConfigured()) return { ok: false as const, status: 503 as const };
  if (!verifyFacilitatorRequest(request)) return { ok: false as const, status: 401 as const };
  return { ok: true as const };
}

export async function GET(request: Request, context: Ctx) {
  const gate = assertFacilitator(request);
  if (!gate.ok) {
    return noStore(NextResponse.json({ ok: false, error: "unauthorized" }, { status: gate.status }));
  }

  const { sessionId } = await context.params;
  const workspace = await getFacilitatorWorkspaceSession(sessionId);
  if (!workspace) {
    return noStore(NextResponse.json({ ok: false, error: "not_found" }, { status: 404 }));
  }

  return noStore(
    NextResponse.json({
      ok: true,
      ...workspace,
      sessionGuide: { intro: SESSION_GUIDE_INTRO, stages: SESSION_GUIDE_STAGES },
    }),
  );
}

export async function PATCH(request: Request, context: Ctx) {
  const gate = assertFacilitator(request);
  if (!gate.ok) {
    return noStore(NextResponse.json({ ok: false, error: "unauthorized" }, { status: gate.status }));
  }

  const { sessionId } = await context.params;
  const body = (await request.json().catch(() => null)) as {
    action?: string;
    status?: string;
  } | null;

  if (body?.action === "review_intake") {
    const reviewed = await reviewIntakeForSession(sessionId);
    if (!reviewed) {
      return noStore(NextResponse.json({ ok: false, error: "not_ready" }, { status: 409 }));
    }
    return noStore(NextResponse.json({ ok: true, intakeStatus: "reviewed" }));
  }

  if (body?.status && isPlatformSessionStatus(body.status)) {
    const updated = await updateWorkspaceSessionStatus({ sessionId, status: body.status });
    if (!updated) {
      return noStore(NextResponse.json({ ok: false, error: "not_found" }, { status: 404 }));
    }
    return noStore(NextResponse.json({ ok: true, status: updated.status }));
  }

  return noStore(NextResponse.json({ ok: false, error: "invalid" }, { status: 400 }));
}
