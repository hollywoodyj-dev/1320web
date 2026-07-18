"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { REFLECT_FORM, REFLECT_HERO } from "@/lib/wisewave/reflect-content";

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
};

type StartPayload = {
  ok?: boolean;
  sessionId?: string;
  accessToken?: string;
  error?: string;
};

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

export function ReflectEntryForm({ prefill, compact = false }: ReflectEntryFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const accountMode = Boolean(prefill?.useAccountProfile);

  async function startSession(body: Record<string, unknown>, openingMessage: string) {
    let { response, payload } = await postReflectStart(body);

    if (
      accountMode &&
      prefill &&
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

      const firstName = String(data.get("firstName") ?? "").trim();
      const email = String(data.get("email") ?? "").trim();
      const birthDate = String(data.get("birthDate") ?? "").trim();

      if (!firstName || !email || !birthDate) {
        setStatus(REFLECT_FORM.error);
        return;
      }

      await startSession({ firstName, email, birthDate, openingMessage }, openingMessage);
    } catch {
      setStatus(REFLECT_FORM.networkError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="conversion-form" onSubmit={onSubmit}>
      {!compact ? <p className="conversion-lead mb-4">{REFLECT_HERO.body}</p> : null}

      {accountMode && prefill ? (
        <>
          <input type="hidden" name="firstName" value={prefill.firstName} />
          <input type="hidden" name="email" value={prefill.email} />
          <input type="hidden" name="birthDate" value={prefill.birthDate} />
          <dl className="reflect-prefill-summary grid gap-3 sm:grid-cols-2 mb-4">
            <div>
              <dt className="text-xs uppercase tracking-wide opacity-70">{REFLECT_FORM.firstName}</dt>
              <dd>{prefill.firstName}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide opacity-70">{REFLECT_FORM.email}</dt>
              <dd>{prefill.email}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide opacity-70">{REFLECT_FORM.birthDate}</dt>
              <dd>{prefill.birthDate}</dd>
            </div>
          </dl>
        </>
      ) : (
        <>
          <label className="conversion-field">
            {REFLECT_FORM.firstName}
            <input
              name="firstName"
              required
              defaultValue={prefill?.firstName}
              className="conversion-input"
            />
          </label>
          <label className="conversion-field">
            {REFLECT_FORM.email}
            <input
              name="email"
              type="email"
              required
              defaultValue={prefill?.email}
              className="conversion-input"
            />
          </label>
          <label className="conversion-field">
            {REFLECT_FORM.birthDate}
            <input
              name="birthDate"
              type="date"
              required
              defaultValue={prefill?.birthDate}
              className="conversion-input"
            />
          </label>
        </>
      )}

      <label className="conversion-field">
        {REFLECT_FORM.opening}
        <textarea
          name="openingMessage"
          required
          className="conversion-input conversion-textarea"
          placeholder={REFLECT_FORM.openingPlaceholder}
        />
      </label>
      <button type="submit" className="gold-button" disabled={loading}>
        {loading ? "Starting…" : REFLECT_FORM.submit}
      </button>
      {status ? <p className="conversion-status">{status}</p> : null}
    </form>
  );
}
