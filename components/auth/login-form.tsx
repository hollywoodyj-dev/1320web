"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { LOGIN_COPY } from "@/lib/auth/account-content";

type LoginFormProps = {
  nextPath?: string;
};

export function LoginForm({ nextPath = "/account" }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [devLink, setDevLink] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setDevLink("");

    const response = await fetch("/api/auth/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, next: nextPath }),
    });
    const json = (await response.json()) as {
      ok?: boolean;
      message?: string;
      devMagicLinkUrl?: string;
      error?: string;
    };

    if (!response.ok) {
      setStatus(json.error ?? "Could not send sign-in link.");
      return;
    }

    setStatus(json.message ?? "Check your email for a sign-in link.");
    if (json.devMagicLinkUrl) setDevLink(json.devMagicLinkUrl);
  }

  return (
    <form className="conversion-form" onSubmit={onSubmit}>
      <label className="conversion-field">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="conversion-input"
          placeholder="you@example.com"
        />
      </label>
      <button type="submit" className="gold-button">
        {LOGIN_COPY.submit}
      </button>
      {status ? <p className="conversion-status">{status}</p> : null}
      {devLink ? (
        <p className="conversion-status">
          Dev link:{" "}
          <a href={devLink} className="blueprint-secondary-link">
            open sign-in
          </a>
        </p>
      ) : null}
      <p className="text-sm mt-4">
        {LOGIN_COPY.signupPrompt}{" "}
        <Link href={`/signup?next=${encodeURIComponent(nextPath)}`} className="blueprint-secondary-link">
          {LOGIN_COPY.signupLink}
        </Link>
      </p>
    </form>
  );
}
