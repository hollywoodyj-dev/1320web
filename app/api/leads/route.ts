import { NextResponse } from "next/server";
import type { LeadPayload } from "@/lib/analytics";

type LeadRequest = LeadPayload;

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Phase 1 lead capture stub — logs payload; optional webhook when configured. */
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

  if (process.env.NODE_ENV !== "production") {
    console.info("[leads]", record);
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      const webhookResponse = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!webhookResponse.ok) {
        return NextResponse.json({ ok: false, error: "Webhook rejected lead" }, { status: 502 });
      }
    } catch {
      return NextResponse.json({ ok: false, error: "Webhook unreachable" }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true, stored: Boolean(webhook) || process.env.NODE_ENV !== "production" });
}
