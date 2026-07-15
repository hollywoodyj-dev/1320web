import type { ReportSegmentIconKey } from "@/lib/report-system/report-segment-card-image";
import { ReportSegmentCardIcon } from "@/components/report-system/ReportSegmentCardIcon";

type ReportInsightCardProps = {
  icon?: string;
  iconImageSrc?: string;
  segmentKey?: ReportSegmentIconKey;
  segmentCode?: string;
  kicker?: string;
  title: string;
  body: string;
};

export function ReportInsightCard({
  icon = "✦",
  iconImageSrc,
  segmentKey,
  segmentCode,
  kicker,
  title,
  body,
}: ReportInsightCardProps) {
  const useSegmentIcon = Boolean(segmentKey);

  return (
    <article
      className={[
        "report-insight-card",
        useSegmentIcon ? "report-insight-card--segment" : null,
        segmentKey ? `report-insight-card--${segmentKey}` : null,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="card-icon" aria-hidden={useSegmentIcon ? true : undefined}>
        {useSegmentIcon && segmentKey ? (
          <ReportSegmentCardIcon
            segmentKey={segmentKey}
            imageUrl={iconImageSrc}
            fallbackIcon={icon}
            title={title}
            code={segmentCode ?? kicker ?? segmentKey.toUpperCase()}
          />
        ) : iconImageSrc ? (
          <img className="card-icon-image" src={iconImageSrc} alt="" aria-hidden="true" />
        ) : (
          icon
        )}
      </div>
      <div className="card-body">
        {kicker ? <p className="card-kicker">{kicker}</p> : null}
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </article>
  );
}
