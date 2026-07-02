import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS4ShadowRevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s4-shadow-reveal-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage16S4ShadowRevealProps = {
  payload: FullReportV2Payload;
};

export function MobilePage16S4ShadowReveal({ payload }: MobilePage16S4ShadowRevealProps) {
  const content = resolveMobileS4ShadowRevealContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--s4-shadow-reveal"
      id="mobile-page-16-s4-shadow-reveal"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s4r-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s4r-hero">
          <div className="mr-v2-page-kicker mr-v2-s4r-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s4r-hero-title">
            {content.titleLine}
            <span className="mr-v2-s4r-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s4r-hero-subtitle">{content.subtitle}</p>
        </section>

        <section className="mr-v2-s4r-glass-card mr-v2-s4r-reveal-card mr-v2-s4r-reveal-card--has-bg">
          <div
            className="mr-v2-s4r-reveal-card-bg"
            style={{ backgroundImage: `url(${content.revealBackgroundUrl})` }}
            aria-hidden="true"
          />
          <div className="mr-v2-s4r-reveal-inner">
            <div className="mr-v2-s4r-orb">
              <SignatureSegmentCardIcon
                imageUrl={content.imageUrl}
                code={content.code}
                title={content.title}
                fallbackIcon={content.fallbackIcon}
                size={96}
              />
            </div>
            <div>
              <div className="mr-v2-s4r-code-label">{content.codeLabel}</div>
              <div className="mr-v2-s4r-code-main">{content.code}</div>
              <div className="mr-v2-s4r-code-title">{content.title}</div>
            </div>
          </div>
        </section>

        {content.infoCards.map((card) => (
          <section
            key={card.title}
            className={[
              "mr-v2-s4r-glass-card",
              "mr-v2-s4r-info-card",
              card.variant === "shadow" ? "mr-v2-s4r-info-card--shadow" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="mr-v2-s4r-info-icon" aria-hidden="true">{card.icon}</div>
            <div>
              <div className="mr-v2-s4r-info-number">{card.number} {card.title}</div>
              <div className="mr-v2-s4r-info-copy">{card.copy}</div>
            </div>
          </section>
        ))}

        <section className="mr-v2-s4r-two-card-grid">
          <article className="mr-v2-s4r-glass-card mr-v2-s4r-mini-card mr-v2-s4r-mini-card--violet">
            <div className="mr-v2-s4r-mini-header">
              <div className="mr-v2-s4r-mini-icon" aria-hidden="true">
                {content.integrationKeysIcon}
              </div>
              <div className="mr-v2-s4r-section-title mr-v2-s4r-section-title--violet">
                {content.integrationKeysTitle}
              </div>
            </div>
            <ul className="mr-v2-s4r-key-list">
              {content.integrationKeys.map((key) => (
                <li key={key}>{key}</li>
              ))}
            </ul>
          </article>

          <article className="mr-v2-s4r-glass-card mr-v2-s4r-mini-card">
            <div className="mr-v2-s4r-mini-header">
              <div className="mr-v2-s4r-mini-icon" aria-hidden="true">{content.reflectionIcon}</div>
              <div className="mr-v2-s4r-section-title">{content.reflectionTitle}</div>
            </div>
            <div className="mr-v2-s4r-reflection-question">
              “{content.reflectionPrompt}”
            </div>
          </article>
        </section>

        <section className="mr-v2-s4r-glass-card mr-v2-s4r-practice-card">
          <div className="mr-v2-s4r-practice-icon">
            <img
              className="mr-v2-s4r-practice-logo"
              src={content.practiceLogoUrl}
              alt=""
              aria-hidden="true"
            />
          </div>
          <div>
            <div className="mr-v2-s4r-practice-title">{content.practiceTitle}</div>
            <div className="mr-v2-s4r-practice-name">{content.practiceName}</div>
            <div className="mr-v2-s4r-practice-copy">{content.practiceCopy}</div>
          </div>
        </section>

        <footer className="mr-v2-s4r-bottom-mantra">
          <div className="mr-v2-s4r-bottom-mantra-divider-row" aria-hidden="true">
            <span className="mr-v2-s4r-bottom-mantra-line" />
            <img
              className="mr-v2-s4r-bottom-mantra-logo"
              src={content.footerLotusLogoUrl}
              alt=""
            />
            <span className="mr-v2-s4r-bottom-mantra-line mr-v2-s4r-bottom-mantra-line--reverse" />
          </div>
          <p className="mr-v2-s4r-bottom-mantra-copy">
            <span>{content.mantraLeft}</span>
            <span className="mr-v2-s4r-bottom-mantra-star">{content.mantraCenter}</span>
            <span>{content.mantraRight}</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
