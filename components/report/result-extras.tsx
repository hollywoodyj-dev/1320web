"use client";

import Link from "next/link";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { RESULT_EXTRAS } from "@/lib/report/report-static-content";
import { FREE_RESULT_FAQ, FREE_RESULT_KEEP } from "@/lib/result-content";

type ResultExtrasProps = {
  codeString: string;
  refined?: boolean;
};

export function ResultExtras({ codeString, refined = false }: ResultExtrasProps) {
  function copyCode() {
    void navigator.clipboard?.writeText(codeString);
  }

  const faq = refined ? FREE_RESULT_FAQ : RESULT_EXTRAS.faq;

  return (
    <div className={`report-extras space-y-5${refined ? " report-extras--refined" : ""}`}>
      <div className="report-extras-duo" id="keep-code">
        <section className="glass-card report-extras-card report-extras-card--duo">
          <h2 className="report-section-title">
            {refined ? FREE_RESULT_KEEP.title : RESULT_EXTRAS.shareTitle}
          </h2>
          <p className="report-extras-card-hint">
            {refined ? FREE_RESULT_KEEP.body : RESULT_EXTRAS.shareHint}
          </p>
          <div className="report-extras-card-actions">
            <button type="button" className="lead-submit-button" onClick={copyCode}>
              {refined ? FREE_RESULT_KEEP.copyLabel : RESULT_EXTRAS.shareCopyLabel}
            </button>
          </div>
        </section>

        <section className="glass-card report-extras-card report-extras-card--duo">
          <h2 className="report-section-title">
            {refined ? FREE_RESULT_KEEP.emailLabel : RESULT_EXTRAS.emailTitle}
          </h2>
          {refined ? (
            <p className="report-extras-card-hint">{RESULT_EXTRAS.emailHint}</p>
          ) : null}
          <LeadCaptureForm
            source="result_email_code"
            buttonText={refined ? FREE_RESULT_KEEP.emailLabel : RESULT_EXTRAS.emailTitle}
            className="report-extras-email-form"
          />
        </section>
      </div>

      <section className="glass-card report-extras-card">
        <h2 className="report-section-title">{RESULT_EXTRAS.faqTitle}</h2>
        <div className="blueprint-faq">
          {faq.map((item) => (
            <details key={item.q} className="blueprint-faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        {refined ? (
          <Link href="/faq" className="blueprint-secondary-link block mt-4">
            View Full FAQ
          </Link>
        ) : null}
      </section>
    </div>
  );
}
