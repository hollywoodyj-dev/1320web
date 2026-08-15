"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import type { AdminUserView } from "@/lib/admin/admin-accounts";

type UsersResponse = {
  users: AdminUserView[];
  truncated?: boolean;
  limit?: number;
};

const styles = {
  section: { display: "grid", gap: "1rem", color: "#e8e4dc", marginTop: "0.5rem" } as CSSProperties,
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    flexWrap: "wrap",
  } as CSSProperties,
  title: { margin: 0, fontSize: "1.25rem", fontWeight: 600, color: "#f5f1ea" } as CSSProperties,
  refresh: {
    border: "1px solid rgba(255, 255, 255, 0.22)",
    background: "#2a2a2a",
    color: "#f5f1ea",
    padding: "0.4rem 0.85rem",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "0.875rem",
  } as CSSProperties,
  muted: { margin: 0, color: "#b0a99c", fontSize: "0.9rem" } as CSSProperties,
  error: { margin: 0, color: "#ff8a8a", fontSize: "0.95rem" } as CSSProperties,
  filter: {
    width: "100%",
    maxWidth: 360,
    border: "1px solid rgba(255, 255, 255, 0.18)",
    background: "#161616",
    color: "#f5f1ea",
    padding: "0.55rem 0.75rem",
    borderRadius: 6,
    fontSize: "0.9rem",
  } as CSSProperties,
  tableWrap: {
    overflowX: "auto",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: 8,
    background: "#1c1c1c",
    color: "#f5f1ea",
  } as CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.85rem",
    color: "#f5f1ea",
  } as CSSProperties,
  th: {
    textAlign: "left",
    padding: "0.55rem 0.7rem",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    background: "#2a2a2a",
    color: "#f5f1ea",
    fontWeight: 600,
    whiteSpace: "nowrap",
  } as CSSProperties,
  td: {
    textAlign: "left",
    padding: "0.55rem 0.7rem",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    verticalAlign: "top",
    color: "#e8e4dc",
  } as CSSProperties,
  code: { color: "#e8dcc8", fontSize: "0.8rem" } as CSSProperties,
  badge: {
    display: "inline-block",
    padding: "0.15rem 0.45rem",
    borderRadius: 999,
    fontSize: "0.75rem",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "#2a2a2a",
    color: "#f5f1ea",
  } as CSSProperties,
  badgeActive: {
    border: "1px solid rgba(120, 200, 140, 0.45)",
    background: "rgba(60, 120, 80, 0.35)",
    color: "#d8f5df",
  } as CSSProperties,
  badgePending: {
    border: "1px solid rgba(220, 180, 80, 0.45)",
    background: "rgba(140, 110, 40, 0.35)",
    color: "#f5e6b8",
  } as CSSProperties,
  warn: {
    margin: 0,
    color: "#f0c674",
    fontSize: "0.85rem",
  } as CSSProperties,
  copyBtn: {
    border: "1px solid rgba(255, 255, 255, 0.18)",
    background: "transparent",
    color: "#d8d0c4",
    padding: "0.2rem 0.45rem",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: "0.75rem",
  } as CSSProperties,
  dupRow: { background: "rgba(160, 80, 40, 0.22)" } as CSSProperties,
};

function statusBadgeStyle(status: string): CSSProperties {
  if (status === "active") return { ...styles.badge, ...styles.badgeActive };
  if (status === "pending") return { ...styles.badge, ...styles.badgePending };
  return styles.badge;
}

function truncateRef(value: string | null | undefined): string {
  if (!value) return "—";
  if (value.length <= 16) return value;
  return `${value.slice(0, 8)}…${value.slice(-4)}`;
}

