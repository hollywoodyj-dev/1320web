import type { Metadata } from "next";
import { FullReportV2Phase1Gallery } from "@/components/full-report-v2/phase1-gallery";

export const metadata: Metadata = {
  title: "Full Report v2 — Phase 1 Foundation",
  description:
    "Dark Cosmic Portal theme, component library, and sample payload for the Full 1320 Soul Origin Report rebuild.",
  robots: { index: false },
};

export default function FullReportV2Phase1Page() {
  return (
    <div className="page-shell-inner">
      <div className="page-frame" style={{ maxWidth: "100%", width: "100%" }}>
        <main className="inner-main">
          <FullReportV2Phase1Gallery />
        </main>
      </div>
    </div>
  );
}
