import Link from "next/link";
import { ReportSegmentCardArt } from "@/components/report/report-segment-card-art";
import type { ReportModuleViewModel } from "@/lib/report/build-report-view-model";
import { FREE_RESULT_MODULE } from "@/lib/result-content";
import { PILLAR_TONE } from "@/lib/pillar-tone";
import { getSegment } from "@/lib/segments";

type ReportModuleCardProps = {
  module: ReportModuleViewModel;
  checkoutHref?: string;
  /** Free-result preview card (essence + reflection only) */
  preview?: boolean;
};

export function ReportModuleCard({
  module,
  checkoutHref = "/checkout",
  preview = false,
}: ReportModuleCardProps) {
  const meta = getSegment(module.segmentId);
  const tone = PILLAR_TONE[module.segmentId];
  const showCard = Boolean(module.cardImageUrl);
  const essence = module.fields[0]?.value;

  return (
    <article
      id={module.segmentId}
      className={`report-module-card report-module-card--pillar segment-accent-${module.segmentId}${
        showCard ? " report-module-card--has-segment-card" : ""
      }${preview ? " report-module-card--preview" : ""}`}
    >
      <header
        className={`pillar-card pillar-${tone} report-module-pillar-hero${
          showCard ? " report-module-pillar-hero--card" : ""
        }`}
      >
        <p className="pillar-code">{module.codeLabel}</p>
        <div className="pillar-card-body report-module-pillar-head">
          <h3>{preview ? module.shortLabel : meta.title.en.toUpperCase()}</h3>
          <p className="pillar-headline">{preview ? module.archetype : module.shortLabel}</p>
          {!preview ? (
            showCard ? (
              <p className="report-module-pillar-archetype report-module-pillar-archetype--card">
                {module.archetype}
              </p>
            ) : (
              <p className="report-module-pillar-archetype">{module.archetype}</p>
            )
          ) : null}
        </div>
        {showCard && module.cardImageUrl ? (
          <ReportSegmentCardArt
            codeLabel={module.codeLabel}
            archetype={module.archetype}
            imageUrl={module.cardImageUrl}
          />
        ) : null}
      </header>

      <div className="report-module-content">
        {preview ? (
          <>
            {essence ? <p className="report-module-preview-essence">{essence}</p> : null}
            {module.reflectionQuestion ? (
              <div className="report-module-reflection">
                <h4 className="report-field-label">Reflection</h4>
                <p>{module.reflectionQuestion}</p>
              </div>
            ) : null}
            <Link href={checkoutHref} className="report-module-locked-cta">
              {FREE_RESULT_MODULE.unlockCta}
            </Link>
          </>
        ) : (
          <>
            <div className="report-module-fields">
              {module.fields.map((f) => (
                <div key={f.label} className="report-module-field">
                  <h4 className="report-field-label">{f.label}</h4>
                  {f.items?.length ? (
                    <ul className="report-module-list">
                      {f.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{f.value}</p>
                  )}
                </div>
              ))}
            </div>

            {module.showLocked ? (
              <div className="report-module-locked">
                <p>{module.lockedTeaser}</p>
                <p className="report-module-locked-label">Available in the Full Soul Origin Report</p>
                <Link href={checkoutHref} className="report-module-locked-cta">
                  Unlock My Full Report
                </Link>
              </div>
            ) : (
              <Link href={checkoutHref} className="report-module-insight">
                View Full Report
              </Link>
            )}

            {module.reflectionQuestion ? (
              <div className="report-module-reflection">
                <h4 className="report-field-label">Reflection Question</h4>
                <p>{module.reflectionQuestion}</p>
              </div>
            ) : null}
          </>
        )}
      </div>
    </article>
  );
}
