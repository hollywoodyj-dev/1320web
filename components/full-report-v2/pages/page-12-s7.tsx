import Image from "next/image";
import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { ReportGlyph } from "@/components/full-report-v2/report-glyph";
import { ReportPage } from "@/components/full-report-v2/report-page";
import { S7PrimaryIcon } from "@/components/full-report-v2/s7-primary-icon";
import { resolveS7PageContent } from "@/lib/full-report-v2/resolve-s7-page-content";
import {
  S7_CLOSING_LINE,
  S7_SOVEREIGNTY_ALIGNMENT_MAP_TITLE,
  S7_SOVEREIGNTY_MAP_NOTE,
} from "@/lib/full-report-v2/s7-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type Page12S7Props = {
  payload: FullReportV2Payload;
};

const MAP_NODE_CLASSES = {
  top: "fr-v2-s7-sovereignty-node--top",
  right: "fr-v2-s7-sovereignty-node--right",
  bottom: "fr-v2-s7-sovereignty-node--bottom",
  left: "fr-v2-s7-sovereignty-node--left",
} as const;

export function Page12S7({ payload }: Page12S7Props) {
  const content = resolveS7PageContent(payload);

  return (
    <ReportPage sectionId="page-12-s7" pageIndex={12} className="fr-v2-s7-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell fr-v2-s7-shell">
        <PageHeader pageIndex={12} />

        <section className="fr-v2-s7-hero">
          <h1 className="fr-v2-s7-hero-title">
            <span>{content.hero.pageNumber}</span>
            {content.hero.moduleLabel} · {content.hero.moduleName}
          </h1>
          <div className="fr-v2-s7-hero-subtitle">{content.hero.subtitle}</div>
          <p className="fr-v2-s7-hero-description">{content.hero.description}</p>
        </section>

        <section className="fr-v2-s7-main">
          <aside className="fr-v2-s7-left">
            <GlassPanel className="fr-v2-s7-code-panel">
              <div className="fr-v2-s7-code-label">Your S7 Code</div>
              <div className="fr-v2-s7-sovereignty-orb">
                <S7PrimaryIcon
                  imageUrl={content.primary_icon_url}
                  svgMarkup={content.primary_icon_svg}
                  alt={content.primary_icon_alt}
                  size={108}
                  className="fr-v2-s7-primary-icon"
                />
              </div>
              <div className="fr-v2-s7-code-main">{content.code}</div>
              <div className="fr-v2-s7-code-title">{content.title}</div>
            </GlassPanel>

            <GlassPanel className="fr-v2-s7-text-panel">
              <div className="fr-v2-small-panel-title">The Essence of Your S7</div>
              {content.essenceParagraphs.map((paragraph) => (
                <p key={paragraph} className="fr-v2-s7-body-copy">{paragraph}</p>
              ))}
            </GlassPanel>

            <GlassPanel className="fr-v2-s7-pattern-panel">
              <div className="fr-v2-small-panel-title">How Your Sovereignty Pattern Shows Up</div>
              <ul className="fr-v2-s7-bullet-list">
                {content.sovereigntyShowsUp.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassPanel>
          </aside>

          <GlassPanel className="fr-v2-s7-sovereignty-panel">
            <div className="fr-v2-small-panel-title">Your Sovereignty Alignment Map</div>
            <div className="fr-v2-s1-expression-map fr-v2-s0-expression-map fr-v2-s7-sovereignty-map">
              <div className="fr-v2-s7-sovereignty-line-vertical" aria-hidden="true" />
              <div className="fr-v2-s7-sovereignty-line-horizontal" aria-hidden="true" />

              <div className="fr-v2-s7-sovereignty-center">
                <S7PrimaryIcon
                  imageUrl={content.primary_icon_url}
                  svgMarkup={content.primary_icon_svg}
                  alt={content.primary_icon_alt}
                  size={92}
                  className="fr-v2-s7-primary-icon"
                />
              </div>

              {(["top", "right", "bottom", "left"] as const).map((pos) => {
                const node = content.mapNodes[pos];
                return (
                  <div
                    key={pos}
                    className={`fr-v2-s7-sovereignty-node ${MAP_NODE_CLASSES[pos]}`}
                    tabIndex={0}
                  >
                    <div className="fr-v2-s7-sovereignty-node-icon">
                      <Image
                        src={node.iconUrl}
                        alt={node.iconAlt}
                        width={58}
                        height={58}
                        className="fr-v2-s7-sovereignty-node-icon-img"
                        sizes="58px"
                      />
                    </div>
                    <div className="fr-v2-s7-sovereignty-node-title">{node.title}</div>
                    <div className="fr-v2-s7-sovereignty-node-copy" title={node.fullCopy}>
                      {node.copy}
                    </div>
                    {node.fullCopy && node.fullCopy !== node.copy ? (
                      <div className="fr-v2-s7-sovereignty-tooltip" role="tooltip">
                        <span className="fr-v2-s7-sovereignty-tooltip-title">{node.title}</span>
                        <span className="fr-v2-s7-sovereignty-tooltip-copy">{node.fullCopy}</span>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="fr-v2-s7-sovereignty-note">{S7_SOVEREIGNTY_MAP_NOTE}</div>
          </GlassPanel>

          <aside className="fr-v2-s7-right">
            <GlassPanel className="fr-v2-s7-gift-panel">
              <div className="fr-v2-small-panel-title">Your Sovereignty Gifts</div>
              <ul className="fr-v2-s7-bullet-list">
                {content.gifts.map((gift) => (
                  <li key={gift}>{gift}</li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-s7-alignment-panel">
              <div className="fr-v2-small-panel-title">{S7_SOVEREIGNTY_ALIGNMENT_MAP_TITLE}</div>
              <ul className="fr-v2-s7-focus-list">
                {content.focusRows.map((row) => (
                  <li key={row.area}>
                    <span>{row.area}</span>
                    <div
                      className={`fr-v2-s7-focus-pill fr-v2-qualitative-pill-tone--${row.tone}`}
                    >
                      {row.label}
                    </div>
                  </li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-s7-guidance-panel">
              <div className="fr-v2-small-panel-title">Wisewave Guidance</div>
              <p className="fr-v2-s7-body-copy">{content.wisewaveGuidance}</p>
            </GlassPanel>

            <GlassPanel className="fr-v2-s7-reflection-panel">
              <div className="fr-v2-small-panel-title">Reflection Prompts</div>
              <ul className="fr-v2-s7-reflection-list">
                {content.reflectionPrompts.map((prompt) => (
                  <li key={prompt}>{prompt}</li>
                ))}
              </ul>
            </GlassPanel>
          </aside>
        </section>

        <footer className="fr-v2-s7-bottom-band">
          <section className="fr-v2-s7-bottom-section">
            <div className="fr-v2-s7-bottom-icon">✶</div>
            <div>
              <div className="fr-v2-s7-bottom-title">{content.lifeInfluenceTitle}</div>
              <div className="fr-v2-s7-bottom-copy">{content.lifeInfluence}</div>
            </div>
          </section>

          <section className="fr-v2-s7-bottom-section">
            <div className="fr-v2-s7-bottom-icon">♡</div>
            <div>
              <div className="fr-v2-s7-bottom-title">{content.integrationTitle}</div>
              <div className="fr-v2-s7-bottom-copy">{content.integrationGuidance}</div>
            </div>
          </section>

          <section className="fr-v2-s7-bottom-section">
            <div className="fr-v2-s7-bottom-icon">
              <ReportGlyph name="compassStar" />
            </div>
            <div>
              <div className="fr-v2-s7-bottom-title">Key Insight</div>
              <div className="fr-v2-s7-key-insight">
                {content.keyInsight}
                <br />
                <strong>{content.finalRemembrance}</strong>
              </div>
            </div>
          </section>
        </footer>

        <div className="fr-v2-s7-closing-line">{S7_CLOSING_LINE}</div>
      </section>
    </ReportPage>
  );
}
