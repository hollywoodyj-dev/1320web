import { NextResponse } from "next/server";
import { safeNextPath } from "@/lib/auth/next-path";
import { hashPassword, validatePassword } from "@/lib/auth/password";
import { setUserSession } from "@/lib/auth/session";
import { ensureSoulReportForUserBirthDate } from "@/lib/db/ensure-soul-report";
import { upsertUserAccount, getUserByEmail } from "@/lib/db/users";
import { isDatabaseConfigured } from "@/lib/platform-config";
import { recordAccountSignupIfCreated } from "@/lib/funnel/record-account-signup";

type SignupBody = {
  email?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  password?: string;
  next?: string;
};

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidBirthDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.trim());
}

/** Create account (profile saved once) and sign in with password. */
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
  const birthDateRaw = body.birthDate?.trim();
  const birthDate = birthDateRaw && isValidBirthDate(birthDateRaw) ? birthDateRaw : null;
  const password = body.password ?? "";

  if (!isValidEmail(email) || !firstName || !lastName) {
    return NextResponse.json(
      { ok: false, error: "Email, first name, and last name are required." },
      { status: 400 },
    );
  }

  if (birthDateRaw && !birthDate) {
    return NextResponse.json(
      { ok: false, error: "Birth date must be a valid YYYY-MM-DD value when provided." },
      { status: 400 },
    );
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return NextResponse.json({ ok: false, error: passwordError }, { status: 400 });
  }

  try {
    const passwordHash = await hashPassword(password);
    const existing = await getUserByEmail(email);
    const user = await upsertUserAccount({
      email,
      firstName,
      lastName,
      birthDate,
      passwordHash,
    });
    await recordAccountSignupIfCreated({
      created: !existing,
      userId: user.id,
      path: "/signup",
      entry: "signup_page",
    });
    if (birthDate) {
      await ensureSoulReportForUserBirthDate({ userId: user.id, birthDate });
    }
    await setUserSession(user.id);

    return NextResponse.json({
      ok: true,
      redirect: safeNextPath(body.next),
    });
  } catch (error) {
    console.error("[auth/signup] failed", error);
    return NextResponse.json({ ok: false, error: "Could not create account." }, { status: 500 });
  }
}
