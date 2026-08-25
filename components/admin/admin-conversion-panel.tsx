"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";

type CatalogEntry = {
  name: string;
  label: string;
  tier: string;
  description: string;
  count30d: number;
};

type ConversionTrackingData = {
  windowDays: number;
  generatedAt: string;
  ga4Configured: boolean;
  ga4MeasurementId: string | null;
  primaryKpi: { event: string; count30d: number };
  catalog: CatalogEntry[];
  paidLpBreakdown: { lp: string; count: number }[];
  pageViewBreakdown: { path: string; count: number }[];
  recentEvents: {
    id: string;
    eventName: string;
    userId: string | null;
    source: string | null;
    medium: string | null;
    campaign: string | null;
    lp: string | null;
    adGroup: string | null;
    platform: string | null;
    path: string | null;
    createdAt: string;
  }[];
};

/** Explicit dark text — site body inherits light text on dark bg. */
const styles = {
  section: {
    display: "grid",
    gap: "1.25rem",
    color: "#e8e4dc",
  } as CSSProperties,
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
  cardLabel: {
    fontSize: "0.75rem",
    color: "#b0a99c",
    wordBreak: "break-all",
  } as CSSProperties,
  cardValue: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginTop: "0.25rem",
    color: "#f5f1ea",
  } as CSSProperties,
  cardSub: {
    fontSize: "0.75rem",
    color: "#9a9388",
    marginTop: "0.15rem",
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
  } as CSSProperties,
  td: {
    textAlign: "left",
    padding: "0.55rem 0.7rem",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    verticalAlign: "top",
    color: "#e8e4dc",
  } as CSSProperties,
  h3: { margin: "0.5rem 0 0", fontSize: "1.05rem", color: "#f5f1ea" } as CSSProperties,
  code: { color: "#e8dcc8", fontSize: "0.8rem" } as CSSProperties,
};

export function AdminConversionPanel() {
  const [data, setData] = useState<ConversionTrackingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/conversion-tracking", {
        credentials: "include",
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
      } & Partial<ConversionTrackingData>;
      if (!res.ok) {
        setData(null);
        setError(json.error || `Failed to load (${res.status})`);
        return;
      }
      setData(json as ConversionTrackingData);
    } catch {
      setData(null);
      setError("Network error while loading conversion tracking");
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
        <h2 style={styles.title}>Conversion tracking (last 30 days)</h2>
        <button type="button" style={styles.refresh} onClick={() => void load()}>
          Refresh
        </button>
      </div>

      {loading && !data && <p style={styles.muted}>Loading conversion data…</p>}
      {error && <p style={styles.error}>{error}</p>}

      {data && (
        <>
          <p style={styles.muted}>
            Generated {new Date(data.generatedAt).toLocaleString()} · GA4:{" "}
            {data.ga4Configured ? (
              <>
                configured (<code>{data.ga4MeasurementId}</code>)
              </>
            ) : (
              <strong>not configured</strong>
            )}{" "}
            — admin reads first-party DB only.
          </p>

          <div style={styles.cards}>
            <div style={styles.card}>
              <div style={styles.cardLabel}>Primary KPI</div>
              <div style={styles.cardValue}>{data.primaryKpi.count30d}</div>
              <div style={styles.cardSub}>{data.primaryKpi.event}</div>
            </div>
            {data.pageViewBreakdown.slice(0, 6).map((row) => (
              <div key={row.path} style={styles.card}>
                <div style={styles.cardLabel}>{row.path}</div>
                <div style={styles.cardValue}>{row.count}</div>
                <div style={styles.cardSub}>page views</div>
              </div>
            ))}
            {data.paidLpBreakdown.map((row) => (
              <div key={row.lp} style={styles.card}>
                <div style={styles.cardLabel}>{row.lp}</div>
                <div style={styles.cardValue}>{row.count}</div>
                <div style={styles.cardSub}>paid LP events</div>
              </div>
            ))}
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Event</th>
                  <th style={styles.th}>Tier</th>
                  <th style={styles.th}>30d</th>
                  <th style={styles.th}>Description</th>
                </tr>
              </thead>
              <tbody>
                {data.catalog.map((entry) => (
                  <tr key={entry.name}>
                    <td style={styles.td}>
                      <code>{entry.name}</code>
                    </td>
                    <td style={styles.td}>{entry.tier}</td>
                    <td style={styles.td}>{entry.count30d}</td>
                    <td style={styles.td}>{entry.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 style={styles.h3}>Recent events</h3>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>When</th>
                  <th style={styles.th}>Event</th>
                  <th style={styles.th}>Source</th>
                  <th style={styles.th}>Medium</th>
                  <th style={styles.th}>Campaign</th>
                  <th style={styles.th}>LP / ad group</th>
                  <th style={styles.th}>Path</th>
                </tr>
              </thead>
              <tbody>
                {data.recentEvents.length === 0 ? (
                  <tr>
                    <td style={styles.td} colSpan={7}>
                      No events in window yet.
                    </td>
                  </tr>
                ) : (
                  data.recentEvents.map((ev) => (
                    <tr key={ev.id}>
                      <td style={styles.td}>{new Date(ev.createdAt).toLocaleString()}</td>
                      <td style={styles.td}>
                        <code>{ev.eventName}</code>
                      </td>
                      <td style={styles.td}>{ev.source ?? "—"}</td>
                      <td style={styles.td}>{ev.medium ?? "—"}</td>
                      <td style={styles.td}>{ev.campaign ?? "—"}</td>
                      <td style={styles.td}>
                        {[ev.lp, ev.adGroup].filter(Boolean).join(" · ") || "—"}
                      </td>
                      <td style={styles.td}>{ev.path ?? "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
