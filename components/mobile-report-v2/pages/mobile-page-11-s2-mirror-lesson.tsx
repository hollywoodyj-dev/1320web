import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileS2MirrorLessonContent } from "@/lib/mobile-report-v2/resolve-mobile-s2-mirror-lesson-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage11S2MirrorLessonProps = {
  payload: FullReportV2Payload;
};

export function MobilePage11S2MirrorLesson({ payload }: MobilePage11S2MirrorLessonProps) {
  const content = resolveMobileS2MirrorLessonContent(payload);

  return (
    <main className="mr-v2-screen mr-v2-screen--s2-mirror-lesson" id="mobile-page-11-s2-mirror-lesson">
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-s2m-content">
        <MobileTopBar
          brandName={content.brandName}
          brandSubtitle={content.brandSubtitle}
          pageIndex={content.pageIndex}
        />

        <section className="mr-v2-s2m-hero">
          <div className="mr-v2-page-kicker mr-v2-s2m-kicker">{content.kicker}</div>
          <h1 className="mr-v2-s2m-hero-title">
            {content.titleLine}
            <br />
            + <span className="mr-v2-s2m-hero-title-gold">{content.titleEmphasis}</span>
          </h1>
          <p className="mr-v2-s2m-hero-subtitle">
            {content.subtitleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
        </section>

        <section className="mr-v2-s2m-glass-card mr-v2-s2m-summary-card mr-v2-s2m-summary-card--has-bg">
          <div
            className="mr-v2-s2m-summary-card-bg"
            style={{ backgroundImage: `url(${content.summaryBackgroundUrl})` }}
            aria-hidden="true"
          />
          <div className="mr-v2-s2m-summary-orb">
            <SignatureSegmentCardIcon
              imageUrl={content.imageUrl}
              code={content.code}
              title={content.title}
              fallbackIcon={content.fallbackIcon}
              size={108}
            />
          </div>
          <div className="mr-v2-s2m-summary-copy">
            <div className="mr-v2-s2m-summary-code">{content.code}</div>
            <div className="mr-v2-s2m-summary-title">{content.title}</div>
            <div className="mr-v2-s2m-summary-divider" aria-hidden="true" />
            <div className="mr-v2-s2m-summary-module">{content.moduleLabel}</div>
            <div className="mr-v2-s2m-summary-meaning">{content.shortMirrorLine}</div>
          </div>
        </section>

        <section className="mr-v2-s2m-glass-card mr-v2-s2m-reflects-card">
          <div className="mr-v2-s2m-reflects-icon" aria-hidden="true">{content.reflectsIcon}</div>
          <div>
            <h2 className="mr-v2-s2m-section-title">{content.reflectsTitle}</h2>
            <p className="mr-v2-s2m-reflects-copy">{content.lifeReflectsBackCopy}</p>
          </div>
        </section>

        <section className="mr-v2-s2m-glass-card mr-v2-s2m-lesson-card">
          <h2 className="mr-v2-s2m-section-title mr-v2-s2m-section-title--violet">
            {content.soulLessonTitle}
          </h2>
          <p className="mr-v2-s2m-lesson-copy">{content.soulLessonCopy}</p>
          <div className="mr-v2-s2m-lesson-points">
            {content.lessonPoints.map((point) => (
              <article key={point.title} className="mr-v2-s2m-lesson-point">
                <div className="mr-v2-s2m-lesson-point-icon" aria-hidden="true">{point.icon}</div>
                <div>
                  <div className="mr-v2-s2m-lesson-point-title">{point.title}</div>
                  <div className="mr-v2-s2m-lesson-point-copy">{point.copy}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s2m-glass-card mr-v2-s2m-themes-card">
          <h2 className="mr-v2-s2m-section-title mr-v2-s2m-section-title--center">
            {content.themesTitle}
          </h2>
          <div className="mr-v2-s2m-theme-grid">
            {content.themes.map((theme) => (
              <article key={theme.title} className="mr-v2-s2m-theme-item">
                <div className="mr-v2-s2m-theme-icon" aria-hidden="true">{theme.icon}</div>
                <div className="mr-v2-s2m-theme-title">{theme.title}</div>
                <div className="mr-v2-s2m-theme-copy">{theme.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-s2m-glass-card mr-v2-s2m-reflection-card">
          <div className="mr-v2-s2m-reflection-icon" aria-hidden="true">{content.reflectionIcon}</div>
          <div>
            <h2 className="mr-v2-s2m-section-title mr-v2-s2m-section-title--violet">
              {content.reflectionTitle}
            </h2>
            <p className="mr-v2-s2m-reflection-copy">{content.reflectionPrompt}</p>
          </div>
        </section>

        <section className="mr-v2-s2m-glass-card mr-v2-s2m-tip-card">
          <div className="mr-v2-s2m-tip-icon" aria-hidden="true">{content.tipIcon}</div>
          <div>
            <div className="mr-v2-s2m-tip-title">{content.tipTitle}</div>
            <p className="mr-v2-s2m-tip-copy">{content.integrationTip}</p>
          </div>
        </section>
      </section>
    </main>
  );
}
