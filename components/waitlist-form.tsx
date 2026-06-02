"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { submitLead, trackEvent } from "@/lib/analytics";
import { FORM_CONSENT, FORM_MESSAGES } from "@/lib/form-consent";

type WaitlistFormProps = {
  source?: string;
  buttonText?: string;
  showBirthDate?: boolean;
};

export function WaitlistForm({
  source = "full_report_waitlist",
  buttonText = "JOIN THE WAITLIST",
  showBirthDate = true,
}: WaitlistFormProps) {
  const [status, setStatus] = useState("");

  function onFocus() {
    trackEvent("full_report_waitlist_click", { source });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const birthDate = String(data.get("birthDate") ?? "").trim();
    const consent = data.get("consent") === "on";

    if (!firstName || !email || !consent) {
      setStatus(FORM_MESSAGES.waitlistError);
      trackEvent("waitlist_submit", { source, status: "error" });
      return;
    }

    trackEvent("waitlist_submit", { source, status: "success" });
    await submitLead({
      type: "waitlist",
      source,
      email,
      firstName,
      birthDate: birthDate || undefined,
    });
    trackEvent("waitlist_success", { source });
    setStatus(FORM_MESSAGES.waitlistSuccess);
    form.reset();
  }

  return (
    <form className="conversion-form" onSubmit={onSubmit} onFocus={onFocus}>
      <label className="conversion-field">
        First Name
        <input name="firstName" required className="conversion-input" placeholder="Your first name" />
      </label>
      <label className="conversion-field">
        Email
        <input
          name="email"
          type="email"
          required
          className="conversion-input"
          placeholder="you@example.com"
        />
      </label>
      {showBirthDate ? (
        <label className="conversion-field">
          Birth Date <span className="conversion-optional">(optional)</span>
          <input name="birthDate" type="date" className="conversion-input" />
        </label>
      ) : null}
      <label className="conversion-consent">
        <input name="consent" type="checkbox" required className="mt-0.5" />
        <span>
          {FORM_CONSENT.waitlist}{" "}
          <Link href="/privacy" className="blueprint-secondary-link">
            Privacy Policy
          </Link>
        </span>
      </label>
      <button type="submit" className="gold-button">
        {buttonText}
      </button>
      {status ? <p className="conversion-status">{status}</p> : null}
    </form>
  );
}
