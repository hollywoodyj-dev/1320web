import { NextResponse } from "next/server";
import {
  isFacilitatorAccessConfigured,
  verifyFacilitatorRequest,
} from "@/lib/personal-integration/facilitator-auth";
import { listFacilitatorWorkspaceSessions } from "@/lib/personal-integration/ops/workspace-service";
import { isDatabaseConfigured } from "@/lib/platform-config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function noStore(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

/** GET /api/personal-integration/facilitator/workspace — list only after key validation. */
export async function GET(request: Request) {
  if (!isDatabaseConfigured()) {
    return noStore(NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 }));
  }
  if (!isFacilitatorAccessConfigured()) {
    return noStore(NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 }));
  }
  if (!verifyFacilitatorRequest(request)) {
    return noStore(NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 }));
  }

  const sessions = await listFacilitatorWorkspaceSessions();
  return noStore(NextResponse.json({ ok: true, sessions }));
}
