import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobile7DayPracticeCardsContent } from "@/lib/mobile-report-v2/resolve-mobile-seven-day-practice-cards-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage297DayPracticeCardsProps = {
  payload: FullReportV2Payload;
};

export function MobilePage297DayPracticeCards({
  payload,
}: MobilePage297DayPracticeCardsProps) {
  const content = resolveMobile7DayPracticeCardsContent(payload);

  return (
    <main
      className="mr-v2-screen mr-v2-screen--7-day-practice-cards"
      id="mobile-page-29-7-day-practice-cards"
    >
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-7dpc-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-7dpc-hero">
          <div className="mr-v2-page-kicker mr-v2-7dpc-kicker">{content.kicker}</div>
          <h1 className="mr-v2-7dpc-hero-title">
            {content.titleLine}
            <span className="mr-v2-7dpc-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-7dpc-hero-subtitle">{content.subtitle}</p>
        </section>

        <section className="mr-v2-7dpc-glass-card mr-v2-7dpc-intro-card">
          <div className="mr-v2-7dpc-intro-icon" aria-hidden="true">{content.introIcon}</div>
          <div>
            <div className="mr-v2-7dpc-intro-title">{content.introTitle}</div>
            <div className="mr-v2-7dpc-intro-copy">
              {content.introLead} <strong>{content.introEmphasis}</strong> {content.introTail}
            </div>
          </div>
        </section>

        {content.cards.map((card) => (
          <article
            key={card.key}
            className={`mr-v2-7dpc-practice-card mr-v2-7dpc-practice-card--${card.tone}`}
          >
            <div
              className={`mr-v2-7dpc-practice-orb${
                card.moduleIcons.length > 1 ? " mr-v2-7dpc-practice-orb--multi" : ""
              }`}
            >
              {card.moduleIcons.map((icon) => (
                <SignatureSegmentCardIcon
                  key={icon.layer}
                  imageUrl={icon.imageUrl}
                  code={icon.code}
                  title={icon.title}
                  fallbackIcon={icon.fallbackIcon}
                  size={card.moduleIcons.length > 1 ? 40 : 56}
                />
              ))}
            </div>
            <div className="mr-v2-7dpc-practice-body">
              <div className="mr-v2-7dpc-day-label">Day {card.day}</div>
              <div className="mr-v2-7dpc-practice-title">{card.title}</div>
              <div className="mr-v2-7dpc-practice-copy">{card.copy}</div>
              {card.focus ? (
                <div className="mr-v2-7dpc-practice-focus">
                  <strong>Focus:</strong> {card.focus}
                </div>
              ) : null}
              {card.reflection ? (
                <div className="mr-v2-7dpc-practice-reflection">
                  <strong>Reflection:</strong> {card.reflection}
                </div>
              ) : null}
              <div className="mr-v2-7dpc-practice-row">
                <div className="mr-v2-7dpc-code-tags">
                  {card.codes.map((code) => (
                    <span
                      key={code.label}
                      className={`mr-v2-7dpc-code-tag mr-v2-7dpc-code-tag--${code.tone}`}
                    >
                      {code.label}
                    </span>
                  ))}
                </div>
                <div className="mr-v2-7dpc-open-arrow" aria-hidden="true">›</div>
              </div>
            </div>
          </article>
        ))}

        <section className="mr-v2-7dpc-glass-card mr-v2-7dpc-consistency-card">
          <div className="mr-v2-7dpc-consistency-title">{content.consistencyTitle}</div>
          <div className="mr-v2-7dpc-consistency-copy">{content.consistencyCopy}</div>
        </section>

        <footer className="mr-v2-7dpc-bottom-mantra">
          <div className="mr-v2-7dpc-bottom-mantra-divider-row" aria-hidden="true">
            <span className="mr-v2-7dpc-bottom-mantra-line" />
            <img
              className="mr-v2-7dpc-bottom-mantra-logo"
              src={content.footerLotusLogoUrl}
              alt=""
            />
            <span className="mr-v2-7dpc-bottom-mantra-line mr-v2-7dpc-bottom-mantra-line--reverse" />
          </div>
          <p className="mr-v2-7dpc-bottom-mantra-copy">
            <span>{content.mantraLeft}</span>
            <span className="mr-v2-7dpc-bottom-mantra-star">{content.mantraCenter}</span>
            <span>{content.mantraRight}</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
