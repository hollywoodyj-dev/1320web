"use client";

import type { ReactNode } from "react";
import { ReportSurfaceProvider } from "@/components/report-system/report-surface-context";
import type { ReportSurface, ReportType } from "@/lib/report-system/report-surface";

type ReportRootProps = {
  reportType: ReportType;
  surface: ReportSurface;
  children: ReactNode;
  className?: string;
};

export function ReportRoot({ reportType, surface, children, className }: ReportRootProps) {
  return (
    <ReportSurfaceProvider surface={surface}>
      <main
        className={["report-root", className].filter(Boolean).join(" ")}
        data-report-type={reportType}
        data-surface={surface}
      >
        {children}
      </main>
    </ReportSurfaceProvider>
  );
}
