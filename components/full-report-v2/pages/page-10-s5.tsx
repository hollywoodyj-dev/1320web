import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { ReportGlyph } from "@/components/full-report-v2/report-glyph";
import { ReportPage } from "@/components/full-report-v2/report-page";
import { S5PrimaryIcon } from "@/components/full-report-v2/s5-primary-icon";
import { resolveS5PageContent } from "@/lib/full-report-v2/resolve-s5-page-content";
import {
  S5_ACTIVATION_MAP_TITLE,
  S5_CLOSING_LINE,
  S5_MISSION_MAP_NOTE,
} from "@/lib/full-report-v2/s5-page-static";
import { QUALITATIVE_MAP_PILL_TONES } from "@/lib/full-report-v2/advanced-module-display-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";
import Image from "next/image";

type Page10S5Props = {
  payload: FullReportV2Payload;
};

const MAP_NODE_CLASSES = {
  top: "fr-v2-s5-mission-node--top",
  right: "fr-v2-s5-mission-node--right",
  bottom: "fr-v2-s5-mission-node--bottom",
  left: "fr-v2-s5-mission-node--left",
} as const;

export function Page10S5({ payload }: Page10S5Props) {
  const content = resolveS5PageContent(payload);

  return (
    <ReportPage sectionId="page-10-s5" pageIndex={10} className="fr-v2-s5-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell fr-v2-s5-shell">
        <PageHeader pageIndex={10} />

        <section className="fr-v2-s5-hero">
          <h1 className="fr-v2-s5-hero-title">
            <span>{content.hero.pageNumber}</span>
            {content.hero.moduleLabel} · {content.hero.moduleName}
          </h1>
          <div className="fr-v2-s5-hero-subtitle">{content.hero.subtitle}</div>
          <p className="fr-v2-s5-hero-description">{content.hero.description}</p>
        </section>

        <section className="fr-v2-s5-main">
          <aside className="fr-v2-s5-left">
            <GlassPanel className="fr-v2-s5-code-panel">
              <div className="fr-v2-s5-code-label">Your S5 Code</div>
              <div className="fr-v2-s5-mission-icon-orb">
                <S5PrimaryIcon
                  imageUrl={content.primary_icon_url}
                  svgMarkup={content.primary_icon_svg}
                  alt={content.primary_icon_alt}
                  size={110}
                  className="fr-v2-s5-primary-icon"
                />
              </div>
              <div className="fr-v2-s5-code-main">{content.code}</div>
              <div className="fr-v2-s5-code-title">{content.title}</div>
            </GlassPanel>

            <GlassPanel className="fr-v2-s5-text-panel">
              <div className="fr-v2-small-panel-title">The Essence of Your S5</div>
              {content.essenceParagraphs.map((paragraph) => (
                <p key={paragraph} className="fr-v2-s5-body-copy">{paragraph}</p>
              ))}
            </GlassPanel>

            <GlassPanel className="fr-v2-s5-path-panel">
              <div className="fr-v2-small-panel-title">How Your Mission Shows Up</div>
              <ul className="fr-v2-s5-bullet-list">
                {content.missionShowsUp.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassPanel>
          </aside>

          <GlassPanel className="fr-v2-s5-mission-panel">
            <div className="fr-v2-small-panel-title">Your Soul Mission Map</div>
            <div className="fr-v2-s1-expression-map fr-v2-s0-expression-map fr-v2-s5-mission-map">
              <div className="fr-v2-s5-mission-line-vertical" aria-hidden="true" />
              <div className="fr-v2-s5-mission-line-horizontal" aria-hidden="true" />

              <div className="fr-v2-s5-mission-center">
                <S5PrimaryIcon
                  imageUrl={content.primary_icon_url}
                  svgMarkup={content.primary_icon_svg}
                  alt={content.primary_icon_alt}
                  size={92}
                  className="fr-v2-s5-primary-icon"
                />
              </div>

              {(["top", "right", "bottom", "left"] as const).map((pos) => {
                const node = content.mapNodes[pos];
                return (
                  <div
                    key={pos}
                    className={`fr-v2-s5-mission-node ${MAP_NODE_CLASSES[pos]}`}
                    tabIndex={0}
                  >
                    <div className="fr-v2-s5-mission-node-icon">
                      <Image
                        src={node.iconUrl}
                        alt={node.iconAlt}
                        width={48}
                        height={48}
                        className="fr-v2-s5-mission-node-icon-img"
                        sizes="48px"
                      />
                    </div>
                    <div className="fr-v2-s5-mission-node-title">{node.title}</div>
                    <div className="fr-v2-s5-mission-node-copy" title={node.fullCopy}>
                      {node.copy}
                    </div>
                    {node.fullCopy && node.fullCopy !== node.copy ? (
                      <div className="fr-v2-s5-mission-tooltip" role="tooltip">
                        <span className="fr-v2-s5-mission-tooltip-title">{node.title}</span>
                        <span className="fr-v2-s5-mission-tooltip-copy">{node.fullCopy}</span>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="fr-v2-s5-mission-note">{S5_MISSION_MAP_NOTE}</div>
          </GlassPanel>

          <aside className="fr-v2-s5-right">
            <GlassPanel className="fr-v2-s5-gift-panel">
              <div className="fr-v2-small-panel-title">Your Mission Gifts</div>
              <ul className="fr-v2-s5-bullet-list">
                {content.gifts.map((gift) => (
                  <li key={gift}>{gift}</li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-s5-activation-panel">
              <div className="fr-v2-small-panel-title">{S5_ACTIVATION_MAP_TITLE}</div>
              <ul className="fr-v2-s5-focus-list">
                {content.activationRows.map((row, index) => (
                  <li key={row.area}>
                    <span>{row.area}</span>
                    <div
                      className={`fr-v2-s5-focus-pill fr-v2-qualitative-pill-tone--${QUALITATIVE_MAP_PILL_TONES[index % QUALITATIVE_MAP_PILL_TONES.length]}`}
                    >
                      {row.label}
                    </div>
                  </li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-s5-guidance-panel">
              <div className="fr-v2-small-panel-title">Wisewave Guidance</div>
              <p className="fr-v2-s5-body-copy">{content.wisewaveGuidance}</p>
            </GlassPanel>

            <GlassPanel className="fr-v2-s5-reflection-panel">
              <div className="fr-v2-small-panel-title">Reflection Prompts</div>
              <ul className="fr-v2-s5-reflection-list">
                {content.reflectionPrompts.map((prompt) => (
                  <li key={prompt}>{prompt}</li>
                ))}
              </ul>
            </GlassPanel>
          </aside>
        </section>

        <footer className="fr-v2-s5-bottom-band">
          <section className="fr-v2-s5-bottom-section">
            <div className="fr-v2-s5-bottom-icon">✶</div>
            <div>
              <div className="fr-v2-s5-bottom-title">{content.lifeInfluenceTitle}</div>
              <div className="fr-v2-s5-bottom-copy">{content.lifeInfluence}</div>
            </div>
          </section>

          <section className="fr-v2-s5-bottom-section">
            <div className="fr-v2-s5-bottom-icon">☉</div>
            <div>
              <div className="fr-v2-s5-bottom-title">{content.integrationTitle}</div>
              <div className="fr-v2-s5-bottom-copy">{content.integrationGuidance}</div>
            </div>
          </section>

          <section className="fr-v2-s5-bottom-section">
            <div className="fr-v2-s5-bottom-icon">
              <ReportGlyph name="compassStar" />
            </div>
            <div>
              <div className="fr-v2-s5-bottom-title">Key Insight</div>
              <div className="fr-v2-s5-key-insight">
                {content.keyInsight}
                <br />
                <strong>{content.finalRemembrance}</strong>
              </div>
            </div>
          </section>
        </footer>

        <div className="fr-v2-s5-closing-line">{S5_CLOSING_LINE}</div>
      </section>
    </ReportPage>
  );
}
