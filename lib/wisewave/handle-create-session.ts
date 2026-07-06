import { NextResponse } from "next/server";
import { createWisewaveSession, processWisewaveTurn } from "@/lib/wisewave";

export type CreateWisewaveSessionBody = {
  email?: string;
  firstName?: string;
  birthDate?: string;
  openingMessage?: string;
};

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Shared create-session logic for Wisewave API and public Reflect UI. */
export async function handleCreateWisewaveSession(body: CreateWisewaveSessionBody) {
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
    console.error("[wisewave] create session failed", error);
    return NextResponse.json({ ok: false, error: "Failed to create Wisewave session." }, { status: 500 });
  }
}
