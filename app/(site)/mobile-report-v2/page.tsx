import type { Metadata } from "next";
import { UnifiedReportMobileShell } from "@/components/report-system/UnifiedReportMobileShell";
import { buildCanonicalReportFromPreview } from "@/lib/report-system/buildCanonicalReportFromPreview";
import { resolveBirthDateFromRequest } from "@/lib/resolve-birth-date";
import "@/styles/report-system/index.css";

export const metadata: Metadata = {
  title: "Sample Full Report | 1320 Soul Code",
  description:
    "Mobile sample report — foundation layers open, advanced sections show locked previews.",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

const SAMPLE_BANNER =
  "Sample report — S1–S0 open. Advanced sections show locked previews until you unlock the Full Report.";

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
    <UnifiedReportMobileShell reportType="sample" data={report} banner={SAMPLE_BANNER} />
  );
}
