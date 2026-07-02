import Image from "next/image";
import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { ReportGlyph } from "@/components/full-report-v2/report-glyph";
import { ReportPage } from "@/components/full-report-v2/report-page";
import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import { resolveS0PageContent } from "@/lib/full-report-v2/resolve-s0-page-content";
import { INTEGRATION_FOCUS_SECTION_TITLE } from "@/lib/full-report-v2/module-focus-display";
import {
  S0_CLOSING_LINE,
  S0_INTEGRATION_FOCUS,
  S0_PAGE_HERO,
  S0_SHADOW_INTRO,
} from "@/lib/full-report-v2/s0-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

const EXPRESSION_POSITIONS = [
  "fr-v2-s1-expression-node--top",
  "fr-v2-s1-expression-node--right-top",
  "fr-v2-s1-expression-node--right-bottom",
  "fr-v2-s1-expression-node--bottom",
  "fr-v2-s1-expression-node--left-bottom",
  "fr-v2-s1-expression-node--left-top",
] as const;

type Page07S0Props = {
  payload: FullReportV2Payload;
};

export function Page07S0({ payload }: Page07S0Props) {
  const content = resolveS0PageContent(payload);
  const cardImageUrl = getSignatureCardImageUrl("s0", payload.calculation);

  return (
    <ReportPage sectionId="page-07-s0" pageIndex={7} className="fr-v2-s1-page fr-v2-s0-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell fr-v2-s1-shell">
        <PageHeader pageIndex={7} />

        <section className="fr-v2-s1-hero">
          <h1 className="fr-v2-s1-hero-title">
            <span>{S0_PAGE_HERO.moduleLabel}</span> · {S0_PAGE_HERO.moduleName}
          </h1>
          <div className="fr-v2-s1-hero-subtitle">{S0_PAGE_HERO.subtitle}</div>
          <p className="fr-v2-s1-hero-description">{S0_PAGE_HERO.description}</p>
        </section>

        <section className="fr-v2-s1-main">
          <aside className="fr-v2-s1-left">
            <GlassPanel className="fr-v2-s1-code-panel fr-v2-s0-code-panel">
              <div className="fr-v2-s1-code-label">Your S0 Code</div>
              <div className="fr-v2-s1-code-orb fr-v2-s0-code-orb">
                <div className="fr-v2-s1-code-orb-art">
                  <SignatureSegmentCardIcon
                    size={46}
                    imageUrl={cardImageUrl}
                    code={content.code}
                    title={content.title}
                    fallbackIcon="0"
                  />
                </div>
                <div className="fr-v2-s1-code-main">{content.code}</div>
                <div className="fr-v2-s1-code-title">{content.title}</div>
              </div>
            </GlassPanel>

            <GlassPanel className="fr-v2-s1-text-panel">
              <div className="fr-v2-small-panel-title">The Essence of Your S0</div>
              <p className="fr-v2-s1-body-copy">{content.essenceBody}</p>
              {content.essenceSecondary ? (
                <p className="fr-v2-s1-body-copy">{content.essenceSecondary}</p>
              ) : null}
            </GlassPanel>

            <GlassPanel className="fr-v2-s1-text-panel">
              <div className="fr-v2-small-panel-title">Your Natural Strengths</div>
              <ul className="fr-v2-s1-star-list">
                {content.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassPanel>
          </aside>

          <GlassPanel className="fr-v2-s1-center-panel fr-v2-s0-center-panel">
            <div className="fr-v2-small-panel-title">The Highest Expression of Your S0</div>
            <div className="fr-v2-s1-expression-map fr-v2-s0-expression-map">
              <div className="fr-v2-s1-map-line-horizontal" />
              <div className="fr-v2-s1-map-line-diag-a" />
              <div className="fr-v2-s1-map-line-diag-b" />
              <div className="fr-v2-s1-center-seal fr-v2-s0-center-seal">
                {cardImageUrl ? (
                  <Image
                    src={cardImageUrl}
                    alt={`${content.code} — ${content.title}`}
                    width={108}
                    height={108}
                    className="fr-v2-s1-center-seal-img"
                    sizes="108px"
                  />
                ) : (
                  <span className="fr-v2-s0-zero" aria-hidden="true">0</span>
                )}
              </div>
              {content.expressionNodes.map((node, index) => (
                <div
                  key={`${node.copy}-${index}`}
                  className={[
                    "fr-v2-s1-expression-node",
                    EXPRESSION_POSITIONS[index % EXPRESSION_POSITIONS.length],
                  ].join(" ")}
                >
                  <div className="fr-v2-s1-expression-icon">
                    <ReportGlyph name={node.icon} />
                  </div>
                  <div className="fr-v2-s1-expression-copy">{node.copy}</div>
                </div>
              ))}
            </div>
          </GlassPanel>

          <aside className="fr-v2-s1-right">
            <GlassPanel className="fr-v2-s1-shadow-panel">
              <div className="fr-v2-small-panel-title">Shadow Side of {content.code}</div>
              <p className="fr-v2-s1-body-copy">{S0_SHADOW_INTRO}</p>
              <ul className="fr-v2-s1-star-list">
                {content.shadowPatterns.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-s1-remembrance-panel">
              <div className="fr-v2-small-panel-title">Your Soul Remembrance</div>
              <p className="fr-v2-s1-remembrance-text">
                {content.remembranceLines.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < content.remembranceLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            </GlassPanel>

            <GlassPanel className="fr-v2-s1-reflection-panel">
              <div className="fr-v2-small-panel-title">Reflection Prompt</div>
              <ul className="fr-v2-s1-reflection-list">
                {content.reflectionPrompts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassPanel>
          </aside>
        </section>

        <footer className="fr-v2-s1-bottom-band">
          <section className="fr-v2-s1-bottom-section">
            <div className="fr-v2-round-icon fr-v2-s0-zero-icon" aria-hidden="true">0</div>
            <div>
              <div className="fr-v2-s1-bottom-title">{INTEGRATION_FOCUS_SECTION_TITLE}</div>
              <div className="fr-v2-s1-bottom-copy">{content.influenceIntro}</div>
            </div>
          </section>

          <section>
            <ul className="fr-v2-s1-focus-list">
              {S0_INTEGRATION_FOCUS.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <div className="fr-v2-s1-focus-pill">{item.focus}</div>
                </li>
              ))}
            </ul>
          </section>

          <section className="fr-v2-s1-bottom-section">
            <div className="fr-v2-round-icon">
              <ReportGlyph name="compassStar" />
            </div>
            <div>
              <div className="fr-v2-s1-bottom-title">Key Insight</div>
              <div className="fr-v2-s1-key-insight">
                {content.keyInsight}
                <br />
                <strong>{content.keyInsightBold}</strong>
              </div>
            </div>
          </section>
        </footer>

        <div className="fr-v2-s1-closing-line">{S0_CLOSING_LINE}</div>
      </section>
    </ReportPage>
  );
}
