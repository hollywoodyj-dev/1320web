import Image from "next/image";
import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { ReportGlyph } from "@/components/full-report-v2/report-glyph";
import { ReportPage } from "@/components/full-report-v2/report-page";
import { S8PrimaryIcon } from "@/components/full-report-v2/s8-primary-icon";
import { resolveS8PageContent } from "@/lib/full-report-v2/resolve-s8-page-content";
import {
  S8_CLOSING_LINE,
  S8_CONTRIBUTION_ALIGNMENT_MAP_TITLE,
  S8_CONTRIBUTION_MAP_NOTE,
} from "@/lib/full-report-v2/s8-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type Page13S8Props = {
  payload: FullReportV2Payload;
};

const MAP_NODE_CLASSES = {
  top: "fr-v2-s8-contribution-node--top",
  right: "fr-v2-s8-contribution-node--right",
  bottom: "fr-v2-s8-contribution-node--bottom",
  left: "fr-v2-s8-contribution-node--left",
} as const;

export function Page13S8({ payload }: Page13S8Props) {
  const content = resolveS8PageContent(payload);

  return (
    <ReportPage sectionId="page-13-s8" pageIndex={13} className="fr-v2-s8-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell fr-v2-s8-shell">
        <PageHeader pageIndex={13} />

        <section className="fr-v2-s8-hero">
          <h1 className="fr-v2-s8-hero-title">
            <span>{content.hero.pageNumber}</span>
            {content.hero.moduleLabel} · {content.hero.moduleName}
          </h1>
          <div className="fr-v2-s8-hero-subtitle">{content.hero.subtitle}</div>
          <p className="fr-v2-s8-hero-description">{content.hero.description}</p>
        </section>

        <section className="fr-v2-s8-main">
          <aside className="fr-v2-s8-left">
            <GlassPanel className="fr-v2-s8-code-panel">
              <div className="fr-v2-s8-code-label">Your S8 Code</div>
              <div className="fr-v2-s8-contribution-orb">
                <S8PrimaryIcon
                  imageUrl={content.primary_icon_url}
                  svgMarkup={content.primary_icon_svg}
                  alt={content.primary_icon_alt}
                  size={112}
                  className="fr-v2-s8-primary-icon"
                />
              </div>
              <div className="fr-v2-s8-code-main">{content.code}</div>
              <div className="fr-v2-s8-code-title">{content.title}</div>
            </GlassPanel>

            <GlassPanel className="fr-v2-s8-text-panel">
              <div className="fr-v2-small-panel-title">The Essence of Your S8</div>
              {content.essenceParagraphs.map((paragraph) => (
                <p key={paragraph} className="fr-v2-s8-body-copy">{paragraph}</p>
              ))}
            </GlassPanel>

            <GlassPanel className="fr-v2-s8-pattern-panel">
              <div className="fr-v2-small-panel-title">How Your Contribution Pattern Shows Up</div>
              <ul className="fr-v2-s8-bullet-list">
                {content.contributionShowsUp.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassPanel>
          </aside>

          <GlassPanel className="fr-v2-s8-contribution-panel">
            <div className="fr-v2-small-panel-title">Your Soul Contribution Map</div>
            <div className="fr-v2-s1-expression-map fr-v2-s0-expression-map fr-v2-s8-contribution-map">
              <div className="fr-v2-s8-contribution-line-vertical" aria-hidden="true" />
              <div className="fr-v2-s8-contribution-line-horizontal" aria-hidden="true" />

              <div className="fr-v2-s8-contribution-center">
                <S8PrimaryIcon
                  imageUrl={content.primary_icon_url}
                  svgMarkup={content.primary_icon_svg}
                  alt={content.primary_icon_alt}
                  size={96}
                  className="fr-v2-s8-primary-icon"
                />
              </div>

              {(["top", "right", "bottom", "left"] as const).map((pos) => {
                const node = content.mapNodes[pos];
                return (
                  <div
                    key={pos}
                    className={`fr-v2-s8-contribution-node ${MAP_NODE_CLASSES[pos]}`}
                    tabIndex={0}
                  >
                    <div className="fr-v2-s8-contribution-node-icon">
                      <Image
                        src={node.iconUrl}
                        alt={node.iconAlt}
                        width={58}
                        height={58}
                        className="fr-v2-s8-contribution-node-icon-img"
                        sizes="58px"
                      />
                    </div>
                    <div className="fr-v2-s8-contribution-node-title">{node.title}</div>
                    <div className="fr-v2-s8-contribution-node-copy" title={node.fullCopy}>
                      {node.copy}
                    </div>
                    {node.fullCopy && node.fullCopy !== node.copy ? (
                      <div className="fr-v2-s8-contribution-tooltip" role="tooltip">
                        <span className="fr-v2-s8-contribution-tooltip-title">{node.title}</span>
                        <span className="fr-v2-s8-contribution-tooltip-copy">{node.fullCopy}</span>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="fr-v2-s8-contribution-note">{S8_CONTRIBUTION_MAP_NOTE}</div>
          </GlassPanel>

          <aside className="fr-v2-s8-right">
            <GlassPanel className="fr-v2-s8-gift-panel">
              <div className="fr-v2-small-panel-title">Your Contribution Gifts</div>
              <ul className="fr-v2-s8-bullet-list">
                {content.gifts.map((gift) => (
                  <li key={gift}>{gift}</li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-s8-alignment-panel">
              <div className="fr-v2-small-panel-title">{S8_CONTRIBUTION_ALIGNMENT_MAP_TITLE}</div>
              <ul className="fr-v2-s8-focus-list">
                {content.focusRows.map((row) => (
                  <li key={row.area}>
                    <span>{row.area}</span>
                    <div
                      className={`fr-v2-s8-focus-pill fr-v2-qualitative-pill-tone--${row.tone}`}
                    >
                      {row.label}
                    </div>
                  </li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-s8-guidance-panel">
              <div className="fr-v2-small-panel-title">Wisewave Guidance</div>
              <p className="fr-v2-s8-body-copy">{content.wisewaveGuidance}</p>
            </GlassPanel>

            <GlassPanel className="fr-v2-s8-reflection-panel">
              <div className="fr-v2-small-panel-title">Reflection Prompts</div>
              <ul className="fr-v2-s8-reflection-list">
                {content.reflectionPrompts.map((prompt) => (
                  <li key={prompt}>{prompt}</li>
                ))}
              </ul>
            </GlassPanel>
          </aside>
        </section>

        <footer className="fr-v2-s8-bottom-band">
          <section className="fr-v2-s8-bottom-section">
            <div className="fr-v2-s8-bottom-icon">✶</div>
            <div>
              <div className="fr-v2-s8-bottom-title">{content.lifeInfluenceTitle}</div>
              <div className="fr-v2-s8-bottom-copy">{content.lifeInfluence}</div>
            </div>
          </section>

          <section className="fr-v2-s8-bottom-section">
            <div className="fr-v2-s8-bottom-icon">✺</div>
            <div>
              <div className="fr-v2-s8-bottom-title">{content.integrationTitle}</div>
              <div className="fr-v2-s8-bottom-copy">{content.integrationGuidance}</div>
            </div>
          </section>

          <section className="fr-v2-s8-bottom-section">
            <div className="fr-v2-s8-bottom-icon">
              <ReportGlyph name="compassStar" />
            </div>
            <div>
              <div className="fr-v2-s8-bottom-title">Key Insight</div>
              <div className="fr-v2-s8-key-insight">
                {content.keyInsight}
                <br />
                <strong>{content.finalRemembrance}</strong>
              </div>
            </div>
          </section>
        </footer>

        <div className="fr-v2-s8-closing-line">{S8_CLOSING_LINE}</div>
      </section>
    </ReportPage>
  );
}
