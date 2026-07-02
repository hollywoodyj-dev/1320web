import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS4ShadowLoopGrowthEdgeContent } from "@/lib/mobile-report-v2/resolve-mobile-s4-shadow-loop-growth-edge-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage17S4ShadowLoopGrowthEdgeProps = {
  payload: FullReportV2Payload;
};

const LOOP_NODE_POSITION_CLASS: Record<string, string> = {
  trigger: "mr-v2-s4lg-loop-node--one",
  reaction: "mr-v2-s4lg-loop-node--two",
  pattern: "mr-v2-s4lg-loop-node--three",
  cost: "mr-v2-s4lg-loop-node--four",
};

export function MobilePage17S4ShadowLoopGrowthEdge({
  payload,
}: MobilePage17S4ShadowLoopGrowthEdgeProps) {
  const content = resolveMobileS4ShadowLoopGrowthEdgeContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--s4-shadow-loop-growth-edge"
      id="mobile-page-17-s4-shadow-loop-growth-edge"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s4lg-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s4lg-hero">
          <div className="mr-v2-page-kicker mr-v2-s4lg-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s4lg-hero-title">
            {content.titleLine}
            <span className="mr-v2-s4lg-hero-title-violet">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s4lg-hero-subtitle">{content.subtitle}</p>
        </section>

        <section className="mr-v2-s4lg-glass-card mr-v2-s4lg-summary-card mr-v2-s4lg-summary-card--has-bg">
          <div
            className="mr-v2-s4lg-summary-card-bg"
            style={{ backgroundImage: `url(${content.summaryBackgroundUrl})` }}
            aria-hidden="true"
          />
          <div className="mr-v2-s4lg-summary-inner">
            <div className="mr-v2-s4lg-summary-orb">
              <SignatureSegmentCardIcon
                imageUrl={content.imageUrl}
                code={content.code}
                title={content.title}
                fallbackIcon={content.fallbackIcon}
                size={88}
              />
            </div>
            <div>
              <div className="mr-v2-s4lg-code-label">{content.codeLabel}</div>
              <div className="mr-v2-s4lg-code-main">{content.code}</div>
              <div className="mr-v2-s4lg-code-title">{content.title}</div>
            </div>
          </div>
        </section>

        <section className="mr-v2-s4lg-glass-card mr-v2-s4lg-loop-card">
          <h2 className="mr-v2-s4lg-section-title mr-v2-s4lg-section-title--violet mr-v2-s4lg-section-title--center">
            {content.loopTitle}
          </h2>

          <div className="mr-v2-s4lg-loop-visual" aria-hidden="true">
            <div
              className="mr-v2-s4lg-loop-visual-bg"
              style={{
                backgroundImage: `url(${content.loopBackgroundUrl}), url(${content.loopBackgroundFallbackUrl})`,
              }}
            />
            <div className="mr-v2-s4lg-loop-visual-overlay" />
            {content.loopNodes.map((node) => (
              <div
                key={node.key}
                className={[
                  "mr-v2-s4lg-loop-node",
                  LOOP_NODE_POSITION_CLASS[node.key] ?? "",
                ].join(" ")}
              >
                <span>{node.stepLabel}</span>
                {node.label}
              </div>
            ))}
          </div>

          <p className="mr-v2-s4lg-loop-summary">{content.shadowLoopSummary}</p>

          <ul className="mr-v2-s4lg-loop-list">
            {content.shadowLoopPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="mr-v2-s4lg-glass-card mr-v2-s4lg-growth-card">
          <div className="mr-v2-s4lg-growth-header">
            <div className="mr-v2-s4lg-growth-icon" aria-hidden="true">{content.growthIcon}</div>
            <div>
              <div className="mr-v2-s4lg-growth-title">{content.growthTitle}</div>
              <div className="mr-v2-s4lg-growth-subtitle">{content.growthSubtitle}</div>
            </div>
          </div>

          <ul className="mr-v2-s4lg-growth-list">
            {content.growthEdges.map((item) => (
              <li key={item.number}>
                <div className="mr-v2-s4lg-growth-number">{item.number}</div>
                <div className="mr-v2-s4lg-growth-copy">
                  <strong>{item.label}</strong> {item.copy}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mr-v2-s4lg-two-card-grid">
          <article className="mr-v2-s4lg-glass-card mr-v2-s4lg-mini-card mr-v2-s4lg-mini-card--violet">
            <div className="mr-v2-s4lg-mini-header">
              <div className="mr-v2-s4lg-mini-icon" aria-hidden="true">{content.triggersIcon}</div>
              <div className="mr-v2-s4lg-section-title mr-v2-s4lg-section-title--violet">
                {content.triggersTitle}
              </div>
            </div>
            <ul className="mr-v2-s4lg-key-list mr-v2-s4lg-key-list--violet">
              {content.triggers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="mr-v2-s4lg-glass-card mr-v2-s4lg-mini-card">
            <div className="mr-v2-s4lg-mini-header">
              <div className="mr-v2-s4lg-mini-icon" aria-hidden="true">{content.healthyIcon}</div>
              <div className="mr-v2-s4lg-section-title">{content.healthyTitle}</div>
            </div>
            <ul className="mr-v2-s4lg-key-list">
              {content.healthyExpressions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mr-v2-s4lg-glass-card mr-v2-s4lg-reframe-card">
          <div className="mr-v2-s4lg-reframe-icon">
            <img
              className="mr-v2-s4lg-reframe-logo"
              src={content.reframeLogoUrl}
              alt=""
              aria-hidden="true"
            />
          </div>
          <div className="mr-v2-s4lg-reframe-title">{content.reframeTitle}</div>
          <p className="mr-v2-s4lg-reframe-copy">“{content.empoweringReframe}”</p>
        </section>

        <section className="mr-v2-s4lg-glass-card mr-v2-s4lg-practice-card">
          <div className="mr-v2-s4lg-practice-icon">
            <img
              className="mr-v2-s4lg-practice-logo"
              src={content.practiceLogoUrl}
              alt=""
              aria-hidden="true"
            />
          </div>
          <div>
            <div className="mr-v2-s4lg-practice-title">{content.practiceTitle}</div>
            <div className="mr-v2-s4lg-practice-copy">{content.practiceToday}</div>
          </div>
        </section>

        <footer className="mr-v2-s4lg-bottom-mantra">
          <div className="mr-v2-s4lg-bottom-mantra-divider-row" aria-hidden="true">
            <span className="mr-v2-s4lg-bottom-mantra-line" />
            <img
              className="mr-v2-s4lg-bottom-mantra-logo"
              src={content.footerLotusLogoUrl}
              alt=""
            />
            <span className="mr-v2-s4lg-bottom-mantra-line mr-v2-s4lg-bottom-mantra-line--reverse" />
          </div>
          <p className="mr-v2-s4lg-bottom-mantra-copy">
            <span>{content.mantraLeft}</span>
            <span className="mr-v2-s4lg-bottom-mantra-star">{content.mantraCenter}</span>
            <span>{content.mantraRight}</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
