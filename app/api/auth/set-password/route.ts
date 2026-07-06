import { NextResponse } from "next/server";
import { hashPassword, validatePassword, verifyPassword } from "@/lib/auth/password";
import { getCurrentUser } from "@/lib/auth/session";
import { getUserPasswordHashByEmail, updateUserPassword } from "@/lib/db/users";
import { isDatabaseConfigured } from "@/lib/platform-config";

type SetPasswordBody = {
  currentPassword?: string;
  newPassword?: string;
};

/** Set or change password for the signed-in account. */
export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not configured." }, { status: 503 });
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Sign in to update your password." }, { status: 401 });
  }

  let body: SetPasswordBody;
  try {
    body = (await request.json()) as SetPasswordBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const newPassword = body.newPassword ?? "";
  const passwordError = validatePassword(newPassword);
  if (passwordError) {
    return NextResponse.json({ ok: false, error: passwordError }, { status: 400 });
  }

  try {
    const auth = await getUserPasswordHashByEmail(user.email);
    if (!auth) {
      return NextResponse.json({ ok: false, error: "Account not found." }, { status: 404 });
    }

    if (auth.passwordHash) {
      const currentPassword = body.currentPassword ?? "";
      if (!currentPassword || !(await verifyPassword(currentPassword, auth.passwordHash))) {
        return NextResponse.json({ ok: false, error: "Current password is incorrect." }, { status: 401 });
      }
      if (await verifyPassword(newPassword, auth.passwordHash)) {
        return NextResponse.json(
          { ok: false, error: "Choose a new password that is different from your current one." },
          { status: 400 },
        );
      }
    }

    await updateUserPassword(auth.id, await hashPassword(newPassword));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[auth/set-password] failed", error);
    return NextResponse.json({ ok: false, error: "Could not update password." }, { status: 500 });
  }
}
