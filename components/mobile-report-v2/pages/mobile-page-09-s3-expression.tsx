import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS3ExpressionContent } from "@/lib/mobile-report-v2/resolve-mobile-s3-expression-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage09S3ExpressionProps = {
  payload: FullReportV2Payload;
};

export function MobilePage09S3Expression({ payload }: MobilePage09S3ExpressionProps) {
  const content = resolveMobileS3ExpressionContent(payload);

  return (
    <main className="mr-v2-screen mr-v2-screen--s3-expression" id="mobile-page-09-s3-expression">
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s3e-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s3e-hero">
          <div className="mr-v2-page-kicker mr-v2-s3e-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s3e-hero-title">
            {content.titleLine}
            <br />
            & <span className="mr-v2-s3e-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s3e-hero-subtitle">
            {content.subtitleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
        </section>

        <section
          className={[
            "mr-v2-s3e-glass-card",
            "mr-v2-s3e-summary-card",
            content.summaryBackgroundUrl ? "mr-v2-s3e-summary-card--has-bg" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {content.summaryBackgroundUrl ? (
            <div
              className="mr-v2-s3e-summary-card-bg"
              style={{ backgroundImage: `url(${content.summaryBackgroundUrl})` }}
              aria-hidden="true"
            />
          ) : null}
          <div className="mr-v2-s3e-summary-orb">
            <SignatureSegmentCardIcon
              imageUrl={content.imageUrl}
              code={content.code}
              title={content.title}
              fallbackIcon={content.fallbackIcon}
              size={108}
            />
          </div>
          <div className="mr-v2-s3e-summary-copy">
            <div className="mr-v2-s3e-summary-code">{content.code}</div>
            <div className="mr-v2-s3e-summary-title">{content.title}</div>
            <div className="mr-v2-s3e-summary-divider" aria-hidden="true" />
            <div className="mr-v2-s3e-summary-module">{content.moduleLabel}</div>
            <div className="mr-v2-s3e-summary-meaning">{content.moduleMeaning}</div>
          </div>
        </section>

        <section className="mr-v2-s3e-glass-card mr-v2-s3e-frequency-card">
          <div className="mr-v2-s3e-frequency-icon" aria-hidden="true">{content.frequencyIcon}</div>
          <div>
            <h2 className="mr-v2-s3e-section-title">{content.frequencyTitle}</h2>
            <p className="mr-v2-s3e-frequency-copy">{content.vibrationFrequencyCopy}</p>
          </div>
        </section>

        <section className="mr-v2-s3e-glass-card mr-v2-s3e-expression-card">
          <h2 className="mr-v2-s3e-section-title mr-v2-s3e-section-title--center">
            {content.expressionTitle}
          </h2>
          <div className="mr-v2-s3e-expression-grid">
            {content.expressionItems.map((item) => (
              <article key={item.title} className="mr-v2-s3e-expression-item">
                <div className="mr-v2-s3e-expression-icon" aria-hidden="true">{item.icon}</div>
                <div className="mr-v2-s3e-expression-item-title">{item.title}</div>
                <div className="mr-v2-s3e-expression-item-copy">{item.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s3e-glass-card mr-v2-s3e-reflection-card">
          <div className="mr-v2-s3e-reflection-icon" aria-hidden="true">{content.reflectionIcon}</div>
          <div>
            <h2 className="mr-v2-s3e-section-title mr-v2-s3e-section-title--violet">
              {content.reflectionTitle}
            </h2>
            <p className="mr-v2-s3e-reflection-copy">{content.reflectionPrompt}</p>
          </div>
        </section>

        <section className="mr-v2-s3e-glass-card mr-v2-s3e-tip-card">
          <div className="mr-v2-s3e-tip-icon" aria-hidden="true">{content.tipIcon}</div>
          <div>
            <div className="mr-v2-s3e-tip-title">{content.tipTitle}</div>
            <p className="mr-v2-s3e-tip-copy">{content.integrationTip}</p>
          </div>
        </section>
      </section>
    </main>
  );
}
