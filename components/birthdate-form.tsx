"use client";

import Link from "next/link";
import { FormEvent, useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { devLog } from "@/lib/dev-log";
import { consumeLifePathHandoff } from "@/lib/life-path/handoff";
import { parseBirthDateInput } from "@/lib/parse-birth-date-input";
import { submitBirthDate } from "@/lib/submitBirthDate";
import { BIRTH_FORM } from "@/lib/your-code-content";

type BirthDateFormProps = {
  variant?: "default" | "homepage" | "free-soul-blueprint";
  idPrefix?: string;
  /** Override primary submit label (Funnel Spec CTA). */
  submitLabel?: string;
  onFieldFocus?: () => void;
};

export function BirthDateForm({
  variant = "default",
  idPrefix,
  submitLabel,
  onFieldFocus,
}: BirthDateFormProps) {
  const formId = useId();
  const prefix = idPrefix ?? formId.replace(/:/g, "");
  const formRef = useRef<HTMLFormElement>(null);
  const inFlightRef = useRef(false);

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (variant !== "free-soul-blueprint") return;
    const handoff = consumeLifePathHandoff();
    if (!handoff) return;
    setYear(String(handoff.year));
    setMonth(String(handoff.month));
    setDay(String(handoff.day));
  }, [variant]);

  function readBirthValues(form: HTMLFormElement) {
    const yearInput = form.querySelector<HTMLInputElement>('input[name="year"]');
    const monthInput = form.querySelector<HTMLInputElement>('input[name="month"]');
    const dayInput = form.querySelector<HTMLInputElement>('input[name="day"]');
    const raw = {
      year: (yearInput?.value ?? year).trim(),
      month: (monthInput?.value ?? month).trim(),
      day: (dayInput?.value ?? day).trim(),
    };
    return parseBirthDateInput(raw.year, raw.month, raw.day);
  }

  function runSubmit(form: HTMLFormElement) {
    if (inFlightRef.current) {
      devLog("submit skipped (in flight)");
      return;
    }
    inFlightRef.current = true;
    setError("");
    setSubmitting(true);

    const values = readBirthValues(form);
    setYear(values.year);
    setMonth(values.month);
    setDay(values.day);

    devLog("submit", {
      variant,
      values,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "ssr",
    });

    const result = submitBirthDate(values.year, values.month, values.day, {
      source:
        variant === "homepage"
          ? "homepage"
          : variant === "free-soul-blueprint"
            ? "free-soul-blueprint"
            : "your-code",
    });

    if (!result.ok) {
      devLog("submit failed", { message: result.message, values });
      setError(result.message);
      setSubmitting(false);
      inFlightRef.current = false;
      return;
    }

    devLog("submit ok", { href: result.href });
    devLog("navigate", { href: result.href, pathname: window.location.pathname });
    window.location.assign(result.href);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    devLog("form onSubmit");
    runSubmit(event.currentTarget);
  }

  function onGeneratePointer(event: PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    devLog("button pointer", { type: event.pointerType });
    const form = formRef.current;
    if (!form) {
      devLog("missing form ref");
      setError("Form not ready. Please refresh and try again.");
      inFlightRef.current = false;
      return;
    }
    runSubmit(form);
  }

  const formProps = {
    ref: formRef,
    id: `${prefix}-form`,
    action: "/generating",
    method: "get" as const,
    noValidate: true,
    onSubmit,
  };

  const ctaLabel = submitLabel ?? (submitting ? "OPENING…" : BIRTH_FORM.submit);
  const submitButton = (
    <button
      type="submit"
      className={
        variant === "homepage" || variant === "free-soul-blueprint"
          ? "gold-button gold-button--secondary"
          : "gold-button inline-flex"
      }
      disabled={submitting}
      onPointerUp={onGeneratePointer}
    >
      {submitting ? "OPENING…" : ctaLabel}
    </button>
  );

  const fieldGrid = (
    <div className="birthdate-field-grid">
      <label className="birthdate-field" htmlFor={`${prefix}-month`}>
        <span className="birthdate-field-label">{BIRTH_FORM.labels.month}</span>
        <input
          id={`${prefix}-month`}
          name="month"
          aria-label={BIRTH_FORM.labels.month}
          placeholder="MM"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="bday-month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          onInput={(e) => setMonth(e.currentTarget.value)}
          onFocus={onFieldFocus}
        />
      </label>
      <label className="birthdate-field" htmlFor={`${prefix}-day`}>
        <span className="birthdate-field-label">{BIRTH_FORM.labels.day}</span>
        <input
          id={`${prefix}-day`}
          name="day"
          aria-label={BIRTH_FORM.labels.day}
          placeholder="DD"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="bday-day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          onInput={(e) => setDay(e.currentTarget.value)}
          onFocus={onFieldFocus}
        />
      </label>
      <label className="birthdate-field birthdate-field-year" htmlFor={`${prefix}-year`}>
        <span className="birthdate-field-label">{BIRTH_FORM.labels.year}</span>
        <input
          id={`${prefix}-year`}
          name="year"
          aria-label={BIRTH_FORM.labels.year}
          placeholder="YYYY"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="bday-year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          onInput={(e) => setYear(e.currentTarget.value)}
          onFocus={onFieldFocus}
          onBlur={(e) => {
            const parsed = parseBirthDateInput(e.target.value, month, day);
            setYear(parsed.year);
            setMonth(parsed.month);
            setDay(parsed.day);
          }}
        />
      </label>
    </div>
  );

  if (variant === "homepage" || variant === "free-soul-blueprint") {
    return (
      <form
        {...formProps}
        className={variant === "free-soul-blueprint" ? "fsb-birth-form entry-form" : "entry-form"}
      >
        {fieldGrid}
        <div className="entry-form-actions">
          {error ? (
            <p className="entry-form-error" role="alert">
              {error}
            </p>
          ) : null}
          {submitButton}
        </div>
      </form>
    );
  }

  return (
    <form {...formProps} className="birthdate-form space-y-4">
      {fieldGrid}
      {error ? <p className="text-sm text-red-300" role="alert">{error}</p> : null}
      {submitButton}
      <p className="text-xs text-[#B9C1D0]">
        {BIRTH_FORM.privacy}{" "}
        <Link href="/privacy" className="blueprint-secondary-link">
          Privacy Policy
        </Link>
      </p>
    </form>
  );
}
