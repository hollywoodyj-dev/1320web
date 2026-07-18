import type { Metadata } from "next";
import { UnifiedReportWebShell } from "@/components/report-system/UnifiedReportWebShell";
import { buildCanonicalReportFromPreview } from "@/lib/report-system/buildCanonicalReportFromPreview";
import { resolveBirthDateFromRequest } from "@/lib/resolve-birth-date";
import "@/styles/report-system/index.css";

export const metadata: Metadata = {
  title: "Sample Full Report | 1320 Soul Code",
  description:
    "Sample Full Report preview — fictional code S1-18 / S3-03 / S2-27 / S0-07 (S3 raw value: 110). For structure and tone only.",
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

const SAMPLE_BANNER =
  "Sample report preview — foundation layers S1–S0 are open. Advanced S4–S9 sections show locked previews until you unlock the Full Report.";

export default async function FullReportV2Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const birth = await resolveBirthDateFromRequest(params);
  const report = buildCanonicalReportFromPreview(birth, {
    name: "Mira Solen",
    birth_date_display: "May 22, 1980",
  });

  return (
    <UnifiedReportWebShell reportType="sample" data={report} banner={SAMPLE_BANNER} />
  );
}
