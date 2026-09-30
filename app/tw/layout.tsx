import type { Metadata } from "next";
import { GzhContextCapture } from "@/components/gzh/gzh-context-capture";
import { GzhShell } from "@/components/gzh/gzh-shell";
import {
  GZH_MARKET_DEFAULTS,
  type GzhLocaleContext,
} from "@/lib/gzh/locale";
import { gzhMarketIsPublicIndexable } from "@/lib/gzh/semantic-status";
import "@/styles/gzh-tw-v1.css";

const TW_CONTEXT: GzhLocaleContext = {
  track: "gzh",
  market: "tw",
  language: "zh",
  script: "Hant",
};

const twDefaults = GZH_MARKET_DEFAULTS.tw;

export const metadata: Metadata = {
  title: {
    default: "1320｜生命映照",
    template: "%s｜1320｜生命映照",
  },
  alternates: {
    canonical: "/tw",
    languages: {
      "zh-TW": "/tw",
      "x-default": "/",
    },
  },
  openGraph: {
    locale: "zh_TW",
    siteName: "1320｜生命映照",
  },
  robots: gzhMarketIsPublicIndexable("tw")
    ? { index: true, follow: true }
    : { index: false, follow: true },
};

export default function TwLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang={twDefaults.htmlLang}>
      <GzhContextCapture context={TW_CONTEXT} />
      <GzhShell market="tw">{children}</GzhShell>
    </div>
  );
}
