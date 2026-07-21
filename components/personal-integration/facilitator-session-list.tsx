"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import type { FacilitatorListBucket } from "@/lib/personal-integration/ops/workspace-service";

type SessionRow = {
  id: string;
  preferredName: string;
  scheduledAt: string;
  timezone: string | null;
  sessionType: string;
  intakeStatus: string;
  reportConnected: boolean;
  sessionStatus: string;
  summaryStatus: string;
  bucket: FacilitatorListBucket;
};

const BUCKETS: Array<{ id: FacilitatorListBucket | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "needs_intake_review", label: "Needs Intake Review" },
  { id: "ready_for_session", label: "Ready for Session" },
  { id: "completed", label: "Completed" },
  { id: "needs_summary", label: "Needs Summary" },
  { id: "follow_up_due", label: "Follow-Up Due" },
  { id: "cancelled", label: "Cancelled" },
];

function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso.slice(0, 16);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function FacilitatorSessionList() {
  const [accessKey, setAccessKey] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [bucket, setBucket] = useState<FacilitatorListBucket | "all">("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadSessions(key: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/personal-integration/facilitator/workspace", {
        headers: { Authorization: `Bearer ${key}` },
        cache: "no-store",
      });
      const json = (await res.json()) as { ok?: boolean; sessions?: SessionRow[]; error?: string };
      if (!res.ok || !json.ok) {
        setAuthorized(false);
        setError("Access denied.");
        return;
      }
      setAuthorized(true);
      setSessions(json.sessions ?? []);
      try {
        sessionStorage.setItem("pi_facilitator_key", key);
      } catch {
        // ignore
      }
    } catch {
      setError("Could not load sessions.");
    } finally {
      setLoading(false);
    }
  }

  function onGate(event: FormEvent) {
    event.preventDefault();
    void loadSessions(accessKey.trim());
  }

  const visible = useMemo(
    () => (bucket === "all" ? sessions : sessions.filter((row) => row.bucket === bucket)),
    [sessions, bucket],
  );

  if (!authorized) {
    return (
      <div className="pi-facilitator-gate">
        <form className="pi-intake-card" onSubmit={onGate}>
          <h2>Facilitator Session Workspace</h2>
          <p className="pi-intake-intro">
            Enter your facilitator access key to continue. Session data is not loaded until access is
            verified.
          </p>
          <label className="pi-intake-field">
            <span>Access key</span>
            <input
              className="conversion-input"
              type="password"
              autoComplete="off"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              required
            />
          </label>
          {error ? <p className="pi-intake-message">{error}</p> : null}
          <button type="submit" className="gold-button" disabled={loading}>
            {loading ? "Checking…" : "Open workspace"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="pi-session-list">
      <div className="pi-bucket-row">
        {BUCKETS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={bucket === item.id}
            onClick={() => setBucket(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <table className="pi-session-list-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>When</th>
            <th>Type</th>
            <th>Intake</th>
            <th>Report</th>
            <th>Session</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((row) => (
            <tr key={row.id}>
              <td>
                <Link href={`/facilitator/sessions/${row.id}`}>{row.preferredName}</Link>
              </td>
              <td>{formatWhen(row.scheduledAt)}</td>
              <td>{row.sessionType}</td>
              <td>{row.intakeStatus}</td>
              <td>{row.reportConnected ? "Connected" : "Missing"}</td>
              <td>{row.sessionStatus}</td>
              <td>{row.summaryStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {visible.length === 0 ? <p className="pi-intake-status">No sessions in this bucket.</p> : null}
    </div>
  );
}
