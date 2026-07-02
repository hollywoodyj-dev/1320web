import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { ReportPage } from "@/components/full-report-v2/report-page";
import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { resolveJournalPageContent } from "@/lib/full-report-v2/resolve-journal-page-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type Page16JournalProps = {
  payload: FullReportV2Payload;
};

function JournalMiniLines({ count }: { count: number }) {
  return (
    <div className="fr-v2-journal-mini-lines" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="fr-v2-journal-mini-line" />
      ))}
    </div>
  );
}

function JournalWritingLines({ count }: { count: number }) {
  return (
    <div className="fr-v2-journal-writing-lines" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

function splitPromptParts(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const match = trimmed.match(/^(.+?[.!?])\s+(.+)$/);
  if (match) return [match[1].trim(), match[2].trim()];

  return [trimmed];
}

function JournalPromptQuestion({ text }: { text: string }) {
  const parts = splitPromptParts(text);

  return (
    <div className="fr-v2-journal-prompt-question" title={text}>
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 ? <br /> : null}
          {part}
        </span>
      ))}
    </div>
  );
}

export function Page16Journal({ payload }: Page16JournalProps) {
  const content = resolveJournalPageContent(payload);

  return (
    <ReportPage sectionId="page-16-journal" pageIndex={16} className="fr-v2-journal-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell fr-v2-journal-shell">
        <PageHeader pageIndex={16} />

        <section className="fr-v2-journal-hero">
          <h1 className="fr-v2-journal-hero-title">
            <span>{content.hero.pageNumber}</span>
            {content.hero.title}
          </h1>
          <div className="fr-v2-journal-hero-subtitle">{content.hero.subtitle}</div>
          <p className="fr-v2-journal-hero-description">{content.hero.description}</p>
        </section>

        <section className="fr-v2-journal-main">
          <aside className="fr-v2-journal-left-stack">
            <GlassPanel className="fr-v2-journal-side-panel">
              <div className="fr-v2-journal-large-icon-row">
                <div className="fr-v2-journal-large-icon" aria-hidden="true">✺</div>
                <div>
                  <div className="fr-v2-small-panel-title">{content.whyReflectionTitle}</div>
                  <p className="fr-v2-journal-body-copy">{content.whyReflectionCopy}</p>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="fr-v2-journal-side-panel">
              <div className="fr-v2-small-panel-title">{content.guidelinesTitle}</div>
              <ul className="fr-v2-journal-star-list">
                {content.guidelines.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel className="fr-v2-journal-side-panel fr-v2-journal-mini-panel">
              <div className="fr-v2-small-panel-title">{content.todayChooseTitle}</div>
              <JournalMiniLines count={2} />
            </GlassPanel>

            <GlassPanel className="fr-v2-journal-side-panel fr-v2-journal-mini-panel">
              <div className="fr-v2-small-panel-title">{content.gratefulTitle}</div>
              <JournalMiniLines count={2} />
            </GlassPanel>
          </aside>

          <GlassPanel className="fr-v2-journal-center-panel">
            <div className="fr-v2-small-panel-title">{content.promptsPanelTitle}</div>
            <div className="fr-v2-journal-prompt-grid">
              {content.promptCards.map((card) => (
                <article key={card.codeLabel} className="fr-v2-journal-prompt-card">
                  <div className="fr-v2-journal-prompt-head">
                    <SignatureSegmentCardIcon
                      imageUrl={card.iconUrl}
                      code={card.codeLabel}
                      title={card.themeTitle}
                      fallbackIcon={card.icon}
                      size={40}
                    />
                    <div className="fr-v2-journal-prompt-title">{card.displayTitle}</div>
                  </div>
                  <JournalPromptQuestion text={card.prompt} />
                  <JournalWritingLines count={2} />
                </article>
              ))}
            </div>
          </GlassPanel>

          <aside className="fr-v2-journal-right-stack">
            <GlassPanel className="fr-v2-journal-checkin-panel">
              <div className="fr-v2-small-panel-title">{content.checkinTitle}</div>
              {content.checkinQuestions.map((question) => (
                <div key={question} className="fr-v2-journal-checkin-block">
                  <div className="fr-v2-journal-checkin-question">{question}</div>
                  <JournalMiniLines count={1} />
                </div>
              ))}
            </GlassPanel>

            <GlassPanel className="fr-v2-journal-side-panel">
              <div className="fr-v2-small-panel-title">{content.soulInsightTitle}</div>
              <p className="fr-v2-journal-body-copy">{content.soulInsightPrompt}</p>
              <JournalMiniLines count={2} />
            </GlassPanel>

            <GlassPanel className="fr-v2-journal-doodle-panel">
              <div className="fr-v2-small-panel-title">{content.doodleTitle}</div>
              <div className="fr-v2-journal-doodle-space" aria-hidden="true" />
            </GlassPanel>
          </aside>
        </section>

        <footer className="fr-v2-journal-bottom-band">
          <section className="fr-v2-journal-bottom-card fr-v2-journal-remember-card">
            <div className="fr-v2-journal-mandala-mini" aria-hidden="true">✺</div>
            <div>
              <div className="fr-v2-small-panel-title">{content.rememberTitle}</div>
              <p className="fr-v2-journal-body-copy">{content.rememberCopy}</p>
            </div>
          </section>

          <section className="fr-v2-journal-bottom-card fr-v2-journal-quote-card">
            “{content.quote}”
          </section>

          <section className="fr-v2-journal-bottom-card">
            <div className="fr-v2-small-panel-title">{content.remembranceTitle}</div>
            <ul className="fr-v2-journal-remembrance-list">
              {content.remembranceItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </footer>

        <div className="fr-v2-journal-footer-mantra">
          {content.footerMantra.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </section>
    </ReportPage>
  );
}
