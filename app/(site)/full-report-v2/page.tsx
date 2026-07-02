import type { Metadata } from "next";
import { FullReportV2Viewer } from "@/components/full-report-v2/full-report-v2-viewer";
import { buildFullReportV2PreviewPayload } from "@/lib/full-report-v2/resolve-preview-birth-date-input";
import { resolveBirthDateFromRequest } from "@/lib/resolve-birth-date";

export const metadata: Metadata = {
  title: "Full 1320 Soul Origin Report (v2 Preview)",
  description:
    "Dark Cosmic Portal full report preview — cover and opening pages. Pass year, month, day query params to preview a birth date.",
  robots: { index: false },
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
  const payload = buildFullReportV2PreviewPayload(birth, {
    name: "Mira Solen",
    birth_date_display: "May 22, 1980",
  });

  return (
    <div className="page-shell-inner page-shell--full-report">
      <div className="page-frame page-frame--full-report">
        <main className="inner-main inner-main--full-report">
          <FullReportV2Viewer payload={payload} />
        </main>
      </div>
    </div>
  );
}
