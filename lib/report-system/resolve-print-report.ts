import { buildCanonicalReport } from "@/lib/canonical-report";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import { getEntitledReportAccess } from "@/lib/auth/access";
import { buildCanonicalReportFromPreview } from "@/lib/report-system/buildCanonicalReportFromPreview";
import { resolveBirthDateFromRequest } from "@/lib/resolve-birth-date";

type SearchParams = Record<string, string | string[] | undefined>;

export { parseReportTypeParam, buildSamplePrintSearchParams } from "@/lib/report-system/report-print-params";

export async function resolveSamplePrintReport(
  searchParams: SearchParams,
): Promise<CanonicalFullReport> {
  const birth = await resolveBirthDateFromRequest(searchParams);
  return buildCanonicalReportFromPreview(birth, {
    name: "Mira Solen",
    birth_date_display: "May 22, 1980",
  });
}

export async function resolveEntitledPrintReport(
  reportId: string,
): Promise<
  | { ok: true; report: CanonicalFullReport }
  | { ok: false; reason: "db_unconfigured" | "unauthenticated" | "not_found" | "no_entitlement" }
> {
  const access = await getEntitledReportAccess(reportId);
  if (!access.allowed) {
    return { ok: false, reason: access.reason };
  }

  const birthDateLabel = `${access.report.birth_year}-${String(access.report.birth_month).padStart(2, "0")}-${String(access.report.birth_day).padStart(2, "0")}`;
  const birthDateDisplay = new Date(
    access.report.birth_year,
    access.report.birth_month - 1,
    access.report.birth_day,
  ).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const preparedFor = access.user.first_name?.trim() || "You";

  return {
    ok: true,
    report: buildCanonicalReport({
      name: preparedFor,
      birth_date: birthDateLabel,
      birth_date_display: birthDateDisplay,
      report_type: "Full Soul Origin Report",
    }),
  };
}

