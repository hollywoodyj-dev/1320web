"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  FACILITATOR_COPY,
  FACILITATOR_FILTERS,
  FACILITATOR_STATUS_OPTIONS,
  type FacilitatorFilterId,
} from "@/lib/personal-integration/facilitator-content";

type FacilitatorSession = {
  id: string;
  status: string;
  sessionVariantLabel: string;
  growthEdge: string | null;
  summary: string | null;
  clientName: string;
  clientEmail: string;
  bookingNotes: string | null;
  birthDate: string | null;
  createdAt: string;
  updatedAt: string;
  prepUrl: string | null;
  followUpUrl: string | null;
  followUpEmailSentAt: string | null;
  followUpEmailFailedAt: string | null;
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso.slice(0, 10);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function followUpStateLabel(
  session: FacilitatorSession,
  emailConfigured: boolean | null,
): string {
  if (!session.followUpUrl) return FACILITATOR_COPY.followUpNotGenerated;
  if (session.followUpEmailSentAt) return FACILITATOR_COPY.emailSent;
  if (session.followUpEmailFailedAt) return FACILITATOR_COPY.emailFailed;
  if (emailConfigured === false) return FACILITATOR_COPY.emailNotConfigured;
  if (emailConfigured === true) return FACILITATOR_COPY.emailPending;
  return FACILITATOR_COPY.followUpGenerated;
}

function matchesFilter(session: FacilitatorSession, filter: FacilitatorFilterId): boolean {
  switch (filter) {
    case "all":
      return true;
    case "new":
      return session.status === "scheduled";
    case "scheduled":
      return session.status === "scheduled" || session.status === "active";
    case "completed":
      return session.status === "completed";
    case "follow_up_sent":
      return Boolean(session.followUpEmailSentAt);
    case "cancelled":
      return session.status === "cancelled";
    case "needs_attention":
      return (
        (session.status === "completed" && !session.followUpUrl) ||
        (session.status === "completed" && !session.followUpEmailSentAt && Boolean(session.followUpUrl)) ||
        (session.status === "scheduled" && !session.clientEmail)
      );
    default:
      return true;
  }
}

export function PersonalIntegrationFacilitatorConsole() {
  const [accessKey, setAccessKey] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [sessions, setSessions] = useState<FacilitatorSession[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FacilitatorFilterId>("all");
  const [drafts, setDrafts] = useState<Record<string, { status: string; summary: string }>>({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailConfigured, setEmailConfigured] = useState<boolean | null>(null);

  const filtered = useMemo(
    () => sessions.filter((session) => matchesFilter(session, filter)),
    [sessions, filter],
  );

  const selected = filtered.find((session) => session.id === selectedId) ?? filtered[0] ?? null;
  const draft = selected
    ? drafts[selected.id] ?? { status: selected.status, summary: selected.summary ?? "" }
    : null;

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
      setAuthorized(false);
      setSessions([]);
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/personal-integration/facilitator/sessions", {
        headers: authHeaders(),
        cache: "no-store",
      });
      const data = (await response.json()) as {
        ok?: boolean;
        sessions?: FacilitatorSession[];
        followUpEmailConfigured?: boolean;
        error?: string;
      };

      if (!response.ok || !data.ok || !data.sessions) {
        setStatus(FACILITATOR_COPY.unauthorized);
        setAuthorized(false);
        setSessions([]);
        setSelectedId(null);
        return;
      }

      setAuthorized(true);
      setSessions(data.sessions);
      setEmailConfigured(Boolean(data.followUpEmailConfigured));
      setDrafts(
        Object.fromEntries(
          data.sessions.map((session) => [
            session.id,
            { status: session.status, summary: session.summary ?? "" },
          ]),
        ),
      );
      setSelectedId((current) => {
        if (current && data.sessions?.some((session) => session.id === current)) return current;
        return data.sessions?.[0]?.id ?? null;
      });
      if (data.sessions.length === 0) {
        setStatus(FACILITATOR_COPY.empty);
      }
    } catch {
      setAuthorized(false);
      setSessions([]);
      setStatus(FACILITATOR_COPY.unauthorized);
    } finally {
      setLoading(false);
    }
  }

  async function updateSession(sessionId: string) {
    const next = drafts[sessionId];
    if (!next) return;

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/personal-integration/facilitator/sessions", {
        method: "PATCH",
        headers: authHeaders(),
        cache: "no-store",
        body: JSON.stringify({
          sessionId,
          status: next.status,
          summary: next.summary,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        followUpEmailConfigured?: boolean;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setStatus(data.error ?? "Update failed.");
        return;
      }

      if (typeof data.followUpEmailConfigured === "boolean") {
        setEmailConfigured(data.followUpEmailConfigured);
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
    <div className={authorized ? "facilitator-console facilitator-console--open" : "facilitator-console"}>
      {!authorized ? (
        <section className="facilitator-access glass-card" aria-labelledby="facilitator-access-title">
          <h2 id="facilitator-access-title" className="facilitator-section-title">
            {FACILITATOR_COPY.keyLabel}
          </h2>
          <p className="facilitator-access-help">{FACILITATOR_COPY.keyHelp}</p>
          <p className="facilitator-access-helper">{FACILITATOR_COPY.keyHelper}</p>
          <form className="facilitator-access-form" onSubmit={loadSessions}>
            <label className="conversion-field">
              <span className="sr-only">{FACILITATOR_COPY.keyLabel}</span>
              <input
                type="password"
                className="conversion-input"
                value={accessKey}
                onChange={(event) => setAccessKey(event.target.value)}
                autoComplete="off"
                spellCheck={false}
              />
            </label>
            <button type="submit" className="gold-button facilitator-load" disabled={loading}>
              {loading ? FACILITATOR_COPY.loading : FACILITATOR_COPY.load}
            </button>
          </form>
          {status ? (
            <p className="facilitator-status" role="status">
              {status}
            </p>
          ) : null}
        </section>
      ) : (
        <>
          <section className="facilitator-access facilitator-access--compact glass-card" aria-labelledby="facilitator-access-title">
            <h2 id="facilitator-access-title" className="facilitator-section-title">
              {FACILITATOR_COPY.keyLabel}
            </h2>
            <form className="facilitator-access-form facilitator-access-form--inline" onSubmit={loadSessions}>
              <label className="conversion-field">
                <span className="sr-only">{FACILITATOR_COPY.keyLabel}</span>
                <input
                  type="password"
                  className="conversion-input"
                  value={accessKey}
                  onChange={(event) => setAccessKey(event.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                />
              </label>
              <button type="submit" className="gold-button facilitator-load" disabled={loading}>
                {loading ? FACILITATOR_COPY.loading : FACILITATOR_COPY.load}
              </button>
            </form>
            {status ? (
              <p className="facilitator-status" role="status">
                {status}
              </p>
            ) : null}
          </section>
        <div className="facilitator-workspace">
          <section className="facilitator-panel" aria-labelledby="facilitator-filters-title">
            <h2 id="facilitator-filters-title" className="facilitator-section-title">
              {FACILITATOR_COPY.filtersTitle}
            </h2>
            <div className="facilitator-filters" role="toolbar" aria-label="Session filters">
              {FACILITATOR_FILTERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={
                    filter === item.id
                      ? "facilitator-filter facilitator-filter--active"
                      : "facilitator-filter"
                  }
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </section>

          <div className="facilitator-split">
            <section className="facilitator-panel" aria-labelledby="facilitator-list-title">
              <h2 id="facilitator-list-title" className="facilitator-section-title">
                {FACILITATOR_COPY.listTitle}
              </h2>
              {filtered.length === 0 ? (
                <p className="facilitator-empty-hint">{FACILITATOR_COPY.emptyList}</p>
              ) : (
                <ul className="facilitator-session-list">
                  {filtered.map((session) => {
                    const isActive = selected?.id === session.id;
                    return (
                      <li key={session.id}>
                        <button
                          type="button"
                          className={
                            isActive
                              ? "facilitator-session-row facilitator-session-row--active"
                              : "facilitator-session-row"
                          }
                          onClick={() => setSelectedId(session.id)}
                        >
                          <span className="facilitator-session-name">{session.clientName}</span>
                          <span className="facilitator-session-meta">{session.clientEmail}</span>
                          <span className="facilitator-session-meta">
                            {session.sessionVariantLabel} · {formatDate(session.createdAt)}
                          </span>
                          <span className="facilitator-session-status">
                            {session.status}
                            {" · "}
                            {followUpStateLabel(session, emailConfigured)}
                          </span>
                          <span className="facilitator-session-meta">
                            Updated {formatDate(session.updatedAt)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            <section className="facilitator-panel facilitator-detail" aria-labelledby="facilitator-detail-title">
              <h2 id="facilitator-detail-title" className="facilitator-section-title">
                {FACILITATOR_COPY.detailTitle}
              </h2>
              {!selected || !draft ? (
                <p className="facilitator-empty-hint">{FACILITATOR_COPY.emptyList}</p>
              ) : (
                <>
                  <dl className="facilitator-detail-grid">
                    <div>
                      <dt>Client</dt>
                      <dd>{selected.clientName}</dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd>{selected.clientEmail}</dd>
                    </div>
                    <div>
                      <dt>Session type</dt>
                      <dd>{selected.sessionVariantLabel}</dd>
                    </div>
                    <div>
                      <dt>Requested</dt>
                      <dd>{formatDate(selected.createdAt)}</dd>
                    </div>
                    {selected.birthDate ? (
                      <div>
                        <dt>Birth date</dt>
                        <dd>{selected.birthDate}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt>Current status</dt>
                      <dd>{selected.status}</dd>
                    </div>
                  </dl>

                  {selected.growthEdge || selected.bookingNotes ? (
                    <div className="facilitator-notes">
                      {selected.growthEdge ? (
                        <p>
                          <strong>Focus / growth edge</strong>
                          <br />
                          {selected.growthEdge}
                        </p>
                      ) : null}
                      {selected.bookingNotes ? (
                        <p>
                          <strong>Booking notes</strong>
                          <br />
                          {selected.bookingNotes}
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="facilitator-subsection">
                    <h3 className="facilitator-subsection-title">{FACILITATOR_COPY.statusTitle}</h3>
                    <label className="conversion-field">
                      Status
                      <select
                        className="conversion-input"
                        value={draft.status}
                        onChange={(event) =>
                          setDrafts((current) => ({
                            ...current,
                            [selected.id]: { ...draft, status: event.target.value },
                          }))
                        }
                      >
                        {FACILITATOR_STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="facilitator-subsection">
                    <h3 className="facilitator-subsection-title">{FACILITATOR_COPY.summaryTitle}</h3>
                    <p className="facilitator-summary-hint">{FACILITATOR_COPY.summaryHint}</p>
                    <label className="conversion-field">
                      {FACILITATOR_COPY.summaryLabel}
                      <textarea
                        className="conversion-input conversion-textarea"
                        rows={5}
                        value={draft.summary}
                        onChange={(event) =>
                          setDrafts((current) => ({
                            ...current,
                            [selected.id]: { ...draft, summary: event.target.value },
                          }))
                        }
                        placeholder={FACILITATOR_COPY.summaryPlaceholder}
                      />
                    </label>
                    <button
                      type="button"
                      className="gold-button"
                      disabled={loading}
                      onClick={() => updateSession(selected.id)}
                    >
                      {loading ? FACILITATOR_COPY.saving : FACILITATOR_COPY.save}
                    </button>
                  </div>

                  <div className="facilitator-subsection">
                    <h3 className="facilitator-subsection-title">{FACILITATOR_COPY.followUpTitle}</h3>
                    <p className="facilitator-follow-state">
                      {followUpStateLabel(selected, emailConfigured)}
                    </p>
                    {emailConfigured === false ? (
                      <p className="facilitator-access-helper">{FACILITATOR_COPY.emailNotConfigured}</p>
                    ) : (
                      <p className="facilitator-access-helper">{FACILITATOR_COPY.emailConfiguredNote}</p>
                    )}
                    <div className="facilitator-link-row">
                      {selected.prepUrl ? (
                        <Link href={selected.prepUrl} className="blueprint-secondary-link">
                          Prep link
                        </Link>
                      ) : null}
                      {selected.followUpUrl ? (
                        <Link href={selected.followUpUrl} className="blueprint-secondary-link">
                          Follow-up link
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
