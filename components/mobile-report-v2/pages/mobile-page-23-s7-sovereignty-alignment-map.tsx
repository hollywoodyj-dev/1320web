import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS7SovereigntyAlignmentMapContent } from "@/lib/mobile-report-v2/resolve-mobile-s7-sovereignty-alignment-map-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage23S7SovereigntyAlignmentMapProps = {
  payload: FullReportV2Payload;
};

export function MobilePage23S7SovereigntyAlignmentMap({ payload }: MobilePage23S7SovereigntyAlignmentMapProps) {
  const content = resolveMobileS7SovereigntyAlignmentMapContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--s7-sovereignty-alignment-map"
      id="mobile-page-23-s7-sovereignty-alignment-map"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s7sam-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s7sam-hero">
          <div className="mr-v2-page-kicker mr-v2-s7sam-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s7sam-hero-title">
            {content.titleLine}
            <span className="mr-v2-s7sam-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s7sam-hero-subtitle">{content.subtitle}</p>
        </section>

        <section className="mr-v2-s7sam-glass-card mr-v2-s7sam-intro-card">
          <div className="mr-v2-s7sam-intro-symbol">
            <div className="mr-v2-s7sr-orb mr-v2-s7sam-intro-orb">
              <SignatureSegmentCardIcon
                imageUrl={content.imageUrl}
                code={content.code}
                title={content.title}
                fallbackIcon={content.introFallbackIcon}
                size={72}
              />
            </div>
          </div>
          <p className="mr-v2-s7sam-intro-copy">{content.introCopy}</p>
        </section>

        <section className="mr-v2-s7sam-glass-card mr-v2-s7sam-alignment-card">
          <h2 className="mr-v2-s7sam-section-title mr-v2-s7sam-section-title--center mr-v2-s7sam-section-title--violet">
            {content.gridTitle}
          </h2>
          <div className="mr-v2-s7sam-alignment-grid">
            {content.alignmentItems.map((item) => (
              <article key={item.key} className="mr-v2-s7sam-alignment-item">
                <div className="mr-v2-s7sam-alignment-icon" aria-hidden="true">{item.icon}</div>
                <div className="mr-v2-s7sam-alignment-title">{item.title}</div>
                <div className="mr-v2-s7sam-alignment-state">{item.state}</div>
                <div className="mr-v2-s7sam-alignment-copy">{item.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s7sam-glass-card mr-v2-s7sam-key-insight-card">
          <div className="mr-v2-s7sam-key-icon" aria-hidden="true">{content.keyInsightIcon}</div>
          <div>
            <div className="mr-v2-s7sam-key-title">{content.keyInsightTitle}</div>
            <p className="mr-v2-s7sam-key-copy">
              {content.keyInsightEmphasis ? (
                <>
                  {content.keyInsightBefore}
                  <strong>{content.keyInsightEmphasis}</strong>
                  {content.keyInsightAfter}
                </>
              ) : (
                content.keyInsightBefore
              )}
            </p>
          </div>
        </section>

        <footer className="mr-v2-s7sam-bottom-mantra">
          <div className="mr-v2-s7sam-bottom-mantra-divider-row" aria-hidden="true">
            <span className="mr-v2-s7sam-bottom-mantra-line" />
            <img
              className="mr-v2-s7sam-bottom-mantra-logo"
              src={content.footerLotusLogoUrl}
              alt=""
            />
            <span className="mr-v2-s7sam-bottom-mantra-line mr-v2-s7sam-bottom-mantra-line--reverse" />
          </div>
          <p className="mr-v2-s7sam-bottom-mantra-copy">
            <span>{content.mantraLeft}</span>
            <span className="mr-v2-s7sam-bottom-mantra-star">{content.mantraCenter}</span>
            <span>{content.mantraRight}</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
