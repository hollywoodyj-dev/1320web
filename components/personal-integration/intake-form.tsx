"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { INTAKE_COPY } from "@/lib/personal-integration/ops/intake-content";
import { INTAKE_SECTIONS, type IntakeResponses } from "@/lib/personal-integration/ops/intake-schema";

type IntakeFormProps = {
  sessionId: string;
  token?: string;
};

export function PersonalIntegrationIntakeForm({ sessionId, token }: IntakeFormProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("not_started");
  const [responses, setResponses] = useState<IntakeResponses>({});
  const [message, setMessage] = useState("");
  const [prepUrl, setPrepUrl] = useState<string | null>(null);
  const query = useMemo(() => (token ? `?token=${encodeURIComponent(token)}` : ""), [token]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/personal-integration/intake/${sessionId}${query}`, {
          cache: "no-store",
        });
        const json = (await res.json()) as {
          ok?: boolean;
          error?: string;
          responses?: IntakeResponses;
          status?: string;
          prefill?: { prepUrl?: string | null };
        };
        if (!res.ok || !json.ok) {
          if (!cancelled) setError(json.error === "unauthorized" ? INTAKE_COPY.unauthorized : INTAKE_COPY.notFound);
          return;
        }
        if (!cancelled) {
          setResponses(json.responses ?? {});
          setStatus(json.status ?? "not_started");
          setPrepUrl(json.prefill?.prepUrl ?? null);
        }
      } catch {
        if (!cancelled) setError(INTAKE_COPY.notFound);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [sessionId, query]);

  function setField(id: string, value: string | boolean) {
    setResponses((prev) => ({ ...prev, [id]: value }));
  }

  async function saveDraft() {
    setMessage("");
    const res = await fetch(`/api/personal-integration/intake/${sessionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, responses }),
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !json.ok) {
      setMessage(json.error === "already_submitted" ? INTAKE_COPY.alreadySubmitted : "Could not save draft.");
      return;
    }
    setStatus("draft");
    setMessage(INTAKE_COPY.savedDraft);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    const res = await fetch(`/api/personal-integration/intake/${sessionId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, responses }),
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !json.ok) {
      const map: Record<string, string> = {
        consent_required: "Please complete the consent checkboxes.",
        missing_required: "Please complete the required fields.",
        scope_blocked:
          "If you need crisis or clinical support, please contact appropriate local services. This Session cannot replace that care.",
      };
      setMessage(map[json.error ?? ""] ?? "Could not submit intake.");
      return;
    }
    setStatus("submitted");
  }

  if (loading) {
    return <p className="pi-intake-status">Loading intake…</p>;
  }
  if (error) {
    return (
      <div className="pi-intake-card">
        <p>{error}</p>
        <Link href="/account" className="blueprint-secondary-link">
          {INTAKE_COPY.returnAccount}
        </Link>
      </div>
    );
  }
  if (status === "submitted" || status === "reviewed") {
    return (
      <div className="pi-intake-card pi-intake-card--success">
        <h2>{INTAKE_COPY.submittedTitle}</h2>
        <p>{INTAKE_COPY.submittedBody}</p>
        <div className="pi-intake-actions">
          {prepUrl ? (
            <Link href={prepUrl} className="gold-button">
              {INTAKE_COPY.openPrep}
            </Link>
          ) : null}
          <Link href="/account" className="blueprint-secondary-link">
            {INTAKE_COPY.returnAccount}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="pi-intake-form" onSubmit={onSubmit}>
      {INTAKE_SECTIONS.map((section) => (
        <section key={section.id} className="pi-intake-section">
          <h2>{section.title}</h2>
          {section.intro ? <p className="pi-intake-intro">{section.intro}</p> : null}
          {section.fields.map((field) => {
            const value = responses[field.id];
            if (field.type === "readonly") {
              return (
                <label key={field.id} className="pi-intake-field">
                  <span>{field.label}</span>
                  <input className="conversion-input" value={String(value ?? "")} readOnly />
                </label>
              );
            }
            if (field.type === "checkbox") {
              return (
                <label key={field.id} className="pi-intake-check">
                  <input
                    type="checkbox"
                    checked={value === true}
                    onChange={(e) => setField(field.id, e.target.checked)}
                  />
                  <span>{field.label}</span>
                </label>
              );
            }
            if (field.type === "select") {
              return (
                <label key={field.id} className="pi-intake-field">
                  <span>{field.label}</span>
                  <select
                    className="conversion-input"
                    value={typeof value === "string" ? value : ""}
                    onChange={(e) => setField(field.id, e.target.value)}
                    required={field.required}
                  >
                    <option value="">Select…</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }
            if (field.type === "textarea") {
              return (
                <label key={field.id} className="pi-intake-field">
                  <span>{field.label}</span>
                  <textarea
                    className="conversion-input conversion-textarea"
                    value={typeof value === "string" ? value : ""}
                    onChange={(e) => setField(field.id, e.target.value)}
                    required={field.required}
                    rows={4}
                  />
                </label>
              );
            }
            return (
              <label key={field.id} className="pi-intake-field">
                <span>{field.label}</span>
                {field.help ? <span className="pi-intake-help">{field.help}</span> : null}
                <input
                  className="conversion-input"
                  value={typeof value === "string" ? value : ""}
                  onChange={(e) => setField(field.id, e.target.value)}
                  required={field.required}
                />
              </label>
            );
          })}
        </section>
      ))}

      {message ? <p className="pi-intake-message">{message}</p> : null}

      <div className="pi-intake-actions">
        <button type="button" className="blueprint-secondary-link" onClick={() => void saveDraft()}>
          {INTAKE_COPY.saveDraft}
        </button>
        <Link href="/account" className="blueprint-secondary-link">
          {INTAKE_COPY.continueLater}
        </Link>
        <button type="submit" className="gold-button">
          {INTAKE_COPY.submit}
        </button>
      </div>
    </form>
  );
}
