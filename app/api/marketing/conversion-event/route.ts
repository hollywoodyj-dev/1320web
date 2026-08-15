import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { recordConversionEvent } from "@/lib/record-conversion-event";
import { PERSISTED_CONVERSION_EVENT_NAMES } from "@/lib/soulcode-conversion-tracking";

type Body = {
  eventName?: string;
  token?: string;
  userId?: string;
  sessionId?: string;
  source?: string;
  lp?: string;
  adGroup?: string;
  platform?: string;
  path?: string;
  metadata?: Record<string, string | number | boolean>;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventName =
    typeof body.eventName === "string" ? body.eventName.trim() : "";

  if (!eventName || !PERSISTED_CONVERSION_EVENT_NAMES.has(eventName)) {
    return NextResponse.json({ error: "Invalid eventName" }, { status: 400 });
  }

  if (body.metadata) {
    delete body.metadata.token;
    delete body.metadata.auth_token;
    delete body.metadata.birth_date;
    delete body.metadata.birthDate;
    delete body.metadata.blueprint;
    delete body.metadata.report;
  }

  // Prefer cookie session user over client-supplied userId (never trust raw userId alone).
  const sessionUser = await getCurrentUser().catch(() => null);
  const userId = sessionUser?.id ?? null;

  await recordConversionEvent({
    eventName,
    userId,
    sessionId: typeof body.sessionId === "string" ? body.sessionId : null,
    source: typeof body.source === "string" ? body.source : null,
    lp: typeof body.lp === "string" ? body.lp : null,
    adGroup: typeof body.adGroup === "string" ? body.adGroup : null,
    platform: typeof body.platform === "string" ? body.platform : "web",
    path: typeof body.path === "string" ? body.path : null,
    metadata: body.metadata,
  });

  return new NextResponse(null, { status: 204 });
}
