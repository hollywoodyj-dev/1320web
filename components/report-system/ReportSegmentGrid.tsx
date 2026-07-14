import type { ReactNode } from "react";

type ReportSegmentGridProps = {
  children: ReactNode;
};

export function ReportSegmentGrid({ children }: ReportSegmentGridProps) {
  return <section className="report-card-grid">{children}</section>;
}
