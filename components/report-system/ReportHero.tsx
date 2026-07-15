import { ReportSegmentCardIcon } from "@/components/report-system/ReportSegmentCardIcon";
import type { ReportSegmentIconKey } from "@/lib/report-system/report-segment-card-image";

export type ReportHeroTitleIcon = {
  segmentKey: ReportSegmentIconKey;
  imageUrl?: string;
  fallbackIcon: string;
  code: string;
  title: string;
};

type ReportHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  titleIcon?: ReportHeroTitleIcon;
};

export function ReportHero({ eyebrow, title, description, titleIcon }: ReportHeroProps) {
  return (
    <section className="report-hero">
      {eyebrow ? <div className="section-kicker">{eyebrow}</div> : null}
      <h1>{title}</h1>
      {titleIcon ? (
        <div className="report-hero-title-icon">
          <ReportSegmentCardIcon
            segmentKey={titleIcon.segmentKey}
            imageUrl={titleIcon.imageUrl}
            fallbackIcon={titleIcon.fallbackIcon}
            code={titleIcon.code}
            title={titleIcon.title}
            size={224}
          />
        </div>
      ) : null}
      {description ? <p>{description}</p> : null}
    </section>
  );
}
