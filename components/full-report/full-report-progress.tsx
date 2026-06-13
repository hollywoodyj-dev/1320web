"use client";

import { useEffect, useState } from "react";
import { FULL_REPORT_NAV_GROUPS } from "@/lib/full-report/screen-manifest";

type FullReportProgressProps = {
  screenIds: string[];
  navAnchors: { group: string; screenId: string }[];
};

export function FullReportProgress({ screenIds, navAnchors }: FullReportProgressProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = screenIds
      .map((id) => document.getElementById(`fr-screen-${id}`))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const id = visible[0].target.id.replace("fr-screen-", "");
        const idx = screenIds.indexOf(id);
        if (idx >= 0) setActiveIndex(idx);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.4, 0.65] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [screenIds]);

  const progress = ((activeIndex + 1) / screenIds.length) * 100;

  return (
    <div className={`fr-progress${open ? " fr-progress--open" : ""}`}>
      <button
        type="button"
        className="fr-progress-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="fr-progress-nav"
      >
        <span className="fr-progress-label">
          Page {activeIndex + 1} / {screenIds.length}
        </span>
        <span className="fr-progress-bar" aria-hidden>
          <span className="fr-progress-fill" style={{ width: `${progress}%` }} />
        </span>
      </button>
      {open ? (
        <nav id="fr-progress-nav" className="fr-progress-nav" aria-label="Report sections">
          {FULL_REPORT_NAV_GROUPS.map((group) => {
            const anchor = navAnchors.find((a) => a.group === group.id);
            if (!anchor) return null;
            return (
              <button
                key={group.id}
                type="button"
                className="fr-progress-link"
                onClick={() => {
                  document.getElementById(`fr-screen-${anchor.screenId}`)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  setOpen(false);
                }}
              >
                {group.label}
              </button>
            );
          })}
        </nav>
      ) : null}
    </div>
  );
}
