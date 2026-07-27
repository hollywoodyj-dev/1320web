"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { SUMMARY_COPY, SUMMARY_FIELD_META, type SummaryContent } from "@/lib/personal-integration/ops/summary-template";
import type { SessionGuideStage } from "@/lib/personal-integration/ops/session-guide";

type TabId = "overview" | "intake" | "blueprint" | "guide" | "notes" | "summary";

type WorkspacePayload = {
  session: {
    id: string;
    status: string;
    intakeStatus: string;
    summaryStatus: string;
    growthEdge: string | null;
    reportId: string;
    prepUrl: string | null;
    intakeUrl: string;
    joinSessionUrl: string | null;
  };
  context: {
    clientOverview: {
      preferredName: string;
      email: string | null;
      birthDate: string | null;
      sessionType: string;
      scheduledAt: string | null;
      timezone: string | null;
      reportId: string;
      intakeStatus: string;
      sessionStatus: string;
      summaryStatus: string;
    };
    sessionFocus: string;
    currentSituation: string;
    clientIntention: string;
    foundation: Array<{
      code: string;
      displayName: string;
      coreEssence: string;
      balancedExpression: string;
      protectiveDistortion: string;
      integrationInvitation: string;
      suggestedQuestions: string[];
    }>;
    advanced: Array<{
      code: string;
      displayName: string;
      coreEssence: string;
      suggestedQuestions: string[];
    }>;
    possibleLayersToExplore: Array<{ code: string; label: string; note: string }>;
    safetyWatchpoints: string[];
    governanceNote: string;
  } | null;
  intake: {
    status: string;
    responses: Record<string, unknown>;
    wellbeingFlags: Record<string, unknown>;
    preparation?: {
      formVersion: string;
      mainArea: { labels: string[]; note: string };
      whatIsHappening: string;
      whyNow: { labels: string[]; note: string };
      whatWouldFeelHelpful: { labels: string[]; disclaimer: string };
      anythingToKnow: string;
      scopeAcknowledged: boolean;
      legacyPresent: boolean;
    };
  } | null;
  notes: Record<string, unknown> | null;
  summary: { status: string; content: SummaryContent } | null;
  sessionGuide: { intro: { title: string; lead: string; boundary: string }; stages: SessionGuideStage[] };
};

const TABS: Array<{ id: TabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "intake", label: "Intake" },
  { id: "blueprint", label: "Soul Blueprint" },
  { id: "guide", label: "Session Guide" },
  { id: "notes", label: "Notes" },
  { id: "summary", label: "Integration Summary" },
];

