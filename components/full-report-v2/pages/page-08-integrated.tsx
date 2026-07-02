import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { ReportGlyph } from "@/components/full-report-v2/report-glyph";
import { ReportPage } from "@/components/full-report-v2/report-page";
import {
  resolveIntegratedPageContent,
  type SoulCodeLogo,
} from "@/lib/full-report-v2/resolve-integrated-page-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type Page08IntegratedProps = {
  payload: FullReportV2Payload;
};

const SOUL_CODE_LOGO_SRC: Record<SoulCodeLogo, string> = {
  flame: "/logos/soul-code-logo-flame-gold.webp",
  mirror: "/logos/soul-code-logo-mirror-blue.webp",
  waves: "/logos/soul-code-logo-waves-lime.webp",
  ring: "/logos/soul-code-logo-ring-purple.webp",
};

function SoulCodeLogoIcon({ icon }: { icon: SoulCodeLogo }) {
  return (
    <img
      className="fr-v2-integrated-logo-icon"
      src={SOUL_CODE_LOGO_SRC[icon]}
      alt=""
      aria-hidden="true"
    />
  );
}

export function Page08Integrated({ payload }: Page08IntegratedProps) {
  const content = resolveIntegratedPageContent(payload);

  return (
    <ReportPage sectionId="page-08-integrated" pageIndex={8} className="fr-v2-integrated-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell fr-v2-integrated-shell">
        <PageHeader pageIndex={8} />

        <section className="fr-v2-integrated-hero">
          <h1 className="fr-v2-integrated-hero-title">
            <span>{content.hero.pageNumber}</span>
            {content.hero.title}
          </h1>
          <div className="fr-v2-integrated-hero-subtitle">{content.hero.subtitle}</div>
          <p className="fr-v2-integrated-hero-description">{content.hero.description}</p>
        </section>

        <section className="fr-v2-integrated-main">
          <aside className="fr-v2-integrated-left">
            <GlassPanel className="fr-v2-integrated-codes-panel">
              <div className="fr-v2-small-panel-title">Your Soul Codes</div>
              <div className="fr-v2-integrated-code-grid">
                {content.codes.map((item) => (
                  <div key={item.key} className="fr-v2-integrated-mini-code">
                    <div className={`fr-v2-integrated-mini-orb fr-v2-integrated-mini-orb--${item.key}`}>
                      {item.code}
                    </div>
                    <div className="fr-v2-integrated-mini-label">{item.label}</div>
                    <div className="fr-v2-integrated-mini-title">{item.title}</div>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="fr-v2-integrated-work-panel">
              <div className="fr-v2-small-panel-title">How Your Codes Work Together</div>
              <div className="fr-v2-integrated-role-list">
                {content.codeRoles.map((role) => (
                  <div key={role.key} className="fr-v2-integrated-role">
                    <div
                      className={`fr-v2-integrated-role-badge fr-v2-integrated-role-badge--${role.key}`}
                    >
                      {role.badge}
                    </div>
                    <div>{role.copy}</div>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="fr-v2-integrated-blend-panel">
              <div className="fr-v2-small-panel-title">Your Soul Archetype Blend</div>
              <div className="fr-v2-integrated-blend-content">
                <img
                  className="fr-v2-integrated-blend-logo"
                  src="/logos/soul-code-logo-archetype-blend-detailed.webp"
                  alt=""
                  aria-hidden="true"
                />
                <div className="fr-v2-integrated-blend-text">
                  <div className="fr-v2-integrated-blend-lead">You are a:</div>
                  <div className="fr-v2-integrated-blend-title">{content.archetypeTitle}</div>
                  <div className="fr-v2-integrated-blend-copy">{content.archetypeSummary}</div>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="fr-v2-integrated-gifts-panel">
              <div className="fr-v2-small-panel-title">Your Soul Gifts to the World</div>
              <ul className="fr-v2-integrated-gift-list">
                {content.gifts.map((gift) => (
                  <li key={gift}>{gift}</li>
                ))}
              </ul>
            </GlassPanel>
          </aside>

          <GlassPanel className="fr-v2-integrated-blueprint-panel">
            <div className="fr-v2-small-panel-title">Your Integrated Soul Blueprint</div>
            <div className="fr-v2-integrated-blueprint-map">
              <div className="fr-v2-integrated-node fr-v2-integrated-node--s1">
                <div className="fr-v2-integrated-node-orb">
                  <div className="fr-v2-integrated-node-code">S1</div>
                  <div className="fr-v2-integrated-node-name">Soul Origin</div>
                </div>
                <div className="fr-v2-integrated-node-copy">{content.s1Expression}</div>
              </div>

              <div className="fr-v2-integrated-node fr-v2-integrated-node--s2">
                <div className="fr-v2-integrated-node-orb">
                  <div className="fr-v2-integrated-node-code">S2</div>
                  <div className="fr-v2-integrated-node-name">Soul Mirror</div>
                </div>
                <div className="fr-v2-integrated-node-copy">{content.s2Expression}</div>
              </div>

              <div className="fr-v2-integrated-node fr-v2-integrated-node--s3">
                <div className="fr-v2-integrated-node-orb">
                  <div className="fr-v2-integrated-node-code">S3</div>
                  <div className="fr-v2-integrated-node-name">Soul Vibration</div>
                </div>
                <div className="fr-v2-integrated-node-copy">{content.s3Expression}</div>
              </div>

              <div className="fr-v2-integrated-node fr-v2-integrated-node--s0">
                <div className="fr-v2-integrated-node-orb">
                  <div className="fr-v2-integrated-node-code">S0</div>
                  <div className="fr-v2-integrated-node-name">Void Gate</div>
                </div>
                <div className="fr-v2-integrated-node-copy">{content.s0Expression}</div>
              </div>
            </div>
          </GlassPanel>

          <aside className="fr-v2-integrated-right">
            <GlassPanel className="fr-v2-integrated-synergy-panel">
              <div className="fr-v2-small-panel-title">Your Soul Synergy</div>
              <div className="fr-v2-integrated-synergy-list">
                {content.synergies.map((item) => (
                  <div key={item.title} className="fr-v2-integrated-synergy-item">
                    <div className="fr-v2-integrated-synergy-icon">
                      <SoulCodeLogoIcon icon={item.icon} />
                    </div>
                    <div>
                      <div className="fr-v2-integrated-synergy-title">{item.title}</div>
                      <div className="fr-v2-integrated-synergy-copy">{item.copy}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="fr-v2-integrated-flow-panel">
              <div className="fr-v2-small-panel-title">Your Life Purpose Flow</div>
              <div className="fr-v2-integrated-flow-row">
                {content.flowSteps.map((step) => (
                  <div key={step.title} className="fr-v2-integrated-flow-step">
                    <div className="fr-v2-integrated-flow-icon">
                      <SoulCodeLogoIcon icon={step.icon} />
                    </div>
                    <div className="fr-v2-integrated-flow-title">{step.title}</div>
                    <div className="fr-v2-integrated-flow-copy">{step.copy}</div>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </aside>
        </section>

        <footer className="fr-v2-integrated-bottom-band">
          <section className="fr-v2-integrated-bottom-section">
            <div className="fr-v2-round-icon">
              <ReportGlyph name="sprout" />
            </div>
            <div>
              <div className="fr-v2-integrated-bottom-title">Integration Guidance</div>
              <div className="fr-v2-integrated-bottom-copy">{content.integrationGuidance}</div>
            </div>
          </section>

          <section className="fr-v2-integrated-bottom-section">
            <div className="fr-v2-round-icon">
              <ReportGlyph name="compassStar" />
            </div>
            <div>
              <div className="fr-v2-integrated-bottom-title">See It. Own It. Live It.</div>
              <div className="fr-v2-integrated-bottom-copy">
                {content.seeItCopy}
                <br />
                <strong>{content.finalRemembrance}</strong>
              </div>
            </div>
          </section>
        </footer>
      </section>
    </ReportPage>
  );
}
