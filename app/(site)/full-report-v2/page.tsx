import type { Metadata } from "next";
import { FullReportV2Viewer } from "@/components/full-report-v2/full-report-v2-viewer";
import {
  buildFullReportV2Payload,
  CANONICAL_SAMPLE_BIRTH_DATE,
} from "@/lib/full-report-v2/build-full-report-payload";

export const metadata: Metadata = {
  title: "Full 1320 Soul Origin Report (v2 Preview)",
  description:
    "Dark Cosmic Portal full report preview — cover and opening pages. Canonical sample: 1980-05-22.",
  robots: { index: false },
};

export default function FullReportV2Page() {
  const payload = buildFullReportV2Payload({
    name: "Mira Solen",
    birth_date: CANONICAL_SAMPLE_BIRTH_DATE,
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
