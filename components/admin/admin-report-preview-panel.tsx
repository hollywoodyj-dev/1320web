"use client";

import { useMemo, useState, type CSSProperties, type FormEvent } from "react";
import {
  buildAdminReportPreviewHref,
  parseAdminBirthDateInput,
  summarizeAdminReportPreview,
} from "@/lib/admin/report-preview";
import { getBirthDateValidationMessage } from "@/lib/validateBirthDate";

const styles = {
  section: { display: "grid", gap: "1rem", color: "#e8e4dc" } as CSSProperties,
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    flexWrap: "wrap",
  } as CSSProperties,
  title: { margin: 0, fontSize: "1.25rem", fontWeight: 600, color: "#f5f1ea" } as CSSProperties,
  muted: { margin: 0, color: "#b0a99c", fontSize: "0.9rem" } as CSSProperties,
  form: {
    display: "grid",
    gap: "0.85rem",
    padding: "1rem",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: 8,
    background: "#1c1c1c",
  } as CSSProperties,
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "0.75rem",
  } as CSSProperties,
  label: { display: "grid", gap: "0.35rem", fontSize: "0.85rem", color: "#e8e4dc" } as CSSProperties,
  input: {
    border: "1px solid rgba(255, 255, 255, 0.18)",
    background: "#161616",
    color: "#f5f1ea",
    padding: "0.55rem 0.75rem",
    borderRadius: 6,
    fontSize: "0.9rem",
  } as CSSProperties,
  actions: { display: "flex", flexWrap: "wrap", gap: "0.65rem" } as CSSProperties,
  button: {
    border: "1px solid rgba(255, 255, 255, 0.22)",
    background: "#2a2a2a",
    color: "#f5f1ea",
    padding: "0.45rem 0.85rem",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "0.875rem",
  } as CSSProperties,
  primary: {
    border: "1px solid rgba(212, 175, 95, 0.45)",
    background: "#3a3224",
  } as CSSProperties,
  error: { margin: 0, color: "#ff8a8a", fontSize: "0.9rem" } as CSSProperties,
  code: { color: "#e8dcc8", fontSize: "0.85rem" } as CSSProperties,
};

function readNumber(value: string): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

export function AdminReportPreviewPanel() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [error, setError] = useState<string | null>(null);

  const preview = useMemo(() => {
    const parts = parseAdminBirthDateInput(readNumber(year), readNumber(month), readNumber(day));
    if (!parts) return null;
    return summarizeAdminReportPreview(parts);
  }, [year, month, day]);

  function openPreview(mobile: boolean) {
    const parts = parseAdminBirthDateInput(readNumber(year), readNumber(month), readNumber(day));
    if (!parts) {
      setError(
        getBirthDateValidationMessage(readNumber(year), readNumber(month), readNumber(day)) ??
          "Enter a valid birth date.",
      );
      return;
    }
    setError(null);
    window.open(buildAdminReportPreviewHref(parts, { mobile }), "_blank", "noopener,noreferrer");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    openPreview(false);
  }

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Full report preview</h2>
      </div>
      <p style={styles.muted}>
        Generate the unlocked Full Soul Origin Report for any birth date. Opens in a new tab — admin
        only, not indexed.
      </p>

      <form style={styles.form} onSubmit={onSubmit}>
        <div style={styles.row}>
          <label style={styles.label}>
            Year
            <input
              style={styles.input}
              type="number"
              inputMode="numeric"
              min={1900}
              placeholder="1980"
              value={year}
              onChange={(event) => setYear(event.target.value)}
            />
          </label>
          <label style={styles.label}>
            Month
            <input
              style={styles.input}
              type="number"
              inputMode="numeric"
              min={1}
              max={12}
              placeholder="5"
              value={month}
              onChange={(event) => setMonth(event.target.value)}
            />
          </label>
          <label style={styles.label}>
            Day
            <input
              style={styles.input}
              type="number"
              inputMode="numeric"
              min={1}
              max={31}
              placeholder="22"
              value={day}
              onChange={(event) => setDay(event.target.value)}
            />
          </label>
        </div>

        {preview ? (
          <p style={styles.muted}>
            Code: <code style={styles.code}>{preview.codeString}</code> ·{" "}
            <code style={styles.code}>{preview.s1Code}</code> /{" "}
            <code style={styles.code}>{preview.s3Code}</code> /{" "}
            <code style={styles.code}>{preview.s2Code}</code> /{" "}
            <code style={styles.code}>{preview.s0Code}</code>
          </p>
        ) : null}

        {error ? <p style={styles.error}>{error}</p> : null}

        <div style={styles.actions}>
          <button type="submit" style={{ ...styles.button, ...styles.primary }}>
            Open desktop full report
          </button>
          <button type="button" style={styles.button} onClick={() => openPreview(true)}>
            Open mobile layout
          </button>
        </div>
      </form>
    </section>
  );
}
