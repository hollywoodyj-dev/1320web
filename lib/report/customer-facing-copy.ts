/**
 * Rewrites internal/database phrasing into customer-facing report copy.
 * Applied at resolver output — not in source JSON (preserves DB truth).
 */
export function sanitizeCustomerFacingCopy(text: string): string {
  if (!text) return text;

  return text
    .replace(
      /The old money-language source described this pattern through the relationship between value and wealth;\s*in the current system,\s*NOVA should translate it as a symbolic receiving pattern, not a financial prediction\./gi,
      "This pattern is a symbolic reflection on receiving, value, and grounded contribution, not a financial prediction.",
    )
    .replace(/\bNOVA should\b/gi, "this report should")
    .replace(
      /^The integration begins when the user expresses this origin frequency without turning it into proof, pressure, or fixed identity\.\s*/i,
      "Integration begins when you express this origin frequency without turning it into proof, pressure, or fixed identity. ",
    )
    .replace(/^The integration begins through:\s*/i, "Integration begins through: ")
    .replace(/\bthe user's\b/gi, "your")
    .replace(/\buser's\b/gi, "your")
    .replace(/\bthe user expresses\b/gi, "you express")
    .replace(/\bthe user\b/gi, "you")
    .replace(/\byou's\b/gi, "your")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function formatDisclaimerInterpretationLead(
  lead: string,
  emphasis: string,
  tail: string,
): string {
  const parts = [lead.trim(), emphasis.trim()].filter(Boolean);
  const head = parts.join(" ");
  if (!head && !tail.trim()) return "";
  if (!tail.trim()) return head.endsWith(".") ? head : `${head}.`;
  const prefix = head ? (head.endsWith(".") ? head : `${head}.`) : "";
  return [prefix, tail.trim()].filter(Boolean).join(" ");
}
