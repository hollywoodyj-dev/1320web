import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS8SoulContributionRevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s8-soul-contribution-reveal-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage24S8SoulContributionRevealProps = {
  payload: FullReportV2Payload;
};

export function MobilePage24S8SoulContributionReveal({
  payload,
}: MobilePage24S8SoulContributionRevealProps) {
  const content = resolveMobileS8SoulContributionRevealContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--s8-soul-contribution-reveal"
      id="mobile-page-24-s8-soul-contribution-reveal"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s8scr-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s8scr-hero">
          <div className="mr-v2-page-kicker mr-v2-s8scr-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s8scr-hero-title">
            {content.titleLine}
            <span className="mr-v2-s8scr-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s8scr-hero-subtitle">{content.subtitle}</p>
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
              <div className="mr-v2-s5mp-mission-icon-label">{content.contributionIconLabel}</div>
              <div className="mr-v2-s8scr-code-main">{content.code}</div>
              <div className="mr-v2-s5mp-mission-icon-title">{content.contributionIconTitle}</div>
              <div className="mr-v2-s5mp-mission-icon-copy">{content.contributionIconDescription}</div>
            </div>
          </div>
        </section>

        <section className="mr-v2-s8scr-glass-card mr-v2-s8scr-essence-card">
          <div className="mr-v2-s8scr-essence-icon" aria-hidden="true">{content.essenceIcon}</div>
          <div>
            <div className="mr-v2-s8scr-essence-title">{content.essenceTitle}</div>
            <div className="mr-v2-s8scr-essence-copy">{content.essenceCopy}</div>
          </div>
        </section>

        <section className="mr-v2-s8scr-glass-card mr-v2-s8scr-keys-card">
          <h2 className="mr-v2-s8scr-section-title mr-v2-s8scr-section-title--center mr-v2-s8scr-section-title--blue">
            {content.keysTitle}
          </h2>
          <div className="mr-v2-s8scr-keys-grid">
            {content.keys.map((item) => (
              <article
                key={item.key}
                className={`mr-v2-s8scr-key-item mr-v2-s8scr-key-item--${item.tone}`}
              >
                <div className="mr-v2-s8scr-key-icon" aria-hidden="true">{item.icon}</div>
                <div className="mr-v2-s8scr-key-title">{item.title}</div>
                <div className="mr-v2-s8scr-key-copy">{item.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s8scr-glass-card mr-v2-s8scr-reminder-card">
          <div className="mr-v2-s8scr-reminder-icon" aria-hidden="true">{content.reminderIcon}</div>
          <div>
            <div className="mr-v2-s8scr-reminder-title">{content.reminderTitle}</div>
            <p className="mr-v2-s8scr-reminder-copy">
              <strong>{content.reminderLead}</strong> {content.reminderBody}
            </p>
          </div>
        </section>

        <footer className="mr-v2-s8scr-bottom-mantra">
          <div className="mr-v2-s8scr-bottom-mantra-divider-row" aria-hidden="true">
            <span className="mr-v2-s8scr-bottom-mantra-line" />
            <img
              className="mr-v2-s8scr-bottom-mantra-logo"
              src={content.footerLotusLogoUrl}
              alt=""
            />
            <span className="mr-v2-s8scr-bottom-mantra-line mr-v2-s8scr-bottom-mantra-line--reverse" />
          </div>
          <p className="mr-v2-s8scr-bottom-mantra-copy">
            <span>{content.mantraLeft}</span>
            <span className="mr-v2-s8scr-bottom-mantra-star">{content.mantraCenter}</span>
            <span>{content.mantraRight}</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
