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
        setStatus(json.error ?? "Could not sign in.");
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
      <label className="conversion-field">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="conversion-input"
          placeholder="you@example.com"
        />
      </label>
      <label className="conversion-field">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="conversion-input"
          placeholder="Letters and numbers, 8+ characters"
        />
      </label>
      <button type="submit" className="gold-button auth-form-submit" disabled={loading}>
        {loading ? "SIGNING IN…" : LOGIN_COPY.submit}
      </button>
      {status ? <p className="conversion-status auth-form-status">{status}</p> : null}
      <p className="auth-form-footer">
        {LOGIN_COPY.signupPrompt}{" "}
        <Link href={`/signup?next=${encodeURIComponent(nextPath)}`} className="blueprint-secondary-link">
          {LOGIN_COPY.signupLink}
        </Link>
      </p>
    </form>
  );
}
