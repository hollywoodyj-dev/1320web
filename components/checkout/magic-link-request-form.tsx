"use client";

import { FormEvent, useState } from "react";

export function MagicLinkRequestForm() {
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
      body: JSON.stringify({ email }),
    });
    const json = (await response.json()) as {
      ok?: boolean;
      message?: string;
      devMagicLinkUrl?: string;
      error?: string;
    };

    if (!response.ok) {
      setStatus(json.error ?? "Could not send magic link.");
      return;
    }

    setStatus(json.message ?? "Check your email for a return link.");
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
        SEND MAGIC LINK
      </button>
      {status ? <p className="conversion-status">{status}</p> : null}
      {devLink ? (
        <p className="conversion-status">
          Dev link:{" "}
          <a href={devLink} className="blueprint-secondary-link">
            open report access
          </a>
        </p>
      ) : null}
    </form>
  );
}
