import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS3RevealContent } from "@/lib/mobile-report-v2/resolve-mobile-s3-reveal-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage08S3RevealProps = {
  payload: FullReportV2Payload;
};

export function MobilePage08S3Reveal({ payload }: MobilePage08S3RevealProps) {
  const content = resolveMobileS3RevealContent(payload);

  return (
    <main className="mr-v2-screen mr-v2-screen--s3-reveal" id="mobile-page-08-s3-reveal">
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s3r-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s3r-hero">
          <div className="mr-v2-page-kicker mr-v2-s3r-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s3r-hero-title">
            {content.titleLine}
            <span className="mr-v2-s3r-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s3r-hero-subtitle">
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
            "mr-v2-s3r-glass-card",
            "mr-v2-s3r-reveal-card",
            content.revealBackgroundUrl ? "mr-v2-s3r-reveal-card--has-bg" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {content.revealBackgroundUrl ? (
            <div
              className="mr-v2-s3r-reveal-card-bg"
              style={{ backgroundImage: `url(${content.revealBackgroundUrl})` }}
              aria-hidden="true"
            />
          ) : null}
          <div className="mr-v2-s3r-reveal-orb">
            <SignatureSegmentCardIcon
              imageUrl={content.imageUrl}
              code={content.code}
              title={content.title}
              fallbackIcon={content.fallbackIcon}
              size={116}
            />
          </div>
          <div className="mr-v2-s3r-code-copy">
            <div className="mr-v2-s3r-code-main">{content.code}</div>
            <div className="mr-v2-s3r-code-name">{content.title}</div>
            <div className="mr-v2-s3r-code-divider" aria-hidden="true" />
            <div className="mr-v2-s3r-code-module">{content.moduleLabel}</div>
            <div className="mr-v2-s3r-code-meaning">{content.moduleMeaning}</div>
          </div>
        </section>

        <section className="mr-v2-s3r-glass-card mr-v2-s3r-meaning-card">
          <div className="mr-v2-s3r-meaning-icon" aria-hidden="true">{content.meaningIcon}</div>
          <div>
            <h2 className="mr-v2-s3r-section-title">{content.meaningTitle}</h2>
            <p className="mr-v2-s3r-meaning-copy">{content.revealMeaning}</p>
          </div>
        </section>

        <section className="mr-v2-s3r-glass-card mr-v2-s3r-mirrors-card">
          <h2 className="mr-v2-s3r-section-title">{content.mirrorsTitle}</h2>
          <div className="mr-v2-s3r-mirror-grid">
            {content.mirrors.map((mirror) => (
              <article key={mirror.title} className="mr-v2-s3r-mirror-item">
                <div className="mr-v2-s3r-mirror-icon" aria-hidden="true">{mirror.icon}</div>
                <div className="mr-v2-s3r-mirror-title">{mirror.title}</div>
                <div className="mr-v2-s3r-mirror-copy">{mirror.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s3r-glass-card mr-v2-s3r-reflection-card">
          <div className="mr-v2-s3r-reflection-icon" aria-hidden="true">{content.reflectionIcon}</div>
          <div>
            <h2 className="mr-v2-s3r-section-title mr-v2-s3r-section-title--violet">
              {content.reflectionTitle}
            </h2>
            <p className="mr-v2-s3r-reflection-copy">{content.reflectionPrompt}</p>
          </div>
        </section>

        <section className="mr-v2-s3r-glass-card mr-v2-s3r-tip-card">
          <div className="mr-v2-s3r-tip-icon" aria-hidden="true">{content.tipIcon}</div>
          <div>
            <div className="mr-v2-s3r-tip-title">{content.tipTitle}</div>
            <p className="mr-v2-s3r-tip-copy">{content.integrationTip}</p>
          </div>
        </section>
      </section>
    </main>
  );
}
