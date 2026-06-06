"use client";

import { useEffect, useState } from "react";

export function CheckoutSuccessClient({ sessionId }: { sessionId: string }) {
  const [reportId, setReportId] = useState<string | null>(null);
  const [status, setStatus] = useState("Confirming payment…");

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      const response = await fetch(`/api/checkout/status?session_id=${encodeURIComponent(sessionId)}`);
      const json = (await response.json()) as {
        ok?: boolean;
        status?: string;
        reportId?: string | null;
      };

      if (cancelled) return;

      if (json.ok && json.reportId) {
        setReportId(json.reportId);
        setStatus("Purchase confirmed. Your magic link email is on its way.");
        return;
      }

      setStatus(json.status === "pending" ? "Still confirming payment…" : "Waiting for confirmation…");
      window.setTimeout(poll, 2000);
    }

    void poll();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <div className="mt-4 space-y-2 text-sm text-[#B9C1D0]">
      <p>{status}</p>
      {reportId ? (
        <p>
          Report ready:{" "}
          <a href={`/my-report/${reportId}`} className="blueprint-secondary-link">
            open Full Report
          </a>
        </p>
      ) : null}
    </div>
  );
}
