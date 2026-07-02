import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS7SoulSovereigntyRevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s7-soul-sovereignty-reveal-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage22S7SoulSovereigntyRevealProps = {
  payload: FullReportV2Payload;
};

export function MobilePage22S7SoulSovereigntyReveal({ payload }: MobilePage22S7SoulSovereigntyRevealProps) {
  const content = resolveMobileS7SoulSovereigntyRevealContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--s7-soul-sovereignty-reveal"
      id="mobile-page-22-s7-soul-sovereignty-reveal"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s7sr-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s7sr-hero">
          <div className="mr-v2-page-kicker mr-v2-s7sr-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s7sr-hero-title">
            {content.titleLine}
            <span className="mr-v2-s7sr-hero-title-violet">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s7sr-hero-subtitle">{content.subtitle}</p>
        </section>

        <section className="mr-v2-s7sr-glass-card mr-v2-s7sr-reveal-card mr-v2-s7sr-reveal-card--has-bg">
          <div
            className="mr-v2-s7sr-reveal-card-bg"
            style={{ backgroundImage: `url(${content.revealBackgroundUrl})` }}
            aria-hidden="true"
          />
          <div className="mr-v2-s7sr-reveal-inner">
            <div className="mr-v2-s7sr-orb">
              <SignatureSegmentCardIcon
                imageUrl={content.imageUrl}
                code={content.code}
                title={content.title}
                fallbackIcon={content.fallbackIcon}
                size={96}
              />
            </div>
            <div>
              <div className="mr-v2-s7sr-code-label">{content.codeLabel}</div>
              <div className="mr-v2-s7sr-code-main">{content.code}</div>
              <div className="mr-v2-s7sr-code-title">{content.title}</div>
              <div className="mr-v2-s7sr-meaning">{content.oneLineSovereignty}</div>
            </div>
          </div>
        </section>

        <section className="mr-v2-s7sr-glass-card mr-v2-s7sr-sovereign-field-card">
          <div className="mr-v2-s7sr-orb mr-v2-s7sr-orb--large">
            <SignatureSegmentCardIcon
              imageUrl={content.imageUrl}
              code={content.code}
              title={content.title}
              fallbackIcon={content.fallbackIcon}
              size={96}
            />
          </div>
          <p className="mr-v2-s7sr-sovereign-copy">{content.sovereignFieldCopy}</p>
        </section>

        <section className="mr-v2-s7sr-glass-card mr-v2-s7sr-messages-card">
          <h2 className="mr-v2-s7sr-section-title mr-v2-s7sr-section-title--center mr-v2-s7sr-section-title--violet">
            {content.keyMessagesTitle}
          </h2>
          <div className="mr-v2-s7sr-message-list">
            {content.keyMessages.map((item) => (
              <article key={item.key} className="mr-v2-s7sr-message-item">
                <div className="mr-v2-s7sr-message-icon" aria-hidden="true">{item.icon}</div>
                <div>
                  <div className="mr-v2-s7sr-message-title">{item.title}</div>
                  <div className="mr-v2-s7sr-message-copy">{item.copy}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s7sr-glass-card mr-v2-s7sr-alignment-card">
          <h2 className="mr-v2-s7sr-section-title mr-v2-s7sr-section-title--center mr-v2-s7sr-section-title--violet">
            {content.alignmentTitle}
          </h2>
          <div className="mr-v2-s7sr-alignment-grid">
            {content.alignmentItems.map((item) => (
              <article key={item.key} className="mr-v2-s7sr-alignment-item">
                <div className="mr-v2-s7sr-alignment-icon" aria-hidden="true">{item.icon}</div>
                <div className="mr-v2-s7sr-alignment-title">{item.title}</div>
                <div className="mr-v2-s7sr-alignment-state">{item.state}</div>
                <div className="mr-v2-s7sr-alignment-copy">{item.copy}</div>
              </article>
            ))}
          </div>
          <p className="mr-v2-s7sr-alignment-note">{content.alignmentNote}</p>
        </section>

        <section className="mr-v2-s7sr-glass-card mr-v2-s7sr-reminder-card">
          <div className="mr-v2-s7sr-reminder-icon" aria-hidden="true">{content.reminderIcon}</div>
          <p className="mr-v2-s7sr-reminder-copy">
            <strong>{content.reminderLead}</strong>
            <br />
            {content.reminderBody}
          </p>
        </section>

        <footer className="mr-v2-s7sr-bottom-mantra">
          <div className="mr-v2-s7sr-bottom-mantra-divider-row" aria-hidden="true">
            <span className="mr-v2-s7sr-bottom-mantra-line" />
            <img
              className="mr-v2-s7sr-bottom-mantra-logo"
              src={content.footerLotusLogoUrl}
              alt=""
            />
            <span className="mr-v2-s7sr-bottom-mantra-line mr-v2-s7sr-bottom-mantra-line--reverse" />
          </div>
          <p className="mr-v2-s7sr-bottom-mantra-copy">
            <span>{content.mantraLeft}</span>
            <span className="mr-v2-s7sr-bottom-mantra-star">{content.mantraCenter}</span>
            <span>{content.mantraRight}</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
