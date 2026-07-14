import type { ReactNode } from "react";
import type { ReportSurface, ReportType } from "@/lib/report-system/report-surface";

type ReportRootProps = {
  reportType: ReportType;
  surface: ReportSurface;
  children: ReactNode;
  className?: string;
};

export function ReportRoot({ reportType, surface, children, className }: ReportRootProps) {
  return (
    <main
      className={["report-root", className].filter(Boolean).join(" ")}
      data-report-type={reportType}
      data-surface={surface}
    >
      {children}
    </main>
  );
}
