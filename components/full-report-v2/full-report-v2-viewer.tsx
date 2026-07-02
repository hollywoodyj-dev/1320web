"use client";

import { useMemo, useState } from "react";
import { FullReportV2Shell } from "@/components/full-report-v2/full-report-v2-shell";
import { PageScaler } from "@/components/full-report-v2/page-scaler";
import { Page00Cover } from "@/components/full-report-v2/pages/page-00-cover";
import { Page01Opening } from "@/components/full-report-v2/pages/page-01-opening";
import { Page02Dimensions } from "@/components/full-report-v2/pages/page-02-dimensions";
import { Page03Signature } from "@/components/full-report-v2/pages/page-03-signature";
import { Page04S1 } from "@/components/full-report-v2/pages/page-04-s1";
import { Page05S3 } from "@/components/full-report-v2/pages/page-05-s3";
import { Page06S2 } from "@/components/full-report-v2/pages/page-06-s2";
import { Page07S0 } from "@/components/full-report-v2/pages/page-07-s0";
import { Page08Integrated } from "@/components/full-report-v2/pages/page-08-integrated";
import { Page09S4 } from "@/components/full-report-v2/pages/page-09-s4";
import { Page10S5 } from "@/components/full-report-v2/pages/page-10-s5";
import { Page11S6 } from "@/components/full-report-v2/pages/page-11-s6";
import { Page12S7 } from "@/components/full-report-v2/pages/page-12-s7";
import { Page13S8 } from "@/components/full-report-v2/pages/page-13-s8";
import { Page14S9 } from "@/components/full-report-v2/pages/page-14-s9";
import { Page15Practice } from "@/components/full-report-v2/pages/page-15-practice";
import { Page16Journal } from "@/components/full-report-v2/pages/page-16-journal";
import { Page17Closing } from "@/components/full-report-v2/pages/page-17-closing";
import { Page18Disclaimer } from "@/components/full-report-v2/pages/page-18-disclaimer";
import { ProgressRail } from "@/components/full-report-v2/progress-rail";
import {
  FULL_REPORT_PAGE_REGISTRY,
  getNavPageWindow,
  getPageDefById,
  getPageDefByIndex,
} from "@/lib/full-report-v2/page-registry";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

const IMPLEMENTED_PAGE_IDS = new Set([
  "page-00-cover",
  "page-01-opening",
  "page-02-dimensions",
  "page-03-signature",
  "page-04-s1",
  "page-05-s3",
  "page-06-s2",
  "page-07-s0",
  "page-08-integrated",
  "page-09-s4",
  "page-10-s5",
  "page-11-s6",
  "page-12-s7",
  "page-13-s8",
  "page-14-s9",
  "page-15-practice",
  "page-16-journal",
  "page-17-closing",
  "page-18-disclaimer",
]);

type FullReportV2ViewerProps = {
  payload: FullReportV2Payload;
};

export function FullReportV2Viewer({ payload }: FullReportV2ViewerProps) {
  const [activeId, setActiveId] = useState<string>("page-00-cover");

  const pages = useMemo(
    () => [
      { id: "page-00-cover", render: () => <Page00Cover payload={payload} /> },
      { id: "page-01-opening", render: () => <Page01Opening /> },
      { id: "page-02-dimensions", render: () => <Page02Dimensions /> },
      { id: "page-03-signature", render: () => <Page03Signature payload={payload} /> },
      { id: "page-04-s1", render: () => <Page04S1 payload={payload} /> },
      { id: "page-05-s3", render: () => <Page05S3 payload={payload} /> },
      { id: "page-06-s2", render: () => <Page06S2 payload={payload} /> },
      { id: "page-07-s0", render: () => <Page07S0 payload={payload} /> },
      { id: "page-08-integrated", render: () => <Page08Integrated payload={payload} /> },
      { id: "page-09-s4", render: () => <Page09S4 payload={payload} /> },
      { id: "page-10-s5", render: () => <Page10S5 payload={payload} /> },
      { id: "page-11-s6", render: () => <Page11S6 payload={payload} /> },
      { id: "page-12-s7", render: () => <Page12S7 payload={payload} /> },
      { id: "page-13-s8", render: () => <Page13S8 payload={payload} /> },
      { id: "page-14-s9", render: () => <Page14S9 payload={payload} /> },
      { id: "page-15-practice", render: () => <Page15Practice payload={payload} /> },
      { id: "page-16-journal", render: () => <Page16Journal payload={payload} /> },
      { id: "page-17-closing", render: () => <Page17Closing payload={payload} /> },
      { id: "page-18-disclaimer", render: () => <Page18Disclaimer payload={payload} /> },
    ],
    [payload],
  );

  const activePage = pages.find((p) => p.id === activeId) ?? pages[0];
  const activeIndex = getPageDefById(activeId)?.index ?? 0;
  const navWindow = getNavPageWindow(activeIndex);

  const progressActiveIndex = activeIndex === 0 ? 1 : activeIndex;

  const implementedInnerIndices = FULL_REPORT_PAGE_REGISTRY.filter(
    (p) => IMPLEMENTED_PAGE_IDS.has(p.id) && p.index > 0,
  ).map((p) => p.index);

  const goToPageIndex = (pageIndex: number) => {
    const def = getPageDefByIndex(pageIndex);
    if (def && IMPLEMENTED_PAGE_IDS.has(def.id)) setActiveId(def.id);
  };

  return (
    <FullReportV2Shell>
      <div className="fr-v2-nav-dock">
        <span className="fr-v2-nav-handle" aria-hidden="true" />
        <nav className="fr-v2-viewer-nav" aria-label="Report pages">
          <span className="fr-v2-viewer-nav-label">Full Report v2</span>
          {navWindow.map((pageIndex) => {
            const def = getPageDefByIndex(pageIndex);
            if (!def) return null;

            const isActive = pageIndex === activeIndex;
            const isImplemented = IMPLEMENTED_PAGE_IDS.has(def.id);

            if (isActive) {
              return (
                <button
                  key={def.id}
                  type="button"
                  data-active="true"
                  disabled
                  aria-current="page"
                >
                  {def.label}
                </button>
              );
            }

            if (isImplemented) {
              return (
                <button key={def.id} type="button" onClick={() => setActiveId(def.id)}>
                  {def.label}
                </button>
              );
            }

            return (
              <button key={def.id} type="button" disabled className="fr-v2-viewer-nav--future">
                {def.label}
              </button>
            );
          })}
          <ProgressRail
            activeIndex={progressActiveIndex}
            availablePageIndices={implementedInnerIndices}
            onSelectPage={goToPageIndex}
          />
        </nav>
      </div>

      <div className="fr-v2-viewer-scroll">
        <div key={activePage.id} id={activePage.id} className="fr-v2-viewer-page">
          <PageScaler>{activePage.render()}</PageScaler>
        </div>
      </div>
    </FullReportV2Shell>
  );
}
