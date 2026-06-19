import { FULL_REPORT_V2_INNER_PAGE_COUNT } from "@/lib/full-report-v2/types";

type ProgressRailProps = {
  activeIndex: number;
  total?: number;
  /** Inner page numbers (1–18) that exist and can be navigated to. */
  availablePageIndices?: number[];
  onSelectPage?: (pageIndex: number) => void;
};

export function ProgressRail({
  activeIndex,
  total = FULL_REPORT_V2_INNER_PAGE_COUNT,
  availablePageIndices = [],
  onSelectPage,
}: ProgressRailProps) {
  const available = new Set(availablePageIndices);

  return (
    <div className="fr-v2-progress-rail" aria-label="Report progress">
      {Array.from({ length: total }, (_, i) => {
        const pageIndex = i + 1;
        const isActive = pageIndex === activeIndex;
        const isAvailable = available.has(pageIndex);

        return (
          <button
            key={pageIndex}
            type="button"
            className={[
              "fr-v2-progress-rail__dot",
              isActive ? "fr-v2-progress-rail__dot--active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-current={isActive ? "step" : undefined}
            aria-label={`Page ${String(pageIndex).padStart(2, "0")}`}
            disabled={!isAvailable || !onSelectPage}
            onClick={() => onSelectPage?.(pageIndex)}
          />
        );
      })}
    </div>
  );
}
