import { getSql } from "@/lib/db/client";
import { normalizeSoulReportRow } from "@/lib/db/normalize-soul-report-row";
import type { PlatformSessionRow, SoulReportRow, UserRow } from "@/lib/db/types";
import { FULL_REPORT_PRODUCT } from "@/lib/platform-config";

function normalizeUserRow(row: UserRow): UserRow {
  const raw = row.birth_date as string | Date | null;
  const birth =
    raw == null
      ? null
      : typeof raw === "string"
        ? raw.slice(0, 10)
        : raw instanceof Date
          ? raw.toISOString().slice(0, 10)
          : null;
  return { ...row, birth_date: birth };
}

type AccountCoreRow = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  birth_date: string | Date | null;
  created_at: Date;
  password_hash: string | null;
  report_id: string | null;
  report_user_id: string | null;
  report_birth_date: string | Date | null;
  report_birth_year: number | null;
  report_birth_month: number | null;
  report_birth_day: number | null;
  report_s1_code: string | null;
  report_s3_code: string | null;
  report_s2_code: string | null;
  report_s0_code: string | null;
  report_code_string: string | null;
  report_combination_signature: string | null;
  report_version: string | null;
  report_created_at: Date | null;
  entitled_report_id: string | null;
  integration_sessions: PlatformSessionRow[] | null;
};

export type AccountCoreBundle = {
  user: UserRow;
  hasPassword: boolean;
  report: SoulReportRow | null;
  entitledReportId: string | null;
  integrationSessions: PlatformSessionRow[];
};

function mapReportFromRow(row: AccountCoreRow): SoulReportRow | null {
  if (!row.report_id || row.report_birth_year == null || row.report_birth_month == null || row.report_birth_day == null) {
    return null;
  }

  return normalizeSoulReportRow({
    id: row.report_id,
    user_id: row.report_user_id ?? row.id,
    birth_date: String(row.report_birth_date ?? ""),
    birth_year: row.report_birth_year,
    birth_month: row.report_birth_month,
    birth_day: row.report_birth_day,
    s1_code: row.report_s1_code ?? "",
    s3_code: row.report_s3_code ?? "",
    s2_code: row.report_s2_code ?? "",
    s0_code: row.report_s0_code ?? "",
    code_string: row.report_code_string ?? "",
    combination_signature: row.report_combination_signature ?? "",
    report_version: row.report_version ?? "",
    created_at: row.report_created_at ?? new Date(0),
  });
}

/** One round trip: user, password flag, latest report, entitlement, integration sessions. */
export async function fetchAccountCoreBundle(sessionId: string): Promise<AccountCoreBundle | null> {
  const db = getSql();
  const rows = await db<AccountCoreRow[]>`
    SELECT
      u.id,
      u.email,
      u.first_name,
      u.last_name,
      u.birth_date,
      u.created_at,
      u.password_hash,
      sr.id AS report_id,
      sr.user_id AS report_user_id,
      sr.birth_date AS report_birth_date,
      sr.birth_year AS report_birth_year,
      sr.birth_month AS report_birth_month,
      sr.birth_day AS report_birth_day,
      sr.s1_code AS report_s1_code,
      sr.s3_code AS report_s3_code,
      sr.s2_code AS report_s2_code,
      sr.s0_code AS report_s0_code,
      sr.code_string AS report_code_string,
      sr.combination_signature AS report_combination_signature,
      sr.report_version AS report_version,
      sr.created_at AS report_created_at,
      entitled.report_id AS entitled_report_id,
      sessions.integration_sessions
    FROM sessions s
    INNER JOIN users u ON u.id = s.user_id
    LEFT JOIN LATERAL (
      SELECT *
      FROM soul_reports
      WHERE user_id = u.id
      ORDER BY created_at DESC
      LIMIT 1
    ) sr ON true
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
    LEFT JOIN LATERAL (
      SELECT COALESCE(
        json_agg(ps ORDER BY ps.created_at DESC),
        '[]'::json
      ) AS integration_sessions
      FROM (
        SELECT *
        FROM platform_sessions
        WHERE user_id = u.id
          AND kind = 'personal_integration'
          AND prep_access_token IS NOT NULL
        ORDER BY created_at DESC
        LIMIT 10
      ) ps
    ) sessions ON true
    WHERE s.id = ${sessionId}
      AND s.expires_at > NOW()
    LIMIT 1
  `;

  const row = rows[0];
  if (!row) return null;

  const user = normalizeUserRow({
    id: row.id,
    email: row.email,
    first_name: row.first_name,
    last_name: row.last_name,
    birth_date: row.birth_date as string | null,
    created_at: row.created_at,
  });

  const integrationSessions = (Array.isArray(row.integration_sessions) ? row.integration_sessions : []).map(
    (session) => ({
      ...session,
      created_at:
        session.created_at instanceof Date ? session.created_at : new Date(session.created_at),
    }),
  );

  return {
    user,
    hasPassword: Boolean(row.password_hash),
    report: mapReportFromRow(row),
    entitledReportId: row.entitled_report_id,
    integrationSessions,
  };
}

export async function fetchUserBySessionId(sessionId: string): Promise<UserRow | null> {
  const db = getSql();
  const rows = await db<UserRow[]>`
    SELECT u.id, u.email, u.first_name, u.last_name, u.birth_date, u.created_at
    FROM sessions s
    INNER JOIN users u ON u.id = s.user_id
    WHERE s.id = ${sessionId}
      AND s.expires_at > NOW()
    LIMIT 1
  `;
  return rows[0] ? normalizeUserRow(rows[0]) : null;
}
