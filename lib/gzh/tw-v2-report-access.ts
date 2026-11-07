const PRODUCTION_HOSTS = new Set([
  "www.1320soulcode.com",
  "1320soulcode.com",
  "www.thesoulprofile.com",
  "thesoulprofile.com",
]);

/** v2.0 reading route. Production hosts stay closed. */
export function isTwV2ReportEnabled(hostHeader?: string | null): boolean {
  const host = hostHeader?.split(":")[0]?.toLowerCase() ?? "";
  if (PRODUCTION_HOSTS.has(host)) return false;
  if (host === "localhost" || host === "127.0.0.1") return true;
  if (process.env.VERCEL_ENV === "production") return false;
  if (process.env.VERCEL_ENV === "preview") return true;
  return process.env.NODE_ENV !== "production";
}
