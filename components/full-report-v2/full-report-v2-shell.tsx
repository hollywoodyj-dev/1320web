"use client";

import type { ReactNode } from "react";

type FullReportV2ShellProps = {
  children: ReactNode;
};

/** Cosmic background wrapper for all v2 report pages. */
export function FullReportV2Shell({ children }: FullReportV2ShellProps) {
  return (
    <div
      className="full-report-v2-root full-report-v2-root--cosmic-bg full-report-v2-root--starfield full-report-v2-root--frame"
      style={{ position: "relative", minHeight: "100vh" }}
    >
      {children}
    </div>
  );
}
