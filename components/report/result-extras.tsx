"use client";

import Link from "next/link";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { RESULT_EXTRAS } from "@/lib/report/report-static-content";

type ResultExtrasProps = {
  codeString: string;
};

export function ResultExtras({ codeString }: ResultExtrasProps) {
  function copyCode() {
    void navigator.clipboard?.writeText(codeString);
  }

  return (
    <div className="report-extras space-y-5">
      <section className="glass-card report-extras-card">
        <h2 className="report-section-title">{RESULT_EXTRAS.goDeeperTitle}</h2>
        <p>{RESULT_EXTRAS.goDeeperBody}</p>
        <Link href="/full-report" className="gold-button mt-4 inline-flex">
          JOIN THE FULL REPORT WAITLIST
        </Link>
        <Link href="/sample-report" className="blueprint-secondary-link block mt-3">
          VIEW SAMPLE REPORT
        </Link>
      </section>

      <div className="report-extras-duo">
        <section className="glass-card report-extras-card report-extras-card--duo">
          <h2 className="report-section-title">{RESULT_EXTRAS.shareTitle}</h2>
          <p className="report-extras-card-hint">{RESULT_EXTRAS.shareHint}</p>
          <div className="report-extras-card-actions">
            <button type="button" className="lead-submit-button" onClick={copyCode}>
              {RESULT_EXTRAS.shareCopyLabel}
            </button>
          </div>
        </section>

        <section className="glass-card report-extras-card report-extras-card--duo">
          <h2 className="report-section-title">{RESULT_EXTRAS.emailTitle}</h2>
          <LeadCaptureForm
            source="result_email_code"
            buttonText="Send My Code to Email"
            className="report-extras-email-form"
          />
        </section>
      </div>

      <section className="glass-card report-extras-card">
        <h2 className="report-section-title">{RESULT_EXTRAS.faqTitle}</h2>
        <div className="blueprint-faq">
          {RESULT_EXTRAS.faq.map((item) => (
            <details key={item.q} className="blueprint-faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
