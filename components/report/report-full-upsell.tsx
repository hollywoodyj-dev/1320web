import Link from "next/link";
import { REPORT_FULL_UPSELL } from "@/lib/report/report-static-content";

export function ReportFullUpsell() {
  return (
    <section className="report-full-upsell glass-card" id="full-report-upsell">
      <p className="report-full-upsell-lead">{REPORT_FULL_UPSELL.lead}</p>
      <p className="report-full-upsell-body">{REPORT_FULL_UPSELL.body}</p>
      <ul className="report-full-upsell-list">
        {REPORT_FULL_UPSELL.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="report-full-upsell-actions">
        <Link href={REPORT_FULL_UPSELL.primaryHref} className="gold-button">
          {REPORT_FULL_UPSELL.primaryCta}
        </Link>
        <Link href={REPORT_FULL_UPSELL.secondaryHref} className="report-cta-outline">
          {REPORT_FULL_UPSELL.secondaryCta}
        </Link>
      </div>
    </section>
  );
}
