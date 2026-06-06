import type { SoulCodeResult } from "@/lib/calculate1320Code";
import { getSql } from "@/lib/db/client";
import type { SoulReportRow } from "@/lib/db/types";
import { REPORT_CONTENT_VERSION } from "@/lib/platform-config";

export async function createSoulReport(input: {
  userId: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  code: SoulCodeResult;
  combinationSignature: string;
}): Promise<SoulReportRow> {
  const db = getSql();
  const birthDate = `${input.birthYear}-${String(input.birthMonth).padStart(2, "0")}-${String(input.birthDay).padStart(2, "0")}`;
  const rows = await db<SoulReportRow[]>`
    INSERT INTO soul_reports (
      user_id,
      birth_date,
      birth_year,
      birth_month,
      birth_day,
      s1_code,
      s3_code,
      s2_code,
      s0_code,
      code_string,
      combination_signature,
      report_version
    )
    VALUES (
      ${input.userId},
      ${birthDate},
      ${input.birthYear},
      ${input.birthMonth},
      ${input.birthDay},
      ${input.code.s1Code},
      ${input.code.s3Code},
      ${input.code.s2Code},
      ${input.code.s0Code},
      ${input.code.codeString},
      ${input.combinationSignature},
      ${REPORT_CONTENT_VERSION}
    )
    RETURNING *
  `;
  return rows[0];
}

export async function getSoulReportById(reportId: string): Promise<SoulReportRow | null> {
  const db = getSql();
  const rows = await db<SoulReportRow[]>`
    SELECT *
    FROM soul_reports
    WHERE id = ${reportId}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function getLatestSoulReportForUser(userId: string): Promise<SoulReportRow | null> {
  const db = getSql();
  const rows = await db<SoulReportRow[]>`
    SELECT *
    FROM soul_reports
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT 1
  `;
  return rows[0] ?? null;
}
