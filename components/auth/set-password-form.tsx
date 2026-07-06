"use client";

import { FormEvent, useState } from "react";
import { ACCOUNT_COPY } from "@/lib/auth/account-content";
import { MIN_PASSWORD_LENGTH, PASSWORD_REQUIREMENTS, validatePassword } from "@/lib/auth/password";

type SetPasswordFormProps = {
  hasPassword: boolean;
};

export function SetPasswordForm({ hasPassword: hasPasswordInitial }: SetPasswordFormProps) {
  const [hasPassword, setHasPassword] = useState(hasPasswordInitial);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setSuccess(false);
    setLoading(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const currentPassword = String(data.get("currentPassword") ?? "");
    const newPassword = String(data.get("newPassword") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");

    if (newPassword !== confirmPassword) {
      setStatus("Passwords do not match.");
      setLoading(false);
      return;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setStatus(passwordError);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: hasPassword ? currentPassword : undefined,
          newPassword,
        }),
      });
      const json = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !json.ok) {
        setStatus(json.error ?? "Could not update password.");
        return;
      }

      form.reset();
      setSuccess(true);
      setHasPassword(true);
    } catch {
      setStatus("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="account-set-password">
      <p className="account-set-password-lead">
        {hasPassword ? ACCOUNT_COPY.passwordChangeLead : ACCOUNT_COPY.passwordSetLead}
      </p>
      <form className="account-set-password-form" onSubmit={onSubmit}>
        {hasPassword ? (
          <label className="conversion-field">
            {ACCOUNT_COPY.currentPasswordLabel}
            <input
              name="currentPassword"
              type="password"
              required
              className="conversion-input"
              autoComplete="current-password"
            />
          </label>
        ) : null}
        <label className="conversion-field">
          {hasPassword ? ACCOUNT_COPY.newPasswordLabel : ACCOUNT_COPY.passwordLabel}
          <input
            name="newPassword"
            type="password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            className="conversion-input"
            autoComplete="new-password"
          />
        </label>
        <label className="conversion-field">
          {ACCOUNT_COPY.confirmPasswordLabel}
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
        <button type="submit" className="gold-button account-set-password-submit" disabled={loading}>
          {loading
            ? ACCOUNT_COPY.passwordSaving
            : hasPassword
              ? ACCOUNT_COPY.passwordChangeSubmit
              : ACCOUNT_COPY.passwordSetSubmit}
        </button>
        {success ? <p className="conversion-status account-set-password-success">{ACCOUNT_COPY.passwordSaved}</p> : null}
        {status ? <p className="conversion-status auth-form-status">{status}</p> : null}
      </form>
    </div>
  );
}
