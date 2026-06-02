"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { submitLead, trackEvent } from "@/lib/analytics";
import { READING_OPTIONS } from "@/lib/booking-content";
import { FORM_CONSENT, FORM_MESSAGES } from "@/lib/form-consent";

type BookingRequestFormProps = {
  defaultReadingType?: string;
};

export function BookingRequestForm({ defaultReadingType }: BookingRequestFormProps) {
  const [status, setStatus] = useState("");

  function onFocus() {
    trackEvent("booking_click", { source: "booking_form" });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const birthDate = String(data.get("birthDate") ?? "").trim();
    const code = String(data.get("code") ?? "").trim();
    const readingType = String(data.get("readingType") ?? "").trim();
    const timezone = String(data.get("timezone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const consent = data.get("consent") === "on";

    if (!firstName || !lastName || !email || !birthDate || !readingType || !consent) {
      setStatus(FORM_MESSAGES.bookingError);
      trackEvent("booking_submit", { status: "error" });
      return;
    }

    trackEvent("booking_submit", { status: "success", readingType });
    await submitLead({
      type: "booking",
      source: "booking_form",
      email,
      firstName,
      lastName,
      birthDate,
      code: code || undefined,
      readingType,
      timezone: timezone || undefined,
      message: message || undefined,
    });
    trackEvent("booking_success", { readingType });
    setStatus(FORM_MESSAGES.bookingSuccess);
    form.reset();
  }

  return (
    <form className="conversion-form" id="booking-form" onSubmit={onSubmit} onFocus={onFocus}>
      <div className="conversion-form-row">
        <label className="conversion-field">
          First Name
          <input name="firstName" required className="conversion-input" />
        </label>
        <label className="conversion-field">
          Last Name
          <input name="lastName" required className="conversion-input" />
        </label>
      </div>
      <label className="conversion-field">
        Email
        <input name="email" type="email" required className="conversion-input" />
      </label>
      <label className="conversion-field">
        Birth Date
        <input name="birthDate" type="date" required className="conversion-input" />
      </label>
      <label className="conversion-field">
        Your 1320 Code <span className="conversion-optional">(optional)</span>
        <input
          name="code"
          className="conversion-input"
          placeholder="e.g. S1-18 / S3-110 / S2-27 / S0-07"
        />
      </label>
      <label className="conversion-field">
        Preferred Reading Type
        <select
          name="readingType"
          required
          className="conversion-input"
          defaultValue={defaultReadingType ?? ""}
        >
          <option value="" disabled>
            Select a reading type
          </option>
          {READING_OPTIONS.options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title} ({option.duration})
            </option>
          ))}
          <option value="not-sure">Not Sure Yet</option>
        </select>
      </label>
      <label className="conversion-field">
        Timezone
        <input name="timezone" className="conversion-input" placeholder="e.g. America/New_York" />
      </label>
      <label className="conversion-field">
        What would you like to explore?
        <textarea
          name="message"
          required
          className="conversion-input conversion-textarea"
          placeholder="Share what you hope to understand or integrate..."
        />
      </label>
      <label className="conversion-consent">
        <input name="consent" type="checkbox" required className="mt-0.5" />
        <span>
          {FORM_CONSENT.booking}{" "}
          <Link href="/privacy" className="blueprint-secondary-link">
            Privacy Policy
          </Link>
        </span>
      </label>
      <button type="submit" className="gold-button">
        REQUEST BOOKING
      </button>
      {status ? <p className="conversion-status">{status}</p> : null}
    </form>
  );
}
