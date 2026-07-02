import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS0RevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s0-reveal-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage12S0RevealProps = {
  payload: FullReportV2Payload;
};

export function MobilePage12S0Reveal({ payload }: MobilePage12S0RevealProps) {
  const content = resolveMobileS0RevealContent(payload);

  return (
    <main className="mr-v2-screen mr-v2-screen--s0-reveal" id="mobile-page-12-s0-reveal">
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s0r-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s0r-hero">
          <div className="mr-v2-page-kicker mr-v2-s0r-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s0r-hero-title">
            {content.titleLine}
            <span className="mr-v2-s0r-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s0r-hero-subtitle">
            {content.subtitleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
        </section>

        <section
          className={[
            "mr-v2-s0r-glass-card",
            "mr-v2-s0r-reveal-card",
            "mr-v2-s0r-reveal-card--has-bg",
          ].join(" ")}
        >
          <div
            className="mr-v2-s0r-reveal-card-bg"
            style={{ backgroundImage: `url(${content.revealBackgroundUrl})` }}
            aria-hidden="true"
          />
          <div className="mr-v2-s0r-reveal-orb">
            <SignatureSegmentCardIcon
              imageUrl={content.imageUrl}
              code={content.code}
              title={content.title}
              fallbackIcon={content.fallbackIcon}
              size={116}
            />
          </div>
          <div className="mr-v2-s0r-code-copy">
            <div className="mr-v2-s0r-code-main">{content.code}</div>
            <div className="mr-v2-s0r-code-name">{content.title}</div>
            <div className="mr-v2-s0r-code-divider" aria-hidden="true" />
            <div className="mr-v2-s0r-code-module">{content.moduleLabel}</div>
            <div className="mr-v2-s0r-code-meaning">{content.moduleMeaning}</div>
          </div>
        </section>

        <section className="mr-v2-s0r-glass-card mr-v2-s0r-meaning-card">
          <div className="mr-v2-s0r-meaning-icon" aria-hidden="true">{content.meaningIcon}</div>
          <div>
            <h2 className="mr-v2-s0r-section-title">{content.meaningTitle}</h2>
            <p className="mr-v2-s0r-meaning-copy">{content.revealMeaning}</p>
          </div>
        </section>

        <section className="mr-v2-s0r-glass-card mr-v2-s0r-gifts-card">
          <h2 className="mr-v2-s0r-section-title">{content.giftsTitle}</h2>
          <div className="mr-v2-s0r-gift-grid">
            {content.gifts.map((gift) => (
              <article key={gift.title} className="mr-v2-s0r-gift-item">
                <div className="mr-v2-s0r-gift-icon" aria-hidden="true">{gift.icon}</div>
                <div className="mr-v2-s0r-gift-title">{gift.title}</div>
                <div className="mr-v2-s0r-gift-copy">{gift.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s0r-glass-card mr-v2-s0r-reflection-card">
          <div className="mr-v2-s0r-reflection-icon" aria-hidden="true">{content.reflectionIcon}</div>
          <div>
            <h2 className="mr-v2-s0r-section-title mr-v2-s0r-section-title--violet">
              {content.reflectionTitle}
            </h2>
            <p className="mr-v2-s0r-reflection-copy">{content.reflectionPrompt}</p>
          </div>
        </section>

        <section className="mr-v2-s0r-glass-card mr-v2-s0r-tip-card">
          <div className="mr-v2-s0r-tip-icon" aria-hidden="true">{content.tipIcon}</div>
          <div>
            <div className="mr-v2-s0r-tip-title">{content.tipTitle}</div>
            <p className="mr-v2-s0r-tip-copy">{content.integrationTip}</p>
          </div>
        </section>
      </section>
    </main>
  );
}
