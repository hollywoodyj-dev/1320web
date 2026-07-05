import { NextResponse } from "next/server";
import { savePersonalIntegrationFollowUp } from "@/lib/personal-integration/follow-up-context";
import { isDatabaseConfigured } from "@/lib/platform-config";

type FollowUpBody = {
  sessionId?: string;
  token?: string;
  reflection?: string;
};

/** FS-006.1 — Save post-session user reflection. */
export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not configured." }, { status: 503 });
  }

  let body: FollowUpBody;
  try {
    body = (await request.json()) as FollowUpBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const sessionId = body.sessionId?.trim();
  const token = body.token?.trim();
  const reflection = body.reflection?.trim();

  if (!sessionId || !token || !reflection) {
    return NextResponse.json(
      { ok: false, error: "sessionId, token, and reflection are required." },
      { status: 400 },
    );
  }

  try {
    const saved = await savePersonalIntegrationFollowUp({ sessionId, followUpToken: token, reflection });
    if (!saved) {
      return NextResponse.json({ ok: false, error: "Session not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[personal-integration/follow-up] failed", error);
    return NextResponse.json({ ok: false, error: "Failed to save follow-up." }, { status: 500 });
  }
}
