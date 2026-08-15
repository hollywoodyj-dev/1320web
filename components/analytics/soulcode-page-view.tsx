"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const from = searchParams?.get("from")?.trim();
    const lpQuery = searchParams?.get("lp")?.trim();
    const adGroup = searchParams?.get("ad_group")?.trim();
    const utmSource = searchParams?.get("utm_source")?.trim();
    const pathLp = lpSlugFromPath(pathname);
    const lp = lpQuery || pathLp;

    trackEvent("page_view", {
      path: pathname,
      page: pageSlug(pathname),
      ...(from ? { from } : {}),
      ...(lp ? { lp } : {}),
      ...(adGroup ? { ad_group: adGroup } : {}),
      ...(utmSource ? { source: utmSource } : {}),
    });

    if (pathname === "/") {
      trackEvent("homepage_view", { path: pathname });
    }

    if (pathname.startsWith("/lp/")) {
      trackEvent("paid_landing_view", {
        path: pathname,
        ...(lp ? { lp } : {}),
        ...(adGroup ? { ad_group: adGroup } : {}),
        ...(from ? { from } : {}),
      });
    }
  }, [pathname, searchParams]);

  return null;
}
