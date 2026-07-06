import { NextResponse } from "next/server";
import { safeNextPath } from "@/lib/auth/next-path";
import { verifyPassword } from "@/lib/auth/password";
import { setUserSession } from "@/lib/auth/session";
import { getUserPasswordHashByEmail } from "@/lib/db/users";
import { isDatabaseConfigured } from "@/lib/platform-config";

type LoginBody = {
  email?: string;
  password?: string;
  next?: string;
};

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Sign in with email and password. */
export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not configured." }, { status: 503 });
  }

  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.trim();
  const password = body.password ?? "";

  if (!isValidEmail(email) || !password) {
    return NextResponse.json({ ok: false, error: "Email and password are required." }, { status: 400 });
  }

  try {
    const auth = await getUserPasswordHashByEmail(email);
    if (!auth?.passwordHash || !(await verifyPassword(password, auth.passwordHash))) {
      return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
    }

    await setUserSession(auth.id);

    return NextResponse.json({
      ok: true,
      redirect: safeNextPath(body.next),
    });
  } catch (error) {
    console.error("[auth/login] failed", error);
    const message = error instanceof Error ? error.message : String(error);
    if (/too many connection/i.test(message)) {
      return NextResponse.json(
        { ok: false, error: "Sign-in is temporarily unavailable. Please try again in a minute." },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: false, error: "Could not sign in." }, { status: 500 });
  }
}
