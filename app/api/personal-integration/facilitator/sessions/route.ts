import { NextResponse } from "next/server";
import {
  isFacilitatorAccessConfigured,
  verifyFacilitatorRequest,
} from "@/lib/personal-integration/facilitator-auth";
import {
  isPlatformSessionStatus,
  listFacilitatorSessions,
  updateFacilitatorSession,
} from "@/lib/personal-integration/facilitator-sessions";
import { isDatabaseConfigured } from "@/lib/platform-config";

/** FS-006.1 — List Personal Integration sessions (facilitator). */
export async function GET(request: Request) {
  if (!isDatabaseConfigured() || !isFacilitatorAccessConfigured()) {
    return NextResponse.json({ ok: false, error: "Facilitator console not configured." }, { status: 503 });
  }
  if (!verifyFacilitatorRequest(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const sessions = await listFacilitatorSessions();
    return NextResponse.json({ ok: true, sessions });
  } catch (error) {
    console.error("[facilitator/sessions] list failed", error);
    return NextResponse.json({ ok: false, error: "Failed to list sessions." }, { status: 500 });
  }
}

type PatchBody = {
  sessionId?: string;
  status?: string;
  summary?: string | null;
};

/** FS-006.1 — Update session status / summary (facilitator). */
export async function PATCH(request: Request) {
  if (!isDatabaseConfigured() || !isFacilitatorAccessConfigured()) {
    return NextResponse.json({ ok: false, error: "Facilitator console not configured." }, { status: 503 });
  }
  if (!verifyFacilitatorRequest(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let body: PatchBody;
  try {
    body = (await request.json()) as PatchBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const sessionId = body.sessionId?.trim();
  const status = body.status?.trim();

  if (!sessionId || !status || !isPlatformSessionStatus(status)) {
    return NextResponse.json({ ok: false, error: "sessionId and valid status required." }, { status: 400 });
  }

  try {
    const updated = await updateFacilitatorSession({
      sessionId,
      status,
      summary: body.summary?.trim() || null,
    });
    if (!updated) {
      return NextResponse.json({ ok: false, error: "Session not found." }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      session: {
        id: updated.id,
        status: updated.status,
        summary: updated.summary,
        followUpUrl: updated.follow_up_access_token
          ? `/integration/follow-up/${updated.id}?token=${updated.follow_up_access_token}`
          : null,
      },
    });
  } catch (error) {
    console.error("[facilitator/sessions] update failed", error);
    return NextResponse.json({ ok: false, error: "Failed to update session." }, { status: 500 });
  }
}
