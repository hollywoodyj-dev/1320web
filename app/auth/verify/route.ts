import { NextResponse } from "next/server";
import { consumeMagicLink } from "@/lib/auth/magic-link";
import { setUserSession } from "@/lib/auth/session";
import { getSiteUrl, isDatabaseConfigured } from "@/lib/platform-config";

export async function GET(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.redirect(`${getSiteUrl()}/checkout?error=db`);
  }

  const url = new URL(request.url);
  const rawToken = url.searchParams.get("token");
  const next = url.searchParams.get("next") || "/my-report";

  if (!rawToken) {
    return NextResponse.redirect(`${getSiteUrl()}/checkout?error=token`);
  }

  const consumed = await consumeMagicLink(rawToken);
  if (!consumed) {
    return NextResponse.redirect(`${getSiteUrl()}/checkout?error=expired`);
  }

  await setUserSession(consumed.userId);

  const destination =
    consumed.reportId && next === "/my-report"
      ? `/my-report/${consumed.reportId}`
      : next.startsWith("/")
        ? next
        : "/my-report";

  return NextResponse.redirect(`${getSiteUrl()}${destination}`);
}
