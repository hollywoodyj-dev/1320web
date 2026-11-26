"use client";

import Link from "next/link";
import { FormEvent, useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { devLog } from "@/lib/dev-log";
import { consumeLifePathHandoff } from "@/lib/life-path/handoff";
import { parseBirthDateInput } from "@/lib/parse-birth-date-input";
import { submitBirthDate } from "@/lib/submitBirthDate";
import { BIRTH_FORM } from "@/lib/your-code-content";
import type { BirthDateMessageLocale } from "@/lib/validateBirthDate";

type BirthDateFormCopy = {
  labels?: { year?: string; month?: string; day?: string };
  placeholders?: { year?: string; month?: string; day?: string };
  submittingLabel?: string;
  /** Taiwan visitors expect 西元年／月／日 order. */
  fieldOrder?: "mdy" | "ymd";
};

type BirthDateFormProps = {
  variant?: "default" | "homepage" | "free-soul-blueprint";
  idPrefix?: string;
  /** Override primary submit label (Funnel Spec CTA). */
  submitLabel?: string;
  onFieldFocus?: () => void;
  /** Skip the generating screen and open the report directly. */
  destination?: "generating" | "result";
  /** Report path when destination is "result". English stays `/result`. */
  resultPath?: string;
  /** No-JS form target. Taiwan free report posts to `/tw/result`. */
  action?: string;
  /** Optional locale for labels / validation (TW free form). */
  messageLocale?: BirthDateMessageLocale;
  copy?: BirthDateFormCopy;
};

export function BirthDateForm({
  variant = "default",
  idPrefix,
  submitLabel,
  onFieldFocus,
  destination,
  resultPath,
  action = "/generating",
  messageLocale = "en",
  copy,
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
      destination,
      resultPath,
      messageLocale,
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
    action,
    method: "get" as const,
    noValidate: true,
    onSubmit,
  };

  const labels = {
    year: copy?.labels?.year ?? BIRTH_FORM.labels.year,
    month: copy?.labels?.month ?? BIRTH_FORM.labels.month,
    day: copy?.labels?.day ?? BIRTH_FORM.labels.day,
  };
  const placeholders = {
    year: copy?.placeholders?.year ?? "YYYY",
    month: copy?.placeholders?.month ?? "MM",
    day: copy?.placeholders?.day ?? "DD",
  };
  const idleLabel = submitLabel ?? BIRTH_FORM.submit;
  const busyLabel = copy?.submittingLabel ?? "OPENING…";
  const ctaLabel = submitting ? busyLabel : idleLabel;
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
      {ctaLabel}
    </button>
  );

  const monthField = (
    <label className="birthdate-field" htmlFor={`${prefix}-month`}>
      <span className="birthdate-field-label">{labels.month}</span>
      <input
        id={`${prefix}-month`}
        name="month"
        aria-label={labels.month}
        placeholder={placeholders.month}
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
  );
  const dayField = (
    <label className="birthdate-field" htmlFor={`${prefix}-day`}>
      <span className="birthdate-field-label">{labels.day}</span>
      <input
        id={`${prefix}-day`}
        name="day"
        aria-label={labels.day}
        placeholder={placeholders.day}
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
  );
  const yearField = (
    <label className="birthdate-field birthdate-field-year" htmlFor={`${prefix}-year`}>
      <span className="birthdate-field-label">{labels.year}</span>
      <input
        id={`${prefix}-year`}
        name="year"
        aria-label={labels.year}
        placeholder={placeholders.year}
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
  );

  const fieldGrid = (
    <div className="birthdate-field-grid">
      {copy?.fieldOrder === "ymd" ? (
        <>
          {yearField}
          {monthField}
          {dayField}
        </>
      ) : (
        <>
          {monthField}
          {dayField}
          {yearField}
        </>
      )}
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
