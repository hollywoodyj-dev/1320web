import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { BRAND_LOGO_HEADER } from "@/lib/brand-assets";
import { resolveMobileDisclaimerContent } from "@/lib/mobile-report-v2/resolve-mobile-disclaimer-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage02DisclaimerProps = {
  payload: FullReportV2Payload;
};

export function MobilePage02Disclaimer({ payload }: MobilePage02DisclaimerProps) {
  const content = resolveMobileDisclaimerContent(payload);

  return (
    <main className="mr-v2-screen mr-v2-screen--disclaimer" id="mobile-page-02-disclaimer">
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-disc-content">
        <MobileTopBar brandName={content.brandName} pageIndex={content.pageIndex} />

        <section className="mr-v2-disc-hero">
          <div className="mr-v2-page-kicker">{content.kicker}</div>
          <h1 className="mr-v2-disc-hero-title">
            {content.titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h1>
          <p className="mr-v2-disc-hero-subtitle">{content.subtitle}</p>
        </section>

        <img
          className="mr-v2-hero-brand-logo mr-v2-hero-brand-logo--large"
          src={BRAND_LOGO_HEADER}
          alt=""
          aria-hidden="true"
        />

        <section className="mr-v2-disc-snapshot-card">
          <div className="mr-v2-disc-snapshot-label">{content.snapshotLabel}</div>
          <p className="mr-v2-disc-snapshot-copy">
            {content.snapshotLead}{" "}
            <strong>{content.snapshotEmphasis}</strong>. {content.snapshotTail}
          </p>

          <ul className="mr-v2-disc-boundary-list">
            {content.boundaryItems.map((item) => (
              <li key={item.title} className="mr-v2-disc-boundary-item">
                <div className="mr-v2-disc-boundary-icon" aria-hidden="true">{item.icon}</div>
                <div>
                  <div className="mr-v2-disc-boundary-title">{item.title}</div>
                  <div className="mr-v2-disc-boundary-copy">{item.copy}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mr-v2-disc-snapshot-card">
          <div className="mr-v2-disc-snapshot-label">{content.useTitle}</div>
          <ul className="mr-v2-disc-boundary-list">
            {content.usageItems.map((item) => (
              <li key={item.label} className="mr-v2-disc-boundary-item">
                <div className="mr-v2-disc-boundary-icon" aria-hidden="true">◌</div>
                <div>
                  <div className="mr-v2-disc-boundary-title">{item.label}</div>
                  <div className="mr-v2-disc-boundary-copy">{item.copy}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mr-v2-disc-snapshot-card">
          <ul className="mr-v2-disc-boundary-list">
            {content.agencyItems.map((item) => (
              <li key={item.title} className="mr-v2-disc-boundary-item">
                <div className="mr-v2-disc-boundary-icon" aria-hidden="true">{item.icon}</div>
                <div>
                  <div className="mr-v2-disc-boundary-title">{item.title}</div>
                  <div className="mr-v2-disc-boundary-copy">{item.copy}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mr-v2-disc-mirror-card">
          <span>“{content.quoteLines[0]}</span>
          <br />
          <span>{content.quoteLines[1]}”</span>
        </section>

        <footer className="mr-v2-disc-bottom-card">
          <div className="mr-v2-disc-bottom-icon" aria-hidden="true">{content.bottomIcon}</div>
          <div>
            <div className="mr-v2-disc-bottom-title">{content.bottomTitle}</div>
            <div className="mr-v2-disc-bottom-copy">{content.bottomCopy}</div>
          </div>
        </footer>
      </section>
    </main>
  );
}