function authHeaders(key: string): HeadersInit {
  return { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
}

function readKey(): string {
  try {
    return sessionStorage.getItem("pi_facilitator_key") ?? "";
  } catch {
    return "";
  }
}

export function FacilitatorSessionWorkspace({ sessionId }: { sessionId: string }) {
  const [accessKey, setAccessKey] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [tab, setTab] = useState<TabId>("overview");
  const [data, setData] = useState<WorkspacePayload | null>(null);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [guideProgress, setGuideProgress] = useState<Record<string, boolean>>({});
  const [summary, setSummary] = useState<SummaryContent | null>(null);
  const [preview, setPreview] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const load = useCallback(async (key: string) => {
    setError("");
    const res = await fetch(`/api/personal-integration/facilitator/sessions/${sessionId}`, {
      headers: authHeaders(key),
      cache: "no-store",
    });
    const json = (await res.json()) as WorkspacePayload & { ok?: boolean; error?: string };
    if (!res.ok || !json.ok) {
      setAuthorized(false);
      setError("Access denied or session not found.");
      return;
    }
    setAuthorized(true);
    setData(json);
    const n = (json.notes ?? {}) as Record<string, unknown>;
    const nextNotes: Record<string, string> = {};
    for (const keyName of [
      "private_notes",
      "primary_focus",
      "client_own_words",
      "foundation_layers_explored",
      "advanced_layers_explored",
      "layers_explored",
      "core_recognition",
      "inner_tension",
      "existing_resource",
      "growth_edge",
      "conscious_choice",
      "practice",
      "reflection_question",
      "referral_note",
    ]) {
      nextNotes[keyName] = typeof n[keyName] === "string" ? (n[keyName] as string) : "";
    }
    setNotes(nextNotes);
    setGuideProgress((n.guide_progress as Record<string, boolean>) ?? {});
    setSummary(
      json.summary?.content ?? {
        client_name: json.context?.clientOverview.preferredName ?? "",
        session_date: json.context?.clientOverview.scheduledAt ?? "",
        facilitator_label: "1320 Facilitator",
        session_type: json.context?.clientOverview.sessionType ?? "",
        report_id: json.session.reportId,
        session_focus: json.context?.sessionFocus ?? "",
        core_recognition: nextNotes.core_recognition,
        inner_tension: nextNotes.inner_tension,
        existing_resource: nextNotes.existing_resource,
        growth_edge: nextNotes.growth_edge || json.session.growthEdge || "",
        conscious_choice: nextNotes.conscious_choice,
        seven_day_practice: nextNotes.practice,
        reflection_question: nextNotes.reflection_question,
        layers_explored: nextNotes.layers_explored,
        closing_boundary:
          "Your Soul Blueprint is a mirror — not a fixed identity. This Summary reflects what you named in Session. Your choices and timing remain your own.",
      },
    );
  }, [sessionId]);

  useEffect(() => {
    const stored = readKey();
    if (stored) {
      setAccessKey(stored);
      void load(stored);
    }
  }, [load]);

  function onGate(event: FormEvent) {
    event.preventDefault();
    const key = accessKey.trim();
    try {
      sessionStorage.setItem("pi_facilitator_key", key);
    } catch {
      // ignore
    }
    void load(key);
  }

  async function saveNotes(manual = false) {
    const key = readKey() || accessKey;
    const res = await fetch(`/api/personal-integration/facilitator/sessions/${sessionId}/notes`, {
      method: "PUT",
      headers: authHeaders(key),
      body: JSON.stringify({ ...notes, guide_progress: guideProgress }),
    });
    const json = (await res.json()) as { ok?: boolean; lastSavedAt?: string };
    if (res.ok && json.ok && json.lastSavedAt) {
      setLastSaved(json.lastSavedAt);
      if (manual) setStatusMessage("Notes saved.");
    }
  }

  useEffect(() => {
    if (!authorized) return;
    const timer = window.setTimeout(() => {
      void saveNotes(false);
    }, 2500);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes, guideProgress, authorized]);

  async function summaryAction(action: "save" | "ready" | "publish" | "send") {
    if (!summary) return;
    const key = readKey() || accessKey;
    const res = await fetch(`/api/personal-integration/facilitator/sessions/${sessionId}/summary`, {
      method: "PUT",
      headers: authHeaders(key),
      body: JSON.stringify({ action, content: summary }),
    });
    const json = (await res.json()) as { ok?: boolean; status?: string; error?: string };
    if (!res.ok || !json.ok) {
      setStatusMessage(json.error ?? "Summary action failed.");
      return;
    }
    setStatusMessage(`Summary ${json.status ?? action}.`);
    void load(key);
  }

  async function reviewIntake() {
    const key = readKey() || accessKey;
    const res = await fetch(`/api/personal-integration/facilitator/sessions/${sessionId}`, {
      method: "PATCH",
      headers: authHeaders(key),
      body: JSON.stringify({ action: "review_intake" }),
    });
    if (res.ok) {
      setStatusMessage("Intake marked reviewed.");
      void load(key);
    }
  }

  const foundationOrderOk = useMemo(() => {
    const codes = data?.context?.foundation.map((f) => f.code.slice(0, 2)) ?? [];
    return codes.join(",") === "S1,S3,S2,S0";
  }, [data]);

  if (!authorized || !data) {
    return (
      <div className="pi-facilitator-gate">
        <form className="pi-intake-card" onSubmit={onGate}>
          <h2>Open Session Workspace</h2>
          <p className="pi-intake-intro">Access is verified before any Session data loads.</p>
          <label className="pi-intake-field">
            <span>Access key</span>
            <input
              className="conversion-input"
              type="password"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              required
            />
          </label>
          {error ? <p className="pi-intake-message">{error}</p> : null}
          <button type="submit" className="gold-button">
            Continue
          </button>
        </form>
      </div>
    );
  }

  const ctx = data.context;

  return (
    <div className="pi-workspace">
      <p>
        <Link href="/facilitator/sessions" className="blueprint-secondary-link">
          ← Session list
        </Link>
      </p>
      <h1 className="pi-ops-title">{ctx?.clientOverview.preferredName ?? "Session"}</h1>
      <p className="pi-ops-lead">
        {ctx?.clientOverview.sessionType} · Intake {data.session.intakeStatus} · Summary{" "}
        {data.session.summaryStatus}
      </p>

      <div className="pi-workspace-tabs" role="tablist">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {statusMessage ? <p className="pi-saved-indicator">{statusMessage}</p> : null}

      {tab === "overview" && ctx ? (
        <section className="pi-workspace-panel">
          <h2>Overview</h2>
          <p>Scheduled: {ctx.clientOverview.scheduledAt ?? "TBC"} {ctx.clientOverview.timezone ?? ""}</p>
          <p>Focus: {ctx.sessionFocus}</p>
          <p>Intention: {ctx.clientIntention}</p>
          <p>Report: connected</p>
          <p>Intake: {data.session.intakeStatus}</p>
          {data.session.joinSessionUrl ? (
            <p>
              <a href={data.session.joinSessionUrl} className="gold-button" target="_blank" rel="noreferrer">
                Join Session
              </a>
            </p>
          ) : null}
          <h3>Safety / Scope Watchpoints</h3>
          <ul>
            {ctx.safetyWatchpoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {data.session.intakeStatus === "submitted" ? (
            <button type="button" className="gold-button" onClick={() => void reviewIntake()}>
              Mark intake reviewed
            </button>
          ) : null}
        </section>
      ) : null}

      {tab === "intake" ? (
        <section className="pi-workspace-panel">
          <h2>Client preparation (read-only)</h2>
          <p className="pi-intake-intro">
            Ordinary-language answers from Easy Access Intake. Do not treat selected categories as
            definitive Blueprint interpretation. Blueprint Context stays on the Soul Blueprint tab.
            Private notes stay on the Notes tab.
          </p>
          {!data.intake ? (
            <p>No intake submitted yet.</p>
          ) : data.intake.preparation ? (
            <div className="pi-intake-prep">
              <article>
                <h3>Main area</h3>
                <ul>
                  {data.intake.preparation.mainArea.labels.map((label) => (
                    <li key={label}>{label}</li>
                  ))}
                </ul>
                {data.intake.preparation.mainArea.note ? (
                  <p>{data.intake.preparation.mainArea.note}</p>
                ) : null}
              </article>
              <article>
                <h3>What is happening</h3>
                <p>{data.intake.preparation.whatIsHappening || "—"}</p>
              </article>
              <article>
                <h3>Why now</h3>
                <ul>
                  {data.intake.preparation.whyNow.labels.map((label) => (
                    <li key={label}>{label}</li>
                  ))}
                </ul>
                {data.intake.preparation.whyNow.note ? <p>{data.intake.preparation.whyNow.note}</p> : null}
              </article>
              <article>
                <h3>What would feel helpful</h3>
                <ul>
                  {data.intake.preparation.whatWouldFeelHelpful.labels.map((label) => (
                    <li key={label}>{label}</li>
                  ))}
                </ul>
                <p className="pi-intake-help">{data.intake.preparation.whatWouldFeelHelpful.disclaimer}</p>
              </article>
              <article>
                <h3>Anything to know</h3>
                <p>{data.intake.preparation.anythingToKnow || "—"}</p>
              </article>
              <p className="pi-intake-help">
                Scope acknowledged: {data.intake.preparation.scopeAcknowledged ? "Yes" : "No"} · Form{" "}
                {data.intake.preparation.formVersion}
                {data.intake.preparation.legacyPresent ? " · Legacy v1.0 fields also present in raw JSON" : ""}
              </p>
            </div>
          ) : (
            <dl>
              {Object.entries(data.intake.responses).map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{Array.isArray(value) ? value.join(", ") : String(value)}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      ) : null}

      {tab === "blueprint" && ctx ? (
        <section className="pi-workspace-panel">
          <h2>Soul Blueprint</h2>
          <p className="pi-intake-intro">
            Foundation order {foundationOrderOk ? "S1 → S3 → S2 → S0" : "CHECK ORDER"}
          </p>
          <h3>Foundation</h3>
          {ctx.foundation.map((layer) => (
            <article key={layer.code} className="pi-intake-section">
              <h3>
                {layer.code} · {layer.displayName}
              </h3>
              <p>{layer.coreEssence}</p>
              <p>
                <strong>Balanced:</strong> {layer.balancedExpression}
              </p>
              <p>
                <strong>Protective distortion:</strong> {layer.protectiveDistortion}
              </p>
              <p>
                <strong>Invitation:</strong> {layer.integrationInvitation}
              </p>
              <ul>
                {layer.suggestedQuestions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </article>
          ))}
          <h3>Advanced (S4–S9)</h3>
          {ctx.advanced.map((layer) => (
            <article key={layer.code} className="pi-intake-section">
              <h3>{layer.code}</h3>
              <p>{layer.coreEssence}</p>
            </article>
          ))}
          <h3>Possible layers to explore</h3>
          <p className="pi-intake-intro">{ctx.governanceNote}</p>
          <ul>
            {ctx.possibleLayersToExplore.map((item) => (
              <li key={item.code}>{item.note}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {tab === "guide" ? (
        <section className="pi-workspace-panel">
          <h2>{data.sessionGuide.intro.title}</h2>
          <p>{data.sessionGuide.intro.lead}</p>
          <p className="pi-ops-boundary">{data.sessionGuide.intro.boundary}</p>
          {data.sessionGuide.stages.map((stage) => (
            <details key={stage.id} className="pi-guide-stage">
              <summary>
                {stage.timeRange} · {stage.title}
              </summary>
              <div className="pi-guide-stage-body">
                <p>
                  <strong>Purpose:</strong> {stage.purpose}
                </p>
                <p>
                  <strong>Suggested language</strong>
                </p>
                <ul>
                  {stage.suggestedLanguage.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p>
                  <strong>Key questions</strong>
                </p>
                <ul>
                  {stage.keyQuestions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
                <p>
                  <strong>Boundary watchpoint:</strong> {stage.boundaryWatchpoint}
                </p>
                <label className="pi-intake-check">
                  <input
                    type="checkbox"
                    checked={Boolean(guideProgress[stage.id])}
                    onChange={(e) =>
                      setGuideProgress((prev) => ({ ...prev, [stage.id]: e.target.checked }))
                    }
                  />
                  <span>Stage attended</span>
                </label>
              </div>
            </details>
          ))}
        </section>
      ) : null}

      {tab === "notes" ? (
        <section className="pi-workspace-panel">
          <h2>Private Session Notes</h2>
          <p className="pi-ops-boundary">
            Private facilitator notes are never sent with the client-facing Integration Summary.
          </p>
          <div className="pi-notes-grid">
            {[
              ["primary_focus", "Primary Focus"],
              ["client_own_words", "Client’s Own Words"],
              ["foundation_layers_explored", "Foundation Layers Explored"],
              ["advanced_layers_explored", "Advanced Layers Explored"],
              ["core_recognition", "Core Recognition"],
              ["inner_tension", "Inner Tension"],
              ["existing_resource", "Existing Resource"],
              ["growth_edge", "Growth Edge"],
              ["conscious_choice", "Conscious Choice"],
              ["practice", "7-Day Practice"],
              ["reflection_question", "Reflection Question"],
              ["referral_note", "Safety / Referral Note"],
              ["private_notes", "Facilitator Private Notes"],
            ].map(([id, label]) => (
              <label key={id}>
                <span>{label}</span>
                <textarea
                  className="conversion-input conversion-textarea"
                  rows={id === "private_notes" ? 5 : 3}
                  value={notes[id] ?? ""}
                  onChange={(e) => setNotes((prev) => ({ ...prev, [id]: e.target.value }))}
                />
              </label>
            ))}
          </div>
          <div className="pi-intake-actions">
            <button type="button" className="gold-button" onClick={() => void saveNotes(true)}>
              Save notes
            </button>
            {lastSaved ? (
              <span className="pi-saved-indicator">Last saved {new Date(lastSaved).toLocaleTimeString()}</span>
            ) : (
              <span className="pi-saved-indicator">Autosave on</span>
            )}
          </div>
        </section>
      ) : null}

      {tab === "summary" && summary ? (
        <section className="pi-workspace-panel">
          <h2>{SUMMARY_COPY.title}</h2>
          <p className="pi-ops-boundary">{SUMMARY_COPY.separationNote}</p>
          {preview ? (
            <div className="pi-intake-card">
              <h3>{SUMMARY_COPY.previewTitle}</h3>
              {SUMMARY_FIELD_META.map((field) => (
                <p key={field.key}>
                  <strong>{field.label}:</strong> {summary[field.key]}
                </p>
              ))}
              <button type="button" className="blueprint-secondary-link" onClick={() => setPreview(false)}>
                Back to editor
              </button>
            </div>
          ) : (
            <div className="pi-notes-grid">
              {SUMMARY_FIELD_META.map((field) => (
                <label key={field.key}>
                  <span>{field.label}</span>
                  <textarea
                    className="conversion-input conversion-textarea"
                    rows={field.key === "closing_boundary" ? 3 : 2}
                    value={summary[field.key]}
                    onChange={(e) => setSummary({ ...summary, [field.key]: e.target.value })}
                  />
                </label>
              ))}
            </div>
          )}
          <div className="pi-intake-actions">
            <button type="button" className="blueprint-secondary-link" onClick={() => setPreview(true)}>
              {SUMMARY_COPY.previewTitle}
            </button>
            <button type="button" className="gold-button" onClick={() => void summaryAction("save")}>
              {SUMMARY_COPY.saveDraft}
            </button>
            <button type="button" className="gold-button" onClick={() => void summaryAction("ready")}>
              {SUMMARY_COPY.markReady}
            </button>
            <button type="button" className="gold-button" onClick={() => void summaryAction("publish")}>
              {SUMMARY_COPY.publish}
            </button>
            <button type="button" className="gold-button" onClick={() => void summaryAction("send")}>
              {SUMMARY_COPY.send}
            </button>
          </div>
          <p className="pi-saved-indicator">{SUMMARY_COPY.publishedNote}</p>
        </section>
      ) : null}
    </div>
  );
}
