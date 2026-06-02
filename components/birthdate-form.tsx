"use client";

import Link from "next/link";
import { FormEvent, useId, useRef, useState, type PointerEvent } from "react";
import { devLog } from "@/lib/dev-log";
import { parseBirthDateInput } from "@/lib/parse-birth-date-input";
import { submitBirthDate } from "@/lib/submitBirthDate";
import { BIRTH_FORM } from "@/lib/your-code-content";

type BirthDateFormProps = {
  variant?: "default" | "homepage";
  idPrefix?: string;
};

export function BirthDateForm({ variant = "default", idPrefix }: BirthDateFormProps) {
  const formId = useId();
  const prefix = idPrefix ?? formId.replace(/:/g, "");
  const formRef = useRef<HTMLFormElement>(null);
  const inFlightRef = useRef(false);

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      source: variant === "homepage" ? "homepage" : "your-code",
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

  const submitButton = (
    <button
      type="submit"
      className={variant === "homepage" ? "gold-button" : "gold-button inline-flex"}
      disabled={submitting}
      onPointerUp={onGeneratePointer}
    >
      {submitting ? "OPENING…" : BIRTH_FORM.submit}
    </button>
  );

  if (variant === "homepage") {
    return (
      <form {...formProps} className="entry-form">
        <div className="date-fields">
          <input
            id={`${prefix}-year`}
            name="year"
            aria-label={BIRTH_FORM.labels.year}
            placeholder="YYYY"
            type="text"
            inputMode="numeric"
            pattern="[0-9./-]*"
            autoComplete="bday-year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            onInput={(e) => setYear(e.currentTarget.value)}
            onBlur={(e) => {
              const parsed = parseBirthDateInput(e.target.value, month, day);
              setYear(parsed.year);
              setMonth(parsed.month);
              setDay(parsed.day);
            }}
          />
          <span>/</span>
          <input
            id={`${prefix}-month`}
            name="month"
            aria-label={BIRTH_FORM.labels.month}
            placeholder="MM"
            type="text"
            inputMode="numeric"
            pattern="[0-9./-]*"
            autoComplete="bday-month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            onInput={(e) => setMonth(e.currentTarget.value)}
          />
          <span>/</span>
          <input
            id={`${prefix}-day`}
            name="day"
            aria-label={BIRTH_FORM.labels.day}
            placeholder="DD"
            type="text"
            inputMode="numeric"
            pattern="[0-9./-]*"
            autoComplete="bday-day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            onInput={(e) => setDay(e.currentTarget.value)}
          />
        </div>
        <div className="entry-form-actions">
          {error ? (
            <p className="entry-form-error" role="alert">
              {error}
            </p>
          ) : null}
          {submitButton}
          <p className="privacy-note small">
            {BIRTH_FORM.privacy}{" "}
            <Link href="/privacy" className="blueprint-secondary-link">
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
    );
  }

  return (
    <form {...formProps} className="birthdate-form space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="text-sm text-[#F8F4EA]" htmlFor={`${prefix}-year`}>
          {BIRTH_FORM.labels.year}
          <input
            id={`${prefix}-year`}
            name="year"
            type="text"
            inputMode="numeric"
            autoComplete="bday-year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            onInput={(e) => setYear(e.currentTarget.value)}
            className="mt-1 w-full rounded-lg border border-[#2A3551] bg-[#040813] px-3 py-2"
          />
        </label>
        <label className="text-sm text-[#F8F4EA]" htmlFor={`${prefix}-month`}>
          {BIRTH_FORM.labels.month}
          <input
            id={`${prefix}-month`}
            name="month"
            type="text"
            inputMode="numeric"
            autoComplete="bday-month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            onInput={(e) => setMonth(e.currentTarget.value)}
            className="mt-1 w-full rounded-lg border border-[#2A3551] bg-[#040813] px-3 py-2"
          />
        </label>
        <label className="text-sm text-[#F8F4EA]" htmlFor={`${prefix}-day`}>
          {BIRTH_FORM.labels.day}
          <input
            id={`${prefix}-day`}
            name="day"
            type="text"
            inputMode="numeric"
            autoComplete="bday-day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            onInput={(e) => setDay(e.currentTarget.value)}
            className="mt-1 w-full rounded-lg border border-[#2A3551] bg-[#040813] px-3 py-2"
          />
        </label>
      </div>
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
