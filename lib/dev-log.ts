/** Client debug logging — visible in Safari Web Inspector when testing on phone. */

export function devLog(label: string, payload?: unknown) {
  const enabled =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_DEBUG_CALCULATOR === "true";

  if (!enabled) return;

  if (payload === undefined) {
    console.info(`[1320] ${label}`);
    return;
  }
  console.info(`[1320] ${label}`, payload);
}
