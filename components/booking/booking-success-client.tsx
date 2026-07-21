"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookingSchedulePanel } from "@/components/booking/booking-schedule-panel";
import { BOOKING_SUCCESS_COPY } from "@/lib/booking/success-content";

type BridgeState = "confirming" | "ready" | "unavailable";

type BookingSuccessClientProps = {
  sessionId?: string;
};

const MAX_POLLS = 30;
const POLL_MS = 2000;

export function BookingSuccessClient({ sessionId }: BookingSuccessClientProps) {
  const [bridgeState, setBridgeState] = useState<BridgeState>(sessionId ? "confirming" : "unavailable");
  const [status, setStatus] = useState(
    sessionId ? BOOKING_SUCCESS_COPY.confirmingPayment : BOOKING_SUCCESS_COPY.noSession,
  );
  const [prepUrl, setPrepUrl] = useState<string | null>(null);
  const [scheduleUrl, setScheduleUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    const checkoutSessionId = sessionId;

    let cancelled = false;
    let polls = 0;

    async function poll() {
      polls += 1;
      try {
        const response = await fetch(
          `/api/booking/checkout/status?session_id=${encodeURIComponent(checkoutSessionId)}`,
          { cache: "no-store" },
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
          setBridgeState("ready");
          setStatus(
            json.scheduleUrl
              ? BOOKING_SUCCESS_COPY.calendarReady
              : BOOKING_SUCCESS_COPY.calendarUnavailable,
          );
          return;
        }

        if (polls >= MAX_POLLS) {
          setBridgeState("unavailable");
          setStatus(BOOKING_SUCCESS_COPY.calendarUnavailable);
          return;
        }

        setBridgeState("confirming");
        setStatus(
          json.status === "fulfilling"
            ? BOOKING_SUCCESS_COPY.fulfilling
            : BOOKING_SUCCESS_COPY.confirmingPayment,
        );
        window.setTimeout(poll, POLL_MS);
      } catch {
        if (cancelled) return;
        if (polls >= MAX_POLLS) {
          setBridgeState("unavailable");
          setStatus(BOOKING_SUCCESS_COPY.calendarUnavailable);
          return;
        }
        setStatus(BOOKING_SUCCESS_COPY.confirmingPayment);
        window.setTimeout(poll, POLL_MS);
      }
    }

    void poll();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <div className="booking-success-bridge">
      <p className="booking-success-status" role="status" aria-live="polite">
        {status}
      </p>

      {bridgeState === "confirming" ? <BookingSchedulePanel scheduleUrl={null} loading /> : null}

      {bridgeState === "ready" ? (
        <>
          <BookingSchedulePanel scheduleUrl={scheduleUrl} />
          {prepUrl ? (
            <section className="booking-success-prep" aria-labelledby="booking-success-prep-title">
              <h2 id="booking-success-prep-title" className="booking-success-section-title">
                {BOOKING_SUCCESS_COPY.prepTitle}
              </h2>
              <p className="booking-success-prep-body">{BOOKING_SUCCESS_COPY.prepBody}</p>
              <Link
                href={prepUrl.replace("/integration/prep/", "/integration/intake/")}
                className="gold-button booking-success-primary"
              >
                {BOOKING_SUCCESS_COPY.prepCta}
              </Link>
              <Link href={prepUrl} className="blueprint-secondary-link" style={{ marginTop: 10, display: "inline-block" }}>
                {BOOKING_SUCCESS_COPY.openPrepCta}
              </Link>
            </section>
          ) : null}
        </>
      ) : null}

      {bridgeState === "unavailable" ? (
        <BookingSchedulePanel scheduleUrl={null} />
      ) : null}

      {bridgeState !== "confirming" ? (
        <div className="booking-success-links">
          <Link href="/account" className="gold-button booking-success-primary">
            {BOOKING_SUCCESS_COPY.accountCta}
          </Link>
          <p className="booking-success-support">
            {BOOKING_SUCCESS_COPY.supportLead}{" "}
            <a href={BOOKING_SUCCESS_COPY.supportHref} className="blueprint-secondary-link">
              {BOOKING_SUCCESS_COPY.supportCta}
            </a>
            .
          </p>
          <Link href="/booking" className="booking-success-tertiary">
            {BOOKING_SUCCESS_COPY.bookAnotherCta}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
