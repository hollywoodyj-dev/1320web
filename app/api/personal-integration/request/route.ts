import { NextResponse } from "next/server";
import { createPersonalIntegrationRequest } from "@/lib/personal-integration/create-booking-request";
import { isPersonalIntegrationSessionVariant } from "@/lib/personal-integration/session-variants";
import { isDatabaseConfigured } from "@/lib/platform-config";
import type { LeadPayload } from "@/lib/analytics";

type RequestBody = LeadPayload & {
  firstName?: string;
  lastName?: string;
};

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** FS-006 — Personal Integration booking request → platform session + lead. */
export async function POST(request: Request) {
  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const firstName = body.firstName?.trim();
  const lastName = body.lastName?.trim();
  const email = body.email?.trim();
  const birthDate = body.birthDate?.trim();
  const readingType = body.readingType?.trim();
  const message = body.message?.trim();

  if (!firstName || !lastName || !isValidEmail(email) || !birthDate || !readingType || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields for session request." },
      { status: 400 },
    );
  }

  if (!isPersonalIntegrationSessionVariant(readingType)) {
    return NextResponse.json({ ok: false, error: "Invalid session type." }, { status: 400 });
  }

  if (!isDatabaseConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[personal-integration/request]", { email, readingType, birthDate });
    }
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const result = await createPersonalIntegrationRequest({
      firstName,
      lastName,
      email,
      birthDate,
      readingType,
      timezone: body.timezone?.trim(),
      message,
      code: body.code?.trim(),
    });

    return NextResponse.json({
      ok: true,
      stored: true,
      sessionId: result.sessionId,
      prepUrl: result.prepUrl,
    });
  } catch (error) {
    console.error("[personal-integration/request] failed", error);
    return NextResponse.json({ ok: false, error: "Failed to create session request." }, { status: 500 });
  }
}
