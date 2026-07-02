import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { PracticeDayCopySection } from "@/components/full-report-v2/practice-day-copy-section";
import { ReportGlyph } from "@/components/full-report-v2/report-glyph";
import { ReportPage } from "@/components/full-report-v2/report-page";
import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { PRACTICE_CLOSING_LINE } from "@/lib/full-report-v2/practice-page-static";
import { resolvePracticePageContent } from "@/lib/full-report-v2/resolve-practice-page-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type Page15PracticeProps = {
  payload: FullReportV2Payload;
};

export function Page15Practice({ payload }: Page15PracticeProps) {
  const content = resolvePracticePageContent(payload);

  return (
    <ReportPage sectionId="page-15-practice" pageIndex={15} className="fr-v2-practice-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell fr-v2-practice-shell">
        <PageHeader pageIndex={15} />

        <section className="fr-v2-practice-hero">
          <h1 className="fr-v2-practice-hero-title">
            <span>{content.hero.pageNumber}</span>
            {content.hero.title}
          </h1>
          <div className="fr-v2-practice-hero-subtitle">{content.hero.subtitle}</div>
          <p className="fr-v2-practice-hero-description">{content.hero.description}</p>
        </section>

        <section className="fr-v2-practice-main">
          <section className="fr-v2-practice-area">
            <GlassPanel className="fr-v2-practice-top-band">
              <div className="fr-v2-practice-purpose-icon" aria-hidden="true">✺</div>
              <div className="fr-v2-practice-purpose-body">
                <div className="fr-v2-practice-purpose-heading">{content.purposeTitle}</div>
                <div className="fr-v2-practice-purpose-copy">{content.purpose}</div>
              </div>
              <div className="fr-v2-practice-cycle-message">{content.openingReminder}</div>
            </GlassPanel>

            <section className="fr-v2-practice-day-grid">
              {content.days.map((day) => (
                <article key={day.dayNumber} className="fr-v2-practice-day-card">
                  <div className="fr-v2-practice-day-number">Day {day.dayNumber}</div>
                  <div className="fr-v2-practice-day-code">{day.codeLabel}</div>
                  <div className="fr-v2-practice-day-title">{day.themeTitle}</div>
                  <SignatureSegmentCardIcon
                    imageUrl={day.iconUrl}
                    code={day.codeLabel}
                    title={day.themeTitle}
                    fallbackIcon={day.icon}
                    size={72}
                  />

                  <div className="fr-v2-practice-day-sections">
                    <PracticeDayCopySection title="Focus" copy={day.focus} />
                    <PracticeDayCopySection title="Practice" copy={day.practice} />
                    <PracticeDayCopySection
                      title="Reflection"
                      copy={day.reflection}
                      copyClassName="fr-v2-practice-day-copy--reflection"
                    />
                  </div>
                </article>
              ))}
            </section>

            <div className="fr-v2-practice-repeat-note">
              <span className="fr-v2-practice-repeat-heart" aria-hidden="true">♡</span>
              {content.repeatNote}
            </div>
          </section>

          <aside className="fr-v2-practice-sidebar">
            <GlassPanel className="fr-v2-practice-sidebar-panel">
              <div className="fr-v2-small-panel-title">Daily Reminders</div>
              <ul className="fr-v2-practice-reminder-list">
                {content.reminders.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-practice-sidebar-panel">
              <div className="fr-v2-small-panel-title">Integration Guidelines</div>
              <ul className="fr-v2-practice-guideline-list">
                {content.guidelines.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-practice-sidebar-panel">
              <div className="fr-v2-small-panel-title">Wave Journal Prompt</div>
              <p className="fr-v2-practice-journal-intro">{content.journalIntro}</p>
              <ul className="fr-v2-practice-journal-list">
                {content.journalPrompts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-practice-quote-panel">
              <div className="fr-v2-practice-quote-icon">✶</div>
              <div className="fr-v2-practice-quote-copy">{content.integrationQuote}</div>
            </GlassPanel>
          </aside>
        </section>

        <footer className="fr-v2-practice-bottom-band">
          <section className="fr-v2-practice-bottom-section">
            <div className="fr-v2-practice-bottom-icon">✺</div>
            <div>
              <div className="fr-v2-practice-bottom-title">{content.supportsYouTitle}</div>
              <div className="fr-v2-practice-bottom-copy">{content.supportsYou}</div>
            </div>
          </section>

          <section className="fr-v2-practice-bottom-section">
            <div className="fr-v2-practice-bottom-icon">☽</div>
            <div>
              <div className="fr-v2-practice-bottom-title">{content.integrationTipTitle}</div>
              <div className="fr-v2-practice-bottom-copy">{content.integrationTip}</div>
            </div>
          </section>

          <section className="fr-v2-practice-bottom-section">
            <div className="fr-v2-practice-bottom-icon">
              <ReportGlyph name="compassStar" />
            </div>
            <div>
              <div className="fr-v2-practice-bottom-title">{content.keyInsightTitle}</div>
              <div className="fr-v2-practice-key-insight">
                {content.keyInsight}
                <br />
                <strong>{content.finalRemembrance}</strong>
              </div>
            </div>
          </section>
        </footer>

        <div className="fr-v2-practice-closing-line">{PRACTICE_CLOSING_LINE}</div>
      </section>
    </ReportPage>
  );
}
