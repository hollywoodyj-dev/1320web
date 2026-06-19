import type { ReactNode } from "react";

type ReportPageProps = {
  sectionId: string;
  children: ReactNode;
  /** Inner page index 01–18; omit on cover (00). */
  pageIndex?: number;
  fluid?: boolean;
  className?: string;
};

export function ReportPage({ sectionId, children, pageIndex, fluid, className }: ReportPageProps) {
  return (
    <article
      id={sectionId}
      data-section={sectionId}
      data-page-index={pageIndex ?? undefined}
      className={[
        "fr-v2-report-page",
        fluid ? "fr-v2-report-page--fluid" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </article>
  );
}
