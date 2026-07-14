import type { ReactNode } from "react";
import { ReportRoot } from "@/components/report-system/ReportRoot";
import type { ReportSurface, ReportType } from "@/lib/report-system/report-surface";

type ReportShellProps = {
  reportType: ReportType;
  surface: ReportSurface;
  children: ReactNode;
};

export function ReportShell({ reportType, surface, children }: ReportShellProps) {
  return (
    <ReportRoot reportType={reportType} surface={surface} className="report-shell">
      <div className="report-shell-inner">{children}</div>
    </ReportRoot>
  );
}
