import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { getModuleCardImageUrl } from "@/lib/full-report-v2/module-card-images";
import { ReportGlyph } from "@/components/full-report-v2/report-glyph";
import { ReportPage } from "@/components/full-report-v2/report-page";
import { resolveS4PageContent } from "@/lib/full-report-v2/resolve-s4-page-content";
import {
  S4_CYCLE_ICONS,
  S4_CYCLE_NOTE,
  S4_CLOSING_LINE,
  S4_PAGE_HERO,
} from "@/lib/full-report-v2/s4-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type Page09S4Props = {
  payload: FullReportV2Payload;
};

const CYCLE_NODE_CLASSES = [
  "fr-v2-s4-cycle-node--1",
  "fr-v2-s4-cycle-node--2",
  "fr-v2-s4-cycle-node--3",
  "fr-v2-s4-cycle-node--4",
  "fr-v2-s4-cycle-node--5",
  "fr-v2-s4-cycle-node--6",
] as const;

export function Page09S4({ payload }: Page09S4Props) {
  const content = resolveS4PageContent(payload);
  const s4Slot = payload.modules.s4;
  const cardImageUrl =
    (typeof s4Slot.primary_icon_url === "string" ? s4Slot.primary_icon_url : undefined) ||
    getModuleCardImageUrl("s4", payload.calculation);

  return (
    <ReportPage sectionId="page-09-s4" pageIndex={9} className="fr-v2-s4-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell fr-v2-s4-shell">
        <PageHeader pageIndex={9} />

        <section className="fr-v2-s4-hero">
          <h1 className="fr-v2-s4-hero-title">
            <span>{S4_PAGE_HERO.pageNumber}</span>
            {S4_PAGE_HERO.moduleLabel} · {S4_PAGE_HERO.moduleName}
          </h1>
          <div className="fr-v2-s4-hero-subtitle">{content.hero.subtitle}</div>
          <p className="fr-v2-s4-hero-description">{content.hero.description}</p>
        </section>

        <section className="fr-v2-s4-main">
          <aside className="fr-v2-s4-left">
            <GlassPanel className="fr-v2-s4-code-panel">
              <div className="fr-v2-s4-code-label">Your S4 Code</div>
              <div className="fr-v2-s4-code-orb">
                <div className="fr-v2-s4-code-orb-icon">
                  <SignatureSegmentCardIcon
                    size={46}
                    imageUrl={cardImageUrl}
                    code={content.code}
                    title={content.title}
                    fallbackIcon="♙"
                  />
                </div>
                <div className="fr-v2-s4-code-main">{content.code}</div>
                <div className="fr-v2-s4-code-title">{content.title}</div>
              </div>
            </GlassPanel>

            <GlassPanel className="fr-v2-s4-text-panel">
              <div className="fr-v2-small-panel-title">The Essence of Your S4</div>
              {content.essenceParagraphs.map((paragraph) => (
                <p key={paragraph} className="fr-v2-s4-body-copy">{paragraph}</p>
              ))}
            </GlassPanel>

            <GlassPanel className="fr-v2-s4-shadow-list-panel">
              <div className="fr-v2-small-panel-title">How This Pattern Shows Up</div>
              <ul className="fr-v2-s4-bullet-list">
                {content.showsUp.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassPanel>
          </aside>

          <GlassPanel className="fr-v2-s4-cycle-panel">
            <div className="fr-v2-small-panel-title">The Cycle of Your Core Shadow Pattern</div>
            <div className="fr-v2-s1-expression-map fr-v2-s0-expression-map fr-v2-s4-cycle-map">
              <div className="fr-v2-s4-cycle-arrow" aria-hidden="true" />
              <div className="fr-v2-s4-shadow-center">
                <SignatureSegmentCardIcon
                  size={96}
                  imageUrl={cardImageUrl}
                  code={content.code}
                  title={content.title}
                  fallbackIcon="♙"
                />
              </div>
              {content.cycleSteps.map((step, index) => (
                <div
                  key={step.step}
                  className={`fr-v2-s4-cycle-node ${CYCLE_NODE_CLASSES[index] ?? ""}`}
                  tabIndex={0}
                >
                  <div className="fr-v2-s4-cycle-icon">{S4_CYCLE_ICONS[index] ?? "✦"}</div>
                  <div className="fr-v2-s4-cycle-step-title">
                    {step.step}. {step.title}
                  </div>
                  <div className="fr-v2-s4-cycle-copy" title={step.fullCopy}>
                    {step.copy}
                  </div>
                  {step.fullCopy ? (
                    <div className="fr-v2-s4-cycle-tooltip" role="tooltip">
                      <span className="fr-v2-s4-cycle-tooltip-title">
                        {step.step}. {step.title}
                      </span>
                      <span className="fr-v2-s4-cycle-tooltip-copy">{step.fullCopy}</span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="fr-v2-s4-cycle-note">{S4_CYCLE_NOTE}</div>
          </GlassPanel>

          <aside className="fr-v2-s4-right">
            <GlassPanel className="fr-v2-s4-root-belief">
              <div className="fr-v2-small-panel-title">The Root Belief Behind This Pattern</div>
              {content.rootBelief ? (
                <div className="fr-v2-s4-belief-quote">“{content.rootBelief}”</div>
              ) : null}
            </GlassPanel>

            <GlassPanel className="fr-v2-s4-gift-panel">
              <div className="fr-v2-small-panel-title">The Gift Hidden in Your Shadow</div>
              <p className="fr-v2-s4-body-copy">{content.hiddenGiftIntro}</p>
              <ul className="fr-v2-s4-gift-list">
                {content.hiddenGifts.map((gift) => (
                  <li key={gift}>{gift}</li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-s4-reflection-panel">
              <div className="fr-v2-small-panel-title">Reflection Prompts</div>
              <ul className="fr-v2-s4-reflection-list">
                {content.reflectionPrompts.map((prompt) => (
                  <li key={prompt}>{prompt}</li>
                ))}
              </ul>
            </GlassPanel>
          </aside>
        </section>

        <footer className="fr-v2-s4-bottom-band">
          <section className="fr-v2-s4-bottom-section">
            <div className="fr-v2-s4-bottom-icon">≋</div>
            <div>
              <div className="fr-v2-s4-bottom-title">{content.lifeInfluenceTitle}</div>
              <div className="fr-v2-s4-bottom-copy">{content.lifeInfluence}</div>
            </div>
          </section>

          <section className="fr-v2-s4-intensity-section">
            <div className="fr-v2-s4-bottom-title">{content.patternIntensityTitle}</div>
            <ul className="fr-v2-s4-intensity-list">
              {content.intensityMetrics.map((metric) => (
                <li key={metric.key}>
                  <span>{metric.label}</span>
                  <div className="fr-v2-s4-bar">
                    <span style={{ width: `${metric.percent}%` }} />
                  </div>
                  <span>{metric.percent}%</span>
                </li>
              ))}
            </ul>
            <div className="fr-v2-s4-metric-note">{content.patternIntensityNote}</div>
          </section>

          <section className="fr-v2-s4-bottom-section">
            <div className="fr-v2-s4-bottom-icon">
              <ReportGlyph name="compassStar" />
            </div>
            <div>
              <div className="fr-v2-s4-bottom-title">Key Insight</div>
              <div className="fr-v2-s4-key-insight">
                {content.keyInsight}
                <br />
                <strong>{content.finalRemembrance}</strong>
              </div>
            </div>
          </section>
        </footer>

        <div className="fr-v2-s4-closing-line">{S4_CLOSING_LINE}</div>
      </section>
    </ReportPage>
  );
}
