import type { Metadata } from "next";
import { UnifiedReportWebShell } from "@/components/report-system/UnifiedReportWebShell";
import { buildCanonicalReportFromPreview } from "@/lib/report-system/buildCanonicalReportFromPreview";
import { resolveBirthDateFromRequest } from "@/lib/resolve-birth-date";
import { SAMPLE_REPORT_META } from "@/lib/sample-report-content";
import "@/styles/report-system/index.css";

export const metadata: Metadata = {
  title: SAMPLE_REPORT_META.title,
  description: SAMPLE_REPORT_META.description,
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

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

  return <UnifiedReportWebShell reportType="sample" data={report} />;
}
