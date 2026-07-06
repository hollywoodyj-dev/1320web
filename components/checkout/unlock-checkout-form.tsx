"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { FORM_CONSENT } from "@/lib/form-consent";

type UnlockCheckoutFormProps = {
  defaultYear?: number;
  defaultMonth?: number;
  defaultDay?: number;
  defaultEmail?: string;
  defaultFirstName?: string;
  profileLocked?: boolean;
  source?: string;
};

export function UnlockCheckoutForm({
  defaultYear,
  defaultMonth,
  defaultDay,
  defaultEmail,
  defaultFirstName,
  profileLocked = false,
  source = "checkout_page",
}: UnlockCheckoutFormProps) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const firstName = String(data.get("firstName") ?? "").trim();
    const year = Number(data.get("year"));
    const month = Number(data.get("month"));
    const day = Number(data.get("day"));
    const consent = data.get("consent") === "on";

    if (!email || !consent) {
      setStatus("Please provide your email and consent to continue.");
      setLoading(false);
      return;
    }

    trackEvent("checkout_start", { source });

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, year, month, day }),
      });

      let json: { ok?: boolean; url?: string; error?: string } = {};
      try {
        json = (await response.json()) as { ok?: boolean; url?: string; error?: string };
      } catch {
        setStatus("Checkout could not be started. Please try again.");
        setLoading(false);
        return;
      }

      if (!response.ok || !json.ok || !json.url) {
        setStatus(json.error ?? "Checkout could not be started. Please try again.");
        setLoading(false);
        return;
      }

      trackEvent("checkout_redirect", { source });
      window.location.href = json.url;
    } catch {
      setStatus("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form className="conversion-form checkout-form" onSubmit={onSubmit}>
      {profileLocked && defaultEmail ? (
        <div className="glass-card mb-4 p-4 text-sm space-y-1">
          <p>
            Checkout as <strong>{defaultFirstName || "you"}</strong> ({defaultEmail})
          </p>
          <p className="opacity-80">
            Birth date: {defaultYear}-{String(defaultMonth).padStart(2, "0")}-{String(defaultDay).padStart(2, "0")}
          </p>
          <input type="hidden" name="email" value={defaultEmail} />
          <input type="hidden" name="firstName" value={defaultFirstName ?? ""} />
          <input type="hidden" name="year" value={defaultYear} />
          <input type="hidden" name="month" value={defaultMonth} />
          <input type="hidden" name="day" value={defaultDay} />
        </div>
      ) : (
        <>
          <label className="conversion-field">
            Email
            <input
              name="email"
              type="email"
              required
              className="conversion-input"
              placeholder="you@example.com"
              defaultValue={defaultEmail}
            />
          </label>
          <label className="conversion-field">
            First Name <span className="conversion-optional">(optional)</span>
            <input
              name="firstName"
              className="conversion-input"
              placeholder="Your first name"
              defaultValue={defaultFirstName}
            />
          </label>
          <div className="conversion-form-row">
            <label className="conversion-field">
              Birth Year
              <input
                name="year"
                type="number"
                required
                className="conversion-input"
                defaultValue={defaultYear}
                min={1900}
                max={2100}
              />
            </label>
            <label className="conversion-field">
              Month
              <input
                name="month"
                type="number"
                required
                className="conversion-input"
                defaultValue={defaultMonth}
                min={1}
                max={12}
              />
            </label>
            <label className="conversion-field">
              Day
              <input
                name="day"
                type="number"
                required
                className="conversion-input"
                defaultValue={defaultDay}
                min={1}
                max={31}
              />
            </label>
          </div>
        </>
      )}
      <label className="conversion-consent">
        <input name="consent" type="checkbox" required className="mt-0.5" />
        <span>
          {FORM_CONSENT.waitlist}{" "}
          <Link href="/privacy" className="blueprint-secondary-link">
            Privacy Policy
          </Link>
        </span>
      </label>
      <button type="submit" className="gold-button" disabled={loading}>
        {loading ? "REDIRECTING TO CHECKOUT…" : "UNLOCK MY FULL BLUEPRINT"}
      </button>
      {status ? <p className="conversion-status">{status}</p> : null}
      <p className="checkout-form-note">
        One-time purchase. After payment, sign in with your account password to return to your Full Report anytime.
      </p>
    </form>
  );
}
