import Image from "next/image";
import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { ReportPage } from "@/components/full-report-v2/report-page";
import { resolveDisclaimerPageContent } from "@/lib/full-report-v2/resolve-disclaimer-page-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

type Page18DisclaimerProps = {
  payload: FullReportV2Payload;
};

const SEAL_NODE_CLASSES: Record<string, string> = {
  top: "fr-v2-disclaimer-node--top",
  right: "fr-v2-disclaimer-node--right",
  bottom: "fr-v2-disclaimer-node--bottom",
  left: "fr-v2-disclaimer-node--left",
};

export function Page18Disclaimer({ payload }: Page18DisclaimerProps) {
  const content = resolveDisclaimerPageContent(payload);

  return (
    <ReportPage sectionId="page-18-disclaimer" pageIndex={18} className="fr-v2-disclaimer-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell fr-v2-disclaimer-shell">
        <PageHeader pageIndex={18} />

        <section className="fr-v2-disclaimer-hero">
          <h1 className="fr-v2-disclaimer-hero-title">
            <span>{content.hero.pageNumber}</span>
            {content.hero.title}
          </h1>
          <div className="fr-v2-disclaimer-hero-subtitle">{content.hero.subtitle}</div>
          <p className="fr-v2-disclaimer-hero-description">{content.hero.description}</p>
        </section>

        <section className="fr-v2-disclaimer-main">
          <GlassPanel className="fr-v2-disclaimer-panel">
            <div className="fr-v2-small-panel-title">{content.interpretationTitle}</div>
            <div className="fr-v2-disclaimer-panel-body">
              <p className="fr-v2-disclaimer-body-copy">
                {content.interpretationLead}{" "}
                <strong>{content.interpretationEmphasis}</strong>. {content.interpretationLeadTail}
              </p>
              <p className="fr-v2-disclaimer-body-copy">{content.interpretationSecond}</p>
              <ul className="fr-v2-disclaimer-legal-list">
                {content.interpretationItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </GlassPanel>

          <GlassPanel className="fr-v2-disclaimer-center-panel">
            <div className="fr-v2-small-panel-title">{content.useTitle}</div>
            <div className="fr-v2-disclaimer-seal-area">
              {content.sealNodes.map((node) => (
                <div
                  key={node.position}
                  className={`fr-v2-disclaimer-node ${SEAL_NODE_CLASSES[node.position] ?? ""}`}
                >
                  <div className="fr-v2-disclaimer-node-icon">
                    <Image
                      src={node.iconUrl}
                      alt={node.iconAlt}
                      width={48}
                      height={48}
                      className="fr-v2-disclaimer-node-icon-img"
                      sizes="48px"
                    />
                  </div>
                  <div className="fr-v2-disclaimer-node-label">{node.label}</div>
                  <div className="fr-v2-disclaimer-node-copy">{node.copy}</div>
                </div>
              ))}
            </div>
            <div className="fr-v2-disclaimer-mirror-note">
              {content.mirrorLines.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </div>
            <div className="fr-v2-disclaimer-rights-box">{content.rightsCopy}</div>
          </GlassPanel>

          <GlassPanel className="fr-v2-disclaimer-panel">
            <div className="fr-v2-small-panel-title">{content.professionalTitle}</div>
            <div className="fr-v2-disclaimer-panel-body">
              <p className="fr-v2-disclaimer-body-copy">
                This report is <strong>not</strong> a medical, psychological, psychiatric, legal,
                financial, or professional advisory document.
              </p>
              <ul className="fr-v2-disclaimer-legal-list">
                {content.professionalItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="fr-v2-disclaimer-body-copy">{content.professionalClosing}</p>
            </div>
          </GlassPanel>
        </section>

        <footer className="fr-v2-disclaimer-bottom-band">
          {content.bottomSections.map((section) => (
            <section key={section.title} className="fr-v2-disclaimer-bottom-section">
              <div className="fr-v2-disclaimer-bottom-icon" aria-hidden="true">
                {section.icon}
              </div>
              <div>
                <div className="fr-v2-disclaimer-bottom-title">{section.title}</div>
                <div className="fr-v2-disclaimer-bottom-copy">{section.copy}</div>
              </div>
            </section>
          ))}
        </footer>
      </section>
    </ReportPage>
  );
}
