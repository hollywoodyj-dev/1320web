import { NextResponse } from "next/server";
import { getAccountContext } from "@/lib/auth/account-context";
import { isDatabaseConfigured } from "@/lib/platform-config";

/** Current signed-in user + report summary for client prefill. */
export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 503 });
  }

  const account = await getAccountContext();
  if (!account) {
    return NextResponse.json({ ok: true, authenticated: false });
  }

  const parts = account.birthDate?.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  return NextResponse.json({
    ok: true,
    authenticated: true,
    user: {
      email: account.user.email,
      firstName: account.user.first_name,
      lastName: account.user.last_name,
      birthDate: account.birthDate,
      birthYear: parts ? Number(parts[1]) : undefined,
      birthMonth: parts ? Number(parts[2]) : undefined,
      birthDay: parts ? Number(parts[3]) : undefined,
    },
    codeString: account.codeString,
    entitledReportId: account.entitledReportId,
    profileComplete: account.profileComplete,
  });
}
