"use client";

import { useEffect } from "react";

/** Root layout forces lang=en; set documentElement for GZH market pages. */
export function GzhHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = previous || "en";
    };
  }, [lang]);

  return null;
}
