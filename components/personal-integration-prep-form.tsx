"use client";

import { FormEvent, useState } from "react";
import { PREP_FORM } from "@/lib/personal-integration/prep-content";

type PersonalIntegrationPrepFormProps = {
  sessionId: string;
  prepToken: string;
  initialGrowthEdge: string;
};

export function PersonalIntegrationPrepForm({
  sessionId,
  prepToken,
  initialGrowthEdge,
}: PersonalIntegrationPrepFormProps) {
  const [growthEdge, setGrowthEdge] = useState(initialGrowthEdge);
  const [prepNotes, setPrepNotes] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!growthEdge.trim()) {
      setStatus("Please name a growth edge for this session.");
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
          growthEdge: growthEdge.trim(),
          prepNotes: prepNotes.trim() || undefined,
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setStatus(data.error ?? "Could not save prep. Please try again.");
        return;
      }

      setStatus(PREP_FORM.success);
    } catch {
      setStatus("Could not save prep. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="conversion-form" onSubmit={onSubmit}>
      <label className="conversion-field">
        {PREP_FORM.growthEdgeLabel}
        <span className="conversion-optional block text-sm opacity-80">{PREP_FORM.growthEdgeHelp}</span>
        <textarea
          required
          className="conversion-input conversion-textarea"
          placeholder={PREP_FORM.growthEdgePlaceholder}
          value={growthEdge}
          onChange={(event) => setGrowthEdge(event.target.value)}
        />
      </label>
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
    </form>
  );
}
