import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS9ReturnToSourceRevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s9-return-to-source-reveal-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage26S9ReturnToSourceRevealProps = {
  payload: FullReportV2Payload;
};

export function MobilePage26S9ReturnToSourceReveal({
  payload,
}: MobilePage26S9ReturnToSourceRevealProps) {
  const content = resolveMobileS9ReturnToSourceRevealContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--s9-return-to-source-reveal"
      id="mobile-page-26-s9-return-to-source-reveal"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s9rts-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s9rts-reveal-card mr-v2-s9rts-reveal-card--has-bg">
          <div
            className="mr-v2-s9rts-reveal-card-bg"
            style={{ backgroundImage: `url("${content.heroBackgroundUrl}")` }}
            aria-hidden="true"
          />
          <div className="mr-v2-s9rts-reveal-overlay" aria-hidden="true" />

          <div className="mr-v2-s9rts-reveal-inner">
            <section className="mr-v2-s9rts-hero">
              <div className="mr-v2-page-kicker mr-v2-s9rts-kicker">{content.kicker}</div>
              <h1 className="mr-v2-s9rts-hero-title">
                {content.titleLine}
                <span className="mr-v2-s9rts-hero-title-lavender">{content.titleEmphasis}</span>
              </h1>
              <p className="mr-v2-s9rts-hero-subtitle">{content.subtitle}</p>

              <div className="mr-v2-s9rts-hero-code-block">
                <div className="mr-v2-s9rts-code-label">{content.codeLabel}</div>
                <div className="mr-v2-s9rts-code-main">{content.code}</div>
                <div className="mr-v2-s9rts-code-title">{content.title}</div>
              </div>
            </section>

            <div className="mr-v2-s9rts-reveal-lotus-gap" aria-hidden="true" />

            <div className="mr-v2-s9rts-reveal-panel">
              <p className="mr-v2-s9rts-meaning">{content.oneLineReturn}</p>
            </div>
          </div>
        </section>

        <section className="mr-v2-s9rts-glass-card mr-v2-s9rts-essence-card">
          <div className="mr-v2-s9rts-essence-icon" aria-hidden="true">{content.essenceIcon}</div>
          <div>
            <div className="mr-v2-s9rts-essence-title">{content.essenceTitle}</div>
            <div className="mr-v2-s9rts-essence-copy">{content.essenceCopy}</div>
          </div>
        </section>

        <section className="mr-v2-s9rts-glass-card mr-v2-s9rts-truths-card">
          <h2 className="mr-v2-s9rts-section-title mr-v2-s9rts-section-title--lavender">
            {content.truthsTitle}
          </h2>
          <div className="mr-v2-s9rts-truth-grid">
            {content.truths.map((item) => (
              <article
                key={item.key}
                className={`mr-v2-s9rts-truth-item mr-v2-s9rts-truth-item--${item.tone}`}
              >
                <div className="mr-v2-s9rts-truth-icon" aria-hidden="true">{item.icon}</div>
                <div className="mr-v2-s9rts-truth-title">{item.title}</div>
                <div className="mr-v2-s9rts-truth-copy">{item.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s9rts-glass-card mr-v2-s9rts-expression-card">
          <h2 className="mr-v2-s9rts-section-title">{content.expressionTitle}</h2>
          <div className="mr-v2-s9rts-expression-list">
            {content.expressions.map((item) => (
              <article key={item.key} className="mr-v2-s9rts-expression-row">
                <div className="mr-v2-s9rts-expression-icon" aria-hidden="true">{item.icon}</div>
                <div>
                  <div className="mr-v2-s9rts-expression-title">{item.title}</div>
                  <div className="mr-v2-s9rts-expression-copy">{item.copy}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s9rts-glass-card mr-v2-s9rts-reminder-card">
          <div className="mr-v2-s9rts-reminder-icon" aria-hidden="true">{content.reminderIcon}</div>
          <div>
            <div className="mr-v2-s9rts-reminder-title">{content.reminderTitle}</div>
            <div className="mr-v2-s9rts-reminder-copy">
              {content.reminderLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>
                You are already <strong>{content.reminderEmphasis}</strong>.
              </p>
            </div>
          </div>
        </section>

        <footer className="mr-v2-s9rts-bottom-mantra">
          <div className="mr-v2-s9rts-bottom-mantra-divider-row" aria-hidden="true">
            <span className="mr-v2-s9rts-bottom-mantra-line" />
            <img
              className="mr-v2-s9rts-bottom-mantra-logo"
              src={content.footerLotusLogoUrl}
              alt=""
            />
            <span className="mr-v2-s9rts-bottom-mantra-line mr-v2-s9rts-bottom-mantra-line--reverse" />
          </div>
          <p className="mr-v2-s9rts-bottom-mantra-copy">
            <span>{content.mantraLeft}</span>
            <span className="mr-v2-s9rts-bottom-mantra-star">{content.mantraCenter}</span>
            <span>{content.mantraRight}</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
