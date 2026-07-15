import { userAgent } from "next/server";
import type { NextRequest } from "next/server";
import { isMobileReportClient } from "@/lib/report/is-mobile-report-client";

export function preferMobileReportFromRequest(request: NextRequest): boolean {
  const ua = request.headers.get("user-agent") ?? "";
  const device = userAgent(request).device.type;
  return (
    device === "mobile" ||
    device === "tablet" ||
    (device === undefined && isMobileReportClient(ua))
  );
}

export function preferMobileReportFromUserAgent(userAgentHeader: string | null): boolean {
  return isMobileReportClient(userAgentHeader ?? "");
}
