import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { PageFooter } from "@/components/full-report-v2/page-footer";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { ReportPage } from "@/components/full-report-v2/report-page";
import {
  OPENING_FOOTER_ITEMS,
  OPENING_GUIDANCE_ROWS,
  OPENING_HOW_TO_USE,
  OPENING_NOT_LIST,
} from "@/lib/full-report-v2/opening-static";

export function Page01Opening() {
  return (
    <ReportPage sectionId="page-01-opening" pageIndex={1} className="fr-v2-opening-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell">
        <PageHeader pageIndex={1} />

        <section className="fr-v2-opening-main">
          <div className="fr-v2-opening-left">
            <div className="fr-v2-opening-note">
              <h1 className="fr-v2-opening-title">Opening Note</h1>
              <div className="fr-v2-gold-divider" />
              <p className="fr-v2-opening-lead">
                Welcome to your <strong>Full 1320 Soul Origin Report</strong>.
              </p>
              <p className="fr-v2-body-copy">
                This report is a symbolic mirror of your soul pattern through the{" "}
                <strong>1320 Soul Origin Code System</strong>. It reflects the unique
                combination of your inner architecture, soul vibration, relational mirrors,
                shadow patterns, mission direction, value and receiving frequency,
                sovereignty, contribution, and path of return.
              </p>
              <p className="fr-v2-body-copy">
                It is designed to support your self-awareness, integration, and conscious
                return. There is nothing to “fix” here — only to remember, understand, and
                embody.
              </p>
            </div>

            <GlassPanel className="fr-v2-use-panel">
              <div className="fr-v2-small-panel-title">How to Use This Report</div>
              <ul className="fr-v2-use-list">
                {OPENING_HOW_TO_USE.map((item) => (
                  <li key={item.title} className="fr-v2-use-item">
                    <div className="fr-v2-round-icon">{item.icon}</div>
                    <div>
                      <div className="fr-v2-use-title">{item.title}</div>
                      <div className="fr-v2-use-desc">{item.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </div>

          <section className="fr-v2-hero-statement">
            <h2 className="fr-v2-hero-title">Disclaimer &amp; Guidance</h2>
            <p className="fr-v2-hero-subtitle">
              This is a symbolic self-awareness report,
              <br />
              not a prediction, diagnosis, or prescription.
            </p>
          </section>

          <GlassPanel className="fr-v2-guidance-panel">
            <div className="fr-v2-small-panel-title">Important Guidance</div>
            <div>
              {OPENING_GUIDANCE_ROWS.map((row) => (
                <div key={row.title} className="fr-v2-guidance-row">
                  <div className="fr-v2-guidance-icon">{row.icon}</div>
                  <div className="fr-v2-guidance-title">
                    {row.title.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < row.title.split("\n").length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </div>
                  <div className="fr-v2-guidance-copy">{row.copy}</div>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="fr-v2-not-panel">
            <div className="fr-v2-small-panel-title">This Report Is Not</div>
            <ul className="fr-v2-not-list">
              {OPENING_NOT_LIST.map((item) => (
                <li key={item.text} className="fr-v2-not-item">
                  <div className="fr-v2-not-icon">{item.icon}</div>
                  <div className="fr-v2-not-copy">{item.text}</div>
                </li>
              ))}
            </ul>
          </GlassPanel>

          <GlassPanel className="fr-v2-mini-card fr-v2-intention-card">
            <div className="fr-v2-star-icon">✶</div>
            <div>
              <div className="fr-v2-mini-card-title">Core Intention</div>
              <div className="fr-v2-mini-card-copy">
                This report exists to help you remember your essence, understand your
                patterns, and navigate your life with more clarity, compassion, and
                conscious choice.
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="fr-v2-role-panel">
            <div>
              <div className="fr-v2-role-title">Your Role</div>
              <div className="fr-v2-role-copy">
                You are the author of your life. This report is here to support your
                awareness — the power is always yours.
              </div>
            </div>
            <div className="fr-v2-human-orbit">♙</div>
          </GlassPanel>
        </section>

        <PageFooter
          items={OPENING_FOOTER_ITEMS.map((item) => ({
            icon: item.icon,
            content: item.content,
          }))}
        />
      </section>
    </ReportPage>
  );
}
