"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { LOGIN_COPY } from "@/lib/auth/account-content";

type LoginFormProps = {
  nextPath?: string;
};

export function LoginForm({ nextPath = "/account" }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, next: nextPath }),
      });
      const json = (await response.json()) as {
        ok?: boolean;
        redirect?: string;
        error?: string;
      };

      if (!response.ok || !json.ok) {
        if (response.status === 401) {
          setStatus(LOGIN_COPY.errorGeneric);
        } else {
          setStatus(json.error ?? LOGIN_COPY.errorGeneric);
        }
        return;
      }

      window.location.href = json.redirect ?? nextPath;
    } catch {
      setStatus(LOGIN_COPY.errorNetwork);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <label className="conversion-field auth-field">
        {LOGIN_COPY.emailLabel}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="conversion-input"
          placeholder={LOGIN_COPY.emailPlaceholder}
        />
      </label>

      <div className="auth-password-block">
        <label className="conversion-field auth-field">
          {LOGIN_COPY.passwordLabel}
          <span className="auth-password-row">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="conversion-input"
              placeholder={LOGIN_COPY.passwordPlaceholder}
            />
            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowPassword((value) => !value)}
              aria-pressed={showPassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </span>
        </label>
        <Link
          href={`${LOGIN_COPY.forgotPasswordHref}?next=${encodeURIComponent(nextPath)}`}
          className="auth-inline-link"
        >
          {LOGIN_COPY.forgotPassword}
        </Link>
      </div>

      <button type="submit" className="gold-button auth-form-submit auth-submit" disabled={loading}>
        {loading ? LOGIN_COPY.submitting : LOGIN_COPY.submit}
      </button>
      {status ? (
        <p className="conversion-status auth-form-status" role="alert">
          {status}
        </p>
      ) : null}
      <p className="auth-form-footer">
        {LOGIN_COPY.signupPrompt}{" "}
        <Link href={`/signup?next=${encodeURIComponent(nextPath)}`} className="auth-inline-link auth-inline-link--strong">
          {LOGIN_COPY.signupLink}
        </Link>
      </p>
    </form>
  );
}
