import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS5MissionPathwayIconContent } from "@/lib/mobile-report-v2/resolve-mobile-s5-mission-pathway-icon-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage19S5MissionPathwayIconProps = {
  payload: FullReportV2Payload;
};

export function MobilePage19S5MissionPathwayIcon({ payload }: MobilePage19S5MissionPathwayIconProps) {
  const content = resolveMobileS5MissionPathwayIconContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--s5-mission-pathway-icon"
      id="mobile-page-19-s5-mission-pathway-icon"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s5mp-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s5mp-hero">
          <div className="mr-v2-page-kicker mr-v2-s5mp-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s5mp-hero-title">
            {content.titleLine}
            <span className="mr-v2-s5mp-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s5mp-hero-subtitle">{content.subtitle}</p>
        </section>

        <section className="mr-v2-s5mp-glass-card mr-v2-s5mp-mission-icon-card mr-v2-s5mp-mission-icon-card--has-bg">
          <div
            className="mr-v2-s5mp-mission-icon-card-bg"
            style={{ backgroundImage: `url(${content.iconBackgroundUrl})` }}
            aria-hidden="true"
          />
          <div className="mr-v2-s5mp-mission-icon-inner">
            <div className="mr-v2-s5mp-mission-icon-orb">
              <SignatureSegmentCardIcon
                imageUrl={content.imageUrl}
                code={content.code}
                title={content.title}
                fallbackIcon={content.fallbackIcon}
                size={96}
              />
            </div>
            <div>
              <div className="mr-v2-s5mp-mission-icon-label">{content.missionIconLabel}</div>
              <div className="mr-v2-s5mp-mission-icon-title">{content.missionIconTitle}</div>
              <div className="mr-v2-s5mp-mission-icon-copy">{content.missionIconDescription}</div>
            </div>
          </div>
        </section>

        <section className="mr-v2-s5mp-glass-card mr-v2-s5mp-pathway-card">
          <h2 className="mr-v2-s5mp-section-title">{content.pathwayTitle}</h2>
          <div className="mr-v2-s5mp-pathway-flow">
            {content.pathwaySteps.map((step) => (
              <div
                key={step.stepNumber}
                className={[
                  "mr-v2-s5mp-pathway-step",
                  step.isExpress ? "mr-v2-s5mp-pathway-step--express" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="mr-v2-s5mp-step-orb" aria-hidden="true">{step.icon}</div>
                <div>
                  <div className="mr-v2-s5mp-step-number">{step.stepNumber}</div>
                  <div className="mr-v2-s5mp-step-title">{step.title}</div>
                  <div className="mr-v2-s5mp-step-copy">{step.copy}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mr-v2-s5mp-support-grid">
          {content.supportCards.map((card) => (
            <article
              key={card.key}
              className={[
                "mr-v2-s5mp-glass-card",
                "mr-v2-s5mp-support-card",
                card.variant === "violet" ? "mr-v2-s5mp-support-card--violet" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="mr-v2-s5mp-support-icon" aria-hidden="true">{card.icon}</div>
              <div>
                <div className="mr-v2-s5mp-support-title">{card.title}</div>
                <div className="mr-v2-s5mp-support-copy">{card.copy}</div>
              </div>
            </article>
          ))}
        </section>

        <section className="mr-v2-s5mp-glass-card mr-v2-s5mp-quote-card">
          <div className="mr-v2-s5mp-quote-mark" aria-hidden="true">“</div>
          <p className="mr-v2-s5mp-quote-copy">{content.quote}</p>
        </section>

        <footer className="mr-v2-s5mp-bottom-mantra">
          <div className="mr-v2-s5mp-bottom-mantra-divider-row" aria-hidden="true">
            <span className="mr-v2-s5mp-bottom-mantra-line" />
            <img
              className="mr-v2-s5mp-bottom-mantra-logo"
              src={content.footerLotusLogoUrl}
              alt=""
            />
            <span className="mr-v2-s5mp-bottom-mantra-line mr-v2-s5mp-bottom-mantra-line--reverse" />
          </div>
          <p className="mr-v2-s5mp-bottom-mantra-copy">
            <span>{content.mantraLeft}</span>
            <span className="mr-v2-s5mp-bottom-mantra-star">{content.mantraCenter}</span>
            <span>{content.mantraRight}</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
