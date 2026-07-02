import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS1RevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s1-reveal-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage06S1RevealProps = {
  payload: FullReportV2Payload;
};

export function MobilePage06S1Reveal({ payload }: MobilePage06S1RevealProps) {
  const content = resolveMobileS1RevealContent(payload);

  return (
    <main className="mr-v2-screen mr-v2-screen--s1-reveal" id="mobile-page-06-s1-reveal">
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s1r-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s1r-hero">
          <div className="mr-v2-page-kicker mr-v2-s1r-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s1r-hero-title">
            {content.titleLine}
            <span className="mr-v2-s1r-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s1r-hero-subtitle">
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
            "mr-v2-s1r-glass-card",
            "mr-v2-s1r-reveal-card",
            content.revealBackgroundUrl ? "mr-v2-s1r-reveal-card--has-bg" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {content.revealBackgroundUrl ? (
            <div
              className="mr-v2-s1r-reveal-card-bg"
              style={{ backgroundImage: `url(${content.revealBackgroundUrl})` }}
              aria-hidden="true"
            />
          ) : null}
          <div className="mr-v2-s1r-reveal-orb">
            <SignatureSegmentCardIcon
              imageUrl={content.imageUrl}
              code={content.code}
              title={content.title}
              fallbackIcon={content.fallbackIcon}
              size={116}
            />
          </div>
          <div className="mr-v2-s1r-code-copy">
            <div className="mr-v2-s1r-code-main">{content.code}</div>
            <div className="mr-v2-s1r-code-name">{content.title}</div>
            <div className="mr-v2-s1r-code-divider" aria-hidden="true" />
            <div className="mr-v2-s1r-code-module">{content.moduleLabel}</div>
            <div className="mr-v2-s1r-code-meaning">{content.moduleMeaning}</div>
          </div>
        </section>

        <section className="mr-v2-s1r-glass-card mr-v2-s1r-meaning-card">
          <div className="mr-v2-s1r-meaning-icon" aria-hidden="true">{content.meaningIcon}</div>
          <div>
            <h2 className="mr-v2-s1r-section-title">{content.meaningTitle}</h2>
            <p className="mr-v2-s1r-meaning-copy">{content.revealMeaning}</p>
          </div>
        </section>

        <section className="mr-v2-s1r-glass-card mr-v2-s1r-themes-card">
          <h2 className="mr-v2-s1r-section-title">{content.themesTitle}</h2>
          <div className="mr-v2-s1r-theme-grid">
            {content.themes.map((theme) => (
              <article key={theme.title} className="mr-v2-s1r-theme-item">
                <div className="mr-v2-s1r-theme-icon" aria-hidden="true">{theme.icon}</div>
                <div className="mr-v2-s1r-theme-title">{theme.title}</div>
                <div className="mr-v2-s1r-theme-copy">{theme.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s1r-glass-card mr-v2-s1r-reflection-card">
          <div className="mr-v2-s1r-reflection-icon" aria-hidden="true">{content.reflectionIcon}</div>
          <div>
            <div className="mr-v2-s1r-reflection-title">{content.reflectionTitle}</div>
            <div className="mr-v2-s1r-reflection-copy">{content.reflectionPrompt}</div>
          </div>
        </section>

        <section className="mr-v2-s1r-quote-card">
          <span className="mr-v2-s1r-quote-mark" aria-hidden="true">“</span>
          {content.revealQuote}
          <span className="mr-v2-s1r-quote-mark" aria-hidden="true">”</span>
        </section>
      </section>
    </main>
  );
}
