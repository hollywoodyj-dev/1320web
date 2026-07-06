import { NextResponse } from "next/server";
import { issueMagicLink } from "@/lib/auth/magic-link";
import { ensureSoulReportForUserBirthDate } from "@/lib/db/ensure-soul-report";
import { upsertUserAccount } from "@/lib/db/users";
import { isDatabaseConfigured } from "@/lib/platform-config";

type SignupBody = {
  email?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  next?: string;
};

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidBirthDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.trim());
}

function safeNextPath(value: unknown): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/account";
  }
  return value;
}

/** Create account (profile saved once) and email magic sign-in link. */
export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not configured." }, { status: 503 });
  }

  let body: SignupBody;
  try {
    body = (await request.json()) as SignupBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.trim();
  const firstName = body.firstName?.trim();
  const lastName = body.lastName?.trim();
  const birthDate = body.birthDate?.trim();

  if (!isValidEmail(email) || !firstName || !lastName || !isValidBirthDate(birthDate)) {
    return NextResponse.json(
      { ok: false, error: "Email, first name, last name, and birth date are required." },
      { status: 400 },
    );
  }

  try {
    const user = await upsertUserAccount({ email, firstName, lastName, birthDate });
    await ensureSoulReportForUserBirthDate({ userId: user.id, birthDate });

    const magic = await issueMagicLink({
      userId: user.id,
      email: user.email,
      purpose: "signup",
      nextPath: safeNextPath(body.next),
    });

    return NextResponse.json({
      ok: true,
      message: "Account created. Check your email for a sign-in link.",
      devMagicLinkUrl: process.env.NODE_ENV !== "production" ? magic.url : undefined,
    });
  } catch (error) {
    console.error("[auth/signup] failed", error);
    return NextResponse.json({ ok: false, error: "Could not create account." }, { status: 500 });
  }
}
