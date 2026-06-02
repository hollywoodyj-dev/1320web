import { headers } from "next/headers";

/** Build absolute URL for the current request host (meta refresh, OG, etc.). */
export async function absoluteUrl(path: string): Promise<string> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${protocol}://${host}${normalized}`;
}
