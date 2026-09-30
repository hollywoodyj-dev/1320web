"use client";

import { useEffect } from "react";
import {
  gzhAnalyticsDims,
  type GzhLocaleContext,
} from "@/lib/gzh/locale";
import {
  loadFunnelAttribution,
  mergeAttribution,
  saveFunnelAttribution,
} from "@/lib/funnel/attribution";

const GZH_CONTEXT_KEY = "1320_gzh_locale_v1";

/** Persist GZH dims for the session and merge into funnel attribution metadata via path. */
export function GzhContextCapture({ context }: { context: GzhLocaleContext }) {
  useEffect(() => {
    try {
      sessionStorage.setItem(GZH_CONTEXT_KEY, JSON.stringify(context));
    } catch {
      // ignore
    }
    const dims = gzhAnalyticsDims(context);
    const existing = loadFunnelAttribution();
    // Do not invent UTMs — only ensure landingPath stays market-first if empty.
    saveFunnelAttribution(
      mergeAttribution(existing, {
        landingPath: existing?.landingPath ?? `/${context.market}`,
      }),
    );
    // Expose dims for trackFunnelEvent path resolver (same tab).
    try {
      sessionStorage.setItem(
        "1320_gzh_analytics_dims",
        JSON.stringify(dims),
      );
    } catch {
      // ignore
    }
  }, [context]);

  return null;
}

export function loadGzhAnalyticsDimsFromSession(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem("1320_gzh_analytics_dims");
    if (!raw) return null;
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return null;
  }
}
