"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { parseBirthDateInput } from "@/lib/parse-birth-date-input";
import { REFLECT_FORM } from "@/lib/wisewave/reflect-content";

export type ReflectEntryPrefill = {
  firstName: string;
  email: string;
  birthDate: string;
  useAccountProfile?: boolean;
  reportId?: string;
};

type ReflectEntryFormProps = {
  prefill?: ReflectEntryPrefill;
  compact?: boolean;
  /** Show return link when user arrived from a report. */
  returnReportHref?: string | null;
};

type StartPayload = {
  ok?: boolean;
  sessionId?: string;
  accessToken?: string;
  error?: string;
};

function toIsoBirthDate(month: string, day: string, year: string): string | null {
  const parts = parseBirthDateInput(year, month, day);
  const y = Number(parts.year);
  const m = Number(parts.month);
  const d = Number(parts.day);
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return null;
  if (y < 1900 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31) return null;
  const probe = new Date(Date.UTC(y, m - 1, d));
  if (probe.getUTCFullYear() !== y || probe.getUTCMonth() !== m - 1 || probe.getUTCDate() !== d) {
    return null;
  }
  return `${String(y).padStart(4, "0")}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

async function parseStartResponse(response: Response): Promise<StartPayload> {
  const text = await response.text();
  if (!text) {
    return { error: `Reflection could not start (${response.status}). Please try again.` };
  }
  try {
    return JSON.parse(text) as StartPayload;
  } catch {
    return { error: `Reflection could not start (${response.status}). Please try again.` };
  }
}

async function postReflectStart(body: Record<string, unknown>): Promise<{ response: Response; payload: StartPayload }> {
  const response = await fetch("/api/reflect/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const payload = await parseStartResponse(response);
  return { response, payload };
}

export function ReflectEntryForm({
  prefill,
  compact = false,
  returnReportHref = null,
}: ReflectEntryFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const accountMode = Boolean(prefill?.useAccountProfile);

  async function startSession(body: Record<string, unknown>, openingMessage: string) {
    let { response, payload } = await postReflectStart(body);

    if (
      accountMode &&
      prefill?.birthDate &&
      (!response.ok || !payload.ok || !payload.sessionId || !payload.accessToken) &&
      body.useAccountProfile
    ) {
      ({ response, payload } = await postReflectStart({
        firstName: prefill.firstName,
        email: prefill.email,
        birthDate: prefill.birthDate,
        openingMessage,
      }));
    }

    if (!response.ok || !payload.ok || !payload.sessionId || !payload.accessToken) {
      setStatus(payload.error ?? REFLECT_FORM.error);
      return;
    }

    const send = encodeURIComponent(openingMessage);
    router.push(`/reflect/${payload.sessionId}?token=${payload.accessToken}&send=${send}`);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const openingMessage = String(data.get("openingMessage") ?? "").trim();

    if (!openingMessage) {
      setStatus(REFLECT_FORM.openingRequired);
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      if (accountMode && prefill) {
        await startSession(
          {
            openingMessage,
            useAccountProfile: true,
            firstName: prefill.firstName,
            email: prefill.email,
            birthDate: prefill.birthDate,
            reportId: prefill.reportId,
          },
          openingMessage,
        );
        return;
      }

      const email = String(data.get("email") ?? "").trim();
      const birthDate = toIsoBirthDate(
        String(data.get("month") ?? ""),
        String(data.get("day") ?? ""),
        String(data.get("year") ?? ""),
      );

      if (!email || !birthDate) {
        setStatus(REFLECT_FORM.connectRequired);
        return;
      }

      await startSession({ email, birthDate, openingMessage }, openingMessage);
    } catch {
      setStatus(REFLECT_FORM.networkError);
    } finally {
      setLoading(false);
    }
  }

  const signInHref = `/login?next=${encodeURIComponent("/reflect")}`;

  return (
    <form className="reflect-entry-form" onSubmit={onSubmit}>
      {accountMode && !compact ? (
        <p className="reflect-entry-lead">{REFLECT_FORM.accountLead}</p>
      ) : null}

      <label className="conversion-field reflect-opening-field">
        {REFLECT_FORM.opening}
        <textarea
          name="openingMessage"
          required
          rows={5}
          className="conversion-input conversion-textarea"
          placeholder={REFLECT_FORM.openingPlaceholder}
          autoComplete="off"
        />
      </label>

      {!accountMode ? (
        <fieldset className="reflect-connect">
          <legend className="reflect-connect-title">{REFLECT_FORM.connectTitle}</legend>
          <p className="reflect-connect-hint">{REFLECT_FORM.connectHint}</p>
          <label className="conversion-field">
            {REFLECT_FORM.email}
            <input name="email" type="email" className="conversion-input" autoComplete="email" />
          </label>
          <div className="reflect-birth-row" role="group" aria-label="Birth date">
            <label className="conversion-field">
              {REFLECT_FORM.birthMonth}
              <input
                name="month"
                inputMode="numeric"
                autoComplete="bday-month"
                placeholder="MM"
                className="conversion-input"
              />
            </label>
            <label className="conversion-field">
              {REFLECT_FORM.birthDay}
              <input
                name="day"
                inputMode="numeric"
                autoComplete="bday-day"
                placeholder="DD"
                className="conversion-input"
              />
            </label>
            <label className="conversion-field">
              {REFLECT_FORM.birthYear}
              <input
                name="year"
                inputMode="numeric"
                autoComplete="bday-year"
                placeholder="YYYY"
                className="conversion-input"
              />
            </label>
          </div>
          <p className="reflect-connect-paths">
            <Link href="/your-code" className="blueprint-secondary-link">
              {REFLECT_FORM.generateCode}
            </Link>
            <span aria-hidden="true"> · </span>
            <Link href={signInHref} className="blueprint-secondary-link">
              {REFLECT_FORM.signIn}
            </Link>
          </p>
        </fieldset>
      ) : null}

      <button type="submit" className="gold-button reflect-entry-submit" disabled={loading}>
        {loading ? REFLECT_FORM.submitting : REFLECT_FORM.submit}
      </button>

      <p className="reflect-form-boundary">{REFLECT_FORM.formBoundary}</p>

      {returnReportHref ? (
        <p className="reflect-secondary-path">
          <Link href={returnReportHref} className="blueprint-secondary-link">
            {REFLECT_FORM.returnReport}
          </Link>
        </p>
      ) : null}

      {status ? (
        <p className="conversion-status" role="alert">
          {status}
        </p>
      ) : null}
    </form>
  );
}
