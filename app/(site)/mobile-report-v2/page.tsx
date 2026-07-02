import type { Metadata } from "next";
import { MobileReportV2Viewer } from "@/components/mobile-report-v2/mobile-report-v2-viewer";
import { buildFullReportV2PreviewPayload } from "@/lib/full-report-v2/resolve-preview-birth-date-input";
import { resolveBirthDateFromRequest } from "@/lib/resolve-birth-date";
import "@/styles/mobile-report-v2/index.css";

export const metadata: Metadata = {
  title: "Mobile Report v2 · Cover Preview",
  description:
    "Mobile-first premium cover for the 1320 Soul Origin Code System full report.",
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
  const payload = buildFullReportV2PreviewPayload(birth, {
    name: "Kate Lu",
    birth_date_display: "22 May 1980",
  });

  return <MobileReportV2Viewer payload={payload} />;
}
