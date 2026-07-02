import { SoulCodeLogoImage } from "@/components/full-report-v2/soul-code-logo-image";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileIntegratedBlueprintOverviewContent } from "@/lib/mobile-report-v2/resolve-mobile-integrated-blueprint-overview-content";
import { SOUL_CODE_ARCHETYPE_BLEND_LOGO_SRC } from "@/lib/full-report-v2/soul-code-logos";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage14IntegratedBlueprintProps = {
  payload: FullReportV2Payload;
};

export function MobilePage14IntegratedBlueprint({ payload }: MobilePage14IntegratedBlueprintProps) {
  const content = resolveMobileIntegratedBlueprintOverviewContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--integrated-blueprint"
      id="mobile-page-14-integrated-blueprint"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-ibp-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-ibp-hero">
          <div className="mr-v2-page-kicker mr-v2-ibp-kicker">{content.kicker}</div>
          <h1 className="mr-v2-ibp-hero-title">
            {content.titleLine}
            <span className="mr-v2-ibp-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-ibp-hero-subtitle">
            {content.subtitleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
        </section>

        <section className="mr-v2-ibp-glass-card mr-v2-ibp-codes-card">
          <h2 className="mr-v2-ibp-section-title">{content.soulCodesTitle}</h2>
          <div className="mr-v2-ibp-code-list">
            {content.soulCodes.map((code) => (
              <article key={code.key} className="mr-v2-ibp-code-row">
                <div className={`mr-v2-ibp-code-orb mr-v2-ibp-code-orb--${code.key}`}>{code.code}</div>
                <div>
                  <div className="mr-v2-ibp-code-module">{code.moduleLabel}</div>
                  <div className="mr-v2-ibp-code-title">{code.title}</div>
                  <div className="mr-v2-ibp-code-desc">{code.shortLine}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="mr-v2-ibp-glass-card mr-v2-ibp-map-card mr-v2-ibp-map-card--has-bg"
        >
          <div
            className="mr-v2-ibp-map-card-bg"
            style={{
              backgroundImage: `url(${content.mapBackgroundUrl}), url(${content.mapBackgroundFallbackUrl})`,
            }}
            aria-hidden="true"
          />
          <div className="mr-v2-ibp-map-card-overlay" aria-hidden="true" />
          <h2 className="mr-v2-ibp-section-title mr-v2-ibp-map-card-title">{content.mapTitle}</h2>
          <div className="mr-v2-ibp-map-field">
            {content.soulCodes.map((code) => (
              <div key={code.key} className={`mr-v2-ibp-map-node mr-v2-ibp-map-node--${code.key}`}>
                <div className="mr-v2-ibp-node-orb">{code.mapLabel}</div>
                <div className="mr-v2-ibp-node-label">{code.moduleLabel}</div>
                <div className="mr-v2-ibp-node-copy">{content.mapCopy[code.key]}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mr-v2-ibp-glass-card mr-v2-ibp-work-card">
          <h2 className="mr-v2-ibp-section-title">{content.workTitle}</h2>
          <div className="mr-v2-ibp-work-list">
            {content.workItems.map((item) => (
              <article key={item.key} className="mr-v2-ibp-work-item">
                <div className={`mr-v2-ibp-work-badge mr-v2-ibp-work-badge--${item.key}`}>
                  {item.badge}
                </div>
                <div>
                  <div className="mr-v2-ibp-work-title">{item.title}</div>
                  <div className="mr-v2-ibp-work-copy">{item.copy}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-ibp-glass-card mr-v2-ibp-archetype-card">
          <h2 className="mr-v2-ibp-section-title">{content.archetypeTitle}</h2>
          <img
            className="mr-v2-ibp-archetype-logo"
            src={SOUL_CODE_ARCHETYPE_BLEND_LOGO_SRC}
            alt=""
            aria-hidden="true"
          />
          <div className="mr-v2-ibp-archetype-label">{content.archetypeLead}</div>
          <div className="mr-v2-ibp-archetype-name">{content.archetypeBlendTitle}</div>
          <p className="mr-v2-ibp-archetype-copy">{content.archetypeBlendCopy}</p>
        </section>

        <section className="mr-v2-ibp-glass-card mr-v2-ibp-synergy-card">
          <h2 className="mr-v2-ibp-section-title">{content.synergyTitle}</h2>
          <div className="mr-v2-ibp-synergy-list">
            {content.synergies.map((item) => (
              <article key={item.title} className="mr-v2-ibp-synergy-item">
                <div className="mr-v2-ibp-synergy-icon">
                  <SoulCodeLogoImage icon={item.icon} className="mr-v2-ibp-logo-img" />
                </div>
                <div>
                  <div className="mr-v2-ibp-synergy-title">{item.title}</div>
                  <div className="mr-v2-ibp-synergy-copy">{item.copy}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-ibp-glass-card mr-v2-ibp-flow-card">
          <h2 className="mr-v2-ibp-section-title">{content.flowTitle}</h2>
          <div className="mr-v2-ibp-flow-grid">
            {content.flowItems.map((item) => (
              <article key={item.title} className="mr-v2-ibp-flow-item">
                <div className="mr-v2-ibp-flow-icon">
                  <SoulCodeLogoImage icon={item.icon} className="mr-v2-ibp-logo-img" />
                </div>
                <div className="mr-v2-ibp-flow-step-title">{item.title}</div>
                <div className="mr-v2-ibp-flow-copy">{item.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-ibp-glass-card mr-v2-ibp-gifts-card">
          <h2 className="mr-v2-ibp-section-title">{content.giftsTitle}</h2>
          <ul className="mr-v2-ibp-gift-list">
            {content.gifts.map((gift) => (
              <li key={gift}>{gift}</li>
            ))}
          </ul>
        </section>

        <section className="mr-v2-ibp-glass-card mr-v2-ibp-guidance-card">
          <div className="mr-v2-ibp-guidance-grid">
            <div className="mr-v2-ibp-guidance-icon" aria-hidden="true">✺</div>
            <div>
              <h2 className="mr-v2-ibp-section-title mr-v2-ibp-section-title--left">
                {content.guidanceTitle}
              </h2>
              <p className="mr-v2-ibp-body-copy">{content.integrationGuidance}</p>
            </div>
          </div>
        </section>

        <section className="mr-v2-ibp-glass-card mr-v2-ibp-closing-card">
          <div className="mr-v2-ibp-closing-title">{content.closingTitle}</div>
          <div className="mr-v2-ibp-closing-copy">
            {content.closingLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
            <br />
            <br />
            <strong>{content.finalReminder}</strong>
          </div>
        </section>
      </section>
    </main>
  );
}
