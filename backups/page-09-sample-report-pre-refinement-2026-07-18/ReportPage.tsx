"use client";

import type { ReactNode } from "react";
import { ReportHeader } from "@/components/report-system/ReportHeader";

type ReportPageProps = {
  pageId: string;
  pageNumber?: number;
  totalPages?: number;
  children: ReactNode;
};

export function ReportPage({ pageId, pageNumber, totalPages, children }: ReportPageProps) {
  return (
    <article className="report-page" data-page-id={pageId}>
      <ReportHeader pageNumber={pageNumber} totalPages={totalPages} />
      {children}
    </article>
  );
}
