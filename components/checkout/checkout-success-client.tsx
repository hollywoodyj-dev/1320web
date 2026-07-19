"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CHECKOUT_SUCCESS_COPY } from "@/lib/checkout/success-content";

type AccessState = "processing" | "ready" | "unavailable";

type CheckoutSuccessClientProps = {
  sessionId?: string;
};

const MAX_POLLS = 30;
const POLL_MS = 2000;

export function CheckoutSuccessClient({ sessionId }: CheckoutSuccessClientProps) {
  const [accessState, setAccessState] = useState<AccessState>(sessionId ? "processing" : "unavailable");
  const [reportId, setReportId] = useState<string | null>(null);
  const [status, setStatus] = useState(
    sessionId ? CHECKOUT_SUCCESS_COPY.processingStatus : CHECKOUT_SUCCESS_COPY.unavailableStatus,
  );

  useEffect(() => {
    if (!sessionId) return;
    const checkoutSessionId = sessionId;

    let cancelled = false;
    let polls = 0;

    async function poll() {
      polls += 1;
      try {
        const response = await fetch(
          `/api/checkout/status?session_id=${encodeURIComponent(checkoutSessionId)}`,
          { cache: "no-store" },
        );
        const json = (await response.json()) as {
          ok?: boolean;
          status?: string;
          reportId?: string | null;
        };

        if (cancelled) return;

        if (json.ok && json.reportId) {
          setReportId(json.reportId);
          setAccessState("ready");
          setStatus(CHECKOUT_SUCCESS_COPY.readyStatus);
          window.setTimeout(() => {
            if (!cancelled) {
              window.location.href = `/my-report/${json.reportId}`;
            }
          }, 900);
          return;
        }

        if (polls >= MAX_POLLS) {
          setAccessState("unavailable");
          setStatus(CHECKOUT_SUCCESS_COPY.unavailableStatus);
          return;
        }

        setAccessState("processing");
        setStatus(
          json.status === "pending" || !json.ok
            ? CHECKOUT_SUCCESS_COPY.stillProcessingStatus
            : CHECKOUT_SUCCESS_COPY.processingStatus,
        );
        window.setTimeout(poll, POLL_MS);
      } catch {
        if (cancelled) return;
        if (polls >= MAX_POLLS) {
          setAccessState("unavailable");
          setStatus(CHECKOUT_SUCCESS_COPY.unavailableStatus);
          return;
        }
        setStatus(CHECKOUT_SUCCESS_COPY.stillProcessingStatus);
        window.setTimeout(poll, POLL_MS);
      }
    }

    void poll();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const reportHref = reportId ? `/my-report/${reportId}` : null;
  const recoverHref = `/login?next=${encodeURIComponent(reportHref ?? "/account")}`;

  return (
    <div className="checkout-success-actions">
      <p className="checkout-success-status" role="status" aria-live="polite">
        {status}
      </p>

      {accessState === "ready" && reportHref ? (
        <Link href={reportHref} className="gold-button checkout-success-primary">
          {CHECKOUT_SUCCESS_COPY.readyCta}
        </Link>
      ) : null}

      {accessState === "processing" ? (
        <button type="button" className="gold-button checkout-success-primary" disabled>
          {CHECKOUT_SUCCESS_COPY.processingCta}
        </button>
      ) : null}

      {accessState === "unavailable" ? (
        <Link href={recoverHref} className="gold-button checkout-success-primary">
          {CHECKOUT_SUCCESS_COPY.recoverCta}
        </Link>
      ) : null}

      <div className="checkout-success-secondary">
        {accessState === "processing" ? (
          <Link href="/account" className="blueprint-secondary-link">
            {CHECKOUT_SUCCESS_COPY.accountCta}
          </Link>
        ) : null}
        {accessState === "ready" ? (
          <Link href="/account" className="blueprint-secondary-link">
            {CHECKOUT_SUCCESS_COPY.accountCta}
          </Link>
        ) : null}
        {accessState === "unavailable" ? (
          <Link href="/account" className="blueprint-secondary-link">
            {CHECKOUT_SUCCESS_COPY.accountCta}
          </Link>
        ) : null}
        <p className="checkout-success-support">
          {CHECKOUT_SUCCESS_COPY.supportLead}{" "}
          <a href={CHECKOUT_SUCCESS_COPY.supportHref} className="blueprint-secondary-link">
            {CHECKOUT_SUCCESS_COPY.supportCta}
          </a>
          .
        </p>
        <Link href="/" className="checkout-success-home">
          {CHECKOUT_SUCCESS_COPY.homeCta}
        </Link>
      </div>
    </div>
  );
}
