"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  CHECKIN_FORM,
  EXPRESSION_FORM,
  MEMORY_EMPTY,
  NEXT_STEPS,
  PROFILE_SUMMARY,
  SOUL_BLUEPRINT_SECTION,
} from "@/lib/living-blueprint/content";
import {
  EXPRESSION_STATES,
  expressionStateLabel,
  journeyStatusLabel,
} from "@/lib/living-blueprint/expression-labels";
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
    const data = (await response.json()) as {
      ok?: boolean;
      snapshot?: LivingBlueprintSnapshot;
      error?: string;
    };
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
    const data = (await response.json()) as {
      ok?: boolean;
      snapshot?: LivingBlueprintSnapshot;
      error?: string;
    };
    if (!response.ok || !data.ok || !data.snapshot) {
      setStatus(data.error ?? "Check-in failed.");
      return;
    }
    setSnapshot(data.snapshot);
    setCheckInNote("");
    setStatus(CHECKIN_FORM.success);
  }

  const nextSteps = NEXT_STEPS.items.map((item) => {
    if (item.id === "full-report") {
      return { ...item, href: `/my-report/${reportId}` };
    }
    return item;
  });

  return (
    <div className="living-blueprint-dashboard">
      <nav className="living-blueprint-next" aria-labelledby="living-blueprint-next-title">
        <h2 id="living-blueprint-next-title" className="living-blueprint-section-title">
          {NEXT_STEPS.title}
        </h2>
        <ul className="living-blueprint-next-list">
          {nextSteps.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href ?? "#"}
                className={item.primary ? "gold-button living-blueprint-next-primary" : "living-blueprint-next-link"}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="living-blueprint-panel living-blueprint-profile">
        <h2 className="living-blueprint-section-title">{PROFILE_SUMMARY.title}</h2>
        <dl className="living-blueprint-profile-grid">
          <div>
            <dt>{PROFILE_SUMMARY.name}</dt>
            <dd>{snapshot.clientName}</dd>
          </div>
          <div>
            <dt>{PROFILE_SUMMARY.expression}</dt>
            <dd>{expressionStateLabel(snapshot.expressionState)}</dd>
          </div>
          <div>
            <dt>{PROFILE_SUMMARY.journey}</dt>
            <dd>{journeyStatusLabel(snapshot.journeyStatus)}</dd>
          </div>
          <div>
            <dt>{PROFILE_SUMMARY.lastReview}</dt>
            <dd>
              {snapshot.lastReviewAt
                ? new Date(snapshot.lastReviewAt).toLocaleDateString()
                : PROFILE_SUMMARY.notYet}
            </dd>
          </div>
        </dl>
        <div className="living-blueprint-codes">
          <p className="living-blueprint-dt">{PROFILE_SUMMARY.codes}</p>
          <p className="living-blueprint-codes-value">
            {snapshot.codes.s1} · {snapshot.codes.s3} · {snapshot.codes.s2} · {snapshot.codes.s0}
          </p>
        </div>
      </section>

      <p className="living-blueprint-continuity">{snapshot.continuityNote}</p>

      <section className="living-blueprint-panel">
        <h2 className="living-blueprint-section-title">{SOUL_BLUEPRINT_SECTION.title}</h2>
        <p className="living-blueprint-soft-note">{SOUL_BLUEPRINT_SECTION.note}</p>
        <dl className="living-blueprint-codes-grid">
          {(["s1", "s3", "s2", "s0"] as const).map((key) => (
            <div key={key}>
              <dt>{key.toUpperCase()}</dt>
              <dd className="living-blueprint-codes-value">{snapshot.codes[key]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <form className="living-blueprint-form" onSubmit={onExpressionSubmit}>
        <label className="living-blueprint-field">
          <span className="living-blueprint-section-title">{EXPRESSION_FORM.label}</span>
          <span className="living-blueprint-soft-note">{EXPRESSION_FORM.help}</span>
          <select
            className="conversion-input"
            value={expressionState}
            onChange={(e) => setExpressionState(e.target.value)}
          >
            {EXPRESSION_STATES.map((state) => (
              <option key={state} value={state}>
                {expressionStateLabel(state)}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="gold-button">
          {EXPRESSION_FORM.save}
        </button>
      </form>

      {(["blueprint", "reflection", "expression", "journey"] as const).map((layer) => {
        const layerItems = snapshot.memoriesByLayer[layer];
        const reflectionBodies =
          layer === "reflection"
            ? snapshot.recentReflections.map((r) => ({ id: r.id, content: r.body }))
            : [];
        const items =
          layer === "reflection"
            ? [
                ...layerItems.map((item) => ({ id: item.id, content: item.content })),
                ...reflectionBodies,
              ]
            : layerItems.map((item) => ({ id: item.id, content: item.content }));

        return (
          <section key={layer} className="living-blueprint-panel">
            <h2 className="living-blueprint-section-title">{MEMORY_LAYER_LABELS[layer]}</h2>
            {items.length === 0 ? (
              <p className="living-blueprint-soft-note">{MEMORY_EMPTY}</p>
            ) : (
              <ul className="living-blueprint-memory-list">
                {items.map((item) => (
                  <li key={item.id}>{item.content}</li>
                ))}
              </ul>
            )}
          </section>
        );
      })}

      <form
        id="todays-reflection"
        className="living-blueprint-form living-blueprint-checkin"
        onSubmit={onCheckInSubmit}
      >
        <label className="living-blueprint-field">
          <span className="living-blueprint-section-title">{CHECKIN_FORM.label}</span>
          <span className="living-blueprint-soft-note">{CHECKIN_FORM.help}</span>
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
