import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";

import { resolveMobileReflectionJournalContent } from "@/lib/mobile-report-v2/resolve-mobile-reflection-journal-content";

import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

import "@/styles/mobile-report-v2/mobile-reflection-journal.css";



type MobilePage30ReflectionJournalProps = {

  payload: FullReportV2Payload;

};



export function MobilePage30ReflectionJournal({

  payload,

}: MobilePage30ReflectionJournalProps) {

  const content = resolveMobileReflectionJournalContent(payload);



  return (

    <main

      className="mr-v2-screen mr-v2-screen--reflection-journal"

      id="mobile-page-30-reflection-journal"

    >

      <div className="mr-v2-cosmic-lines" aria-hidden="true" />



      <section className="mr-v2-rfj-content">

        <MobileTopBar

          brandName={content.brandName}

          brandSubtitle={content.brandSubtitle}

          pageIndex={content.pageIndex}

        />



        <section className="mr-v2-rfj-hero">

          <div className="mr-v2-rfj-hero-icon" aria-hidden="true">{content.heroIcon}</div>

          <h1 className="mr-v2-rfj-hero-title">

            {content.titleLine}

            <span className="mr-v2-rfj-hero-title-gold">{content.titleEmphasis}</span>

          </h1>

          <div className="mr-v2-rfj-kicker">{content.kicker}</div>

          <p className="mr-v2-rfj-hero-subtitle">{content.subtitle}</p>

        </section>



        <section className="mr-v2-rfj-glass-card mr-v2-rfj-why-card">

          <h2 className="mr-v2-rfj-section-title">{content.whyReflectionTitle}</h2>

          <p className="mr-v2-rfj-section-copy">{content.whyReflectionCopy}</p>

        </section>



        <section className="mr-v2-rfj-glass-card mr-v2-rfj-guidelines-card">

          <h2 className="mr-v2-rfj-section-title">{content.guidelinesTitle}</h2>

          <ul className="mr-v2-rfj-guidelines-list">

            {content.guidelines.map((item) => (

              <li key={item}>{item}</li>

            ))}

          </ul>

        </section>



        <section className="mr-v2-rfj-glass-card mr-v2-rfj-why-card">

          <p className="mr-v2-rfj-section-copy">{content.rememberCopy}</p>

        </section>



        <section className="mr-v2-rfj-glass-card mr-v2-rfj-use-card">

          <h2 className="mr-v2-rfj-section-title">{content.useTitle}</h2>

          <div className="mr-v2-rfj-use-grid">

            {content.useItems.map((item) => (

              <div key={item.copy} className="mr-v2-rfj-use-item">

                <div className="mr-v2-rfj-use-icon" aria-hidden="true">{item.icon}</div>

                <div className="mr-v2-rfj-use-copy">{item.copy}</div>

              </div>

            ))}

          </div>

        </section>



        <section className="mr-v2-rfj-glass-card mr-v2-rfj-prompt-cards-card">

          <h2 className="mr-v2-rfj-section-title">{content.promptsPanelTitle}</h2>

          <div className="mr-v2-rfj-prompt-cards-list">

            {content.promptCards.map((card) => (

              <article key={card.codeLabel} className="mr-v2-rfj-prompt-card-item">

                <div className="mr-v2-rfj-prompt-card-title">{card.displayTitle}</div>

                <div className="mr-v2-rfj-prompt-card-copy">{card.prompt}</div>

              </article>

            ))}

          </div>

        </section>



        <section className="mr-v2-rfj-glass-card mr-v2-rfj-checkin-card">

          <h2 className="mr-v2-rfj-section-title">{content.checkinTitle}</h2>

          <ul className="mr-v2-rfj-guidelines-list">

            {content.checkinQuestions.map((question) => (

              <li key={question}>{question}</li>

            ))}

          </ul>

        </section>



        <section className="mr-v2-rfj-glass-card mr-v2-rfj-journal-card">

          <div className="mr-v2-rfj-journal-title-row">

            <span className="mr-v2-rfj-journal-star" aria-hidden="true">✦</span>

            <h2 className="mr-v2-rfj-journal-title">{content.doodleTitle}</h2>

            <span className="mr-v2-rfj-journal-star" aria-hidden="true">✦</span>

          </div>



          <div className="mr-v2-rfj-journal-title-row">

            <span className="mr-v2-rfj-journal-star" aria-hidden="true">✦</span>

            <h2 className="mr-v2-rfj-journal-title">{content.journalTitle}</h2>

            <span className="mr-v2-rfj-journal-star" aria-hidden="true">✦</span>

          </div>

          <div className="mr-v2-rfj-journal-divider" aria-hidden="true">

            <span className="mr-v2-rfj-journal-divider-line" />

            <span className="mr-v2-rfj-journal-divider-gem">◆</span>

            <span className="mr-v2-rfj-journal-divider-line" />

          </div>



          <div className="mr-v2-rfj-journal-body">

            <div className="mr-v2-rfj-journal-lines" aria-hidden="true" />

            <textarea

              className="mr-v2-rfj-journal-input"

              placeholder={content.journalInputPlaceholder}

              aria-label="Reflection journal"

            />

          </div>

        </section>



        <section className="mr-v2-rfj-glass-card mr-v2-rfj-prompt-card">

          <div className="mr-v2-rfj-prompt-title">{content.soulInsightTitle}</div>

          <div className="mr-v2-rfj-prompt-copy">{content.soulInsightPrompt}</div>

        </section>



        <div className="mr-v2-rfj-quote-wrap">

          <span className="mr-v2-rfj-quote-star" aria-hidden="true">✦</span>

          <p className="mr-v2-rfj-quote">

            {content.quote.isStructured ? (

              <>

                {content.quote.before}

                <span className="mr-v2-rfj-quote-gold">{content.quote.emphasis}</span>

                {content.quote.after}

              </>

            ) : (

              content.quote.before

            )}

          </p>

          <span className="mr-v2-rfj-quote-star" aria-hidden="true">✦</span>

        </div>



        <div className="mr-v2-rfj-quote-flourish" aria-hidden="true">

          <span className="mr-v2-rfj-quote-flourish-line" />

          <span className="mr-v2-rfj-quote-flourish-gem">✧</span>

          <span className="mr-v2-rfj-quote-flourish-line" />

        </div>



        {content.footerLines.length > 0 ? (

          <div className="mr-v2-rfj-quote-wrap">

            {content.footerLines.map((line) => (

              <p key={line} className="mr-v2-rfj-quote">{line}</p>

            ))}

          </div>

        ) : null}



        <footer className="mr-v2-rfj-bottom-mantra">

          <div className="mr-v2-rfj-bottom-mantra-divider-row" aria-hidden="true">

            <span className="mr-v2-rfj-bottom-mantra-line" />

            <img

              className="mr-v2-rfj-bottom-mantra-logo"

              src={content.footerLotusLogoUrl}

              alt=""

            />

            <span className="mr-v2-rfj-bottom-mantra-line mr-v2-rfj-bottom-mantra-line--reverse" />

          </div>

          <p className="mr-v2-rfj-bottom-mantra-copy">

            <span>{content.mantraLeft}</span>

            <span className="mr-v2-rfj-bottom-mantra-star">{content.mantraCenter}</span>

            <span>{content.mantraRight}</span>

          </p>

        </footer>

      </section>

    </main>

  );

}


