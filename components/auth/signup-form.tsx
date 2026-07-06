"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { SIGNUP_COPY } from "@/lib/auth/account-content";

type SignupFormProps = {
  nextPath?: string;
};

export function SignupForm({ nextPath = "/account" }: SignupFormProps) {
  const [status, setStatus] = useState("");
  const [devLink, setDevLink] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setDevLink("");
    setLoading(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const birthDate = String(data.get("birthDate") ?? "").trim();

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName, birthDate, next: nextPath }),
      });
      const json = (await response.json()) as {
        ok?: boolean;
        message?: string;
        devMagicLinkUrl?: string;
        error?: string;
      };

      if (!response.ok || !json.ok) {
        setStatus(json.error ?? "Could not create account.");
        return;
      }

      setStatus(json.message ?? "Check your email to finish signing in.");
      if (json.devMagicLinkUrl) setDevLink(json.devMagicLinkUrl);
      form.reset();
    } catch {
      setStatus("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="conversion-form" onSubmit={onSubmit}>
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
      <p className="text-sm opacity-80">
        Saved once for your Soul Code, Full Report checkout, and session booking.
      </p>
      <button type="submit" className="gold-button" disabled={loading}>
        {loading ? "CREATING ACCOUNT…" : SIGNUP_COPY.submit}
      </button>
      {status ? <p className="conversion-status">{status}</p> : null}
      {devLink ? (
        <p className="conversion-status">
          Dev link:{" "}
          <a href={devLink} className="blueprint-secondary-link">
            finish sign-in
          </a>
        </p>
      ) : null}
      <p className="text-sm mt-4">
        {SIGNUP_COPY.loginPrompt}{" "}
        <Link href={`/login?next=${encodeURIComponent(nextPath)}`} className="blueprint-secondary-link">
          {SIGNUP_COPY.loginLink}
        </Link>
      </p>
    </form>
  );
}
