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

export function ReflectEntryForm({ prefill, compact = false }: ReflectEntryFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const accountMode = Boolean(prefill?.useAccountProfile);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const openingMessage = String(data.get("openingMessage") ?? "").trim();

    if (!openingMessage) {
      setStatus(REFLECT_FORM.openingRequired);
      return;
    }

    if (accountMode) {
      setLoading(true);
      setStatus("");

      try {
        const response = await fetch("/api/reflect/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({
            openingMessage,
            useAccountProfile: true,
            firstName: prefill?.firstName,
            email: prefill?.email,
            birthDate: prefill?.birthDate,
            reportId: prefill?.reportId,
          }),
        });
        const payload = (await response.json()) as {
          ok?: boolean;
          sessionId?: string;
          accessToken?: string;
          error?: string;
        };

        if (!response.ok || !payload.ok || !payload.sessionId || !payload.accessToken) {
          setStatus(payload.error ?? REFLECT_FORM.error);
          return;
        }

        router.push(`/reflect/${payload.sessionId}?token=${payload.accessToken}`);
      } catch {
        setStatus(REFLECT_FORM.error);
      } finally {
        setLoading(false);
      }
      return;
    }

    const firstName = String(data.get("firstName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const birthDate = String(data.get("birthDate") ?? "").trim();

    if (!firstName || !email || !birthDate) {
      setStatus(REFLECT_FORM.error);
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/reflect/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, birthDate, openingMessage }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        chatUrl?: string;
        sessionId?: string;
        accessToken?: string;
        error?: string;
      };

      if (!response.ok || !payload.ok || !payload.sessionId || !payload.accessToken) {
        setStatus(payload.error ?? REFLECT_FORM.error);
        return;
      }

      router.push(`/reflect/${payload.sessionId}?token=${payload.accessToken}`);
    } catch {
      setStatus(REFLECT_FORM.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="conversion-form" onSubmit={onSubmit}>
      {!compact ? <p className="conversion-lead mb-4">{REFLECT_HERO.body}</p> : null}

      {accountMode && prefill ? (
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
