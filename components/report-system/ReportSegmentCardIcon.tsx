import type { ReportSegmentIconKey } from "@/lib/report-system/report-segment-card-image";

type ReportSegmentCardIconProps = {
  segmentKey: ReportSegmentIconKey;
  imageUrl?: string;
  fallbackIcon: string;
  title: string;
  code: string;
  size?: number;
};

export function ReportSegmentCardIcon({
  segmentKey,
  imageUrl,
  fallbackIcon,
  title,
  code,
  size = 72,
}: ReportSegmentCardIconProps) {
  return (
    <div
      className={`report-segment-card-icon report-segment-card-icon--${segmentKey}`}
      style={{ width: size, height: size }}
      aria-hidden={imageUrl ? undefined : true}
    >
      {imageUrl ? (
        <img
          className="report-segment-card-icon-image"
          src={imageUrl}
          alt={`${code} — ${title}`}
        />
      ) : (
        <span className="report-segment-card-icon-fallback">{fallbackIcon}</span>
      )}
    </div>
  );
}
