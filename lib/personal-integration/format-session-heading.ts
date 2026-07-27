import { getSessionVariantLabel } from "@/lib/personal-integration/session-variants";

type SessionHeadingSource = {
  session_variant?: string | null;
  session_title?: string | null;
  duration_minutes?: number | null;
  price_amount?: string | number | null;
  currency?: string | null;
};

/** Client / Facilitator heading for a Session record (prefers persisted Launch v1 fields). */
export function formatSessionHeading(session: SessionHeadingSource): string {
  if (session.session_title && session.duration_minutes) {
    return `${session.session_title} (${session.duration_minutes} minutes)`;
  }
  if (session.session_title) return session.session_title;
  return getSessionVariantLabel(session.session_variant);
}

export function formatSessionPriceLine(session: SessionHeadingSource): string | null {
  if (session.price_amount == null || !session.currency) return null;
  const amount =
    typeof session.price_amount === "number"
      ? session.price_amount
      : Number.parseFloat(String(session.price_amount));
  if (!Number.isFinite(amount)) return null;
  return `${session.currency.toUpperCase()} ${amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2)}`;
}
