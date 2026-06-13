"use client";

import { FULL_REPORT_NAV_GROUPS } from "@/lib/full-report/screen-manifest";

type FullReportSideNavProps = {
  navAnchors: { group: string; screenId: string }[];
  activeScreenId: string;
  onJump: (screenId: string) => void;
};

export function FullReportSideNav({ navAnchors, activeScreenId, onJump }: FullReportSideNavProps) {
  return (
    <nav className="fr-side-nav" aria-label="Report sections">
      <p className="fr-side-nav-title">Full Report</p>
      {FULL_REPORT_NAV_GROUPS.map((group) => {
        const anchor = navAnchors.find((a) => a.group === group.id);
        if (!anchor) return null;
        const active = activeScreenId === anchor.screenId;
        return (
          <button
            key={group.id}
            type="button"
            className={`fr-side-nav-link${active ? " fr-side-nav-link--active" : ""}`}
            onClick={() => {
              onJump(anchor.screenId);
              document.getElementById(`fr-screen-${anchor.screenId}`)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            {group.label}
          </button>
        );
      })}
    </nav>
  );
}
