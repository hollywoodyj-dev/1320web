import type { SoulReportRow } from "@/lib/db/types";

type BirthParts = Pick<SoulReportRow, "birth_year" | "birth_month" | "birth_day">;

/** ISO birth date from report row — prefer y/m/d parts (Postgres `date` may arrive as Date). */
export function soulReportBirthDateIso(
  report: Pick<SoulReportRow, "birth_date" | "birth_year" | "birth_month" | "birth_day">,
): string {
  return `${report.birth_year}-${String(report.birth_month).padStart(2, "0")}-${String(report.birth_day).padStart(2, "0")}`;
}

export function soulReportBirthDateDisplay(report: BirthParts): string {
  return new Date(report.birth_year, report.birth_month - 1, report.birth_day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function normalizeSoulReportRow<T extends SoulReportRow>(row: T): T {
  return { ...row, birth_date: soulReportBirthDateIso(row) };
}
