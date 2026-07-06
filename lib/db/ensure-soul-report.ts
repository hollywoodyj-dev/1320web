import { calculate1320Code } from "@/lib/calculate1320Code";
import { getSql } from "@/lib/db/client";
import { createSoulReport } from "@/lib/db/reports";
import { normalizeSoulReportRow } from "@/lib/db/normalize-soul-report-row";
import type { SoulReportRow } from "@/lib/db/types";
import { get1320Content } from "@/lib/get1320Content";

function birthDateParts(birthDate: string): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate.trim());
  if (!match) return null;
  return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
}

/** Reuse an existing report for the same user + birth date, or create one. */
export async function ensureSoulReportForUserBirthDate(input: {
  userId: string;
  birthDate: string;
}): Promise<SoulReportRow> {
  const parts = birthDateParts(input.birthDate);
  if (!parts) {
    throw new Error("Invalid birth date format — expected YYYY-MM-DD.");
  }

  const db = getSql();
  const existing = await db<SoulReportRow[]>`
    SELECT *
    FROM soul_reports
    WHERE user_id = ${input.userId}
      AND birth_year = ${parts.year}
      AND birth_month = ${parts.month}
      AND birth_day = ${parts.day}
    ORDER BY created_at DESC
    LIMIT 1
  `;
  if (existing[0]) return normalizeSoulReportRow(existing[0]);

  const code = calculate1320Code(parts.year, parts.month, parts.day);
  const content = get1320Content(
    { s1: code.s1, s3: code.s3Raw, s2: code.s2, s0: code.s0, locale: "en" },
    { birthDate: input.birthDate, reportTier: "full" },
  );

  return createSoulReport({
    userId: input.userId,
    birthYear: parts.year,
    birthMonth: parts.month,
    birthDay: parts.day,
    code,
    combinationSignature: content.combinationSignature,
  });
}
