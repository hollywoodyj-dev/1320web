import { NextResponse } from "next/server";
import {
  isFacilitatorAccessConfigured,
  verifyFacilitatorRequest,
} from "@/lib/personal-integration/facilitator-auth";
import {
  publishFacilitatorSummary,
  saveFacilitatorSummary,
  sendFacilitatorSummary,
} from "@/lib/personal-integration/ops/workspace-service";
import type { SummaryContent } from "@/lib/personal-integration/ops/summary-template";
import { isDatabaseConfigured } from "@/lib/platform-config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Ctx = { params: Promise<{ sessionId: string }> };

function noStore(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export async function PUT(request: Request, context: Ctx) {
  if (!isDatabaseConfigured() || !isFacilitatorAccessConfigured()) {
    return noStore(NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 }));
  }
  if (!verifyFacilitatorRequest(request)) {
    return noStore(NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 }));
  }

  const { sessionId } = await context.params;
  const body = (await request.json().catch(() => null)) as {
    action?: "save" | "ready" | "publish" | "send";
    content?: SummaryContent;
  } | null;

  if (!body?.action) {
    return noStore(NextResponse.json({ ok: false, error: "invalid" }, { status: 400 }));
  }

  if (body.action === "save" || body.action === "ready") {
    if (!body.content) {
      return noStore(NextResponse.json({ ok: false, error: "invalid" }, { status: 400 }));
    }
    // Never accept private_notes into summary content.
    const content = { ...body.content };
    const row = await saveFacilitatorSummary({
      sessionId,
      content,
      status: body.action === "ready" ? "ready_for_review" : "draft",
    });
    return noStore(NextResponse.json({ ok: true, status: row.status, summary: row }));
  }

  if (body.action === "publish") {
    const row = await publishFacilitatorSummary(sessionId);
    if (!row) {
      return noStore(NextResponse.json({ ok: false, error: "not_ready" }, { status: 409 }));
    }
    return noStore(NextResponse.json({ ok: true, status: row.status }));
  }

  if (body.action === "send") {
    const result = await sendFacilitatorSummary(sessionId);
    if (!result) {
      return noStore(NextResponse.json({ ok: false, error: "not_ready" }, { status: 409 }));
    }
    return noStore(NextResponse.json({ ok: true, ...result }));
  }

  return noStore(NextResponse.json({ ok: false, error: "invalid" }, { status: 400 }));
}
