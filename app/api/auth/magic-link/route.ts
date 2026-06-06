import { NextResponse } from "next/server";
import { issueMagicLink } from "@/lib/auth/magic-link";
import { upsertUserByEmail } from "@/lib/db/users";
import { isDatabaseConfigured } from "@/lib/platform-config";

type MagicLinkBody = {
  email?: string;
  reportId?: string;
};

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Request a new magic link for an existing purchaser. */
export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not configured." }, { status: 503 });
  }

  let body: MagicLinkBody;
  try {
    body = (await request.json()) as MagicLinkBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "Valid email required." }, { status: 400 });
  }

  const user = await upsertUserByEmail(body.email);
  const magic = await issueMagicLink({
    userId: user.id,
    email: user.email,
    reportId: body.reportId,
    purpose: "login",
  });

  return NextResponse.json({
    ok: true,
    message: "If this email has report access, a magic link has been sent.",
    devMagicLinkUrl:
      process.env.NODE_ENV !== "production" ? magic.url : undefined,
  });
}
