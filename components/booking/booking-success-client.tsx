"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookingSchedulePanel } from "@/components/booking/booking-schedule-panel";

export function BookingSuccessClient({ sessionId }: { sessionId: string }) {
  const [status, setStatus] = useState("Confirming your payment…");
  const [prepUrl, setPrepUrl] = useState<string | null>(null);
  const [scheduleUrl, setScheduleUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      const response = await fetch(
        `/api/booking/checkout/status?session_id=${encodeURIComponent(sessionId)}`,
      );
      const json = (await response.json()) as {
        ok?: boolean;
        status?: string;
        prepUrl?: string;
        scheduleUrl?: string | null;
      };

      if (cancelled) return;

      if (json.ok && json.prepUrl) {
        setPrepUrl(json.prepUrl);
        setScheduleUrl(json.scheduleUrl ?? null);
        setStatus("Payment confirmed. Choose your time below, then open session prep.");
        return;
      }

      setStatus(
        json.status === "fulfilling"
          ? "Setting up your session space…"
          : "Still confirming payment…",
      );
      window.setTimeout(poll, 2000);
    }

    void poll();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <div className="mt-4 space-y-4">
      <p className="text-sm text-[#B9C1D0]">{status}</p>
      {prepUrl ? (
        <>
          <BookingSchedulePanel scheduleUrl={scheduleUrl} />
          <div className="glass-card p-4 text-sm space-y-3">
            <p className="font-medium">Session prep</p>
            <p className="opacity-80">
              After you pick a time, open your prep space to set your integration focus before the
              live session.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={prepUrl} className="gold-button inline-flex">
                OPEN SESSION PREP
              </Link>
              <Link href="/account" className="blueprint-secondary-link">
                Return to account
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
