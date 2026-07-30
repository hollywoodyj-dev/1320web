"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import { captureSeoAttribution, seoAttributionAnalyticsProps } from "@/lib/seo/attribution";
import type { SeoCluster } from "@/lib/seo/types";

type SeoArticleAnalyticsProps = {
  slug: string;
  cluster: SeoCluster;
  path: string;
  primaryKeyword?: string;
};

export function SeoArticleAnalytics({
  slug,
  cluster,
  path,
  primaryKeyword,
}: SeoArticleAnalyticsProps) {
  const scrolledHalf = useRef(false);
  const scrolledNinety = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    captureSeoAttribution({
      landingPath: path,
      contentSlug: slug,
      primaryCluster: cluster,
      searchParams: params,
      referrer: document.referrer || undefined,
      language: document.documentElement.lang || navigator.language || "en",
    });

    const baseProps = seoAttributionAnalyticsProps({
      landing_page: path,
      content_slug: slug,
      primary_cluster: cluster,
      ...(primaryKeyword ? { primary_keyword: primaryKeyword } : {}),
    });

    trackEvent("seo_article_view", baseProps);

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const ratio = window.scrollY / scrollable;

      if (!scrolledHalf.current && ratio >= 0.5) {
        scrolledHalf.current = true;
        trackEvent("seo_article_scroll_50", baseProps);
      }
      if (!scrolledNinety.current && ratio >= 0.9) {
        scrolledNinety.current = true;
        trackEvent("seo_article_scroll_90", baseProps);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, cluster, path, primaryKeyword]);

  return null;
}
