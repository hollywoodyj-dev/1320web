"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";

type AdminStats = {
  totals: {
    totalUsers: number;
    newUsers30d: number;
    totalSubscriptions: number;
    newSubscriptions30d: number;
    totalPurchases?: number;
    newPurchases30d?: number;
  };
  byStatus: {
    active: number;
    pending: number;
    expired: number;
    trialing: number;
    canceled: number;
  };
  generatedAt: string;
};

const styles = {
  section: { display: "grid", gap: "0.85rem", color: "#e8e4dc" } as CSSProperties,
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
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: "0.75rem",
  } as CSSProperties,
  card: {
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: 8,
    padding: "0.85rem",
    background: "#1c1c1c",
    color: "#f5f1ea",
  } as CSSProperties,
  cardLabel: { fontSize: "0.75rem", color: "#b0a99c" } as CSSProperties,
  cardValue: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginTop: "0.25rem",
    color: "#f5f1ea",
  } as CSSProperties,
  cardSub: { fontSize: "0.75rem", color: "#9a9388", marginTop: "0.15rem" } as CSSProperties,
};

export function AdminStatsStrip() {
  const [data, setData] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/stats", { credentials: "include" });
      const json = (await res.json().catch(() => ({}))) as { error?: string } & Partial<AdminStats>;
      if (!res.ok) {
        setData(null);
        setError(json.error || `Failed to load (${res.status})`);
        return;
      }
      setData(json as AdminStats);
    } catch {
      setData(null);
      setError("Network error while loading stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Overview</h2>
        <button type="button" style={styles.refresh} onClick={() => void load()}>
          Refresh
        </button>
      </div>
      {loading && !data && <p style={styles.muted}>Loading stats…</p>}
      {error && <p style={styles.error}>{error}</p>}
      {data && (
        <>
          <p style={styles.muted}>
            Generated {new Date(data.generatedAt).toLocaleString()} · accounts + Full Report
            entitlements (read-only).
          </p>
          <div style={styles.cards}>
            <div style={styles.card}>
              <div style={styles.cardLabel}>Total users</div>
              <div style={styles.cardValue}>{data.totals.totalUsers}</div>
              <div style={styles.cardSub}>all time</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardLabel}>New users</div>
              <div style={styles.cardValue}>{data.totals.newUsers30d}</div>
              <div style={styles.cardSub}>last 30 days</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardLabel}>Purchases</div>
              <div style={styles.cardValue}>
                {data.totals.totalPurchases ?? data.totals.totalSubscriptions}
              </div>
              <div style={styles.cardSub}>full_report completed</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardLabel}>Purchases 30d</div>
              <div style={styles.cardValue}>
                {data.totals.newPurchases30d ?? data.totals.newSubscriptions30d}
              </div>
              <div style={styles.cardSub}>completed</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardLabel}>Active entitlements</div>
              <div style={styles.cardValue}>{data.byStatus.active}</div>
              <div style={styles.cardSub}>full_report</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardLabel}>Pending</div>
              <div style={styles.cardValue}>{data.byStatus.pending}</div>
              <div style={styles.cardSub}>checkout</div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
