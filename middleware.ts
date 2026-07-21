import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";
import { isMobileReportClient } from "@/lib/report/is-mobile-report-client";
import { preferMobileReportFromRequest } from "@/lib/report/prefer-mobile-report";

const DESKTOP_SAMPLE_PATHS = new Set(["/full-report-v2", "/full-report-v2-phase1"]);
const ENTITLED_REPORT_PATH = /^\/my-report\/[^/]+$/;

function withMobileReportHeader(request: NextRequest): NextResponse {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-1320-mobile-report", "1");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

function withInternalNoStore(request: NextRequest): NextResponse {
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (
    pathname === "/integration/facilitator" ||
    pathname.startsWith("/facilitator/") ||
    pathname.startsWith("/integration/intake/") ||
    pathname.startsWith("/api/personal-integration/facilitator") ||
    pathname.startsWith("/api/personal-integration/intake")
  ) {
    return withInternalNoStore(request);
  }

  if (ENTITLED_REPORT_PATH.test(pathname)) {
    if (searchParams.get("view") !== "desktop" && preferMobileReportFromRequest(request)) {
      return withMobileReportHeader(request);
    }
    return NextResponse.next();
  }

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
  matcher: [
    "/full-report-v2",
    "/full-report-v2-phase1",
    "/my-report/:reportId",
    "/integration/facilitator",
    "/facilitator/:path*",
    "/integration/intake/:path*",
    "/api/personal-integration/facilitator/:path*",
    "/api/personal-integration/intake/:path*",
  ],
};