export function AdminAccountsPanel() {
  const [users, setUsers] = useState<AdminUserView[]>([]);
  const [truncated, setTruncated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users", { credentials: "include" });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
      } & Partial<UsersResponse>;
      if (!res.ok) {
        setUsers([]);
        setError(json.error || `Failed to load (${res.status})`);
        return;
      }
      setUsers(json.users ?? []);
      setTruncated(Boolean(json.truncated));
    } catch {
      setUsers([]);
      setError("Network error while loading accounts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const duplicateRefs = useMemo(() => {
    const counts = new Map<string, number>();
    for (const u of users) {
      const ref = u.subscription?.externalSubscriptionId?.trim();
      if (!ref) continue;
      counts.set(ref, (counts.get(ref) ?? 0) + 1);
    }
    return new Set([...counts.entries()].filter(([, n]) => n > 1).map(([id]) => id));
  }, [users]);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        (u.name?.toLowerCase().includes(q) ?? false) ||
        u.id.toLowerCase().includes(q),
    );
  }, [users, filter]);

  async function copyUserId(id: string) {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Accounts</h2>
        <button type="button" style={styles.refresh} onClick={() => void load()}>
          Refresh
        </button>
      </div>
      <p style={styles.muted}>Read-only. No password hashes, birth dates, or blueprint content.</p>

      <input
        style={styles.filter}
        type="search"
        placeholder="Filter by email, name, or user id"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        aria-label="Filter accounts"
      />

      {loading && users.length === 0 && <p style={styles.muted}>Loading accounts…</p>}
      {error && <p style={styles.error}>{error}</p>}
      {truncated && (
        <p style={styles.warn}>Showing first 500 accounts (newest first). Add cursor pagination in v1.1 if needed.</p>
      )}
      {duplicateRefs.size > 0 && (
        <p style={styles.warn}>
          {duplicateRefs.size} external payment ref(s) appear on more than one account — rows highlighted.
        </p>
      )}

      {!loading && !error && users.length === 0 && (
        <p style={styles.muted}>No accounts yet.</p>
      )}

      {filtered.length > 0 && (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Created</th>
                <th style={styles.th}>Auth</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Plan</th>
                <th style={styles.th}>Period end</th>
                <th style={styles.th}>External ref</th>
                <th style={styles.th}>Generates</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => {
                const ref = u.subscription?.externalSubscriptionId ?? null;
                const isDup = Boolean(ref && duplicateRefs.has(ref));
                return (
                  <tr key={u.id} style={isDup ? styles.dupRow : undefined}>
                    <td style={styles.td}>
                      <div>{u.email}</div>
                      {u.name && <div style={styles.muted}>{u.name}</div>}
                    </td>
                    <td style={styles.td}>{new Date(u.createdAt).toLocaleString()}</td>
                    <td style={styles.td}>{u.oauthProvider ?? "—"}</td>
                    <td style={styles.td}>
                      <span style={statusBadgeStyle(u.effectiveStatus)}>{u.effectiveStatus}</span>
                    </td>
                    <td style={styles.td}>
                      <code style={styles.code}>{u.subscription?.plan ?? "—"}</code>
                    </td>
                    <td style={styles.td}>
                      {u.subscription?.currentPeriodEnd
                        ? new Date(u.subscription.currentPeriodEnd).toLocaleDateString()
                        : "—"}
                    </td>
                    <td style={styles.td}>
                      <code style={styles.code}>{truncateRef(ref)}</code>
                    </td>
                    <td style={styles.td}>
                      {u.generateCount}
                      {u.lastGenerateAt ? (
                        <div style={styles.muted}>
                          last {new Date(u.lastGenerateAt).toLocaleDateString()}
                        </div>
                      ) : null}
                    </td>
                    <td style={styles.td}>
                      <button
                        type="button"
                        style={styles.copyBtn}
                        onClick={() => void copyUserId(u.id)}
                      >
                        {copiedId === u.id ? "Copied" : "Copy id"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!loading && users.length > 0 && filtered.length === 0 && (
        <p style={styles.muted}>No accounts match “{filter}”.</p>
      )}
    </section>
  );
}
