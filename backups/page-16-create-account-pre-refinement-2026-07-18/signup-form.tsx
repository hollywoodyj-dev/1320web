"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { MIN_PASSWORD_LENGTH, PASSWORD_REQUIREMENTS, validatePassword } from "@/lib/auth/password";
import { SIGNUP_COPY } from "@/lib/auth/account-content";

type SignupFormProps = {
  nextPath?: string;
};

export function SignupForm({ nextPath = "/account" }: SignupFormProps) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setLoading(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const birthDate = String(data.get("birthDate") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setStatus("Passwords do not match.");
      setLoading(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setStatus(passwordError);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName, birthDate, password, next: nextPath }),
      });
      const json = (await response.json()) as {
        ok?: boolean;
        redirect?: string;
        error?: string;
      };

      if (!response.ok || !json.ok) {
        setStatus(json.error ?? "Could not create account.");
        return;
      }

      window.location.href = json.redirect ?? nextPath;
    } catch {
      setStatus("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <div className="conversion-form-row">
        <label className="conversion-field">
          First Name
          <input name="firstName" required className="conversion-input" autoComplete="given-name" />
        </label>
        <label className="conversion-field">
          Last Name
          <input name="lastName" required className="conversion-input" autoComplete="family-name" />
        </label>
      </div>
      <label className="conversion-field">
        Email
        <input name="email" type="email" required className="conversion-input" autoComplete="email" />
      </label>
      <label className="conversion-field">
        Birth Date
        <input name="birthDate" type="date" required className="conversion-input" />
      </label>
      <label className="conversion-field">
        Password
        <input
          name="password"
          type="password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          className="conversion-input"
          autoComplete="new-password"
        />
      </label>
      <label className="conversion-field">
        Confirm Password
        <input
          name="confirmPassword"
          type="password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          className="conversion-input"
          autoComplete="new-password"
        />
      </label>
      <p className="auth-form-hint">{PASSWORD_REQUIREMENTS}</p>
      <button type="submit" className="gold-button auth-form-submit" disabled={loading}>
        {loading ? "CREATING ACCOUNT…" : SIGNUP_COPY.submit}
      </button>
      {status ? <p className="conversion-status auth-form-status">{status}</p> : null}
      <p className="auth-form-footer">
        {SIGNUP_COPY.loginPrompt}{" "}
        <Link href={`/login?next=${encodeURIComponent(nextPath)}`} className="blueprint-secondary-link">
          {SIGNUP_COPY.loginLink}
        </Link>
      </p>
    </form>
  );
}
