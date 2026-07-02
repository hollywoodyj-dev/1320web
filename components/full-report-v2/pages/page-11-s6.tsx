import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { ReportGlyph } from "@/components/full-report-v2/report-glyph";
import { ReportPage } from "@/components/full-report-v2/report-page";
import { S6PrimaryIcon } from "@/components/full-report-v2/s6-primary-icon";
import { resolveS6PageContent } from "@/lib/full-report-v2/resolve-s6-page-content";
import {
  S6_CLOSING_LINE,
  S6_RECEIVING_MAP_NOTE,
  S6_RECEIVING_PATTERN_MAP_TITLE,
} from "@/lib/full-report-v2/s6-page-static";
import { QUALITATIVE_MAP_PILL_TONES } from "@/lib/full-report-v2/advanced-module-display-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";
import Image from "next/image";

type Page11S6Props = {
  payload: FullReportV2Payload;
};

const MAP_NODE_CLASSES = {
  top: "fr-v2-s6-receiving-node--top",
  right: "fr-v2-s6-receiving-node--right",
  bottom: "fr-v2-s6-receiving-node--bottom",
  left: "fr-v2-s6-receiving-node--left",
} as const;

export function Page11S6({ payload }: Page11S6Props) {
  const content = resolveS6PageContent(payload);

  return (
    <ReportPage sectionId="page-11-s6" pageIndex={11} className="fr-v2-s6-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell fr-v2-s6-shell">
        <PageHeader pageIndex={11} />

        <section className="fr-v2-s6-hero">
          <h1 className="fr-v2-s6-hero-title">
            <span>{content.hero.pageNumber}</span>
            {content.hero.moduleLabel} · {content.hero.moduleName}
          </h1>
          <div className="fr-v2-s6-hero-subtitle">{content.hero.subtitle}</div>
          <p className="fr-v2-s6-hero-description">{content.hero.description}</p>
        </section>

        <section className="fr-v2-s6-main">
          <aside className="fr-v2-s6-left">
            <GlassPanel className="fr-v2-s6-code-panel">
              <div className="fr-v2-s6-code-label">Your S6 Code</div>
              <div className="fr-v2-s6-value-orb">
                <S6PrimaryIcon
                  imageUrl={content.primary_icon_url}
                  svgMarkup={content.primary_icon_svg}
                  alt={content.primary_icon_alt}
                  size={108}
                  className="fr-v2-s6-primary-icon"
                />
              </div>
              <div className="fr-v2-s6-code-main">{content.code}</div>
              <div className="fr-v2-s6-code-title">{content.title}</div>
            </GlassPanel>

            <GlassPanel className="fr-v2-s6-text-panel">
              <div className="fr-v2-small-panel-title">The Essence of Your S6</div>
              {content.essenceParagraphs.map((paragraph) => (
                <p key={paragraph} className="fr-v2-s6-body-copy">{paragraph}</p>
              ))}
            </GlassPanel>

            <GlassPanel className="fr-v2-s6-pattern-panel">
              <div className="fr-v2-small-panel-title">How Your Receiving Pattern Shows Up</div>
              <ul className="fr-v2-s6-bullet-list">
                {content.receivingShowsUp.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassPanel>
          </aside>

          <GlassPanel className="fr-v2-s6-receiving-panel">
            <div className="fr-v2-small-panel-title">Your Receiving Pattern Map</div>
            <div className="fr-v2-s1-expression-map fr-v2-s0-expression-map fr-v2-s6-receiving-map">
              <div className="fr-v2-s6-receiving-line-vertical" aria-hidden="true" />
              <div className="fr-v2-s6-receiving-line-horizontal" aria-hidden="true" />

              <div className="fr-v2-s6-receiving-center">
                <S6PrimaryIcon
                  imageUrl={content.primary_icon_url}
                  svgMarkup={content.primary_icon_svg}
                  alt={content.primary_icon_alt}
                  size={92}
                  className="fr-v2-s6-primary-icon"
                />
              </div>

              {(["top", "right", "bottom", "left"] as const).map((pos) => {
                const node = content.mapNodes[pos];
                return (
                  <div
                    key={pos}
                    className={`fr-v2-s6-receiving-node ${MAP_NODE_CLASSES[pos]}`}
                    tabIndex={0}
                  >
                    <div className="fr-v2-s6-receiving-node-icon">
                      <Image
                        src={node.iconUrl}
                        alt={node.iconAlt}
                        width={58}
                        height={58}
                        className="fr-v2-s6-receiving-node-icon-img"
                        sizes="58px"
                      />
                    </div>
                    <div className="fr-v2-s6-receiving-node-title">{node.title}</div>
                    <div className="fr-v2-s6-receiving-node-copy" title={node.fullCopy}>
                      {node.copy}
                    </div>
                    {node.fullCopy && node.fullCopy !== node.copy ? (
                      <div className="fr-v2-s6-receiving-tooltip" role="tooltip">
                        <span className="fr-v2-s6-receiving-tooltip-title">{node.title}</span>
                        <span className="fr-v2-s6-receiving-tooltip-copy">{node.fullCopy}</span>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="fr-v2-s6-receiving-note">{S6_RECEIVING_MAP_NOTE}</div>
          </GlassPanel>

          <aside className="fr-v2-s6-right">
            <GlassPanel className="fr-v2-s6-gift-panel">
              <div className="fr-v2-small-panel-title">Your Receiving Gifts</div>
              <ul className="fr-v2-s6-bullet-list">
                {content.gifts.map((gift) => (
                  <li key={gift}>{gift}</li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-s6-focus-panel">
              <div className="fr-v2-small-panel-title">{S6_RECEIVING_PATTERN_MAP_TITLE}</div>
              <ul className="fr-v2-s6-focus-list">
                {content.focusRows.map((row, index) => (
                  <li key={row.area}>
                    <span>{row.area}</span>
                    <div
                      className={`fr-v2-s6-focus-pill fr-v2-qualitative-pill-tone--${QUALITATIVE_MAP_PILL_TONES[index % QUALITATIVE_MAP_PILL_TONES.length]}`}
                    >
                      {row.label}
                    </div>
                  </li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-s6-guidance-panel">
              <div className="fr-v2-small-panel-title">Wisewave Guidance</div>
              <p className="fr-v2-s6-body-copy">{content.wisewaveGuidance}</p>
            </GlassPanel>

            <GlassPanel className="fr-v2-s6-reflection-panel">
              <div className="fr-v2-small-panel-title">Reflection Prompts</div>
              <ul className="fr-v2-s6-reflection-list">
                {content.reflectionPrompts.map((prompt) => (
                  <li key={prompt}>{prompt}</li>
                ))}
              </ul>
            </GlassPanel>
          </aside>
        </section>

        <footer className="fr-v2-s6-bottom-band">
          <section className="fr-v2-s6-bottom-section">
            <div className="fr-v2-s6-bottom-icon">◇</div>
            <div>
              <div className="fr-v2-s6-bottom-title">{content.lifeInfluenceTitle}</div>
              <div className="fr-v2-s6-bottom-copy">{content.lifeInfluence}</div>
            </div>
          </section>

          <section className="fr-v2-s6-bottom-section">
            <div className="fr-v2-s6-bottom-icon">⇄</div>
            <div>
              <div className="fr-v2-s6-bottom-title">{content.integrationTitle}</div>
              <div className="fr-v2-s6-bottom-copy">{content.integrationGuidance}</div>
            </div>
          </section>

          <section className="fr-v2-s6-bottom-section">
            <div className="fr-v2-s6-bottom-icon">
              <ReportGlyph name="compassStar" />
            </div>
            <div>
              <div className="fr-v2-s6-bottom-title">Key Insight</div>
              <div className="fr-v2-s6-key-insight">
                {content.keyInsight}
                <br />
                <strong>{content.finalRemembrance}</strong>
              </div>
            </div>
          </section>
        </footer>

        <div className="fr-v2-s6-closing-line">{S6_CLOSING_LINE}</div>
      </section>
    </ReportPage>
  );
}
