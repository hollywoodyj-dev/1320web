"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { PREP_FORM } from "@/lib/personal-integration/prep-content";

type PersonalIntegrationPrepFormProps = {
  sessionId: string;
  prepToken: string;
  initialPrepNotes?: string;
};

export function PersonalIntegrationPrepForm({
  sessionId,
  prepToken,
  initialPrepNotes = "",
}: PersonalIntegrationPrepFormProps) {
  const [prepNotes, setPrepNotes] = useState(initialPrepNotes);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!prepNotes.trim()) {
      setStatus("Add optional notes above, or return to My Account.");
      return;
    }

    setSaving(true);
    setStatus("");

    try {
      const response = await fetch("/api/personal-integration/prep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          token: prepToken,
          prepNotes: prepNotes.trim(),
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setStatus(data.error ?? "Could not save notes. Please try again.");
        return;
      }

      setStatus(PREP_FORM.success);
    } catch {
      setStatus("Could not save notes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="conversion-form" onSubmit={onSubmit}>
      <label className="conversion-field">
        {PREP_FORM.notesLabel}
        <span className="conversion-optional block text-sm opacity-80">{PREP_FORM.notesHelp}</span>
        <textarea
          className="conversion-input conversion-textarea"
          placeholder={PREP_FORM.notesPlaceholder}
          value={prepNotes}
          onChange={(event) => setPrepNotes(event.target.value)}
        />
      </label>
      <button type="submit" className="gold-button" disabled={saving}>
        {saving ? "Saving…" : PREP_FORM.submit}
      </button>
      {status ? <p className="conversion-status">{status}</p> : null}
      <p className="text-sm mt-2">
        <Link href="/account" className="blueprint-secondary-link">
          Back to My Account
        </Link>
      </p>
    </form>
  );
}
