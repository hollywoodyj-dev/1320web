import { calculate1320Code } from "@/lib/calculate1320Code";
import { buildReportViewModel } from "@/lib/report/build-report-view-model";
import type { SoulReportRow } from "@/lib/db/types";
import { get1320Content } from "@/lib/get1320Content";

export function buildPaidReportViewModel(report: SoulReportRow) {
  const code = calculate1320Code(report.birth_year, report.birth_month, report.birth_day);
  const birthDateLabel = `${report.birth_year}-${String(report.birth_month).padStart(2, "0")}-${String(report.birth_day).padStart(2, "0")}`;

  const content = get1320Content(
    {
      s1: code.s1,
      s3: code.s3Raw,
      s2: code.s2,
      s0: code.s0,
      locale: "en",
    },
    { birthDate: birthDateLabel },
  );

  return buildReportViewModel(content, {
    mode: "full",
    variant: "result",
    birthDateLabel,
  });
}
