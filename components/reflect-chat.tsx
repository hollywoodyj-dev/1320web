"use client";

import { FormEvent, useEffect, useState } from "react";
import { REFLECT_CHAT } from "@/lib/wisewave/reflect-content";
import type { WisewaveSessionContext } from "@/lib/wisewave/types";

type ReflectChatProps = {
  sessionId: string;
  accessToken: string;
  initialSession: WisewaveSessionContext;
};

export function ReflectChat({ sessionId, accessToken, initialSession }: ReflectChatProps) {
  const [session, setSession] = useState(initialSession);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSession(initialSession);
  }, [initialSession]);

  async function refreshSession() {
    const response = await fetch(`/api/wisewave/sessions/${sessionId}?token=${accessToken}`);
    const data = (await response.json()) as { ok?: boolean; session?: WisewaveSessionContext };
    if (data.ok && data.session) setSession(data.session);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/wisewave/sessions/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: accessToken, message: trimmed }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error ?? "Could not send message.");
        setMessage(trimmed);
        return;
      }
      await refreshSession();
    } catch {
      setError("Could not send message.");
      setMessage(trimmed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded border border-white/10 p-3 text-sm opacity-90">
        <span className="font-mono">{session.codes.s1}</span> · <span className="font-mono">{session.codes.s3}</span> ·{" "}
        <span className="font-mono">{session.codes.s2}</span> · <span className="font-mono">{session.codes.s0}</span>
        <span className="ml-2 opacity-70">Expression: {session.expressionState}</span>
      </div>

      <div className="max-h-[28rem] space-y-3 overflow-y-auto rounded border border-white/10 p-4">
        {session.turns.length === 0 ? (
          <p className="text-sm opacity-70">{REFLECT_CHAT.empty}</p>
        ) : (
          session.turns.map((turn, index) => (
            <div
              key={`${turn.createdAt}-${index}`}
              className={turn.role === "user" ? "text-right" : "text-left"}
            >
              <p className="text-xs uppercase tracking-wide opacity-60">{turn.role === "user" ? "You" : "Wisewave"}</p>
              <p className="whitespace-pre-wrap text-sm">{turn.content}</p>
            </div>
          ))
        )}
      </div>

      <form className="conversion-form" onSubmit={onSubmit}>
        <label className="conversion-field">
          <textarea
            className="conversion-input conversion-textarea"
            placeholder={REFLECT_CHAT.placeholder}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            disabled={loading}
          />
        </label>
        <button type="submit" className="gold-button" disabled={loading || !message.trim()}>
          {loading ? REFLECT_CHAT.thinking : REFLECT_CHAT.send}
        </button>
        {error ? <p className="conversion-status">{error}</p> : null}
      </form>
    </div>
  );
}
