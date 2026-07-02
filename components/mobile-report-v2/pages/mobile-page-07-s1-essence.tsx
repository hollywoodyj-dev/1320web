import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS1EssenceContent } from "@/lib/mobile-report-v2/resolve-mobile-s1-essence-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage07S1EssenceProps = {
  payload: FullReportV2Payload;
};

export function MobilePage07S1Essence({ payload }: MobilePage07S1EssenceProps) {
  const content = resolveMobileS1EssenceContent(payload);

  return (
    <main className="mr-v2-screen mr-v2-screen--s1-essence" id="mobile-page-07-s1-essence">
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s1e-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s1e-hero">
          <div className="mr-v2-page-kicker mr-v2-s1e-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s1e-hero-title">
            {content.titleLine}
            <br />
            <span className="mr-v2-s1e-hero-title-gold">{content.titleEmphasis}</span>
            {content.titleTail}
          </h1>
          <p className="mr-v2-s1e-hero-subtitle">
            {content.subtitleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
        </section>

        <section className="mr-v2-s1e-glass-card mr-v2-s1e-summary-card">
          <div className="mr-v2-s1e-summary-orb">
            <SignatureSegmentCardIcon
              imageUrl={content.imageUrl}
              code={content.code}
              title={content.title}
              fallbackIcon={content.fallbackIcon}
              size={108}
            />
          </div>
          <div>
            <div className="mr-v2-s1e-summary-code">{content.code}</div>
            <div className="mr-v2-s1e-summary-title">{content.title}</div>
            <div className="mr-v2-s1e-summary-subtitle">{content.summarySubtitle}</div>
            <p className="mr-v2-s1e-summary-copy">{content.shortDescription}</p>
          </div>
        </section>

        <section className="mr-v2-s1e-glass-card mr-v2-s1e-essence-card">
          <div className="mr-v2-s1e-side-icon" aria-hidden="true">{content.essenceIcon}</div>
          <div>
            <h2 className="mr-v2-s1e-section-title">{content.essenceTitle}</h2>
            <p className="mr-v2-s1e-essence-copy">{content.essenceParagraph}</p>
          </div>
        </section>

        <section className="mr-v2-s1e-glass-card mr-v2-s1e-gifts-card">
          <h2 className="mr-v2-s1e-section-title mr-v2-s1e-section-title--center">
            {content.giftsTitle}
          </h2>
          <div className="mr-v2-s1e-gift-grid">
            {content.gifts.map((gift) => (
              <article key={gift.title} className="mr-v2-s1e-gift-item">
                <div className="mr-v2-s1e-gift-icon" aria-hidden="true">{gift.icon}</div>
                <div className="mr-v2-s1e-gift-title">{gift.title}</div>
                <div className="mr-v2-s1e-gift-copy">{gift.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s1e-glass-card mr-v2-s1e-reflection-card">
          <div className="mr-v2-s1e-reflection-icon" aria-hidden="true">{content.reflectionIcon}</div>
          <div>
            <h2 className="mr-v2-s1e-section-title mr-v2-s1e-section-title--violet">
              {content.reflectionTitle}
            </h2>
            <p className="mr-v2-s1e-reflection-copy">{content.reflectionPrompt}</p>
          </div>
        </section>

        <section className="mr-v2-s1e-glass-card mr-v2-s1e-tip-card">
          <div className="mr-v2-s1e-side-icon" aria-hidden="true">{content.tipIcon}</div>
          <div>
            <div className="mr-v2-s1e-tip-title">{content.tipTitle}</div>
            <p className="mr-v2-s1e-tip-copy">{content.integrationTip}</p>
          </div>
        </section>
      </section>
    </main>
  );
}
