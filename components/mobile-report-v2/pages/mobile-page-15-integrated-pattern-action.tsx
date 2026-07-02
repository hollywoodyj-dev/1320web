import { SoulCodeLogoImage } from "@/components/full-report-v2/soul-code-logo-image";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileIntegratedPatternActionContent } from "@/lib/mobile-report-v2/resolve-mobile-integrated-pattern-action-content";
import { SOUL_CODE_ARCHETYPE_BLEND_LOGO_SRC } from "@/lib/full-report-v2/soul-code-logos";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage15IntegratedPatternActionProps = {
  payload: FullReportV2Payload;
};

export function MobilePage15IntegratedPatternAction({
  payload,
}: MobilePage15IntegratedPatternActionProps) {
  const content = resolveMobileIntegratedPatternActionContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--integrated-pattern-action"
      id="mobile-page-15-integrated-pattern-action"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-ipa-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-ipa-hero">
          <div className="mr-v2-page-kicker mr-v2-ipa-kicker">{content.kicker}</div>
          <h1 className="mr-v2-ipa-hero-title">
            {content.titleLine}
            <span className="mr-v2-ipa-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-ipa-hero-subtitle">{content.subtitle}</p>
        </section>

        <section className="mr-v2-ipa-glass-card mr-v2-ipa-flow-card mr-v2-ipa-flow-card--has-bg">
          <div
            className="mr-v2-ipa-flow-card-bg"
            style={{ backgroundImage: `url(${content.flowBackgroundUrl})` }}
            aria-hidden="true"
          />
          <div className="mr-v2-ipa-flow-card-overlay" aria-hidden="true" />
          <h2 className="mr-v2-ipa-section-title mr-v2-ipa-flow-card-title">{content.flowTitle}</h2>

          <div className="mr-v2-ipa-flow-row">
            {content.flowNodes.flatMap((node, index) => {
              const elements = [
                <div key={node.key} className="mr-v2-ipa-flow-node">
                  <div className={`mr-v2-ipa-flow-orb mr-v2-ipa-flow-orb--${node.key}`}>
                    {node.codeLabel}
                  </div>
                  <div className="mr-v2-ipa-flow-label">{node.moduleLabel}</div>
                </div>,
              ];
              if (index < content.flowNodes.length - 1) {
                elements.push(
                  <div key={`arrow-${node.key}`} className="mr-v2-ipa-flow-arrow" aria-hidden="true">
                    →
                  </div>,
                );
              }
              return elements;
            })}
          </div>

          <p className="mr-v2-ipa-flow-summary">{content.flowSummary}</p>
        </section>

        <section className="mr-v2-ipa-glass-card mr-v2-ipa-life-card">
          <h2 className="mr-v2-ipa-section-title">{content.lifeTitle}</h2>

          <div className="mr-v2-ipa-life-grid">
            {content.lifeItems.map((item) => (
              <article key={item.key} className={`mr-v2-ipa-life-item mr-v2-ipa-life-item--${item.key}`}>
                <div className="mr-v2-ipa-life-icon">
                  <SoulCodeLogoImage icon={item.icon} className="mr-v2-ipa-logo-img" />
                </div>
                <div className="mr-v2-ipa-life-code">{item.codeLabel}</div>
                <div className="mr-v2-ipa-life-copy">{item.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-ipa-glass-card mr-v2-ipa-daily-card">
          <h2 className="mr-v2-ipa-section-title">{content.dailyTitle}</h2>

          <div className="mr-v2-ipa-daily-list">
            {content.dailyItems.map((item) => (
              <article
                key={item.key}
                className={`mr-v2-ipa-daily-row mr-v2-ipa-daily-row--${item.key}`}
              >
                <div className="mr-v2-ipa-daily-icon">
                  <SoulCodeLogoImage icon={item.icon} className="mr-v2-ipa-logo-img" />
                </div>
                <div className="mr-v2-ipa-daily-title">{item.title}</div>
                <div className="mr-v2-ipa-daily-copy">{item.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-ipa-glass-card mr-v2-ipa-affirmation-card">
          <div className="mr-v2-ipa-affirmation-icon">
            <img
              className="mr-v2-ipa-affirmation-logo"
              src={SOUL_CODE_ARCHETYPE_BLEND_LOGO_SRC}
              alt=""
              aria-hidden="true"
            />
          </div>
          <div>
            <div className="mr-v2-ipa-affirmation-title">{content.affirmationTitle}</div>
            <p className="mr-v2-ipa-affirmation-copy">{content.affirmation}</p>
          </div>
        </section>
      </section>
    </main>
  );
}
