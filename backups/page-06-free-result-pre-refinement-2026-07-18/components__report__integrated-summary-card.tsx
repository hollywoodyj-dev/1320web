import Image from "next/image";
import { REPORT_SEAL_LOGO } from "@/lib/brand-assets";

export type IntegratedSummarySection = {
  label: string;
  body: string;
};

type IntegratedSummaryCardProps = {
  title: string;
  lead: string;
  body: string;
  integrationTheme?: string;
  error?: string;
  sections?: IntegratedSummarySection[];
};

export function IntegratedSummaryCard({
  title,
  lead,
  body,
  integrationTheme,
  error,
  sections,
}: IntegratedSummaryCardProps) {
  return (
    <section className="report-integrated glass-card" id="integrated">
      <div className="report-integrated-ring" aria-hidden>
        <div className="report-integrated-ring-glow" />
        <div className="report-integrated-ring-art">
          <Image
            src={REPORT_SEAL_LOGO}
            alt=""
            width={1254}
            height={1254}
            sizes="140px"
            className="report-integrated-ring-image"
          />
        </div>
      </div>
      <div className="report-integrated-copy">
        <h2 className="report-integrated-title text-gold-gradient">{title}</h2>
        <p className="report-integrated-lead">{lead}</p>
        {error ? <p className="report-synthesis-error">{error}</p> : null}
        {sections?.length ? (
          <div className="report-integrated-sections">
            {sections.map((section) => (
              <div key={section.label} className="report-integrated-section">
                <h3 className="report-field-label">{section.label}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        ) : body ? (
          <p className="report-integrated-body">{body}</p>
        ) : null}
        {integrationTheme ? (
          <p className="report-integration-theme">
            <strong>Main Integration Theme:</strong> {integrationTheme}
          </p>
        ) : null}
      </div>
    </section>
  );
}
