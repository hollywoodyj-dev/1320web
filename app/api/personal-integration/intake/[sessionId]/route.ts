import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/lib/platform-config";
import {
  authorizeIntakeAccess,
  loadIntakeFormState,
  saveIntakeDraft,
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

export async function GET(request: NextRequest, context: Ctx) {
  if (!isDatabaseConfigured()) {
    return noStore(NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 }));
  }
  const { sessionId } = await context.params;
  const token = request.nextUrl.searchParams.get("token");
  const access = await authorizeIntakeAccess(sessionId, token);
  if (!access) {
    return noStore(NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 }));
  }

  const state = await loadIntakeFormState(sessionId);
  if (!state) {
    return noStore(NextResponse.json({ ok: false, error: "not_found" }, { status: 404 }));
  }
  return noStore(NextResponse.json({ ok: true, ...state }));
}

export async function PATCH(request: NextRequest, context: Ctx) {
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

  const result = await saveIntakeDraft(sessionId, body.responses);
  if (!result) {
    return noStore(NextResponse.json({ ok: false, error: "not_found" }, { status: 404 }));
  }
  if ("error" in result) {
    return noStore(NextResponse.json({ ok: false, error: result.error }, { status: 409 }));
  }
  return noStore(NextResponse.json({ ok: true, status: "draft" }));
}
