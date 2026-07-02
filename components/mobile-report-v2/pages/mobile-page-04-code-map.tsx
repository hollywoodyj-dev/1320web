import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileCodeMapContent } from "@/lib/mobile-report-v2/resolve-mobile-code-map-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage04CodeMapProps = {
  payload: FullReportV2Payload;
};

export function MobilePage04CodeMap({ payload }: MobilePage04CodeMapProps) {
  const content = resolveMobileCodeMapContent(payload);

  return (
    <main className="mr-v2-screen mr-v2-screen--code-map" id="mobile-page-04-code-map">
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-map-content">
        <MobileTopBar brandName={content.brandName} pageIndex={content.pageIndex} />

        <section className="mr-v2-map-hero">
          <div className="mr-v2-page-kicker">{content.kicker}</div>
          <h1 className="mr-v2-map-hero-title">
            {content.titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h1>
          <p className="mr-v2-map-hero-subtitle">{content.subtitle}</p>
        </section>

        <section className="mr-v2-map-intro-card">
          <div className="mr-v2-map-intro-label">{content.introLabel}</div>
          <p className="mr-v2-map-intro-copy">
            {content.introLead} <strong>{content.introEmphasis}</strong>. {content.introTail}
          </p>
        </section>

        <section className="mr-v2-map-card">
          <div className="mr-v2-map-list-label">{content.listLabel}</div>

          <div className="mr-v2-map-dimension-list">
            {content.dimensions.map((dimension) => (
              <article key={dimension.layer} className="mr-v2-map-dimension-item">
                <div className="mr-v2-map-dimension-icon">
                  <SignatureSegmentCardIcon
                    imageUrl={dimension.imageUrl}
                    code={dimension.code}
                    title={dimension.name}
                    fallbackIcon={dimension.fallbackIcon}
                    size={44}
                  />
                </div>
                <div>
                  <div className="mr-v2-map-dimension-topline">
                    <div className="mr-v2-map-dimension-code">{dimension.label}</div>
                    <div className="mr-v2-map-dimension-name">{dimension.name}</div>
                  </div>
                  <div className="mr-v2-map-dimension-subtitle">{dimension.subtitle}</div>
                  <div className="mr-v2-map-dimension-copy">{dimension.copy}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-map-system-card">
          <div className="mr-v2-map-system-icon" aria-hidden="true">{content.systemIcon}</div>
          <div>
            <div className="mr-v2-map-system-title">{content.systemTitle}</div>
            <div className="mr-v2-map-system-copy">{content.systemCopy}</div>
          </div>
        </section>

        <section className="mr-v2-map-reminder-grid">
          {content.reminders.map((reminder) => (
            <article key={reminder.copy} className="mr-v2-map-reminder-card">
              <div className="mr-v2-map-reminder-icon" aria-hidden="true">{reminder.icon}</div>
              <div className="mr-v2-map-reminder-copy">{reminder.copy}</div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
