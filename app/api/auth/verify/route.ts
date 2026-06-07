import { NextResponse } from "next/server";
import { consumeMagicLink } from "@/lib/auth/magic-link";
import { setUserSession } from "@/lib/auth/session";
import { isDatabaseConfigured } from "@/lib/platform-config";
import { getRequestOrigin } from "@/lib/request-origin";

type VerifyBody = {
  token?: string;
  next?: string;
};

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not configured." }, { status: 503 });
  }

  let body: VerifyBody;
  try {
    body = (await request.json()) as VerifyBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const rawToken = body.token?.trim();
  const next = body.next?.trim() || "/my-report";

  if (!rawToken) {
    return NextResponse.json({ ok: false, error: "Missing token." }, { status: 400 });
  }

  const consumed = await consumeMagicLink(rawToken);
  if (!consumed) {
    return NextResponse.json(
      { ok: false, error: "This link is invalid, already used, or expired. Request a new magic link." },
      { status: 400 },
    );
  }

  await setUserSession(consumed.userId);

  const origin = getRequestOrigin(request);
  const destination =
    consumed.reportId && next === "/my-report"
      ? `/my-report/${consumed.reportId}`
      : next.startsWith("/")
        ? next
        : "/my-report";

  return NextResponse.json({
    ok: true,
    redirect: `${origin}${destination}`,
  });
}
