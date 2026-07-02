import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS2RevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s2-reveal-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage10S2RevealProps = {
  payload: FullReportV2Payload;
};

export function MobilePage10S2Reveal({ payload }: MobilePage10S2RevealProps) {
  const content = resolveMobileS2RevealContent(payload);

  return (
    <main className="mr-v2-screen mr-v2-screen--s2-reveal" id="mobile-page-10-s2-reveal">
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s2r-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s2r-hero">
          <div className="mr-v2-page-kicker mr-v2-s2r-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s2r-hero-title">
            {content.titleLine}
            <span className="mr-v2-s2r-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s2r-hero-subtitle">
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
            "mr-v2-s2r-glass-card",
            "mr-v2-s2r-reveal-card",
            "mr-v2-s2r-reveal-card--has-bg",
          ].join(" ")}
        >
          <div
            className="mr-v2-s2r-reveal-card-bg"
            style={{ backgroundImage: `url(${content.revealBackgroundUrl})` }}
            aria-hidden="true"
          />
          <div className="mr-v2-s2r-reveal-orb">
            <SignatureSegmentCardIcon
              imageUrl={content.imageUrl}
              code={content.code}
              title={content.title}
              fallbackIcon={content.fallbackIcon}
              size={116}
            />
          </div>
          <div className="mr-v2-s2r-code-copy">
            <div className="mr-v2-s2r-code-main">{content.code}</div>
            <div className="mr-v2-s2r-code-name">{content.title}</div>
            <div className="mr-v2-s2r-code-divider" aria-hidden="true" />
            <div className="mr-v2-s2r-code-module">{content.moduleLabel}</div>
            <div className="mr-v2-s2r-code-meaning">{content.moduleMeaning}</div>
          </div>
        </section>

        <section className="mr-v2-s2r-glass-card mr-v2-s2r-meaning-card">
          <div className="mr-v2-s2r-meaning-icon" aria-hidden="true">{content.meaningIcon}</div>
          <div>
            <h2 className="mr-v2-s2r-section-title">{content.meaningTitle}</h2>
            <p className="mr-v2-s2r-meaning-copy">{content.revealMeaning}</p>
          </div>
        </section>

        <section className="mr-v2-s2r-glass-card mr-v2-s2r-gifts-card">
          <h2 className="mr-v2-s2r-section-title">{content.giftsTitle}</h2>
          <div className="mr-v2-s2r-gift-grid">
            {content.gifts.map((gift) => (
              <article key={gift.title} className="mr-v2-s2r-gift-item">
                <div className="mr-v2-s2r-gift-icon" aria-hidden="true">{gift.icon}</div>
                <div className="mr-v2-s2r-gift-title">{gift.title}</div>
                <div className="mr-v2-s2r-gift-copy">{gift.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s2r-glass-card mr-v2-s2r-reflection-card">
          <div className="mr-v2-s2r-reflection-icon" aria-hidden="true">{content.reflectionIcon}</div>
          <div>
            <h2 className="mr-v2-s2r-section-title mr-v2-s2r-section-title--violet">
              {content.reflectionTitle}
            </h2>
            <p className="mr-v2-s2r-reflection-copy">{content.reflectionPrompt}</p>
          </div>
        </section>

        <section className="mr-v2-s2r-glass-card mr-v2-s2r-tip-card">
          <div className="mr-v2-s2r-tip-icon" aria-hidden="true">{content.tipIcon}</div>
          <div>
            <div className="mr-v2-s2r-tip-title">{content.tipTitle}</div>
            <p className="mr-v2-s2r-tip-copy">{content.integrationTip}</p>
          </div>
        </section>
      </section>
    </main>
  );
}
