"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { submitLead, trackEvent } from "@/lib/analytics";
import { BOOKING_FINAL, READING_OPTIONS } from "@/lib/booking-content";
import { FORM_CONSENT, FORM_MESSAGES } from "@/lib/form-consent";

export type BookingAccountProfile = {
  email: string;
  firstName: string | null;
  lastName: string | null;
  birthDate: string | null;
  codeString: string | null;
};

type BookingRequestFormProps = {
  defaultReadingType?: string;
  account?: BookingAccountProfile | null;
};

export function BookingRequestForm({ defaultReadingType, account }: BookingRequestFormProps) {
  const [status, setStatus] = useState("");
  const [prepUrl, setPrepUrl] = useState("");
  const signedIn = Boolean(account?.email);

  function onFocus() {
    trackEvent("booking_click", { source: "booking_form" });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const readingType = String(formData.get("readingType") ?? "").trim();
    const timezone = String(formData.get("timezone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const consent = formData.get("consent") === "on";

    const firstName = account?.firstName ?? String(formData.get("firstName") ?? "").trim();
    const lastName = account?.lastName ?? String(formData.get("lastName") ?? "").trim();
    const email = account?.email ?? String(formData.get("email") ?? "").trim();
    const birthDate = account?.birthDate ?? String(formData.get("birthDate") ?? "").trim();
    const codeRaw = account?.codeString ?? String(formData.get("code") ?? "").trim();
    const code = codeRaw || undefined;

    if (!firstName || !lastName || !email || !birthDate || !readingType || !message || !consent) {
      setStatus(FORM_MESSAGES.bookingError);
      trackEvent("booking_submit", { status: "error" });
      return;
    }

    trackEvent("booking_submit", { status: "success", readingType, signedIn: Boolean(account) });

    const response = await fetch("/api/personal-integration/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "booking",
        source: "booking_form",
        email,
        firstName,
        lastName,
        birthDate,
        code,
        readingType,
        timezone: timezone || undefined,
        message,
      }),
    });

    const data = (await response.json()) as {
      ok?: boolean;
      stored?: boolean;
      prepUrl?: string;
      error?: string;
    };

    if (!response.ok || !data.ok) {
      setStatus(data.error ?? FORM_MESSAGES.bookingError);
      trackEvent("booking_submit", { status: "error" });
      return;
    }

    if (!data.stored) {
      setPrepUrl("");
      await submitLead({
        type: "booking",
        source: "booking_form",
        email,
        firstName,
        lastName,
        birthDate,
        code,
        readingType,
        timezone: timezone || undefined,
        message: message || undefined,
      });
      trackEvent("booking_success", { readingType });
      setStatus(FORM_MESSAGES.bookingSuccess);
      form.reset();
      return;
    }

    trackEvent("booking_success", { readingType, hasPrepUrl: Boolean(data.prepUrl) });
    setPrepUrl(data.prepUrl ?? "");
    setStatus(
      data.prepUrl ? FORM_MESSAGES.bookingSuccessWithPrep : FORM_MESSAGES.bookingSuccess,
    );
    form.reset();
  }

  const profileComplete =
    account &&
    account.firstName &&
    account.lastName &&
    account.birthDate &&
    account.email;

  return (
    <form className="conversion-form" id="booking-form" onSubmit={onSubmit} onFocus={onFocus}>
      {profileComplete ? (
        <div className="glass-card mb-4 p-4 text-sm space-y-1">
          <p className="font-medium">Booking as {account.firstName} {account.lastName}</p>
          <p className="opacity-80">{account.email} · {account.birthDate}</p>
          {account.codeString ? (
            <p className="font-mono text-xs opacity-80">{account.codeString}</p>
          ) : null}
          <Link href="/account" className="blueprint-secondary-link text-xs">
            Update profile
          </Link>
        </div>
      ) : (
        <>
          <div className="conversion-form-row">
            <label className="conversion-field">
              First Name
              <input name="firstName" required className="conversion-input" defaultValue={account?.firstName ?? ""} />
            </label>
            <label className="conversion-field">
              Last Name
              <input name="lastName" required className="conversion-input" defaultValue={account?.lastName ?? ""} />
            </label>
          </div>
          <label className="conversion-field">
            Email
            <input
              name="email"
              type="email"
              required
              className="conversion-input"
              defaultValue={account?.email ?? ""}
            />
          </label>
          <label className="conversion-field">
            Birth Date
            <input
              name="birthDate"
              type="date"
              required
              className="conversion-input"
              defaultValue={account?.birthDate ?? ""}
            />
          </label>
          <label className="conversion-field">
            Your 1320 Code <span className="conversion-optional">(optional)</span>
            <input
              name="code"
              className="conversion-input"
              placeholder="e.g. S1-18 / S3-110 / S2-27 / S0-07"
              defaultValue={account?.codeString ?? ""}
            />
          </label>
        </>
      )}

      <label className="conversion-field">
        Preferred Session Type
        <select
          name="readingType"
          required
          className="conversion-input"
          defaultValue={defaultReadingType ?? ""}
        >
          <option value="" disabled>
            Select a session type
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
        {BOOKING_FINAL.cta}
      </button>
      {status ? <p className="conversion-status">{status}</p> : null}
      {prepUrl ? (
        <p className="conversion-status">
          <Link href={prepUrl} className="blueprint-secondary-link break-all">
            Open session prep
          </Link>
        </p>
      ) : null}
    </form>
  );
}
