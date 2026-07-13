import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";
import { isMobileReportClient } from "@/lib/report/is-mobile-report-client";

const DESKTOP_SAMPLE_PATHS = new Set(["/full-report-v2", "/full-report-v2-phase1"]);

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (!DESKTOP_SAMPLE_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  if (searchParams.get("view") === "desktop") {
    return NextResponse.next();
  }

  const ua = request.headers.get("user-agent") ?? "";
  const device = userAgent(request).device.type;
  const preferMobile =
    device === "mobile" ||
    device === "tablet" ||
    (device === undefined && isMobileReportClient(ua));

  if (!preferMobile) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/mobile-report-v2";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/full-report-v2", "/full-report-v2-phase1"],
};
