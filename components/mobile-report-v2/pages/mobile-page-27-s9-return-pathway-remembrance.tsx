import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS9ReturnPathwayRemembranceContent } from "@/lib/mobile-report-v2/resolve-mobile-s9-return-pathway-remembrance-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage27S9ReturnPathwayRemembranceProps = {
  payload: FullReportV2Payload;
};

export function MobilePage27S9ReturnPathwayRemembrance({
  payload,
}: MobilePage27S9ReturnPathwayRemembranceProps) {
  const content = resolveMobileS9ReturnPathwayRemembranceContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--s9-return-pathway-remembrance"
      id="mobile-page-27-s9-return-pathway-remembrance"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s9rpr-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section
          className="mr-v2-s9rpr-hero-stack mr-v2-s9rpr-hero-stack--has-bg"
          style={{ display: "flex", flexDirection: "column", minHeight: "min(300px, 44vh)" }}
        >
          <div
            className="mr-v2-s9rpr-hero-stack-bg"
            style={{
              backgroundImage: `url("${content.heroBackgroundUrl}")`,
              backgroundPosition: "center 72%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            aria-hidden="true"
          />
          <div className="mr-v2-s9rpr-hero-stack-overlay" aria-hidden="true" />

          <section className="mr-v2-s9rpr-hero">
            <div className="mr-v2-page-kicker mr-v2-s9rpr-kicker">{content.kicker}</div>
            <h1 className="mr-v2-s9rpr-hero-title">
              {content.titleLine}
              <span className="mr-v2-s9rpr-hero-title-lavender">{content.titleEmphasis}</span>
            </h1>
            <p className="mr-v2-s9rpr-hero-subtitle">{content.subtitle}</p>
          </section>

          <div
            className="mr-v2-s9rpr-hero-art-gap"
            style={{ flex: "1 1 auto", minHeight: 120 }}
            aria-hidden="true"
          />
        </section>

        <section className="mr-v2-s9rpr-glass-card mr-v2-s9rpr-essence-card">
          <div className="mr-v2-s9rpr-essence-icon" aria-hidden="true">{content.essenceIcon}</div>
          <div>
            <div className="mr-v2-s9rpr-essence-title">{content.essenceTitle}</div>
            <div className="mr-v2-s9rpr-essence-copy">{content.essenceCopy}</div>
          </div>
        </section>

        <section className="mr-v2-s9rpr-glass-card mr-v2-s9rpr-pathway-card">
          <h2 className="mr-v2-s9rpr-section-title mr-v2-s9rpr-section-title--lavender">
            {content.pathwayTitle}
          </h2>
          <div className="mr-v2-s9rpr-pathway-list">
            {content.pathwaySteps.map((step) => (
              <article
                key={step.key}
                className={`mr-v2-s9rpr-pathway-step mr-v2-s9rpr-pathway-step--${step.tone}`}
              >
                <div className="mr-v2-s9rpr-step-orb" aria-hidden="true">{step.icon}</div>
                <div>
                  <div className="mr-v2-s9rpr-step-label">{step.stepLabel}</div>
                  <div className="mr-v2-s9rpr-step-title">{step.stepTitle}</div>
                  <div className="mr-v2-s9rpr-step-main">{step.stepMain}</div>
                  <div className="mr-v2-s9rpr-step-copy">{step.stepCopy}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s9rpr-glass-card mr-v2-s9rpr-keys-card">
          <h2 className="mr-v2-s9rpr-section-title mr-v2-s9rpr-section-title--lavender">
            {content.keysTitle}
          </h2>
          <div className="mr-v2-s9rpr-keys-grid">
            {content.keys.map((item) => (
              <article
                key={item.key}
                className={`mr-v2-s9rpr-key-item mr-v2-s9rpr-key-item--${item.tone}`}
              >
                <div className="mr-v2-s9rpr-key-icon" aria-hidden="true">{item.icon}</div>
                <div className="mr-v2-s9rpr-key-title">{item.title}</div>
                <div className="mr-v2-s9rpr-key-copy">{item.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s9rpr-glass-card mr-v2-s9rpr-reminder-card">
          <div className="mr-v2-s9rpr-reminder-icon" aria-hidden="true">{content.reminderIcon}</div>
          <div>
            <div className="mr-v2-s9rpr-reminder-title">{content.reminderTitle}</div>
            <div className="mr-v2-s9rpr-reminder-copy">
              {content.reminderLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>
                {content.reminderTail} <strong>{content.reminderEmphasis}</strong>.
              </p>
            </div>
          </div>
        </section>

        <footer className="mr-v2-s9rpr-bottom-mantra">
          <div className="mr-v2-s9rpr-bottom-mantra-divider-row" aria-hidden="true">
            <span className="mr-v2-s9rpr-bottom-mantra-line" />
            <img
              className="mr-v2-s9rpr-bottom-mantra-logo"
              src={content.footerLotusLogoUrl}
              alt=""
            />
            <span className="mr-v2-s9rpr-bottom-mantra-line mr-v2-s9rpr-bottom-mantra-line--reverse" />
          </div>
          <p className="mr-v2-s9rpr-bottom-mantra-copy">
            <span>{content.mantraLeft}</span>
            <span className="mr-v2-s9rpr-bottom-mantra-star">{content.mantraCenter}</span>
            <span>{content.mantraRight}</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
