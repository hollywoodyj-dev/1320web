import Image from "next/image";
import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { ReportGlyph } from "@/components/full-report-v2/report-glyph";
import { ReportPage } from "@/components/full-report-v2/report-page";
import { CLOSING_REFLECTION_LINE_COUNT } from "@/lib/full-report-v2/closing-page-static";
import { resolveClosingPageContent } from "@/lib/full-report-v2/resolve-closing-page-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type Page17ClosingProps = {
  payload: FullReportV2Payload;
};

function ClosingReflectionLines({ count }: { count: number }) {
  return (
    <div className="fr-v2-closing-reflection-lines" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="fr-v2-closing-reflection-line" />
      ))}
    </div>
  );
}

export function Page17Closing({ payload }: Page17ClosingProps) {
  const content = resolveClosingPageContent(payload);

  return (
    <ReportPage sectionId="page-17-closing" pageIndex={17} className="fr-v2-closing-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell fr-v2-closing-shell">
        <PageHeader pageIndex={17} />

        <section className="fr-v2-closing-hero">
          <h1 className="fr-v2-closing-hero-title">
            <span>{content.hero.pageNumber}</span>
            {content.hero.title}
          </h1>
          <div className="fr-v2-closing-hero-subtitle">{content.hero.subtitle}</div>
          <p className="fr-v2-closing-hero-description">{content.hero.description}</p>
        </section>

        <section className="fr-v2-closing-main">
          <aside className="fr-v2-closing-left-stack">
            <GlassPanel className="fr-v2-closing-side-panel">
              <div className="fr-v2-closing-icon-row">
                <div className="fr-v2-closing-side-icon" aria-hidden="true">✺</div>
                <div>
                  <div className="fr-v2-small-panel-title">{content.shownTitle}</div>
                  {content.shownCopy.map((paragraph) => (
                    <p key={paragraph} className="fr-v2-closing-body-copy">{paragraph}</p>
                  ))}
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="fr-v2-closing-side-panel">
              <div className="fr-v2-closing-icon-row">
                <div className="fr-v2-closing-side-icon" aria-hidden="true">♡</div>
                <div>
                  <div className="fr-v2-small-panel-title">{content.rememberTitle}</div>
                  <ul className="fr-v2-closing-star-list">
                    {content.rememberItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="fr-v2-closing-side-panel fr-v2-closing-side-panel--compact">
              <div className="fr-v2-closing-icon-row">
                <div className="fr-v2-closing-side-icon" aria-hidden="true">☉</div>
                <div>
                  <div className="fr-v2-small-panel-title">{content.beforeForwardTitle}</div>
                  <p className="fr-v2-closing-body-copy">{content.beforeForwardCopy}</p>
                </div>
              </div>
            </GlassPanel>
          </aside>

          <GlassPanel className="fr-v2-closing-center-panel">
            <div className="fr-v2-small-panel-title">{content.sealTitle}</div>
            <div className="fr-v2-closing-seal-area">
              {content.sealNodes.map((node) => (
                <div
                  key={node.position}
                  className={`fr-v2-closing-node fr-v2-closing-node--${node.position}`}
                >
                  <div className="fr-v2-closing-node-icon">
                    <Image
                      src={node.iconUrl}
                      alt={node.iconAlt}
                      width={48}
                      height={48}
                      className="fr-v2-closing-node-icon-img"
                      sizes="48px"
                    />
                  </div>
                  <div className="fr-v2-closing-node-title">{node.title}</div>
                  <div className="fr-v2-closing-node-copy">{node.copy}</div>
                </div>
              ))}
            </div>
            <div className="fr-v2-closing-statement">
              {content.statementLines.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </div>
          </GlassPanel>

          <aside className="fr-v2-closing-right-stack">
            <GlassPanel className="fr-v2-closing-blessing-panel">
              <div className="fr-v2-closing-blessing-icon" aria-hidden="true">✦</div>
              <div className="fr-v2-small-panel-title">{content.blessingTitle}</div>
              <p className="fr-v2-closing-affirmation">
                {content.blessingLines.map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>
            </GlassPanel>

            <GlassPanel className="fr-v2-closing-side-panel fr-v2-closing-reflection-panel">
              <div className="fr-v2-closing-icon-row fr-v2-closing-icon-row--compact fr-v2-closing-reflection-row">
                <div className="fr-v2-closing-side-icon fr-v2-closing-side-icon--glyph">
                  <ReportGlyph name="feather" />
                </div>
                <div className="fr-v2-closing-reflection-body">
                  <div className="fr-v2-small-panel-title">{content.finalReflectionTitle}</div>
                  <p className="fr-v2-closing-body-copy">{content.finalReflectionPrompt}</p>
                  <ClosingReflectionLines count={CLOSING_REFLECTION_LINE_COUNT} />
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="fr-v2-closing-side-panel fr-v2-closing-side-panel--compact">
              <div className="fr-v2-closing-icon-row">
                <div className="fr-v2-closing-side-icon fr-v2-closing-side-icon--glyph">
                  <ReportGlyph name="compassStar" />
                </div>
                <div>
                  <div className="fr-v2-small-panel-title">{content.nextStepTitle}</div>
                  <p className="fr-v2-closing-body-copy">{content.nextStep}</p>
                </div>
              </div>
            </GlassPanel>
          </aside>
        </section>

        <footer className="fr-v2-closing-bottom-band">
          <section className="fr-v2-closing-bottom-section">
            <div className="fr-v2-closing-bottom-icon" aria-hidden="true">☽</div>
            <div>
              <div className="fr-v2-closing-bottom-title">{content.gentleIntegrationTitle}</div>
              <div className="fr-v2-closing-bottom-copy">{content.gentleIntegrationCopy}</div>
            </div>
          </section>

          <section className="fr-v2-closing-bottom-section">
            <div className="fr-v2-closing-bottom-icon" aria-hidden="true">✺</div>
            <div>
              <div className="fr-v2-closing-bottom-title">{content.livingBlueprintTitle}</div>
              <div className="fr-v2-closing-bottom-copy">{content.livingBlueprintCopy}</div>
            </div>
          </section>

          <section className="fr-v2-closing-bottom-section">
            <div className="fr-v2-closing-bottom-icon" aria-hidden="true">✦</div>
            <div>
              <div className="fr-v2-closing-bottom-title">{content.closingInsightTitle}</div>
              <div className="fr-v2-closing-key-insight">
                {content.closingInsightLead}
                <br />
                <strong>{content.closingInsight}</strong>
              </div>
            </div>
          </section>
        </footer>

        <div className="fr-v2-closing-footer-mantra">
          {content.footerMantra.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </section>
    </ReportPage>
  );
}
