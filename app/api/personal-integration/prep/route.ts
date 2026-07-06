import { NextResponse } from "next/server";
import { savePersonalIntegrationPrep } from "@/lib/personal-integration/prep-context";
import { isDatabaseConfigured } from "@/lib/platform-config";

type PrepBody = {
  sessionId?: string;
  token?: string;
  growthEdge?: string;
  prepNotes?: string;
};

/** FS-006 — Save prep growth edge + optional notes before the live session. */
export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not configured." }, { status: 503 });
  }

  let body: PrepBody;
  try {
    body = (await request.json()) as PrepBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const sessionId = body.sessionId?.trim();
  const token = body.token?.trim();
  const growthEdge = body.growthEdge?.trim();
  const prepNotes = body.prepNotes?.trim();

  if (!sessionId || !token || (!growthEdge && !prepNotes)) {
    return NextResponse.json(
      { ok: false, error: "sessionId, token, and prep notes (or growth edge) are required." },
      { status: 400 },
    );
  }

  try {
    const updated = await savePersonalIntegrationPrep({
      sessionId,
      prepToken: token,
      growthEdge,
      prepNotes,
    });

    if (!updated) {
      return NextResponse.json({ ok: false, error: "Session not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, growthEdge: updated.growth_edge });
  } catch (error) {
    console.error("[personal-integration/prep] failed", error);
    return NextResponse.json({ ok: false, error: "Failed to save prep." }, { status: 500 });
  }
}
