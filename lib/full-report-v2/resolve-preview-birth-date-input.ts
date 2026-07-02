import type { BirthDateParts } from "@/lib/birth-cookie";
import { buildCanonicalReport } from "@/lib/canonical-report";
import { CANONICAL_SAMPLE_BIRTH_DATE } from "@/lib/full-report-v2/build-full-report-payload";
import type { FullReportV2InputClient, FullReportV2Payload } from "@/lib/full-report-v2/types";

function formatBirthDateDisplay(parts: BirthDateParts): string {
  return new Date(parts.year, parts.month - 1, parts.day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatBirthDateIso(parts: BirthDateParts): string {
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

export function buildFullReportV2PreviewPayload(
  birth: BirthDateParts | null,
  defaults: { name: string; birth_date_display: string },
): FullReportV2Payload {
  if (!birth) {
    return buildCanonicalReport({
      name: defaults.name,
      birth_date: CANONICAL_SAMPLE_BIRTH_DATE,
      birth_date_display: defaults.birth_date_display,
    }).payload;
  }

  const input: FullReportV2InputClient = {
    name: "Preview Reader",
    birth_date: formatBirthDateIso(birth),
    birth_date_display: formatBirthDateDisplay(birth),
  };

  return buildCanonicalReport(input).payload;
}
