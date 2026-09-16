import type { BirthDateParts } from "@/lib/birth-cookie";
import { calculate1320Code } from "@/lib/calculate1320Code";
import { buildReportPreviewSearchParams } from "@/lib/report/build-report-preview-href";
import { isValidBirthDate } from "@/lib/validateBirthDate";

export function formatBirthDateLabel(parts: BirthDateParts): string {
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

export function parseAdminBirthDateInput(
  year: number,
  month: number,
  day: number,
): BirthDateParts | null {
  if (!isValidBirthDate(year, month, day)) return null;
  return { year, month, day };
}

export function buildAdminReportPreviewHref(
  parts: BirthDateParts,
  options?: { mobile?: boolean },
): string {
  const query = buildReportPreviewSearchParams(formatBirthDateLabel(parts));
  const mobile = options?.mobile ? "&mobile=1" : "";
  return `/admin/preview/report?${query}${mobile}`;
}

export function summarizeAdminReportPreview(parts: BirthDateParts): {
  birthDateLabel: string;
  codeString: string;
  s1Code: string;
  s3Code: string;
  s2Code: string;
  s0Code: string;
} {
  const code = calculate1320Code(parts.year, parts.month, parts.day);
  return {
    birthDateLabel: formatBirthDateLabel(parts),
    codeString: code.codeString,
    s1Code: code.s1Code,
    s3Code: code.s3Code,
    s2Code: code.s2Code,
    s0Code: code.s0Code,
  };
}
