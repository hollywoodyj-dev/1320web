import { NextResponse } from "next/server";
import { getWisewaveSessionContext, processWisewaveTurn } from "@/lib/wisewave";
import { isDatabaseConfigured } from "@/lib/platform-config";

type TurnBody = {
  token?: string;
  message?: string;
};

/** FS-007 — Process one Wisewave conversation turn. */
export async function POST(
  request: Request,
  context: { params: Promise<{ sessionId: string }> },
) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not configured." }, { status: 503 });
  }

  const { sessionId } = await context.params;

  let body: TurnBody;
  try {
    body = (await request.json()) as TurnBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const token = body.token?.trim();
  const message = body.message?.trim();
  if (!token || !message) {
    return NextResponse.json({ ok: false, error: "token and message are required." }, { status: 400 });
  }

  try {
    const result = await processWisewaveTurn({ sessionId, accessToken: token, message });
    if (!result) {
      return NextResponse.json({ ok: false, error: "Session not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, turn: result });
  } catch (error) {
    console.error("[wisewave/turn] failed", error);
    return NextResponse.json({ ok: false, error: "Failed to process turn." }, { status: 500 });
  }
}

/** FS-007 — Read Wisewave session transcript. */
export async function GET(
  request: Request,
  context: { params: Promise<{ sessionId: string }> },
) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not configured." }, { status: 503 });
  }

  const { sessionId } = await context.params;
  const token = new URL(request.url).searchParams.get("token")?.trim();
  if (!token) {
    return NextResponse.json({ ok: false, error: "token query param required." }, { status: 400 });
  }

  try {
    const session = await getWisewaveSessionContext(sessionId, token);
    if (!session) {
      return NextResponse.json({ ok: false, error: "Session not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, session });
  } catch (error) {
    console.error("[wisewave/session] read failed", error);
    return NextResponse.json({ ok: false, error: "Failed to read session." }, { status: 500 });
  }
}
