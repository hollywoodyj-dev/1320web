import type { CSSProperties } from "react";
import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS6ReceivingPatternMapContent } from "@/lib/mobile-report-v2/resolve-mobile-s6-receiving-pattern-map-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage21S6ReceivingPatternMapProps = {
  payload: FullReportV2Payload;
};

/** Inline layout — avoids calc()/var() issues and stale CSS on mobile dev preview */
const S6RPM_MAP_NODE_LAYOUT: Record<string, CSSProperties> = {
  top: { top: "3%", left: "50%", right: "auto", bottom: "auto", transform: "translateX(-50%)" },
  left: { top: "17%", left: "2%", right: "auto", bottom: "auto", transform: "none" },
  right: { top: "17%", right: "2%", left: "auto", bottom: "auto", transform: "none" },
  "bottom-left": { top: "56%", left: "3%", right: "auto", bottom: "auto", transform: "none" },
  "bottom-right": { top: "56%", right: "3%", left: "auto", bottom: "auto", transform: "none" },
};

export function MobilePage21S6ReceivingPatternMap({ payload }: MobilePage21S6ReceivingPatternMapProps) {
  const content = resolveMobileS6ReceivingPatternMapContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--s6-receiving-pattern-map"
      id="mobile-page-21-s6-receiving-pattern-map"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s6rpm-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s6rpm-hero">
          <div className="mr-v2-page-kicker mr-v2-s6rpm-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s6rpm-hero-title">
            {content.titleLine}
            <span className="mr-v2-s6rpm-hero-title-violet">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s6rpm-hero-subtitle">{content.subtitle}</p>
        </section>

        <section className="mr-v2-s6rpm-glass-card mr-v2-s6rpm-map-card">
          <h2 className="mr-v2-s6rpm-section-title mr-v2-s6rpm-section-title--center mr-v2-s6rpm-section-title--violet">
            {content.mapTitle}
          </h2>

          <div className="mr-v2-s6rpm-receiving-map">
            <div
              className="mr-v2-s6rpm-receiving-map-bg"
              style={{
                backgroundImage: `url(${content.mapBackgroundUrl}), url(${content.mapBackgroundFallbackUrl})`,
              }}
              aria-hidden="true"
            />
            <div className="mr-v2-s6rpm-receiving-map-overlay" aria-hidden="true" />
            <div className="mr-v2-s6rpm-map-horizontal-line" aria-hidden="true" />
            <div className="mr-v2-s6rpm-map-diagonal-a" aria-hidden="true" />
            <div className="mr-v2-s6rpm-map-diagonal-b" aria-hidden="true" />

            <div className="mr-v2-s6rpm-map-center">
              <div className="mr-v2-s6vr-orb mr-v2-s6rpm-map-center-orb">
                <SignatureSegmentCardIcon
                  imageUrl={content.imageUrl}
                  code={content.code}
                  title={content.title}
                  fallbackIcon={content.centerFallbackIcon}
                  size={80}
                />
              </div>
            </div>

            {content.mapNodes.map((node) => (
              <div
                key={node.key}
                className={["mr-v2-s6rpm-map-node", node.positionClass].join(" ")}
                style={S6RPM_MAP_NODE_LAYOUT[node.key]}
              >
                <div className="mr-v2-s6rpm-node-orb" aria-hidden="true">{node.icon}</div>
                <div className="mr-v2-s6rpm-node-title">{node.title}</div>
                <div className="mr-v2-s6rpm-node-copy">{node.copy}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mr-v2-s6rpm-insight-stack">
          {content.insightCards.map((card) => (
            <article
              key={card.key}
              className={[
                "mr-v2-s6rpm-glass-card",
                "mr-v2-s6rpm-insight-card",
                `mr-v2-s6rpm-insight-card--${card.variant}`,
              ].join(" ")}
            >
              <div className="mr-v2-s6rpm-insight-icon" aria-hidden="true">{card.icon}</div>
              <div>
                <div className="mr-v2-s6rpm-insight-title">{card.title}</div>
                <div className="mr-v2-s6rpm-insight-copy">{card.copy}</div>
              </div>
            </article>
          ))}
        </section>

        <footer className="mr-v2-s6rpm-bottom-mantra">
          <div className="mr-v2-s6rpm-bottom-mantra-divider-row" aria-hidden="true">
            <span className="mr-v2-s6rpm-bottom-mantra-line" />
            <img
              className="mr-v2-s6rpm-bottom-mantra-logo"
              src={content.footerLotusLogoUrl}
              alt=""
            />
            <span className="mr-v2-s6rpm-bottom-mantra-line mr-v2-s6rpm-bottom-mantra-line--reverse" />
          </div>
          <p className="mr-v2-s6rpm-bottom-mantra-copy">
            <span>{content.mantraLeft}</span>
            <span className="mr-v2-s6rpm-bottom-mantra-star">{content.mantraCenter}</span>
            <span>{content.mantraRight}</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
