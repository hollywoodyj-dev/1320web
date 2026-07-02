import Image from "next/image";
import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { ReportGlyph } from "@/components/full-report-v2/report-glyph";
import { ReportPage } from "@/components/full-report-v2/report-page";
import { S9PrimaryIcon } from "@/components/full-report-v2/s9-primary-icon";
import { resolveS9PageContent } from "@/lib/full-report-v2/resolve-s9-page-content";
import {
  S9_CLOSING_LINE,
  S9_RETURN_ALIGNMENT_MAP_TITLE,
  S9_RETURN_MAP_NOTE,
} from "@/lib/full-report-v2/s9-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type Page14S9Props = {
  payload: FullReportV2Payload;
};

const MAP_NODE_CLASSES = {
  top: "fr-v2-s9-return-node--top",
  right: "fr-v2-s9-return-node--right",
  bottom: "fr-v2-s9-return-node--bottom",
  left: "fr-v2-s9-return-node--left",
} as const;

export function Page14S9({ payload }: Page14S9Props) {
  const content = resolveS9PageContent(payload);

  return (
    <ReportPage sectionId="page-14-s9" pageIndex={14} className="fr-v2-s9-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell fr-v2-s9-shell">
        <PageHeader pageIndex={14} />

        <section className="fr-v2-s9-hero">
          <h1 className="fr-v2-s9-hero-title">
            <span>{content.hero.pageNumber}</span>
            {content.hero.moduleLabel} · {content.hero.moduleName}
          </h1>
          <div className="fr-v2-s9-hero-subtitle">{content.hero.subtitle}</div>
          <p className="fr-v2-s9-hero-description">{content.hero.description}</p>
        </section>

        <section className="fr-v2-s9-main">
          <aside className="fr-v2-s9-left">
            <GlassPanel className="fr-v2-s9-code-panel">
              <div className="fr-v2-s9-code-label">Your S9 Code</div>
              <div className="fr-v2-s9-return-orb">
                <S9PrimaryIcon
                  imageUrl={content.primary_icon_url}
                  svgMarkup={content.primary_icon_svg}
                  alt={content.primary_icon_alt}
                  size={112}
                  className="fr-v2-s9-primary-icon"
                />
              </div>
              <div className="fr-v2-s9-code-main">{content.code}</div>
              <div className="fr-v2-s9-code-title">{content.title}</div>
            </GlassPanel>

            <GlassPanel className="fr-v2-s9-text-panel">
              <div className="fr-v2-small-panel-title">The Essence of Your S9</div>
              {content.essenceParagraphs.map((paragraph) => (
                <p key={paragraph} className="fr-v2-s9-body-copy">{paragraph}</p>
              ))}
            </GlassPanel>

            <GlassPanel className="fr-v2-s9-pattern-panel">
              <div className="fr-v2-small-panel-title">How Your Return Path Shows Up</div>
              <ul className="fr-v2-s9-bullet-list">
                {content.returnShowsUp.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassPanel>
          </aside>

          <GlassPanel className="fr-v2-s9-return-panel">
            <div className="fr-v2-small-panel-title">Your Return to Source Map</div>
            <div className="fr-v2-s1-expression-map fr-v2-s0-expression-map fr-v2-s9-return-map">
              <div className="fr-v2-s9-return-line-vertical" aria-hidden="true" />
              <div className="fr-v2-s9-return-line-horizontal" aria-hidden="true" />

              <div className="fr-v2-s9-return-center">
                <S9PrimaryIcon
                  imageUrl={content.primary_icon_url}
                  svgMarkup={content.primary_icon_svg}
                  alt={content.primary_icon_alt}
                  size={96}
                  className="fr-v2-s9-primary-icon"
                />
              </div>

              {(["top", "right", "bottom", "left"] as const).map((pos) => {
                const node = content.mapNodes[pos];
                return (
                  <div
                    key={pos}
                    className={`fr-v2-s9-return-node ${MAP_NODE_CLASSES[pos]}`}
                    tabIndex={0}
                  >
                    <div className="fr-v2-s9-return-node-icon">
                      <Image
                        src={node.iconUrl}
                        alt={node.iconAlt}
                        width={58}
                        height={58}
                        className="fr-v2-s9-return-node-icon-img"
                        sizes="58px"
                      />
                    </div>
                    <div className="fr-v2-s9-return-node-title">{node.title}</div>
                    <div className="fr-v2-s9-return-node-copy" title={node.fullCopy}>
                      {node.copy}
                    </div>
                    {node.fullCopy && node.fullCopy !== node.copy ? (
                      <div className="fr-v2-s9-return-tooltip" role="tooltip">
                        <span className="fr-v2-s9-return-tooltip-title">{node.title}</span>
                        <span className="fr-v2-s9-return-tooltip-copy">{node.fullCopy}</span>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="fr-v2-s9-return-note">{S9_RETURN_MAP_NOTE}</div>
          </GlassPanel>

          <aside className="fr-v2-s9-right">
            <GlassPanel className="fr-v2-s9-gift-panel">
              <div className="fr-v2-small-panel-title">Your Return Gifts</div>
              <ul className="fr-v2-s9-bullet-list">
                {content.gifts.map((gift) => (
                  <li key={gift}>{gift}</li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-s9-alignment-panel">
              <div className="fr-v2-small-panel-title">{S9_RETURN_ALIGNMENT_MAP_TITLE}</div>
              <ul className="fr-v2-s9-focus-list">
                {content.focusRows.map((row) => (
                  <li key={row.area}>
                    <span>{row.area}</span>
                    <div
                      className={`fr-v2-s9-focus-pill fr-v2-qualitative-pill-tone--${row.tone}`}
                    >
                      {row.label}
                    </div>
                  </li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-s9-guidance-panel">
              <div className="fr-v2-small-panel-title">Wisewave Guidance</div>
              <p className="fr-v2-s9-body-copy">{content.wisewaveGuidance}</p>
            </GlassPanel>

            <GlassPanel className="fr-v2-s9-reflection-panel">
              <div className="fr-v2-small-panel-title">Reflection Prompts</div>
              <ul className="fr-v2-s9-reflection-list">
                {content.reflectionPrompts.map((prompt) => (
                  <li key={prompt}>{prompt}</li>
                ))}
              </ul>
            </GlassPanel>
          </aside>
        </section>

        <footer className="fr-v2-s9-bottom-band">
          <section className="fr-v2-s9-bottom-section">
            <div className="fr-v2-s9-bottom-icon">✶</div>
            <div>
              <div className="fr-v2-s9-bottom-title">{content.lifeInfluenceTitle}</div>
              <div className="fr-v2-s9-bottom-copy">{content.lifeInfluence}</div>
            </div>
          </section>

          <section className="fr-v2-s9-bottom-section">
            <div className="fr-v2-s9-bottom-icon">☉</div>
            <div>
              <div className="fr-v2-s9-bottom-title">{content.integrationTitle}</div>
              <div className="fr-v2-s9-bottom-copy">{content.integrationGuidance}</div>
            </div>
          </section>

          <section className="fr-v2-s9-bottom-section">
            <div className="fr-v2-s9-bottom-icon">
              <ReportGlyph name="compassStar" />
            </div>
            <div>
              <div className="fr-v2-s9-bottom-title">Key Insight</div>
              <div className="fr-v2-s9-key-insight">
                {content.keyInsight}
                <br />
                <strong>{content.finalRemembrance}</strong>
              </div>
            </div>
          </section>
        </footer>

        <div className="fr-v2-s9-closing-line">{S9_CLOSING_LINE}</div>
      </section>
    </ReportPage>
  );
}
