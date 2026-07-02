import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS5SoulMissionRevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s5-soul-mission-reveal-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage18S5SoulMissionRevealProps = {
  payload: FullReportV2Payload;
};

export function MobilePage18S5SoulMissionReveal({ payload }: MobilePage18S5SoulMissionRevealProps) {
  const content = resolveMobileS5SoulMissionRevealContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--s5-soul-mission-reveal"
      id="mobile-page-18-s5-soul-mission-reveal"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s5mr-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s5mr-hero">
          <div className="mr-v2-page-kicker mr-v2-s5mr-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s5mr-hero-title">
            {content.titleLine}
            <span className="mr-v2-s5mr-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s5mr-hero-subtitle">{content.subtitle}</p>
        </section>

        <section className="mr-v2-s5mr-glass-card mr-v2-s5mr-reveal-card mr-v2-s5mr-reveal-card--has-bg">
          <div
            className="mr-v2-s5mr-reveal-card-bg"
            style={{ backgroundImage: `url(${content.revealBackgroundUrl})` }}
            aria-hidden="true"
          />
          <div className="mr-v2-s5mr-reveal-inner">
            <div className="mr-v2-s5mr-orb">
              <SignatureSegmentCardIcon
                imageUrl={content.imageUrl}
                code={content.code}
                title={content.title}
                fallbackIcon={content.fallbackIcon}
                size={96}
              />
            </div>
            <div>
              <div className="mr-v2-s5mr-code-label">{content.codeLabel}</div>
              <div className="mr-v2-s5mr-code-main">{content.code}</div>
              <div className="mr-v2-s5mr-code-title">{content.title}</div>
              <div className="mr-v2-s5mr-meaning">{content.oneLineMission}</div>
            </div>
          </div>
        </section>

        <section className="mr-v2-s5mr-glass-card mr-v2-s5mr-essence-card">
          <div className="mr-v2-s5mr-essence-icon">
            <img
              className="mr-v2-s5mr-essence-logo"
              src={content.essenceLogoUrl}
              alt=""
              aria-hidden="true"
            />
          </div>
          <div>
            <div className="mr-v2-s5mr-essence-title">{content.essenceTitle}</div>
            <div className="mr-v2-s5mr-essence-copy">{content.missionEssence}</div>
          </div>
        </section>

        <section className="mr-v2-s5mr-glass-card mr-v2-s5mr-expressions-card">
          <h2 className="mr-v2-s5mr-section-title mr-v2-s5mr-section-title--center">
            {content.expressionsTitle}
          </h2>
          <div className="mr-v2-s5mr-expression-grid">
            {content.expressions.map((item) => (
              <article key={item.title} className="mr-v2-s5mr-expression-item">
                <div className="mr-v2-s5mr-expression-icon" aria-hidden="true">{item.icon}</div>
                <div className="mr-v2-s5mr-expression-title">{item.title}</div>
                <div className="mr-v2-s5mr-expression-copy">{item.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s5mr-glass-card mr-v2-s5mr-alignment-card">
          <h2 className="mr-v2-s5mr-section-title mr-v2-s5mr-section-title--center">
            {content.alignmentTitle}
          </h2>
          <ul className="mr-v2-s5mr-alignment-list">
            {content.alignmentKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </section>

        <section className="mr-v2-s5mr-two-card-grid">
          <article className="mr-v2-s5mr-glass-card mr-v2-s5mr-mini-card mr-v2-s5mr-mini-card--violet">
            <div className="mr-v2-s5mr-mini-header">
              <div className="mr-v2-s5mr-mini-icon" aria-hidden="true">{content.reflectionIcon}</div>
              <div className="mr-v2-s5mr-section-title mr-v2-s5mr-section-title--violet">
                {content.reflectionTitle}
              </div>
            </div>
            <p className="mr-v2-s5mr-reflection-question">“{content.reflectionPrompt}”</p>
          </article>

          <article className="mr-v2-s5mr-glass-card mr-v2-s5mr-mini-card">
            <div className="mr-v2-s5mr-mini-header">
              <div className="mr-v2-s5mr-mini-icon" aria-hidden="true">{content.practiceIcon}</div>
              <div className="mr-v2-s5mr-section-title">{content.practiceTitle}</div>
            </div>
            <div className="mr-v2-s5mr-practice-copy">{content.practiceToday}</div>
          </article>
        </section>

        <p className="mr-v2-s5mr-mission-mantra">{content.missionMantra}</p>

        <footer className="mr-v2-s5mr-bottom-mantra">
          <div className="mr-v2-s5mr-bottom-mantra-divider-row" aria-hidden="true">
            <span className="mr-v2-s5mr-bottom-mantra-line" />
            <img
              className="mr-v2-s5mr-bottom-mantra-logo"
              src={content.footerLotusLogoUrl}
              alt=""
            />
            <span className="mr-v2-s5mr-bottom-mantra-line mr-v2-s5mr-bottom-mantra-line--reverse" />
          </div>
          <p className="mr-v2-s5mr-bottom-mantra-copy">
            <span>{content.mantraLeft}</span>
            <span className="mr-v2-s5mr-bottom-mantra-star">{content.mantraCenter}</span>
            <span>{content.mantraRight}</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
