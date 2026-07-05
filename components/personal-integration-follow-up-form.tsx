"use client";

import { FormEvent, useState } from "react";
import { FOLLOW_UP_FORM } from "@/lib/personal-integration/follow-up-content";

type PersonalIntegrationFollowUpFormProps = {
  sessionId: string;
  followUpToken: string;
};

export function PersonalIntegrationFollowUpForm({
  sessionId,
  followUpToken,
}: PersonalIntegrationFollowUpFormProps) {
  const [reflection, setReflection] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reflection.trim()) {
      setStatus("Please write a reflection before saving.");
      return;
    }

    setSaving(true);
    setStatus("");

    try {
      const response = await fetch("/api/personal-integration/follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          token: followUpToken,
          reflection: reflection.trim(),
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setStatus(data.error ?? "Could not save reflection. Please try again.");
        return;
      }

      setStatus(FOLLOW_UP_FORM.success);
      setReflection("");
    } catch {
      setStatus("Could not save reflection. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="conversion-form" onSubmit={onSubmit}>
      <label className="conversion-field">
        {FOLLOW_UP_FORM.label}
        <span className="conversion-optional block text-sm opacity-80">{FOLLOW_UP_FORM.help}</span>
        <textarea
          required
          className="conversion-input conversion-textarea"
          placeholder={FOLLOW_UP_FORM.placeholder}
          value={reflection}
          onChange={(event) => setReflection(event.target.value)}
        />
      </label>
      <button type="submit" className="gold-button" disabled={saving}>
        {saving ? "Saving…" : FOLLOW_UP_FORM.submit}
      </button>
      {status ? <p className="conversion-status">{status}</p> : null}
    </form>
  );
}
