import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";
import { CANONICAL_SITE_URL, shouldRedirectHostToCanonical } from "@/lib/platform-config";
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

/** Path-to-path 301 onto the Wisewave-approved canonical host. */
function redirectToCanonicalHost(request: NextRequest): NextResponse | null {
  const hostname = request.headers.get("host") ?? request.nextUrl.hostname;
  if (!shouldRedirectHostToCanonical(hostname)) return null;

  const target = new URL(request.nextUrl.pathname + request.nextUrl.search, CANONICAL_SITE_URL);
  return NextResponse.redirect(target, 301);
}

export function middleware(request: NextRequest) {
  const hostRedirect = redirectToCanonicalHost(request);
  if (hostRedirect) return hostRedirect;

  const { pathname, searchParams } = request.nextUrl;

  // Root-canonical SEO pages: duplicate guide URLs must emit HTTP 301 (not 308).
  if (
    pathname === "/guides/what-is-a-soul-blueprint" ||
    pathname === "/guides/what-is-a-soul-blueprint/"
  ) {
    const target = request.nextUrl.clone();
    target.pathname = "/what-is-a-soul-blueprint";
    return NextResponse.redirect(target, 301);
  }
  if (
    pathname === "/guides/life-path-number-vs-soul-blueprint" ||
    pathname === "/guides/life-path-number-vs-soul-blueprint/"
  ) {
    const target = request.nextUrl.clone();
    target.pathname = "/life-path-number-vs-soul-blueprint";
    return NextResponse.redirect(target, 301);
  }

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
    /*
     * Host canonicalization for almost all routes.
     * Skip Next internals and common static asset extensions.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
