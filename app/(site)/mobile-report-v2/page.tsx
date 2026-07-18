import type { Metadata } from "next";
import { UnifiedReportMobileShell } from "@/components/report-system/UnifiedReportMobileShell";
import { buildCanonicalReportFromPreview } from "@/lib/report-system/buildCanonicalReportFromPreview";
import { resolveBirthDateFromRequest } from "@/lib/resolve-birth-date";
import { SAMPLE_REPORT_BANNER, SAMPLE_REPORT_META } from "@/lib/sample-report-content";
import "@/styles/report-system/index.css";

export const metadata: Metadata = {
  title: SAMPLE_REPORT_META.title,
  description: SAMPLE_REPORT_META.description,
  robots: { index: false },
};

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function MobileReportV2Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const birth = await resolveBirthDateFromRequest(params);
  const report = buildCanonicalReportFromPreview(birth, {
    name: "Kate Lu",
    birth_date_display: "22 May 1980",
  });

  return (
    <UnifiedReportMobileShell
      reportType="sample"
      data={report}
      banner={SAMPLE_REPORT_BANNER}
    />
  );
}
