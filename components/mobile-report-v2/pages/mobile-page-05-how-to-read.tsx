import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";
import { resolveMobileHowToReadContent } from "@/lib/mobile-report-v2/resolve-mobile-how-to-read-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type MobilePage05HowToReadProps = {
  payload: FullReportV2Payload;
};

export function MobilePage05HowToRead({ payload }: MobilePage05HowToReadProps) {
  const content = resolveMobileHowToReadContent(payload);

  return (
    <main className="mr-v2-screen mr-v2-screen--how-to-read" id="mobile-page-05-how-to-read">
      <div className="mr-v2-cosmic-lines" aria-hidden="true" />

      <section className="mr-v2-read-content">
        <MobileTopBar brandName={content.brandName} pageIndex={content.pageIndex} />

        <section className="mr-v2-read-hero-block mr-v2-read-hero-block--has-bg">
          <div
            className="mr-v2-read-hero-bg"
            style={{ backgroundImage: `url(${content.heroBackgroundUrl})` }}
            aria-hidden="true"
          />
          <section className="mr-v2-read-hero">
            <div className="mr-v2-page-kicker">{content.kicker}</div>
            <h1 className="mr-v2-read-hero-title">
              {content.titleLines.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </h1>
            <p className="mr-v2-read-hero-subtitle">{content.subtitle}</p>
          </section>
          <div className="mr-v2-read-horizon" aria-hidden="true" />
        </section>

        <section className="mr-v2-read-glass-card mr-v2-read-structure-card">
          <h2 className="mr-v2-read-section-title">{content.structureTitle}</h2>
          <div className="mr-v2-read-structure-grid">
            {content.structureItems.map((item) => (
              <article key={item.subtitle} className="mr-v2-read-structure-item">
                <div className="mr-v2-read-structure-icon" aria-hidden="true">{item.icon}</div>
                <div className="mr-v2-read-structure-name">
                  {item.nameLines.map((line, index) => (
                    <span key={line}>
                      {index > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </div>
                <div className="mr-v2-read-structure-sub">{item.subtitle}</div>
                <div className="mr-v2-read-structure-divider" aria-hidden="true" />
                <div className="mr-v2-read-structure-copy">{item.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-read-glass-card mr-v2-read-reminder-card">
          <h2 className="mr-v2-read-section-title">{content.remindersTitle}</h2>
          <div className="mr-v2-read-reminder-list">
            {content.reminderItems.map((item) => (
              <article key={item.title} className="mr-v2-read-reminder-item">
                <div className="mr-v2-read-reminder-icon" aria-hidden="true">{item.icon}</div>
                <div>
                  <div className="mr-v2-read-reminder-title">{item.title}</div>
                  <div className="mr-v2-read-reminder-copy">{item.copy}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-read-glass-card mr-v2-read-use-card">
          <h2 className="mr-v2-read-section-title">{content.useTitle}</h2>
          <div className="mr-v2-read-use-grid">
            {content.useItems.map((item) => (
              <article key={item.copy} className="mr-v2-read-use-item">
                <div className="mr-v2-read-use-icon" aria-hidden="true">{item.icon}</div>
                <div className="mr-v2-read-use-title">
                  {item.titleLines.map((line, index) => (
                    <span key={line}>
                      {index > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </div>
                <div className="mr-v2-read-use-copy">{item.copy}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mr-v2-read-glass-card mr-v2-read-closing-card">
          <div className="mr-v2-read-closing-icon" aria-hidden="true">{content.closingIcon}</div>
          <div>
            <div className="mr-v2-read-closing-title">{content.closingTitle}</div>
            <div className="mr-v2-read-closing-copy">{content.closingCopy}</div>
          </div>
        </section>
      </section>
    </main>
  );
}
