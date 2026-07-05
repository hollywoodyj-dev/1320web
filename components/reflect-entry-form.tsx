"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { REFLECT_FORM, REFLECT_HERO } from "@/lib/wisewave/reflect-content";

export function ReflectEntryForm() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const birthDate = String(data.get("birthDate") ?? "").trim();
    const openingMessage = String(data.get("openingMessage") ?? "").trim();

    if (!firstName || !email || !birthDate || !openingMessage) {
      setStatus(REFLECT_FORM.error);
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/wisewave/sessions", {
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
      <p className="conversion-lead mb-4">{REFLECT_HERO.body}</p>
      <label className="conversion-field">
        {REFLECT_FORM.firstName}
        <input name="firstName" required className="conversion-input" />
      </label>
      <label className="conversion-field">
        {REFLECT_FORM.email}
        <input name="email" type="email" required className="conversion-input" />
      </label>
      <label className="conversion-field">
        {REFLECT_FORM.birthDate}
        <input name="birthDate" type="date" required className="conversion-input" />
      </label>
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
