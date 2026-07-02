import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileSignatureContent } from "@/lib/mobile-report-v2/resolve-mobile-signature-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage03SignatureProps = {
  payload: FullReportV2Payload;
};

export function MobilePage03Signature({ payload }: MobilePage03SignatureProps) {
  const content = resolveMobileSignatureContent(payload);

  return (
    <main className="mr-v2-screen mr-v2-screen--signature" id="mobile-page-03-signature">
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-sig-content">
        <MobileTopBar brandName={content.brandName} pageIndex={content.pageIndex} />

        <section className="mr-v2-sig-hero">
          <div className="mr-v2-page-kicker">{content.kicker}</div>
          <h1 className="mr-v2-sig-hero-title">
            {content.titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h1>
          <p className="mr-v2-sig-hero-subtitle">{content.subtitle}</p>
        </section>

        <section className="mr-v2-sig-birth-card">
          <div className="mr-v2-sig-birth-label">{content.birthLabel}</div>
          <div className="mr-v2-sig-birth-date">{content.birthDateDisplay}</div>
          <div className="mr-v2-sig-birth-note">{content.sampleLabel}</div>
        </section>

        <section className="mr-v2-sig-card">
          <div className="mr-v2-sig-core-label">{content.coreLabel}</div>
          <div className="mr-v2-sig-line">{content.signatureLine}</div>
          <div className="mr-v2-sig-blueprint-sub">{content.blueprintSubtitle}</div>

          <div className="mr-v2-sig-code-list">
            {content.codeLayers.map((layer) => (
              <article key={layer.key} className="mr-v2-sig-code-item">
                <div className="mr-v2-sig-code-icon">
                  <SignatureSegmentCardIcon
                    imageUrl={layer.imageUrl}
                    code={layer.code}
                    title={layer.title}
                    fallbackIcon={layer.fallbackIcon}
                    size={58}
                  />
                </div>
                <div>
                  <div className="mr-v2-sig-code-main">{layer.code}</div>
                  <div className="mr-v2-sig-code-title">{layer.title}</div>
                  <div className="mr-v2-sig-code-desc">
                    <strong>{layer.dimension}</strong> · {layer.description}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-sig-info-grid">
          <article className="mr-v2-sig-info-card">
            <div className="mr-v2-sig-info-title">{content.whatTitle}</div>
            <ul className="mr-v2-sig-icon-list">
              {content.whatItems.map((item) => (
                <li key={item.text}>
                  <span className="mr-v2-sig-small-icon" aria-hidden="true">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="mr-v2-sig-info-card">
            <div className="mr-v2-sig-info-title">{content.explainTitle}</div>
            <p className="mr-v2-sig-body-copy">
              {content.explainLead}{" "}
              <strong>{content.explainEmphasis}</strong>
            </p>
          </article>
        </section>

        <section className="mr-v2-sig-next-card">
          <div className="mr-v2-sig-info-title">{content.nextTitle}</div>
          <div className="mr-v2-sig-next-body">
            <ul className="mr-v2-sig-icon-list">
              {content.nextItems.map((item) => (
                <li key={item.text}>
                  <span className="mr-v2-sig-small-icon" aria-hidden="true">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <p className="mr-v2-sig-body-copy mr-v2-sig-next-note">{content.nextNote}</p>
          </div>
        </section>

        <section className="mr-v2-sig-reminder-grid">
          {content.reminders.map((reminder) => (
            <article key={reminder.text} className="mr-v2-sig-reminder-card">
              <div className="mr-v2-sig-reminder-icon" aria-hidden="true">{reminder.icon}</div>
              <div className="mr-v2-sig-reminder-copy">{reminder.text}</div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
