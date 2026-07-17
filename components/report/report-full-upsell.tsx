import Link from "next/link";
import { SAMPLE_REPORT_HREF } from "@/lib/site-nav";
import { REPORT_FULL_UPSELL } from "@/lib/report/report-static-content";

type ReportFullUpsellProps = {
  checkoutHref?: string;
  refined?: boolean;
};

export function ReportFullUpsell({ checkoutHref = "/checkout", refined = false }: ReportFullUpsellProps) {
  const sampleHref = REPORT_FULL_UPSELL.secondaryHref || SAMPLE_REPORT_HREF;

  return (
    <section
      className={`report-full-upsell glass-card${refined ? " report-full-upsell--refined" : ""}`}
      id="go-deeper"
    >
      {REPORT_FULL_UPSELL.title ? (
        <h2 className="report-section-title">{REPORT_FULL_UPSELL.title}</h2>
      ) : null}
      <p className="report-full-upsell-lead">{REPORT_FULL_UPSELL.lead}</p>
      <p className="report-full-upsell-body">{REPORT_FULL_UPSELL.body}</p>
      {REPORT_FULL_UPSELL.items.length > 0 ? (
        <ul className="report-full-upsell-list">
          {REPORT_FULL_UPSELL.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      <div className="report-full-upsell-actions">
        <Link href={checkoutHref} className="gold-button">
          {REPORT_FULL_UPSELL.primaryCta}
        </Link>
        <Link href={sampleHref} className="blueprint-secondary-link">
          {REPORT_FULL_UPSELL.secondaryCta}
        </Link>
      </div>
    </section>
  );
}
