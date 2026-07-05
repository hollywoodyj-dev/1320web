"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { FACILITATOR_COPY } from "@/lib/personal-integration/facilitator-content";

type FacilitatorSession = {
  id: string;
  status: string;
  sessionVariantLabel: string;
  growthEdge: string | null;
  summary: string | null;
  clientName: string;
  clientEmail: string;
  createdAt: string;
  prepUrl: string | null;
  followUpUrl: string | null;
};

export function PersonalIntegrationFacilitatorConsole() {
  const [accessKey, setAccessKey] = useState("");
  const [sessions, setSessions] = useState<FacilitatorSession[]>([]);
  const [drafts, setDrafts] = useState<Record<string, { status: string; summary: string }>>({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function authHeaders(): HeadersInit {
    return {
      Authorization: `Bearer ${accessKey.trim()}`,
      "Content-Type": "application/json",
    };
  }

  async function loadSessions(event?: FormEvent) {
    event?.preventDefault();
    if (!accessKey.trim()) {
      setStatus(FACILITATOR_COPY.unauthorized);
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/personal-integration/facilitator/sessions", {
        headers: authHeaders(),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        sessions?: FacilitatorSession[];
        error?: string;
      };

      if (!response.ok || !data.ok || !data.sessions) {
        setStatus(data.error ?? FACILITATOR_COPY.unauthorized);
        setSessions([]);
        return;
      }

      setSessions(data.sessions);
      setDrafts(
        Object.fromEntries(
          data.sessions.map((session) => [
            session.id,
            { status: session.status, summary: session.summary ?? "" },
          ]),
        ),
      );
      if (data.sessions.length === 0) {
        setStatus(FACILITATOR_COPY.empty);
      }
    } catch {
      setStatus(FACILITATOR_COPY.unauthorized);
    } finally {
      setLoading(false);
    }
  }

  async function updateSession(sessionId: string) {
    const draft = drafts[sessionId];
    if (!draft) return;

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/personal-integration/facilitator/sessions", {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          sessionId,
          status: draft.status,
          summary: draft.summary,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        session?: { followUpUrl?: string | null };
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setStatus(data.error ?? "Update failed.");
        return;
      }

      setStatus(FACILITATOR_COPY.saved);
      await loadSessions();
    } catch {
      setStatus("Update failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form className="conversion-form max-w-md" onSubmit={loadSessions}>
        <label className="conversion-field">
          {FACILITATOR_COPY.keyLabel}
          <span className="conversion-optional block text-sm opacity-80">{FACILITATOR_COPY.keyHelp}</span>
          <input
            type="password"
            className="conversion-input"
            value={accessKey}
            onChange={(event) => setAccessKey(event.target.value)}
            autoComplete="off"
          />
        </label>
        <button type="submit" className="gold-button" disabled={loading}>
          {loading ? "Loading…" : FACILITATOR_COPY.load}
        </button>
      </form>

      {status ? <p className="conversion-status">{status}</p> : null}

      <div className="space-y-4">
        {sessions.map((session) => {
          const draft = drafts[session.id] ?? { status: session.status, summary: session.summary ?? "" };
          return (
            <article key={session.id} className="rounded border border-white/10 p-4 space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-medium">{session.clientName}</h2>
                <span className="text-xs opacity-70">{session.clientEmail}</span>
              </div>
              <p className="text-sm opacity-90">{session.sessionVariantLabel}</p>
              {session.growthEdge ? (
                <p className="text-sm">
                  <span className="opacity-70">Growth edge:</span> {session.growthEdge}
                </p>
              ) : null}
              <p className="font-mono text-xs opacity-60">{session.id}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                {session.prepUrl ? (
                  <Link href={session.prepUrl} className="blueprint-secondary-link">
                    Prep link
                  </Link>
                ) : null}
                {session.followUpUrl ? (
                  <Link href={session.followUpUrl} className="blueprint-secondary-link">
                    Follow-up link
                  </Link>
                ) : null}
              </div>
              <label className="conversion-field">
                Status
                <select
                  className="conversion-input"
                  value={draft.status}
                  onChange={(event) =>
                    setDrafts((current) => ({
                      ...current,
                      [session.id]: { ...draft, status: event.target.value },
                    }))
                  }
                >
                  <option value="scheduled">scheduled</option>
                  <option value="active">active</option>
                  <option value="completed">completed</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </label>
              <label className="conversion-field">
                Session summary (facilitator)
                <textarea
                  className="conversion-input conversion-textarea"
                  value={draft.summary}
                  onChange={(event) =>
                    setDrafts((current) => ({
                      ...current,
                      [session.id]: { ...draft, summary: event.target.value },
                    }))
                  }
                  placeholder="Post-session integration note for the client…"
                />
              </label>
              <button
                type="button"
                className="gold-button"
                disabled={loading}
                onClick={() => updateSession(session.id)}
              >
                {loading ? FACILITATOR_COPY.saving : FACILITATOR_COPY.save}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
