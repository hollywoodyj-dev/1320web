import { NextResponse } from "next/server";
import type { LeadPayload } from "@/lib/analytics";
import { insertLead } from "@/lib/db/leads";
import { isDatabaseConfigured } from "@/lib/platform-config";

type LeadRequest = LeadPayload;

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Lead capture — persists to product database when configured (Phase 2A). */
export async function POST(request: Request) {
  let body: LeadRequest;

  try {
    body = (await request.json()) as LeadRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.type || !body.source || !isValidEmail(body.email)) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields: type, source, email" },
      { status: 400 },
    );
  }

  const record = {
    ...body,
    email: body.email.trim(),
    receivedAt: new Date().toISOString(),
  };

  if (!isDatabaseConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[leads]", record);
    }
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    await insertLead(record);
    return NextResponse.json({ ok: true, stored: true });
  } catch (error) {
    console.error("[leads] insert failed", error);
    return NextResponse.json({ ok: false, error: "Failed to store lead" }, { status: 500 });
  }
}
