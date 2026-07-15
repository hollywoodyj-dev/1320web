import type { ReactNode } from "react";
import { ReportHeader } from "@/components/report-system/ReportHeader";
import type { ReportSurface } from "@/lib/report-system/report-surface";

type ReportPageProps = {
  pageId: string;
  pageNumber?: number;
  totalPages?: number;
  surface?: ReportSurface;
  children: ReactNode;
};

export function ReportPage({ pageId, pageNumber, totalPages, surface, children }: ReportPageProps) {
  return (
    <article className="report-page" data-page-id={pageId}>
      <ReportHeader pageNumber={pageNumber} totalPages={totalPages} surface={surface} />
      {children}
    </article>
  );
}
