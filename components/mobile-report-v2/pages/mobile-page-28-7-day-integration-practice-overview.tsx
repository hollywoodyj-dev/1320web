import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobile7DayIntegrationPracticeOverviewContent } from "@/lib/mobile-report-v2/resolve-mobile-seven-day-integration-practice-overview-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage287DayIntegrationPracticeOverviewProps = {
  payload: FullReportV2Payload;
};

export function MobilePage287DayIntegrationPracticeOverview({
  payload,
}: MobilePage287DayIntegrationPracticeOverviewProps) {
  const content = resolveMobile7DayIntegrationPracticeOverviewContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--7-day-integration-practice-overview"
      id="mobile-page-28-7-day-integration-practice-overview"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-7dip-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-7dip-hero">
          <div className="mr-v2-page-kicker mr-v2-7dip-kicker">{content.kicker}</div>
          <h1 className="mr-v2-7dip-hero-title">
            {content.titleLine}
            <span className="mr-v2-7dip-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-7dip-hero-subtitle">{content.subtitle}</p>
        </section>

        <section className="mr-v2-7dip-glass-card mr-v2-7dip-overview-card">
          <div className="mr-v2-7dip-overview-icon" aria-hidden="true">{content.overviewIcon}</div>
          <div>
            <div className="mr-v2-7dip-overview-title">{content.overviewTitle}</div>
            <div className="mr-v2-7dip-overview-copy">
              {content.overviewLead} <strong>{content.overviewEmphasis}</strong>{" "}
              {content.overviewTail}
            </div>
          </div>
        </section>

        <section className="mr-v2-7dip-glass-card mr-v2-7dip-sequence-card">
          <h2 className="mr-v2-7dip-section-title mr-v2-7dip-section-title--purple">
            {content.sequenceTitle}
          </h2>
          <div className="mr-v2-7dip-code-sequence">
            {content.sequencePills.map((pill) => (
              <div
                key={pill.key}
                className={`mr-v2-7dip-sequence-icon mr-v2-7dip-sequence-icon--${pill.tone}`}
              >
                <SignatureSegmentCardIcon
                  imageUrl={pill.imageUrl}
                  code={pill.code}
                  title={pill.title}
                  fallbackIcon={pill.fallbackIcon}
                  size={44}
                />
              </div>
            ))}
          </div>
          <div className="mr-v2-7dip-sequence-note">{content.sequenceNote}</div>
        </section>

        <section className="mr-v2-7dip-glass-card mr-v2-7dip-days-card">
          <h2 className="mr-v2-7dip-section-title">{content.daysTitle}</h2>
          <div className="mr-v2-7dip-day-list">
            {content.days.map((day) => (
              <article key={day.key} className="mr-v2-7dip-day-item">
                <div
                  className={`mr-v2-7dip-day-orb${
                    day.moduleIcons.length > 1 ? " mr-v2-7dip-day-orb--multi" : ""
                  }`}
                >
                  {day.moduleIcons.map((icon) => (
                    <SignatureSegmentCardIcon
                      key={icon.layer}
                      imageUrl={icon.imageUrl}
                      code={icon.code}
                      title={icon.title}
                      fallbackIcon={icon.fallbackIcon}
                      size={day.moduleIcons.length > 1 ? 40 : 56}
                    />
                  ))}
                </div>
                <div>
                  <div className="mr-v2-7dip-day-label">Day {day.day}</div>
                  <div className="mr-v2-7dip-day-title">{day.title}</div>
                  <div className="mr-v2-7dip-day-codes">
                    {day.codes.map((code) => (
                      <span
                        key={code.label}
                        className={`mr-v2-7dip-mini-code mr-v2-7dip-mini-code--${code.tone}`}
                      >
                        {code.label}
                      </span>
                    ))}
                  </div>
                  <div className="mr-v2-7dip-day-copy">{day.copy}</div>
                  <div className="mr-v2-7dip-day-focus">
                    <strong>Focus:</strong> {day.focus}
                  </div>
                  {day.reflection ? (
                    <div className="mr-v2-7dip-day-reflection">
                      <strong>Reflection:</strong> {day.reflection}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-7dip-glass-card mr-v2-7dip-use-card">
          <h2 className="mr-v2-7dip-section-title mr-v2-7dip-section-title--purple">
            {content.useTitle}
          </h2>
          <div className="mr-v2-7dip-use-list">
            {content.useRows.map((row) => (
              <div key={row} className="mr-v2-7dip-use-row">
                {row}
              </div>
            ))}
          </div>
        </section>

        <section className="mr-v2-7dip-glass-card mr-v2-7dip-closing-card">
          <div className="mr-v2-7dip-closing-icon" aria-hidden="true">{content.closingIcon}</div>
          <div>
            <div className="mr-v2-7dip-closing-title">{content.closingTitle}</div>
            <div className="mr-v2-7dip-closing-copy">
              {content.closingLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>
                <strong>{content.closingEmphasis}</strong>
              </p>
            </div>
          </div>
        </section>

        <footer className="mr-v2-7dip-bottom-mantra">
          <div className="mr-v2-7dip-bottom-mantra-divider-row" aria-hidden="true">
            <span className="mr-v2-7dip-bottom-mantra-line" />
            <img
              className="mr-v2-7dip-bottom-mantra-logo"
              src={content.footerLotusLogoUrl}
              alt=""
            />
            <span className="mr-v2-7dip-bottom-mantra-line mr-v2-7dip-bottom-mantra-line--reverse" />
          </div>
          <p className="mr-v2-7dip-bottom-mantra-copy">
            <span>{content.mantraLeft}</span>
            <span className="mr-v2-7dip-bottom-mantra-star">{content.mantraCenter}</span>
            <span>{content.mantraRight}</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
