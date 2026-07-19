/** Safe internal redirect path from client-provided `next` query/body. */

export function safeNextPath(value: unknown, fallback = "/account"): string {
  if (typeof value !== "string") return fallback;

  const trimmed = value.trim();
  if (!trimmed) return fallback;

  // Internal path only — reject absolute URLs, protocol-relative, and backslash tricks.
  if (
    !trimmed.startsWith("/") ||
    trimmed.startsWith("//") ||
    trimmed.includes("://") ||
    trimmed.includes("\\") ||
    trimmed.includes("\0")
  ) {
    return fallback;
  }

  return trimmed;
}
