import { NextResponse } from "next/server";
import { safeNextPath } from "@/lib/auth/next-path";
import { hashPassword, validatePassword } from "@/lib/auth/password";
import { setUserSession } from "@/lib/auth/session";
import { ensureSoulReportForUserBirthDate } from "@/lib/db/ensure-soul-report";
import { upsertUserAccount } from "@/lib/db/users";
import { isDatabaseConfigured } from "@/lib/platform-config";

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
  const birthDate = body.birthDate?.trim();
  const password = body.password ?? "";

  if (!isValidEmail(email) || !firstName || !lastName || !isValidBirthDate(birthDate)) {
    return NextResponse.json(
      { ok: false, error: "Email, first name, last name, and birth date are required." },
      { status: 400 },
    );
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return NextResponse.json({ ok: false, error: passwordError }, { status: 400 });
  }

  try {
    const passwordHash = await hashPassword(password);
    const user = await upsertUserAccount({
      email,
      firstName,
      lastName,
      birthDate,
      passwordHash,
    });
    await ensureSoulReportForUserBirthDate({ userId: user.id, birthDate });
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
