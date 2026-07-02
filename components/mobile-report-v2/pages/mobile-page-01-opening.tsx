import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { BRAND_LOGO_HEADER } from "@/lib/brand-assets";
import { resolveMobileOpeningContent } from "@/lib/mobile-report-v2/resolve-mobile-opening-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage01OpeningProps = {
  payload: FullReportV2Payload;
};

export function MobilePage01Opening({ payload }: MobilePage01OpeningProps) {
  const content = resolveMobileOpeningContent(payload);

  return (
    <main className="mr-v2-screen mr-v2-screen--opening" id="mobile-page-01-opening">
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-opening-content">
        <MobileTopBar brandName={content.brandName} pageIndex={content.pageIndex} />

        <section className="mr-v2-opening-hero">
          <div className="mr-v2-page-kicker">{content.kicker}</div>
          <h1 className="mr-v2-opening-hero-title">
            {content.titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h1>
          <p className="mr-v2-opening-hero-subtitle">{content.subtitle}</p>
        </section>

        <img
          className="mr-v2-hero-brand-logo"
          src={BRAND_LOGO_HEADER}
          alt=""
          aria-hidden="true"
        />

        <section className="mr-v2-note-card">
          <div className="mr-v2-note-label">{content.noteLabel}</div>
          <p className="mr-v2-note-copy">
            This report is not here to define you. It is here to{" "}
            <strong>{content.noteEmphasis}</strong> — your essence, your patterns, your
            gifts, your growth path, and the remembrance your soul may be carrying.
          </p>
          {content.noteParagraphs.slice(1).map((paragraph) => (
            <p key={paragraph} className="mr-v2-note-copy">{paragraph}</p>
          ))}
        </section>

        <section className="mr-v2-quote-card">
          <span>“{content.quoteLines[0]}</span>
          <br />
          <span>{content.quoteLines[1]}”</span>
        </section>

        <footer className="mr-v2-opening-bottom-card">
          <div className="mr-v2-opening-bottom-icon" aria-hidden="true">
            {content.bottomIcon}
          </div>
          <div>
            <div className="mr-v2-opening-bottom-title">{content.bottomTitle}</div>
            <div className="mr-v2-opening-bottom-copy">{content.bottomCopy}</div>
          </div>
        </footer>
      </section>
    </main>
  );
}
