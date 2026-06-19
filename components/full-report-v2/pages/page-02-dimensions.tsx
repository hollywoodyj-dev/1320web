import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { ModuleWheel } from "@/components/full-report-v2/module-wheel";
import { PageFooter } from "@/components/full-report-v2/page-footer";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { ReportPage } from "@/components/full-report-v2/report-page";
import {
  DIMENSION_CATEGORIES,
  DIMENSIONS_FOOTER_ITEMS,
  DIMENSIONS_INTERACTION_ITEMS,
  DIMENSIONS_OVERVIEW_COPY,
  DIMENSIONS_SYSTEM_AT_GLANCE,
  DIMENSIONS_WHY_COPY,
} from "@/lib/full-report-v2/dimensions-static";

export function Page02Dimensions() {
  return (
    <ReportPage sectionId="page-02-dimensions" pageIndex={2} className="fr-v2-dimensions-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell fr-v2-dimensions-shell">
        <PageHeader pageIndex={2} />

        <section className="fr-v2-dimensions-hero">
          <h1 className="fr-v2-dimensions-hero-title">{DIMENSIONS_OVERVIEW_COPY.heroTitle}</h1>
          <p className="fr-v2-dimensions-hero-subtitle">
            {DIMENSIONS_OVERVIEW_COPY.heroSubtitle}
          </p>
        </section>

        <section className="fr-v2-dimensions-main">
          <aside className="fr-v2-dimensions-left">
            <GlassPanel className="fr-v2-dimensions-overview-panel">
              <div className="fr-v2-small-panel-title">The System at a Glance</div>
              {DIMENSIONS_SYSTEM_AT_GLANCE.map((paragraph, index) => (
                <p key={paragraph} className="fr-v2-dimensions-overview-copy">
                  {index === 0 ? (
                    <>
                      The <strong>1320 Soul Code System</strong> maps 10 dimensions of your soul
                      architecture.
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </GlassPanel>

            <GlassPanel className="fr-v2-dimensions-interaction-panel">
              <div className="fr-v2-small-panel-title">How They Interact</div>
              <ul className="fr-v2-dimensions-interaction-list">
                {DIMENSIONS_INTERACTION_ITEMS.map((item) => (
                  <li key={item.text} className="fr-v2-dimensions-interaction-item">
                    <div className="fr-v2-round-icon">{item.icon}</div>
                    <div>{item.text}</div>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </aside>

          <section className="fr-v2-dimensions-center">
            <ModuleWheel variant="overview" />
          </section>

          <aside className="fr-v2-dimensions-right">
            <GlassPanel className="fr-v2-dimensions-category-panel">
              <div className="fr-v2-small-panel-title">Dimension Categories</div>
              <div className="fr-v2-dimensions-category-list">
                {DIMENSION_CATEGORIES.map((category) => (
                  <div key={category.title} className="fr-v2-dimensions-category-item">
                    <div className="fr-v2-dimensions-category-icon">{category.icon}</div>
                    <div>
                      <div className="fr-v2-dimensions-category-title">{category.title}</div>
                      <div className="fr-v2-dimensions-category-copy">{category.copy}</div>
                      <div className="fr-v2-dimensions-category-codes">
                        {category.codes.map((code) => (
                          <span key={code}>
                            {code}
                            <br />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="fr-v2-dimensions-why-panel">
              <div className="fr-v2-small-panel-title">Why It Matters</div>
              <p className="fr-v2-dimensions-why-copy">{DIMENSIONS_WHY_COPY.lead}</p>
              <div className="fr-v2-dimensions-why-highlight">
                {DIMENSIONS_WHY_COPY.highlight}
              </div>
              <p className="fr-v2-dimensions-why-copy">{DIMENSIONS_WHY_COPY.closing}</p>
            </GlassPanel>
          </aside>
        </section>

        <PageFooter
          items={DIMENSIONS_FOOTER_ITEMS.map((item) => ({
            icon: item.icon,
            content: item.content.startsWith("Remember:")
              ? (
                  <>
                    <strong>Remember:</strong>
                    <br />
                    You are not here to become someone else. You are here to remember who you
                    truly are.
                  </>
                )
              : (
                  item.content
                ),
          }))}
        />
      </section>
    </ReportPage>
  );
}
