import { FULL_REPORT_V2_INNER_PAGE_COUNT } from "@/lib/full-report-v2/types";

type ProgressRailProps = {
  activeIndex: number;
  total?: number;
};

export function ProgressRail({
  activeIndex,
  total = FULL_REPORT_V2_INNER_PAGE_COUNT,
}: ProgressRailProps) {
  return (
    <div className="fr-v2-progress-rail" aria-label="Report progress">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={[
            "fr-v2-progress-rail__dot",
            i + 1 === activeIndex ? "fr-v2-progress-rail__dot--active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-current={i + 1 === activeIndex ? "step" : undefined}
        />
      ))}
    </div>
  );
}
