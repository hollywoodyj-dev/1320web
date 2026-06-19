"use client";

import { useMemo, useState } from "react";
import { FullReportV2Shell } from "@/components/full-report-v2/full-report-v2-shell";
import { PageScaler } from "@/components/full-report-v2/page-scaler";
import { Page00Cover } from "@/components/full-report-v2/pages/page-00-cover";
import { Page01Opening } from "@/components/full-report-v2/pages/page-01-opening";
import { Page02Dimensions } from "@/components/full-report-v2/pages/page-02-dimensions";
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
