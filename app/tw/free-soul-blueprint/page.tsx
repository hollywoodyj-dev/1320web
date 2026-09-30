import type { Metadata } from "next";
import { GzhTwFreeBirthForm } from "@/components/gzh/gzh-tw-free-birth-form";
import { GzhComprehensionCheck } from "@/components/gzh/gzh-comprehension-check";
import { GzhTwExplainSections } from "@/components/gzh/gzh-tw-explain-sections";
import { GZH_TW_FREE, GZH_TW_LANDING } from "@/lib/gzh/tw-content";

export const metadata: Metadata = {
  title: GZH_TW_FREE.metaTitle,
  description: GZH_TW_FREE.metaDescription,
  alternates: {
    canonical: "/tw/free-soul-blueprint",
    languages: {
      "zh-TW": "/tw/free-soul-blueprint",
      "x-default": "/free-soul-blueprint",
    },
  },
};

export default function TwFreeSoulBlueprintPage() {
  return (
    <article className="gzh-free">
      <h1 className="gzh-hero-brand">{GZH_TW_FREE.title}</h1>
      <p className="gzh-hero-lead">{GZH_TW_FREE.body}</p>
      <p className="gzh-boundary">{GZH_TW_FREE.boundary}</p>

      <GzhTwExplainSections />

      <div className="gzh-hero-form">
        <GzhTwFreeBirthForm idPrefix="gzh-tw-free" />
      </div>

      <p className="gzh-trust">{GZH_TW_LANDING.trustLine}</p>
      <p className="gzh-report-note">{GZH_TW_LANDING.reportLanguageNote}</p>

      <p className="gzh-note">{GZH_TW_FREE.comprehensionHint}</p>
      <GzhComprehensionCheck market="tw" />
    </article>
  );
}
