import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/lib/platform-config";
import {
  handleCreateWisewaveSession,
  type CreateWisewaveSessionBody,
} from "@/lib/wisewave/handle-create-session";

export const dynamic = "force-dynamic";

/** Public Reflect UI — start a Wisewave session (no WISEWAVE_API_KEY). */
export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not configured." }, { status: 503 });
  }

  let body: CreateWisewaveSessionBody;
  try {
    body = (await request.json()) as CreateWisewaveSessionBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  return handleCreateWisewaveSession(body);
}
