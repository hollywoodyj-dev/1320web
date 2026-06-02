"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { submitLead, trackEvent } from "@/lib/analytics";
import { FORM_CONSENT, FORM_MESSAGES } from "@/lib/form-consent";

type LeadCaptureFormProps = {
  source: string;
  buttonText?: string;
  className?: string;
};

export function LeadCaptureForm({
  source,
  buttonText = "Join Waitlist",
  className,
}: LeadCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !consent) {
      setStatus("Please provide an email and consent to continue.");
      return;
    }

    trackEvent("email_capture_submit", { source });
    await submitLead({ type: "email_capture", source, email });
    trackEvent("email_capture_success", { source });
    setStatus(FORM_MESSAGES.emailSuccess);
    setEmail("");
    setConsent(false);
  }

  return (
    <form onSubmit={onSubmit} className={className ? `lead-capture-form ${className}` : "lead-capture-form space-y-3"}>
      <label className="block text-sm text-[#F8F4EA]">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[#2A3551] bg-[#040813] px-3 py-2 text-sm"
          placeholder="you@example.com"
          required
        />
      </label>
      <label className="flex items-start gap-2 text-xs text-[#B9C1D0]">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          {FORM_CONSENT.emailCapture}{" "}
          <Link href="/privacy" className="blueprint-secondary-link">
            Privacy Policy
          </Link>
        </span>
      </label>
      <div className="lead-capture-form-actions">
        <button type="submit" className="lead-submit-button">
          {buttonText}
        </button>
      </div>
      {status ? <p className="text-xs text-[#B9C1D0]">{status}</p> : null}
    </form>
  );
}
