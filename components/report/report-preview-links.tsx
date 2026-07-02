import Link from "next/link";
import {
  buildFullReportV2PreviewHref,
  buildMobileReportV2PreviewHref,
} from "@/lib/report/build-report-preview-href";

type ReportPreviewLinksProps = {
  birthDateLabel: string;
};

export function ReportPreviewLinks({ birthDateLabel }: ReportPreviewLinksProps) {
  const fullReportHref = buildFullReportV2PreviewHref(birthDateLabel);
  const mobileReportHref = buildMobileReportV2PreviewHref(birthDateLabel);

  return (
    <section className="glass-card report-preview-links" aria-label="Full report previews">
      <h2 className="report-section-title">Full Report Previews</h2>
      <p className="report-preview-links-note">
        Same birth date as this page ({birthDateLabel}). Open desktop or mobile v2 to QA layout and
        content.
      </p>
      <div className="report-preview-links-actions">
        <Link href={fullReportHref} className="gold-button report-preview-links-button" target="_blank" rel="noreferrer">
          Open desktop full report v2
        </Link>
        <Link href={mobileReportHref} className="gold-button report-preview-links-button" target="_blank" rel="noreferrer">
          Open mobile report v2
        </Link>
      </div>
      <ul className="report-preview-links-urls">
        <li>
          <span className="report-preview-links-url-label">Desktop:</span>
          <a href={fullReportHref} className="blueprint-secondary-link" target="_blank" rel="noreferrer">
            {fullReportHref}
          </a>
        </li>
        <li>
          <span className="report-preview-links-url-label">Mobile:</span>
          <a href={mobileReportHref} className="blueprint-secondary-link" target="_blank" rel="noreferrer">
            {mobileReportHref}
          </a>
        </li>
      </ul>
    </section>
  );
}
