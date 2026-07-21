import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/lib/platform-config";
import {
  authorizeIntakeAccess,
  submitIntakeForm,
} from "@/lib/personal-integration/ops/intake-service";
import type { IntakeResponses } from "@/lib/personal-integration/ops/intake-schema";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Ctx = { params: Promise<{ sessionId: string }> };

function noStore(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export async function POST(request: NextRequest, context: Ctx) {
  if (!isDatabaseConfigured()) {
    return noStore(NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 }));
  }
  const { sessionId } = await context.params;
  const body = (await request.json().catch(() => null)) as {
    token?: string;
    responses?: IntakeResponses;
  } | null;
  const access = await authorizeIntakeAccess(sessionId, body?.token);
  if (!access) {
    return noStore(NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 }));
  }
  if (!body?.responses || typeof body.responses !== "object") {
    return noStore(NextResponse.json({ ok: false, error: "invalid" }, { status: 400 }));
  }

  const result = await submitIntakeForm(sessionId, body.responses);
  if ("error" in result) {
    const status =
      result.error === "consent_required" || result.error === "missing_required"
        ? 400
        : result.error === "scope_blocked"
          ? 422
          : 400;
    return noStore(NextResponse.json({ ok: false, error: result.error }, { status }));
  }
  return noStore(NextResponse.json({ ok: true, status: "submitted" }));
}
