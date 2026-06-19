"use client";

import { useCallback, useMemo, useState } from "react";
import { FullReportV2Shell } from "@/components/full-report-v2/full-report-v2-shell";
import { PageScaler } from "@/components/full-report-v2/page-scaler";
import { Page00Cover } from "@/components/full-report-v2/pages/page-00-cover";
import { Page01Opening } from "@/components/full-report-v2/pages/page-01-opening";
import { ProgressRail } from "@/components/full-report-v2/progress-rail";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

const PAGE_DEFS = [
  { id: "page-00-cover", label: "00 Cover", index: 0 },
  { id: "page-01-opening", label: "01 Opening", index: 1 },
] as const;

type FullReportV2ViewerProps = {
  payload: FullReportV2Payload;
};

export function FullReportV2Viewer({ payload }: FullReportV2ViewerProps) {
  const [activeId, setActiveId] = useState<string>("page-00-cover");

  const scrollTo = useCallback((id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const pages = useMemo(
    () => [
      { id: "page-00-cover", render: () => <Page00Cover payload={payload} /> },
      { id: "page-01-opening", render: () => <Page01Opening /> },
    ],
    [payload],
  );

  const activeInnerIndex =
    PAGE_DEFS.find((p) => p.id === activeId)?.index ?? 0;

  return (
    <FullReportV2Shell>
      <div className="fr-v2-nav-dock">
        <span className="fr-v2-nav-handle" aria-hidden="true" />
        <nav className="fr-v2-viewer-nav" aria-label="Report pages">
          <span className="fr-v2-viewer-nav-label">Full Report v2</span>
          {PAGE_DEFS.map((page) => (
            <button
              key={page.id}
              type="button"
              data-active={activeId === page.id ? "true" : undefined}
              onClick={() => scrollTo(page.id)}
            >
              {page.label}
            </button>
          ))}
          <ProgressRail activeIndex={activeInnerIndex === 0 ? 1 : activeInnerIndex} />
        </nav>
      </div>

      <div className="fr-v2-viewer-scroll">
        {pages.map((page) => (
          <div key={page.id} id={page.id} className="fr-v2-viewer-page">
            <PageScaler>{page.render()}</PageScaler>
          </div>
        ))}
      </div>
    </FullReportV2Shell>
  );
}
