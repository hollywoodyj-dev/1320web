"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureLandingAttribution } from "@/lib/funnel/attribution";
import { shouldRecordPageView } from "@/lib/funnel/page-view-dedupe";
import { trackEvent } from "@/lib/soulcode-analytics";

function pageSlug(pathname: string): string {
  if (pathname === "/") return "homepage";
  if (pathname.startsWith("/lp/")) return pathname.slice(1);
  return pathname.slice(1).replace(/\//g, "_") || "unknown";
}

function lpSlugFromPath(pathname: string): string | undefined {
  if (!pathname.startsWith("/lp/")) return undefined;
  const rest = pathname.slice(4);
  const slug = rest.split("/")[0]?.trim();
  return slug || undefined;
}

/** Fires once per route change: page_view (+ homepage_view / paid_landing_view). */
export function SoulcodePageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    if (!shouldRecordPageView(pathname)) return;

    const stored = captureLandingAttribution(pathname);
    const search = new URLSearchParams(window.location.search);
    const from = search.get("from")?.trim();
    const lpQuery = search.get("lp")?.trim();
    const adGroup = search.get("ad_group")?.trim();
    const utmSource = stored?.utm_source || search.get("utm_source")?.trim();
    const pathLp = lpSlugFromPath(pathname);
    const lp = lpQuery || pathLp;

    trackEvent("page_view", {
      path: pathname,
      page: pageSlug(pathname),
      ...(from ? { from } : {}),
      ...(lp ? { lp } : {}),
      ...(adGroup ? { ad_group: adGroup } : {}),
      ...(utmSource ? { source: utmSource } : {}),
      ...(stored?.utm_medium ? { medium: stored.utm_medium } : {}),
      ...(stored?.utm_campaign ? { campaign: stored.utm_campaign } : {}),
      ...(stored?.landingPath ? { landingPath: stored.landingPath } : {}),
    });

    if (pathname === "/") {
      trackEvent("homepage_view", {
        path: pathname,
        ...(utmSource ? { source: utmSource } : {}),
      });
    }

    if (pathname.startsWith("/lp/")) {
      trackEvent("paid_landing_view", {
        path: pathname,
        ...(lp ? { lp } : {}),
        ...(adGroup ? { ad_group: adGroup } : {}),
        ...(from ? { from } : {}),
      });
    }
  }, [pathname]);

  return null;
}
