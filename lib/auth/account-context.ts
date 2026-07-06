import { getCurrentUser } from "@/lib/auth/session";
import { userHasEntitlement } from "@/lib/db/entitlements";
import { getLatestSoulReportForUser } from "@/lib/db/reports";
import type { SoulReportRow } from "@/lib/db/types";
import type { UserRow } from "@/lib/db/types";
import { isDatabaseConfigured } from "@/lib/platform-config";

export type AccountContext = {
  user: UserRow;
  report: SoulReportRow | null;
  entitledReportId: string | null;
  birthDate: string | null;
  codeString: string | null;
  profileComplete: boolean;
};

function parseBirthDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
}

export async function getAccountContext(): Promise<AccountContext | null> {
  if (!isDatabaseConfigured()) return null;

  const user = await getCurrentUser();
  if (!user) return null;

  const profileBirth = parseBirthDate(user.birth_date);
  const report = await getLatestSoulReportForUser(user.id);
  const birthDate = profileBirth ?? (report ? parseBirthDate(report.birth_date as string) : null);

  let entitledReportId: string | null = null;
  if (report) {
    const entitled = await userHasEntitlement({ userId: user.id, reportId: report.id });
    if (entitled) entitledReportId = report.id;
  }

  const profileComplete = Boolean(
    user.first_name?.trim() &&
      user.last_name?.trim() &&
      birthDate &&
      user.email,
  );

  return {
    user,
    report,
    entitledReportId,
    birthDate,
    codeString: report?.code_string ?? null,
    profileComplete,
  };
}

export function accountBirthDateParts(
  birthDate: string | null,
): { year: number; month: number; day: number } | null {
  if (!birthDate) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate);
  if (!match) return null;
  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
}
