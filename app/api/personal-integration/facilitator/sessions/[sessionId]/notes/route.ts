import { NextResponse } from "next/server";
import {
  isFacilitatorAccessConfigured,
  verifyFacilitatorRequest,
} from "@/lib/personal-integration/facilitator-auth";
import { saveFacilitatorNotes } from "@/lib/personal-integration/ops/workspace-service";
import type { IntegrationNotesInput } from "@/lib/db/integration-session-notes";
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
  const body = (await request.json().catch(() => null)) as IntegrationNotesInput | null;
  if (!body || typeof body !== "object") {
    return noStore(NextResponse.json({ ok: false, error: "invalid" }, { status: 400 }));
  }

  const notes = await saveFacilitatorNotes(sessionId, body);
  return noStore(
    NextResponse.json({
      ok: true,
      lastSavedAt: notes.last_saved_at.toISOString(),
      notes,
    }),
  );
}
