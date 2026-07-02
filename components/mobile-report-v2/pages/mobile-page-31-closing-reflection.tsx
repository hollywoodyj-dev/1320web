import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";

import { resolveMobileClosingReflectionContent } from "@/lib/mobile-report-v2/resolve-mobile-closing-reflection-content";

import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

import "@/styles/mobile-report-v2/mobile-closing-reflection.css";



type MobilePage31ClosingReflectionProps = {

  payload: FullReportV2Payload;

};



export function MobilePage31ClosingReflection({

  payload,

}: MobilePage31ClosingReflectionProps) {

  const content = resolveMobileClosingReflectionContent(payload);



  return (

    <main

      className="mr-v2-screen mr-v2-screen--closing-reflection"

      id="mobile-page-31-closing-reflection"

    >

      <div className="mr-v2-cosmic-lines" aria-hidden="true" />



      <section className="mr-v2-clr-content">

        <MobileTopBar

          brandName={content.brandName}

          brandSubtitle={content.brandSubtitle}

          pageIndex={content.pageIndex}

        />



        <section className="mr-v2-clr-hero">

          <div className="mr-v2-clr-hero-star" aria-hidden="true">{content.heroIcon}</div>

          <div className="mr-v2-page-kicker mr-v2-clr-kicker">{content.kicker}</div>

          <h1 className="mr-v2-clr-hero-title">

            {content.titleLine}

            <span className="mr-v2-clr-hero-title-gold">{content.titleEmphasis}</span>

          </h1>

          <p className="mr-v2-clr-hero-subtitle">{content.subtitle}</p>

        </section>



        <section className="mr-v2-clr-glass-card mr-v2-clr-closing-message">

          <h2 className="mr-v2-clr-section-title">{content.shownTitle}</h2>

          <div className="mr-v2-clr-closing-copy">

            {content.closingParagraphs.map((paragraph) => (

              <p key={paragraph} className="mr-v2-clr-closing-paragraph">{paragraph}</p>

            ))}

            {content.closingEmphasis ? (

              <p className="mr-v2-clr-closing-emphasis">

                <strong>{content.closingEmphasis}</strong>

              </p>

            ) : null}

          </div>

        </section>



        <section className="mr-v2-clr-glass-card mr-v2-clr-before-forward-card">

          <h2 className="mr-v2-clr-section-title">{content.beforeForwardTitle}</h2>

          <p className="mr-v2-clr-before-forward-copy">{content.beforeForwardCopy}</p>

        </section>



        <section className="mr-v2-clr-glass-card mr-v2-clr-reminders-card">

          <div className="mr-v2-clr-reminders-title-row">

            <span className="mr-v2-clr-reminders-star" aria-hidden="true">✦</span>

            <h2 className="mr-v2-clr-section-title">{content.remindersTitle}</h2>

            <span className="mr-v2-clr-reminders-star" aria-hidden="true">✦</span>

          </div>



          <div className="mr-v2-clr-reminder-list">

            {content.reminders.map((reminder) => (

              <article key={reminder.key} className="mr-v2-clr-reminder-item">

                <div className="mr-v2-clr-reminder-icon" aria-hidden="true">

                  {reminder.icon}

                </div>

                <div>

                  <div className="mr-v2-clr-reminder-title">{reminder.title}</div>

                  <div className="mr-v2-clr-reminder-copy">{reminder.copy}</div>

                </div>

              </article>

            ))}

          </div>

        </section>



        <section className="mr-v2-clr-glass-card mr-v2-clr-seal-card">

          <h2 className="mr-v2-clr-section-title">{content.sealTitle}</h2>

          <div className="mr-v2-clr-seal-list">

            {content.sealNodes.map((node) => (

              <article key={node.title} className="mr-v2-clr-seal-item">

                <div className="mr-v2-clr-seal-title">{node.title}</div>

                <div className="mr-v2-clr-seal-copy">{node.copy}</div>

              </article>

            ))}

          </div>

        </section>



        <section className="mr-v2-clr-glass-card mr-v2-clr-quote-card">

          <div className="mr-v2-clr-quote-mark" aria-hidden="true">“</div>

          <div className="mr-v2-clr-quote-copy">

            {content.quote.isStructured ? (

              <>

                {content.quote.before}

                <span className="mr-v2-clr-quote-gold">{content.quote.emphasis}</span>

                {content.quote.after}

              </>

            ) : (

              content.quote.before

            )}

          </div>

        </section>



        <section className="mr-v2-clr-glass-card mr-v2-clr-next-step-card">

          <h2 className="mr-v2-clr-section-title">{content.nextStepTitle}</h2>

          <p className="mr-v2-clr-next-step-copy">{content.nextStep}</p>

        </section>



        <section className="mr-v2-clr-glass-card mr-v2-clr-thank-card">

          <div className="mr-v2-clr-thank-icon" aria-hidden="true">♡</div>

          <div>

            <div className="mr-v2-clr-thank-title">{content.thankTitle}</div>

            <div className="mr-v2-clr-thank-copy">{content.thankCopy}</div>

          </div>

        </section>



        {content.footerLines.length > 0 ? (

          <section className="mr-v2-clr-glass-card mr-v2-clr-thank-card">

            {content.footerLines.map((line) => (

              <p key={line} className="mr-v2-clr-next-step-copy">{line}</p>

            ))}

          </section>

        ) : null}



        <footer className="mr-v2-clr-bottom-mantra">

          <div className="mr-v2-clr-bottom-mantra-divider-row" aria-hidden="true">

            <span className="mr-v2-clr-bottom-mantra-line" />

            <img

              className="mr-v2-clr-bottom-mantra-logo"

              src={content.footerLotusLogoUrl}

              alt=""

            />

            <span className="mr-v2-clr-bottom-mantra-line mr-v2-clr-bottom-mantra-line--reverse" />

          </div>

          <p className="mr-v2-clr-bottom-mantra-copy">

            <span>{content.mantraLeft}</span>

            <span className="mr-v2-clr-bottom-mantra-star">{content.mantraCenter}</span>

            <span>{content.mantraRight}</span>

          </p>

        </footer>

      </section>

    </main>

  );

}


