/** Safe internal redirect path from client-provided `next` query/body. */
export function safeNextPath(value: unknown, fallback = "/account"): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }
  return value;
}
