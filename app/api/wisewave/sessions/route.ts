import { NextResponse } from "next/server";
import { createWisewaveSession, processWisewaveTurn } from "@/lib/wisewave";
import { isWisewaveApiConfigured, verifyWisewaveApiRequest } from "@/lib/wisewave/api-auth";
import { isDatabaseConfigured } from "@/lib/platform-config";

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

type CreateBody = {
  email?: string;
  firstName?: string;
  birthDate?: string;
  openingMessage?: string;
};

/** FS-007 — Start a Wisewave reflection session. */
export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not configured." }, { status: 503 });
  }

  if (isWisewaveApiConfigured() && !verifyWisewaveApiRequest(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let body: CreateBody;
  try {
    body = (await request.json()) as CreateBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.trim();
  const birthDate = body.birthDate?.trim();
  if (!isValidEmail(email) || !birthDate) {
    return NextResponse.json({ ok: false, error: "email and birthDate are required." }, { status: 400 });
  }

  try {
    const result = await createWisewaveSession({
      email,
      firstName: body.firstName?.trim(),
      birthDate,
      openingMessage: body.openingMessage?.trim(),
    });

    let firstTurn = null;
    if (body.openingMessage?.trim()) {
      firstTurn = await processWisewaveTurn({
        sessionId: result.sessionId,
        accessToken: result.accessToken,
        message: body.openingMessage.trim(),
      });
    }

    return NextResponse.json({
      ok: true,
      sessionId: result.sessionId,
      accessToken: result.accessToken,
      chatUrl: result.chatUrl,
      reportId: result.reportId,
      firstTurn,
    });
  } catch (error) {
    console.error("[wisewave/sessions] create failed", error);
    return NextResponse.json({ ok: false, error: "Failed to create Wisewave session." }, { status: 500 });
  }
}
