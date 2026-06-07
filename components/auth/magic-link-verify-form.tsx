"use client";

import { useState } from "react";

type MagicLinkVerifyFormProps = {
  token: string;
  nextPath: string;
};

export function MagicLinkVerifyForm({ token, nextPath }: MagicLinkVerifyFormProps) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function onContinue() {
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, next: nextPath }),
      });

      const json = (await response.json()) as { ok?: boolean; redirect?: string; error?: string };

      if (!response.ok || !json.ok || !json.redirect) {
        setStatus(json.error ?? "This link is invalid or has expired. Request a new one from checkout.");
        setLoading(false);
        return;
      }

      window.location.href = json.redirect;
    } catch {
      setStatus("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <button type="button" className="gold-button" onClick={onContinue} disabled={loading}>
        {loading ? "OPENING REPORT…" : "CONTINUE TO MY FULL REPORT"}
      </button>
      {status ? <p className="conversion-status">{status}</p> : null}
    </div>
  );
}
