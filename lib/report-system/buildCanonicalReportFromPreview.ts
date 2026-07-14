import { buildCanonicalReport } from "@/lib/canonical-report";
import type { BirthDateParts } from "@/lib/birth-cookie";
import { CANONICAL_SAMPLE_BIRTH_DATE } from "@/lib/full-report-v2/build-full-report-payload";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import type { FullReportV2InputClient } from "@/lib/full-report-v2/types";

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

/** Build canonical report for sample / preview web routes. */
export function buildCanonicalReportFromPreview(
  birth: BirthDateParts | null,
  defaults: { name: string; birth_date_display: string },
): CanonicalFullReport {
  if (!birth) {
    return buildCanonicalReport({
      name: defaults.name,
      birth_date: CANONICAL_SAMPLE_BIRTH_DATE,
      birth_date_display: defaults.birth_date_display,
    });
  }

  const input: FullReportV2InputClient = {
    name: defaults.name,
    birth_date: formatBirthDateIso(birth),
    birth_date_display: formatBirthDateDisplay(birth),
  };

  return buildCanonicalReport(input);
}
