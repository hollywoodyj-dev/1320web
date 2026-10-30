const PRODUCTION_HOSTS = new Set([
  "www.1320soulcode.com",
  "1320soulcode.com",
  "thesoulprofile.com",
  "www.thesoulprofile.com",
]);

/** Preview and local development only. Production hosts never serve Kingdom. */
export function isSoulSyncKingdomPreviewEnabled(request: Request): boolean {
  let host = "";
  try {
    host = new URL(request.url).hostname.toLowerCase();
  } catch {
    return false;
  }
  if (PRODUCTION_HOSTS.has(host)) return false;
  if (process.env.VERCEL_ENV === "production") return false;
  if (process.env.VERCEL_ENV === "preview") return true;
  return process.env.NODE_ENV !== "production";
}
