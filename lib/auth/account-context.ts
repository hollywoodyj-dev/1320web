import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth/session";
import { getSql } from "@/lib/db/client";
import { userHasEntitlement } from "@/lib/db/entitlements";
import { listPersonalIntegrationSessionsForUser } from "@/lib/db/platform-sessions";
import { getLatestSoulReportForUser } from "@/lib/db/reports";
import { getUserPasswordHashByEmail } from "@/lib/db/users";
import type { SoulReportRow } from "@/lib/db/types";
import type { UserRow } from "@/lib/db/types";
import {
  isPersonalIntegrationSessionVariant,
  SESSION_VARIANT_LABELS,
} from "@/lib/personal-integration/session-variants";
import { isDatabaseConfigured, FULL_REPORT_PRODUCT, SESSION_COOKIE_NAME } from "@/lib/platform-config";

export type HeaderAccountSummary = {
  label: string;
  entitledReportId: string | null;
};

export type AccountIntegrationSession = {
  sessionId: string;
  prepPath: string;
  variantLabel: string;
  status: string;
  growthEdge: string | null;
  createdAt: string;
};

export type AccountContext = {
  user: UserRow;
  report: SoulReportRow | null;
  entitledReportId: string | null;
  birthDate: string | null;
  codeString: string | null;
  profileComplete: boolean;
  hasPassword: boolean;
  integrationSessions: AccountIntegrationSession[];
};

function parseBirthDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
}

/** Lightweight header lookup — one DB round trip instead of full account context. */
export async function getHeaderAccountSummary(): Promise<HeaderAccountSummary | null> {
  if (!isDatabaseConfigured()) return null;

  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return null;

  try {
    const db = getSql();
    const rows = await db<{ first_name: string | null; report_id: string | null }[]>`
      SELECT
        u.first_name,
        entitled.report_id
      FROM sessions s
      INNER JOIN users u ON u.id = s.user_id
      LEFT JOIN LATERAL (
        SELECT sr.id AS report_id
        FROM soul_reports sr
        INNER JOIN entitlements e
          ON e.report_id = sr.id
         AND e.user_id = u.id
         AND e.product = ${FULL_REPORT_PRODUCT}
         AND e.status = 'active'
         AND (e.expires_at IS NULL OR e.expires_at > NOW())
        WHERE sr.user_id = u.id
        ORDER BY sr.created_at DESC
        LIMIT 1
      ) entitled ON true
      WHERE s.id = ${sessionId}
        AND s.expires_at > NOW()
      LIMIT 1
    `;

    const row = rows[0];
    if (!row) return null;

    return {
      label: row.first_name?.trim() || "Account",
      entitledReportId: row.report_id,
    };
  } catch {
    return null;
  }
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

  const passwordAuth = await getUserPasswordHashByEmail(user.email);
  const hasPassword = Boolean(passwordAuth?.passwordHash);

  const rawSessions = await listPersonalIntegrationSessionsForUser(user.id);
  const integrationSessions: AccountIntegrationSession[] = rawSessions
    .filter((session) => session.prep_access_token)
    .map((session) => {
      const variant =
        session.session_variant && isPersonalIntegrationSessionVariant(session.session_variant)
          ? SESSION_VARIANT_LABELS[session.session_variant]
          : "Personal Integration Session";
      return {
        sessionId: session.id,
        prepPath: `/integration/prep/${session.id}?token=${session.prep_access_token}`,
        variantLabel: variant,
        status: session.status,
        growthEdge: session.growth_edge,
        createdAt: session.created_at.toISOString().slice(0, 10),
      };
    });

  return {
    user,
    report,
    entitledReportId,
    birthDate,
    codeString: report?.code_string ?? null,
    profileComplete,
    hasPassword,
    integrationSessions,
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
