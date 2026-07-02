import Image from "next/image";
import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { ModuleNodeIcon } from "@/components/full-report-v2/module-node-icons";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { ReportGlyph } from "@/components/full-report-v2/report-glyph";
import { ReportPage } from "@/components/full-report-v2/report-page";
import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import { resolveS3PageContent } from "@/lib/full-report-v2/resolve-s3-page-content";
import { INTEGRATION_FOCUS_SECTION_TITLE } from "@/lib/full-report-v2/module-focus-display";
import {
  S3_CLOSING_LINE,
  S3_INTEGRATION_FOCUS,
  S3_PAGE_HERO,
} from "@/lib/full-report-v2/s3-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

const EXPRESSION_POSITIONS = [
  "fr-v2-s1-expression-node--top",
  "fr-v2-s1-expression-node--right-top",
  "fr-v2-s1-expression-node--right-bottom",
  "fr-v2-s1-expression-node--bottom",
  "fr-v2-s1-expression-node--left-bottom",
  "fr-v2-s1-expression-node--left-top",
] as const;

type Page05S3Props = {
  payload: FullReportV2Payload;
};

export function Page05S3({ payload }: Page05S3Props) {
  const content = resolveS3PageContent(payload);
  const cardImageUrl = getSignatureCardImageUrl("s3", payload.calculation);

  return (
    <ReportPage sectionId="page-05-s3" pageIndex={5} className="fr-v2-s1-page fr-v2-s3-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell fr-v2-s1-shell">
        <PageHeader pageIndex={5} />

        <section className="fr-v2-s1-hero">
          <h1 className="fr-v2-s1-hero-title">
            <span>{S3_PAGE_HERO.moduleLabel}</span> · {S3_PAGE_HERO.moduleName}
          </h1>
          <div className="fr-v2-s1-hero-subtitle">{S3_PAGE_HERO.subtitle}</div>
          <p className="fr-v2-s1-hero-description">{S3_PAGE_HERO.description}</p>
        </section>

        <section className="fr-v2-s1-main">
          <aside className="fr-v2-s1-left">
            <GlassPanel className="fr-v2-s1-code-panel">
              <div className="fr-v2-s1-code-label">Your S3 Code</div>
              <div className="fr-v2-s1-code-orb">
                <div className="fr-v2-s1-code-orb-art">
                  <SignatureSegmentCardIcon
                    size={46}
                    imageUrl={cardImageUrl}
                    code={content.code}
                    title={content.title}
                    fallbackIcon="♧"
                  />
                </div>
                <div className="fr-v2-s1-code-main">{content.code}</div>
                <div className="fr-v2-s1-code-title">{content.title}</div>
              </div>
            </GlassPanel>

            <GlassPanel className="fr-v2-s1-text-panel">
              <div className="fr-v2-small-panel-title">The Essence of Your S3</div>
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

          <GlassPanel className="fr-v2-s1-center-panel">
            <div className="fr-v2-small-panel-title">
              The Highest Expression of {content.code}
            </div>
            <div className="fr-v2-s1-expression-map">
              <div className="fr-v2-s1-map-line-horizontal" />
              <div className="fr-v2-s1-map-line-diag-a" />
              <div className="fr-v2-s1-map-line-diag-b" />
              <div className="fr-v2-s1-center-seal">
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
                  <ModuleNodeIcon id="s3" />
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
              <p className="fr-v2-s1-body-copy">When out of balance, you may:</p>
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
            <div className="fr-v2-round-icon">
              <ReportGlyph name="infinity" />
            </div>
            <div>
              <div className="fr-v2-s1-bottom-title">{INTEGRATION_FOCUS_SECTION_TITLE}</div>
              <div className="fr-v2-s1-bottom-copy">{content.influenceIntro}</div>
            </div>
          </section>

          <section>
            <ul className="fr-v2-s1-focus-list">
              {S3_INTEGRATION_FOCUS.map((item) => (
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
                {content.keyInsight ? <br /> : null}
                <strong>{content.keyInsightBold}</strong>
              </div>
            </div>
          </section>
        </footer>

        <div className="fr-v2-s1-closing-line">{S3_CLOSING_LINE}</div>
      </section>
    </ReportPage>
  );
}
