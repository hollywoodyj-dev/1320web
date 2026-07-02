import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS0VoidGateIntegrationContent } from "@/lib/mobile-report-v2/resolve-mobile-s0-void-gate-integration-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage13S0VoidGateIntegrationProps = {
  payload: FullReportV2Payload;
};

export function MobilePage13S0VoidGateIntegration({ payload }: MobilePage13S0VoidGateIntegrationProps) {
  const content = resolveMobileS0VoidGateIntegrationContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--s0-void-integration"
      id="mobile-page-13-s0-void-gate-integration"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s0i-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s0i-hero">
          <div className="mr-v2-page-kicker mr-v2-s0i-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s0i-hero-title">
            {content.titleLine}
            <span className="mr-v2-s0i-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s0i-hero-subtitle">
            {content.subtitleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
        </section>

        <section className="mr-v2-s0i-glass-card mr-v2-s0i-summary-card mr-v2-s0i-summary-card--has-bg">
          <div
            className="mr-v2-s0i-summary-card-bg"
            style={{ backgroundImage: `url(${content.summaryBackgroundUrl})` }}
            aria-hidden="true"
          />
          <div className="mr-v2-s0i-summary-orb">
            <SignatureSegmentCardIcon
              imageUrl={content.imageUrl}
              code={content.code}
              title={content.title}
              fallbackIcon={content.fallbackIcon}
              size={108}
            />
          </div>
          <div className="mr-v2-s0i-summary-copy">
            <div className="mr-v2-s0i-summary-code">{content.code}</div>
            <div className="mr-v2-s0i-summary-title">{content.title}</div>
            <div className="mr-v2-s0i-summary-divider" aria-hidden="true" />
            <div className="mr-v2-s0i-summary-module">{content.moduleLabel}</div>
            <div className="mr-v2-s0i-summary-meaning">{content.shortVoidGateLine}</div>
          </div>
        </section>

        <section className="mr-v2-s0i-glass-card mr-v2-s0i-meaning-card">
          <div className="mr-v2-s0i-meaning-icon" aria-hidden="true">{content.meaningIcon}</div>
          <div>
            <h2 className="mr-v2-s0i-section-title">{content.meaningTitle}</h2>
            <p className="mr-v2-s0i-meaning-copy">{content.voidGateMeaning}</p>
          </div>
        </section>

        <section className="mr-v2-s0i-glass-card mr-v2-s0i-keys-card">
          <h2 className="mr-v2-s0i-section-title mr-v2-s0i-section-title--center">
            {content.keysTitle}
          </h2>
          <div className="mr-v2-s0i-key-grid">
            {content.integrationKeys.map((key) => (
              <article key={key.title} className="mr-v2-s0i-key-item">
                <div className="mr-v2-s0i-key-icon" aria-hidden="true">{key.icon}</div>
                <div className="mr-v2-s0i-key-title">{key.title}</div>
                <div className="mr-v2-s0i-key-copy">{key.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s0i-glass-card mr-v2-s0i-reflection-card">
          <div className="mr-v2-s0i-reflection-icon" aria-hidden="true">{content.reflectionIcon}</div>
          <div>
            <h2 className="mr-v2-s0i-section-title mr-v2-s0i-section-title--violet">
              {content.reflectionTitle}
            </h2>
            <p className="mr-v2-s0i-reflection-copy">{content.reflectionPrompt}</p>
          </div>
        </section>

        <section className="mr-v2-s0i-glass-card mr-v2-s0i-practice-card">
          <div className="mr-v2-s0i-practice-icon" aria-hidden="true">{content.practiceIcon}</div>
          <div>
            <div className="mr-v2-s0i-practice-title">{content.practiceTitle}</div>
            <p className="mr-v2-s0i-practice-copy">{content.integrationPractice}</p>
          </div>
        </section>
      </section>
    </main>
  );
}
