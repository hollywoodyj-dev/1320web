"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { saveBirthCookie } from "@/lib/birth-cookie";
import { calculate1320Code } from "@/lib/calculate1320Code";
import { trackEvent } from "@/lib/analytics";
import { devLog } from "@/lib/dev-log";
import {
  GENERATING_COPY,
  GENERATING_REDIRECT_DELAY_MS,
  GENERATING_STEP_MS,
  GENERATING_STEPS,
} from "@/lib/generating-content";
import { saveSession1320, toSessionPayload } from "@/lib/session1320";
import { SEGMENTS, getSegment } from "@/lib/segments";

type GeneratingChamberProps = {
  year: number;
  month: number;
  day: number;
  resultHref: string;
  redirectSeconds: number;
};

const TOTAL_MS =
  GENERATING_STEPS.length * GENERATING_STEP_MS + GENERATING_REDIRECT_DELAY_MS;

const NODE_IMAGES = {
  s1: "/generating-steps-s1.png",
  s3: "/generating-steps-s3.png",
  s2: "/generating-steps-s2.png",
  s0: "/generating-steps-s0.png",
} as const;

export function GeneratingChamber({
  year,
  month,
  day,
  resultHref,
  redirectSeconds,
}: GeneratingChamberProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const redirectFormRef = useRef<HTMLFormElement>(null);
  const redirectedRef = useRef(false);

  const current = GENERATING_STEPS[activeStep - 1] ?? GENERATING_STEPS[0];
  const progressPct = complete ? 100 : (activeStep / GENERATING_STEPS.length) * 100;

  useLayoutEffect(() => {
    saveBirthCookie(year, month, day);
    void fetch("/api/birth-cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year, month, day }),
      credentials: "same-origin",
    }).catch(() => {
      // Client cookie + form fields still back up result page.
    });
    const code = calculate1320Code(year, month, day);
    saveSession1320(toSessionPayload(code));
    trackEvent("generating_view");
  }, [year, month, day]);

  /** Step animation only — redirect via server meta refresh + native form GET (no window.location / router). */
  useEffect(() => {
    const started = Date.now();
    devLog("generating sequence start", { totalMs: TOTAL_MS, resultHref, redirectSeconds });

    const redirect = (reason: string) => {
      if (redirectedRef.current) return;
      redirectedRef.current = true;
      trackEvent("generating_complete");
      devLog("generating form redirect", { reason, resultHref });
      redirectFormRef.current?.requestSubmit();
    };

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - started;
      const step = Math.min(
        GENERATING_STEPS.length,
        Math.max(1, Math.floor(elapsed / GENERATING_STEP_MS) + 1),
      );
      setActiveStep(step);

      if (elapsed >= GENERATING_STEPS.length * GENERATING_STEP_MS) {
        setComplete(true);
      }

      if (elapsed >= TOTAL_MS) {
        window.clearInterval(interval);
        redirect("interval");
      }
    }, 200);

    const formTimer = window.setTimeout(() => {
      redirect("timeout");
    }, TOTAL_MS + 400);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(formTimer);
    };
  }, [resultHref, redirectSeconds]);

  return (
    <div className="generating-chamber">
      <form
        ref={redirectFormRef}
        action="/result"
        method="get"
        className="generating-redirect-form"
        aria-hidden="true"
      >
        <input type="hidden" name="year" value={year} />
        <input type="hidden" name="month" value={month} />
        <input type="hidden" name="day" value={day} />
        <button type="submit" tabIndex={-1}>
          Continue to result
        </button>
      </form>

      <div className="generating-chamber-bg" aria-hidden="true" />
      <div className="generating-chamber-mountains" aria-hidden="true" />

      <div className="generating-chamber-top">
        <div className="brand-lockup">
          <Link href="/" className="brand-lockup-link">
            <div className="brand-image-shell brand-image-shell-small">
              <Image
                src="/1320-logo.jpeg"
                alt="1320 Soul Origin Code System"
                width={72}
                height={72}
                className="brand-image brand-image-small"
              />
            </div>
            <div className="entry-copy">
              <p className="brand-number">1320</p>
              <p className="brand-name">
                <span>SOUL ORIGIN</span>
                <span>CODE SYSTEM</span>
              </p>
            </div>
          </Link>
        </div>
        <p className="generating-secured">
          <span className="generating-lock" aria-hidden>
            🔒
          </span>
          {GENERATING_COPY.secured}
        </p>
      </div>

      <header className="generating-chamber-header">
        <p className="generating-eyebrow">{GENERATING_COPY.eyebrow}</p>
        <h1 className="generating-title">
          <span>{GENERATING_COPY.titleLine1}</span>
          <span>{GENERATING_COPY.titleLine2}</span>
        </h1>
        <p className="generating-body">{GENERATING_COPY.body}</p>
      </header>

      <div className="generating-portal-wrap">
        <div className="generating-portal" aria-hidden={false}>
          <div className="generating-portal-glow" />
          <div className="generating-portal-art">
            <Image
              src="/generating-1320-ring.png"
              alt="1320 sacred geometry ring"
              width={1254}
              height={1254}
              sizes="(max-width: 640px) 280px, 420px"
              className="generating-portal-image"
              priority
            />
          </div>

          {SEGMENTS.map((segment) => {
            const step = GENERATING_STEPS.find((s) => s.segmentId === segment.id);
            const isActive = current.segmentId === segment.id;
            const isPast = activeStep > (step?.index ?? 0);
            const positionClass = `generating-node-${segment.id}`;
            const isTopNode = segment.id === "s1" || segment.id === "s3";

            return (
              <div
                key={segment.id}
                className={`generating-node ${positionClass} ${isActive ? "is-active" : ""} ${isPast ? "is-past" : ""}`}
                style={{ "--node-color": segment.color } as CSSProperties}
              >
                {isTopNode ? (
                  <>
                    <p className="generating-node-title">{step?.nodeTitle}</p>
                    <p className="generating-node-desc">{step?.nodeDesc}</p>
                    <div className="generating-node-icon">
                      <Image
                        src={NODE_IMAGES[segment.id]}
                        alt={`${step?.nodeTitle ?? segment.id} symbol`}
                        width={1254}
                        height={1254}
                        sizes="(max-width: 900px) 81px, 164px"
                        className="generating-node-image"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="generating-node-icon">
                      <Image
                        src={NODE_IMAGES[segment.id]}
                        alt={`${step?.nodeTitle ?? segment.id} symbol`}
                        width={1254}
                        height={1254}
                        sizes="(max-width: 900px) 81px, 164px"
                        className="generating-node-image"
                      />
                    </div>
                    <p className="generating-node-title">{step?.nodeTitle}</p>
                    <p className="generating-node-desc">{step?.nodeDesc}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <section className="generating-status" aria-live="polite">
        <p className="generating-status-label">{GENERATING_COPY.currentStepLabel}</p>
        <h2 className="generating-status-title">
          {complete ? GENERATING_COPY.completeTitle : `${String(activeStep).padStart(2, "0")} ${current.title}`}
        </h2>
        <p className="generating-status-sub">
          {complete ? GENERATING_COPY.completeBody : current.subcopy}
        </p>

        <div className="generating-progress-track" aria-hidden>
          <span className="generating-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>

        <ol className="generating-step-rail">
          {GENERATING_STEPS.map((step) => {
            const segment = getSegment(step.segmentId);
            const isActive = !complete && activeStep === step.index;
            const isPast = complete || activeStep > step.index;
            return (
              <li
                key={step.index}
                className={`${isActive ? "is-active" : ""} ${isPast ? "is-past" : ""}`}
                style={{ "--rail-color": segment.color } as CSSProperties}
              >
                <span className="generating-rail-num">{String(step.index).padStart(2, "0")}</span>
                <span className="generating-rail-text">{step.railLabel}</span>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="generating-boundary glass-card">
        <div className="generating-boundary-logo brand-image-shell brand-image-shell-small">
          <Image
            src="/1320-logo.jpeg"
            alt=""
            width={48}
            height={48}
            className="brand-image brand-image-small"
          />
        </div>
        <p>{GENERATING_COPY.boundary}</p>
      </div>

      <div className="generating-actions">
        <a href={resultHref} className="gold-button generating-cta">
          {GENERATING_COPY.cta}
          <span aria-hidden> ›</span>
        </a>
        <p className="generating-encryption">
          <span className="generating-lock" aria-hidden>
            🔒
          </span>
          {GENERATING_COPY.encryption}
        </p>
      </div>
    </div>
  );
}
