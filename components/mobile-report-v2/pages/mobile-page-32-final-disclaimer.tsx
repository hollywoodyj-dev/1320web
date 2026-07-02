import { MobileTopBar } from "@/components/mobile-report-v2/mobile-top-bar";

import { resolveMobileFinalDisclaimerContent } from "@/lib/mobile-report-v2/resolve-mobile-final-disclaimer-content";

import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

import "@/styles/mobile-report-v2/mobile-final-disclaimer.css";



type MobilePage32FinalDisclaimerProps = {

  payload: FullReportV2Payload;

};



export function MobilePage32FinalDisclaimer({

  payload,

}: MobilePage32FinalDisclaimerProps) {

  const content = resolveMobileFinalDisclaimerContent(payload);



  return (

    <main

      className="mr-v2-screen mr-v2-screen--final-disclaimer"

      id="mobile-page-32-final-disclaimer"

    >

      <div className="mr-v2-cosmic-lines" aria-hidden="true" />



      <section className="mr-v2-fd-content">

        <MobileTopBar

          brandName={content.brandName}

          brandSubtitle={content.brandSubtitle}

          pageIndex={content.pageIndex}

        />



        <section className="mr-v2-fd-hero">

          <div className="mr-v2-page-kicker mr-v2-fd-kicker">{content.kicker}</div>

          <h1 className="mr-v2-fd-hero-title">{content.title}</h1>

          <p className="mr-v2-fd-hero-subtitle">{content.subtitle}</p>

          <p className="mr-v2-fd-hero-note">
            {content.heroNote.lead}{" "}
            <strong>{content.heroNote.emphasis}</strong>
            {content.heroNote.tail ? `. ${content.heroNote.tail}` : "."}
          </p>

        </section>



        <section className="mr-v2-fd-glass-card mr-v2-fd-disclaimer-card">

          <h2 className="mr-v2-fd-section-title">{content.sectionTitle}</h2>

          <div className="mr-v2-fd-disclaimer-list">

            {content.disclaimerItems.map((item) => (

              <article key={item.key} className="mr-v2-fd-disclaimer-item">

                <div className="mr-v2-fd-disclaimer-icon" aria-hidden="true">

                  {item.icon}

                </div>

                <div>

                  <div className="mr-v2-fd-disclaimer-title">{item.title}</div>

                  <div className="mr-v2-fd-disclaimer-copy">{item.copy}</div>

                </div>

              </article>

            ))}

          </div>

        </section>



        <section className="mr-v2-fd-glass-card mr-v2-fd-disclaimer-card">

          <h2 className="mr-v2-fd-section-title">{content.useTitle}</h2>

          <div className="mr-v2-fd-disclaimer-list">

            {content.usageItems.map((item) => (

              <article key={item.key} className="mr-v2-fd-disclaimer-item">

                <div className="mr-v2-fd-disclaimer-icon" aria-hidden="true">◌</div>

                <div>

                  <div className="mr-v2-fd-disclaimer-title">{item.label}</div>

                  <div className="mr-v2-fd-disclaimer-copy">{item.copy}</div>

                </div>

              </article>

            ))}

          </div>

        </section>



        <section className="mr-v2-fd-glass-card mr-v2-fd-disclaimer-card">

          {content.agencySections.map((section) => (

            <article key={section.key} className="mr-v2-fd-disclaimer-item">

              <div className="mr-v2-fd-disclaimer-icon" aria-hidden="true">{section.icon}</div>

              <div>

                <div className="mr-v2-fd-disclaimer-title">{section.title}</div>

                <div className="mr-v2-fd-disclaimer-copy">{section.copy}</div>

              </div>

            </article>

          ))}

        </section>



        <section className="mr-v2-fd-glass-card mr-v2-fd-professional-card">

          <h2 className="mr-v2-fd-section-title">{content.professionalTitle}</h2>

          <p className="mr-v2-fd-professional-intro">{content.professionalIntro}</p>

          <ul className="mr-v2-fd-professional-list">

            {content.professionalItems.map((item) => (

              <li key={item}>{item}</li>

            ))}

          </ul>

        </section>



        <section className="mr-v2-fd-glass-card mr-v2-fd-remember-card">

          <div className="mr-v2-fd-remember-icon" aria-hidden="true">

            {content.rememberIcon}

          </div>

          <div>

            <div className="mr-v2-fd-remember-title">{content.rememberTitle}</div>

            <div className="mr-v2-fd-remember-copy">

              {content.remember.isStructured ? (

                <>

                  {content.remember.before}

                  <strong>{content.remember.emphasis}</strong>

                  {content.remember.after}

                </>

              ) : (

                content.remember.before

              )}

            </div>

          </div>

        </section>



        <p className="mr-v2-fd-thank-you">{content.thankYouLine}</p>

        <p className="mr-v2-fd-rights-copy">{content.rightsCopy}</p>

        <p className="mr-v2-fd-closing-words">{content.closingWords}</p>



        <footer className="mr-v2-fd-bottom-mantra">

          <div className="mr-v2-fd-bottom-mantra-divider-row" aria-hidden="true">

            <span className="mr-v2-fd-bottom-mantra-line" />

            <img

              className="mr-v2-fd-bottom-mantra-logo"

              src={content.footerLotusLogoUrl}

              alt=""

            />

            <span className="mr-v2-fd-bottom-mantra-line mr-v2-fd-bottom-mantra-line--reverse" />

          </div>

          <p className="mr-v2-fd-bottom-mantra-copy">

            <span>{content.mantraLeft}</span>

            <span className="mr-v2-fd-bottom-mantra-star">{content.mantraCenter}</span>

            <span>{content.mantraRight}</span>

          </p>

        </footer>

      </section>

    </main>

  );

}


