"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { submitLead, trackEvent } from "@/lib/analytics";
import { FORM_CONSENT, FORM_MESSAGES } from "@/lib/form-consent";

type FooterSubscribeProps = {
  variant?: "homepage" | "inner";
};

export function FooterSubscribe({ variant = "inner" }: FooterSubscribeProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !consent) {
      setStatus("Please enter your email and confirm consent.");
      return;
    }

    const source = "footer_subscribe";
    trackEvent("email_capture_submit", { source });
    await submitLead({ type: "newsletter", source, email: email.trim() });
    trackEvent("email_capture_success", { source });
    setStatus(FORM_MESSAGES.emailSuccess);
    setEmail("");
    setConsent(false);
  }

  const heading = variant === "homepage" ? "STAY CONNECTED" : "STAY CONNECTED";
  const lead =
    variant === "homepage"
      ? "Receive insights, guidance, and updates from the 1320 field."
      : "Receive updates from the 1320 Soul Origin Code System.";

  return (
    <div className={variant === "homepage" ? "footer-subscribe" : "inner-footer-subscribe"}>
      <h3>{heading}</h3>
      <p>{lead}</p>
      <form className="footer-subscribe-form" onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          aria-label="Email for newsletter"
        />
        <label className="footer-subscribe-consent">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
          />
          <span>
            {FORM_CONSENT.emailCapture}{" "}
            <Link href="/privacy" className="blueprint-secondary-link">
              Privacy Policy
            </Link>
          </span>
        </label>
        <button type="submit" className="gold-button">
          SUBSCRIBE
        </button>
        {status ? <p className="footer-subscribe-status">{status}</p> : null}
      </form>
    </div>
  );
}
