import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS8ContributionPathwayContent } from "@/lib/mobile-report-v2/resolve-mobile-s8-contribution-pathway-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage25S8ContributionPathwayProps = {
  payload: FullReportV2Payload;
};

export function MobilePage25S8ContributionPathway({
  payload,
}: MobilePage25S8ContributionPathwayProps) {
  const content = resolveMobileS8ContributionPathwayContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--s8-contribution-pathway"
      id="mobile-page-25-s8-contribution-pathway"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s8cp-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s8cp-hero-stack mr-v2-s8cp-hero-stack--has-bg">
          <div
            className="mr-v2-s8cp-hero-stack-bg"
            style={{ backgroundImage: `url(${content.heroBackgroundUrl})` }}
            aria-hidden="true"
          />
          <div className="mr-v2-s8cp-hero-stack-overlay" aria-hidden="true" />

          <section className="mr-v2-s8cp-hero">
            <div className="mr-v2-page-kicker mr-v2-s8cp-kicker">{content.kicker}</div>
            <h1 className="mr-v2-s8cp-hero-title">
              {content.titleLine}
              <span className="mr-v2-s8cp-hero-title-gold">{content.titleEmphasis}</span>
            </h1>
            <p className="mr-v2-s8cp-hero-subtitle">{content.subtitle}</p>
          </section>

          <section className="mr-v2-s8cp-glass-card mr-v2-s8cp-essence-card">
            <div className="mr-v2-s8cp-essence-icon">
              <SignatureSegmentCardIcon
                imageUrl={content.imageUrl}
                code={content.code}
                title={content.title}
                fallbackIcon={content.fallbackIcon}
                size={64}
              />
            </div>
            <div>
              <div className="mr-v2-s8cp-essence-title">{content.essenceTitle}</div>
              <div className="mr-v2-s8cp-essence-copy">{content.essenceCopy}</div>
            </div>
          </section>
        </section>

        <section className="mr-v2-s8cp-glass-card mr-v2-s8cp-pathway-card">
          <h2 className="mr-v2-s8cp-section-title mr-v2-s8cp-section-title--blue">
            {content.pathwayTitle}
          </h2>
          <div className="mr-v2-s8cp-pathway-list">
            {content.pathwaySteps.map((step) => (
              <article
                key={step.key}
                className={`mr-v2-s8cp-pathway-step mr-v2-s8cp-pathway-step--${step.tone}`}
              >
                <div className="mr-v2-s8cp-step-orb" aria-hidden="true">{step.icon}</div>
                <div>
                  <div className="mr-v2-s8cp-step-label">{step.stepLabel}</div>
                  <div className="mr-v2-s8cp-step-title">{step.stepTitle}</div>
                  <div className="mr-v2-s8cp-step-main">{step.stepMain}</div>
                  <div className="mr-v2-s8cp-step-copy">{step.stepCopy}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s8cp-glass-card mr-v2-s8cp-keys-card">
          <h2 className="mr-v2-s8cp-section-title mr-v2-s8cp-section-title--blue">
            {content.keysTitle}
          </h2>
          <div className="mr-v2-s8cp-keys-grid">
            {content.keys.map((item) => (
              <article
                key={item.key}
                className={`mr-v2-s8cp-key-item mr-v2-s8cp-key-item--${item.tone}`}
              >
                <div className="mr-v2-s8cp-key-icon" aria-hidden="true">{item.icon}</div>
                <div className="mr-v2-s8cp-key-title">{item.title}</div>
                <div className="mr-v2-s8cp-key-copy">{item.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s8cp-glass-card mr-v2-s8cp-reminder-card">
          <div className="mr-v2-s8cp-reminder-icon" aria-hidden="true">{content.reminderIcon}</div>
          <div>
            <div className="mr-v2-s8cp-reminder-title">{content.reminderTitle}</div>
            <p className="mr-v2-s8cp-reminder-copy">
              {content.reminderLead} It is about <strong>{content.reminderEmphasis}</strong>,{" "}
              {content.reminderBody}
            </p>
          </div>
        </section>

        <footer className="mr-v2-s8cp-bottom-mantra">
          <div className="mr-v2-s8cp-bottom-mantra-divider-row" aria-hidden="true">
            <span className="mr-v2-s8cp-bottom-mantra-line" />
            <img
              className="mr-v2-s8cp-bottom-mantra-logo"
              src={content.footerLotusLogoUrl}
              alt=""
            />
            <span className="mr-v2-s8cp-bottom-mantra-line mr-v2-s8cp-bottom-mantra-line--reverse" />
          </div>
          <p className="mr-v2-s8cp-bottom-mantra-copy">
            <span>{content.mantraLeft}</span>
            <span className="mr-v2-s8cp-bottom-mantra-star">{content.mantraCenter}</span>
            <span>{content.mantraRight}</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
