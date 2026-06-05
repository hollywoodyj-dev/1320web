import type { ReportOverviewCard } from "@/lib/report/build-report-view-model";
import { PILLAR_TONE } from "@/lib/pillar-tone";
import { getSegment } from "@/lib/segments";

type BlueprintOverviewRowProps = {
  cards: ReportOverviewCard[];
};

export function BlueprintOverviewRow({ cards }: BlueprintOverviewRowProps) {
  return (
    <section className="report-overview-section">
      <h2 className="report-section-title">Your Four-Part Blueprint</h2>
      <div className="pillar-grid report-pillar-grid">
        {cards.map((card) => {
          const meta = getSegment(card.segmentId);
          const tone = PILLAR_TONE[card.segmentId];

          return (
            <article
              key={`${card.segmentId}-${card.code}`}
              className={`pillar-card pillar-${tone} report-pillar-card`}
            >
              <p className="pillar-code">{card.code}</p>
              <div className="pillar-card-body">
                <h3>{meta.title.en.toUpperCase()}</h3>
                <p className="pillar-headline">{card.shortLabel}</p>
                <p className="report-pillar-essence">{card.essence}</p>
                <a href={`#${card.segmentId}`} className="report-pillar-link">
                  VIEW SECTION
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
