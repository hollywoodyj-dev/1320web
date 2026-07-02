import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS6ValueReceivingRevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s6-value-receiving-reveal-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage20S6ValueReceivingRevealProps = {
  payload: FullReportV2Payload;
};

export function MobilePage20S6ValueReceivingReveal({ payload }: MobilePage20S6ValueReceivingRevealProps) {
  const content = resolveMobileS6ValueReceivingRevealContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--s6-value-receiving-reveal"
      id="mobile-page-20-s6-value-receiving-reveal"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s6vr-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s6vr-hero">
          <div className="mr-v2-page-kicker mr-v2-s6vr-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s6vr-hero-title">
            {content.titleLine}
            <span className="mr-v2-s6vr-hero-title-violet">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s6vr-hero-subtitle">{content.subtitle}</p>
        </section>

        <section className="mr-v2-s6vr-glass-card mr-v2-s6vr-reveal-card mr-v2-s6vr-reveal-card--has-bg">
          <div
            className="mr-v2-s6vr-reveal-card-bg"
            style={{ backgroundImage: `url(${content.revealBackgroundUrl})` }}
            aria-hidden="true"
          />
          <div className="mr-v2-s6vr-reveal-inner">
            <div className="mr-v2-s6vr-orb">
              <SignatureSegmentCardIcon
                imageUrl={content.imageUrl}
                code={content.code}
                title={content.title}
                fallbackIcon={content.fallbackIcon}
                size={96}
              />
            </div>
            <div>
              <div className="mr-v2-s6vr-code-label">{content.codeLabel}</div>
              <div className="mr-v2-s6vr-code-main">{content.code}</div>
              <div className="mr-v2-s6vr-code-title">{content.title}</div>
              <div className="mr-v2-s6vr-meaning">{content.oneLineValue}</div>
            </div>
          </div>
        </section>

        <section className="mr-v2-s6vr-glass-card mr-v2-s6vr-lotus-card">
          <div className="mr-v2-s6vr-orb mr-v2-s6vr-orb--large">
            <SignatureSegmentCardIcon
              imageUrl={content.imageUrl}
              code={content.code}
              title={content.title}
              fallbackIcon={content.fallbackIcon}
              size={96}
            />
          </div>
          <p className="mr-v2-s6vr-lotus-copy">{content.lotusCopy}</p>
        </section>

        <section className="mr-v2-s6vr-glass-card mr-v2-s6vr-essence-card">
          <div className="mr-v2-s6vr-essence-icon">
            <img
              className="mr-v2-s6vr-essence-logo"
              src={content.essenceLogoUrl}
              alt=""
              aria-hidden="true"
            />
          </div>
          <div>
            <div className="mr-v2-s6vr-essence-title">{content.essenceTitle}</div>
            <div className="mr-v2-s6vr-essence-copy">{content.valueEssence}</div>
          </div>
        </section>

        <section className="mr-v2-s6vr-glass-card mr-v2-s6vr-values-card">
          <h2 className="mr-v2-s6vr-section-title mr-v2-s6vr-section-title--center">
            {content.coreValuesTitle}
          </h2>
          <div className="mr-v2-s6vr-value-list">
            {content.coreValues.map((item) => (
              <article key={item.title} className="mr-v2-s6vr-value-item">
                <div className="mr-v2-s6vr-value-icon" aria-hidden="true">{item.icon}</div>
                <div>
                  <div className="mr-v2-s6vr-value-title">{item.title}</div>
                  <div className="mr-v2-s6vr-value-copy">{item.copy}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s6vr-glass-card mr-v2-s6vr-receiving-card">
          <h2 className="mr-v2-s6vr-section-title mr-v2-s6vr-section-title--center mr-v2-s6vr-section-title--violet">
            {content.receivingTitle}
          </h2>
          <ul className="mr-v2-s6vr-receiving-list">
            {content.receivingStyles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mr-v2-s6vr-two-card-grid">
          <article className="mr-v2-s6vr-glass-card mr-v2-s6vr-mini-card mr-v2-s6vr-mini-card--violet">
            <div className="mr-v2-s6vr-mini-header">
              <div className="mr-v2-s6vr-mini-icon" aria-hidden="true">{content.reflectionIcon}</div>
              <div className="mr-v2-s6vr-section-title mr-v2-s6vr-section-title--violet">
                {content.reflectionTitle}
              </div>
            </div>
            <p className="mr-v2-s6vr-reflection-question">“{content.reflectionPrompt}”</p>
          </article>

          <article className="mr-v2-s6vr-glass-card mr-v2-s6vr-mini-card">
            <div className="mr-v2-s6vr-mini-header">
              <div className="mr-v2-s6vr-mini-icon" aria-hidden="true">{content.practiceIcon}</div>
              <div className="mr-v2-s6vr-section-title">{content.practiceTitle}</div>
            </div>
            <div className="mr-v2-s6vr-practice-copy">{content.practiceToday}</div>
          </article>
        </section>

        <section className="mr-v2-s6vr-glass-card mr-v2-s6vr-quote-card">
          <div className="mr-v2-s6vr-quote-mark" aria-hidden="true">“</div>
          <p className="mr-v2-s6vr-quote-copy">
            {content.quoteBefore}
            <span className="mr-v2-s6vr-quote-emphasis">{content.quoteEmphasis}</span>
          </p>
        </section>

        <footer className="mr-v2-s6vr-bottom-mantra">
          <div className="mr-v2-s6vr-bottom-mantra-divider-row" aria-hidden="true">
            <span className="mr-v2-s6vr-bottom-mantra-line" />
            <img
              className="mr-v2-s6vr-bottom-mantra-logo"
              src={content.footerLotusLogoUrl}
              alt=""
            />
            <span className="mr-v2-s6vr-bottom-mantra-line mr-v2-s6vr-bottom-mantra-line--reverse" />
          </div>
          <p className="mr-v2-s6vr-bottom-mantra-copy">
            <span>{content.mantraLeft}</span>
            <span className="mr-v2-s6vr-bottom-mantra-star">{content.mantraCenter}</span>
            <span>{content.mantraRight}</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
