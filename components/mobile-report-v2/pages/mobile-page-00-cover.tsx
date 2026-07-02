import { BrandSeal } from "@/components/full-report-v2/brand-seal";
import { MobileCodeWheel } from "@/components/mobile-report-v2/mobile-code-wheel";
import { resolveMobileCoverContent } from "@/lib/mobile-report-v2/resolve-mobile-cover-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage00CoverProps = {
  payload: FullReportV2Payload;
};

export function MobilePage00Cover({ payload }: MobilePage00CoverProps) {
  const content = resolveMobileCoverContent(payload);

  return (
    <main className="mr-v2-screen" id="mobile-page-00-cover-screen">
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-cover-content">
        <BrandSeal size={44} className="mr-v2-top-seal" />

        <div className="mr-v2-brand-kicker">{content.brandName}</div>

        <h1 className="mr-v2-main-title">
          {content.mainTitleLines.map((line, index) => (
            <span key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </h1>

        <div className="mr-v2-title-divider" aria-hidden="true">
          <span />
        </div>

        <h2 className="mr-v2-sub-title">{content.subTitle}</h2>

        <MobileCodeWheel />

        <p className="mr-v2-tagline">{content.tagline}</p>

        <section className="mr-v2-prepared-card">
          <div className="mr-v2-prepared-label">{content.preparedLabel}</div>
          <h3 className="mr-v2-prepared-name">{content.name}</h3>

          <div className="mr-v2-mini-divider" aria-hidden="true" />

          <div className="mr-v2-birth-row">
            <div className="mr-v2-birth-icon" aria-hidden="true">▣</div>
            <div>
              <div className="mr-v2-birth-label">{content.birthLabel}</div>
              <div className="mr-v2-birth-date">{content.birthDateDisplay}</div>
            </div>
          </div>
        </section>

        <div className="mr-v2-version">{content.versionLabel}</div>
      </section>
    </main>
  );
}
