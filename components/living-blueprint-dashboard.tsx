"use client";

import { FormEvent, useState } from "react";
import { CHECKIN_FORM, EXPRESSION_FORM, PROFILE_SUMMARY } from "@/lib/living-blueprint/content";
import type { LivingBlueprintSnapshot } from "@/lib/living-blueprint/types";
import { MEMORY_LAYER_LABELS } from "@/lib/living-blueprint/memory-layers";

type LivingBlueprintDashboardProps = {
  reportId: string;
  initialSnapshot: LivingBlueprintSnapshot;
};

export function LivingBlueprintDashboard({ reportId, initialSnapshot }: LivingBlueprintDashboardProps) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [expressionState, setExpressionState] = useState(initialSnapshot.expressionState);
  const [checkInNote, setCheckInNote] = useState("");
  const [status, setStatus] = useState("");

  async function onExpressionSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("");
    const response = await fetch("/api/membership/expression", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportId, state: expressionState }),
    });
    const data = (await response.json()) as { ok?: boolean; snapshot?: LivingBlueprintSnapshot; error?: string };
    if (!response.ok || !data.ok || !data.snapshot) {
      setStatus(data.error ?? "Could not update expression.");
      return;
    }
    setSnapshot(data.snapshot);
    setStatus(EXPRESSION_FORM.saved);
  }

  async function onCheckInSubmit(event: FormEvent) {
    event.preventDefault();
    if (!checkInNote.trim()) return;
    setStatus("");
    const response = await fetch("/api/membership/check-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportId, note: checkInNote.trim() }),
    });
    const data = (await response.json()) as { ok?: boolean; snapshot?: LivingBlueprintSnapshot; error?: string };
    if (!response.ok || !data.ok || !data.snapshot) {
      setStatus(data.error ?? "Check-in failed.");
      return;
    }
    setSnapshot(data.snapshot);
    setCheckInNote("");
    setStatus(CHECKIN_FORM.success);
  }

  return (
    <div className="space-y-6">
      <section className="living-blueprint-profile rounded border border-white/10 p-4">
        <h2 className="mb-3 font-medium">{PROFILE_SUMMARY.title}</h2>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase opacity-70">{PROFILE_SUMMARY.name}</dt>
            <dd>{snapshot.clientName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase opacity-70">{PROFILE_SUMMARY.email}</dt>
            <dd>{snapshot.email ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase opacity-70">{PROFILE_SUMMARY.birthDate}</dt>
            <dd>{snapshot.birthDate ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase opacity-70">{PROFILE_SUMMARY.expression}</dt>
            <dd className="capitalize">{snapshot.expressionState}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase opacity-70">{PROFILE_SUMMARY.journey}</dt>
            <dd className="capitalize">{snapshot.journeyStatus}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase opacity-70">{PROFILE_SUMMARY.lastReview}</dt>
            <dd>
              {snapshot.lastReviewAt
                ? new Date(snapshot.lastReviewAt).toLocaleDateString()
                : PROFILE_SUMMARY.notYet}
            </dd>
          </div>
        </dl>
        <div className="mt-3">
          <p className="text-xs uppercase opacity-70">{PROFILE_SUMMARY.codes}</p>
          <p className="font-mono text-sm">
            {snapshot.codes.s1} · {snapshot.codes.s3} · {snapshot.codes.s2} · {snapshot.codes.s0}
          </p>
        </div>
      </section>

      <p className="text-sm opacity-90">{snapshot.continuityNote}</p>

      <section className="rounded border border-white/10 p-4">
        <h2 className="mb-2 font-medium">Soul Blueprint (read-only)</h2>
        <dl className="grid gap-2 sm:grid-cols-2">
          {(["s1", "s3", "s2", "s0"] as const).map((key) => (
            <div key={key}>
              <dt className="text-xs uppercase opacity-70">{key.toUpperCase()}</dt>
              <dd className="font-mono">{snapshot.codes[key]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <form className="conversion-form" onSubmit={onExpressionSubmit}>
        <label className="conversion-field">
          {EXPRESSION_FORM.label}
          <span className="block text-sm opacity-80">{EXPRESSION_FORM.help}</span>
          <select
            className="conversion-input"
            value={expressionState}
            onChange={(e) => setExpressionState(e.target.value)}
          >
            {["dormant", "emerging", "active", "embodied", "integrated"].map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="gold-button">
          {EXPRESSION_FORM.save}
        </button>
      </form>

      {(["blueprint", "reflection", "expression", "journey"] as const).map((layer) => (
        <section key={layer} className="rounded border border-white/10 p-4">
          <h2 className="mb-2 font-medium">{MEMORY_LAYER_LABELS[layer]}</h2>
          {snapshot.memoriesByLayer[layer].length === 0 ? (
            <p className="text-sm opacity-70">No items yet.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {snapshot.memoriesByLayer[layer].map((item) => (
                <li key={item.id}>{item.content}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {snapshot.recentReflections.length > 0 && (
        <section className="rounded border border-white/10 p-4">
          <h2 className="mb-2 font-medium">Recent reflections</h2>
          <ul className="space-y-2 text-sm">
            {snapshot.recentReflections.map((r) => (
              <li key={r.id}>
                <span className="opacity-60">{r.kind}: </span>
                {r.body}
              </li>
            ))}
          </ul>
        </section>
      )}

      <form className="conversion-form" onSubmit={onCheckInSubmit}>
        <label className="conversion-field">
          {CHECKIN_FORM.label}
          <span className="block text-sm opacity-80">{CHECKIN_FORM.help}</span>
          <textarea
            className="conversion-input conversion-textarea"
            placeholder={CHECKIN_FORM.placeholder}
            value={checkInNote}
            onChange={(e) => setCheckInNote(e.target.value)}
          />
        </label>
        <button type="submit" className="gold-button">
          {CHECKIN_FORM.submit}
        </button>
      </form>

      {status ? <p className="conversion-status">{status}</p> : null}
    </div>
  );
}
