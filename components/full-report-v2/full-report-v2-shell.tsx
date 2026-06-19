"use client";

import type { ReactNode } from "react";

type FullReportV2ShellProps = {
  children: ReactNode;
};

/** Cosmic background wrapper for all v2 report pages. */
export function FullReportV2Shell({ children }: FullReportV2ShellProps) {
  return (
    <div
      className="full-report-v2-root full-report-v2-root--cosmic-bg full-report-v2-root--frame"
      style={{
        position: "relative",
        flex: 1,
        minHeight: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="fr-v2-cosmic-photo"
        aria-hidden="true"
        style={{ backgroundImage: "url(/fr-v2-cosmic-bg.png)" }}
      />
      {children}
    </div>
  );
}
