"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import { captureSeoAttribution, seoAttributionAnalyticsProps } from "@/lib/seo/attribution";
import type { SeoCluster } from "@/lib/seo/types";

type SeoArticleAnalyticsProps = {
  slug: string;
  cluster: SeoCluster;
  path: string;
};

export function SeoArticleAnalytics({ slug, cluster, path }: SeoArticleAnalyticsProps) {
  const scrolledHalf = useRef(false);

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

    trackEvent(
      "seo_article_view",
      seoAttributionAnalyticsProps({
        landing_page: path,
        content_slug: slug,
        primary_cluster: cluster,
      }),
    );

    const onScroll = () => {
      if (scrolledHalf.current) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= 0.5) {
        scrolledHalf.current = true;
        trackEvent(
          "seo_article_scroll_50",
          seoAttributionAnalyticsProps({
            landing_page: path,
            content_slug: slug,
            primary_cluster: cluster,
          }),
        );
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, cluster, path]);

  return null;
}
