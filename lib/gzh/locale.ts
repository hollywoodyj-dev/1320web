/**
 * GZH-0 · Global Chinese locale model (Founder freeze 2026-09-30).
 * Internal dimensions stay separate — never hard-code market = script.
 */

export type ProductTrack = "en" | "gzh" | "cn_mainland";
export type GzhMarket = "tw" | "hk" | "sg" | "my";
export type GzhScript = "Hant" | "Hans";
export type GzhLanguage = "zh";

export type GzhLocaleContext = {
  track: "gzh";
  market: GzhMarket;
  language: GzhLanguage;
  script: GzhScript;
  /** Optional market/tone variant — e.g. future HK-specific copy key. */
  contentVariant?: string;
};

export type GzhSemanticStatus = "RED" | "YELLOW" | "GREEN";

export const GZH_MARKETS: readonly GzhMarket[] = ["tw", "hk", "sg", "my"] as const;

/** Market defaults — script inferred for Option B public URLs. */
export const GZH_MARKET_DEFAULTS: Record<
  GzhMarket,
  {
    script: GzhScript;
    hreflang: string;
    htmlLang: string;
    /** Public indexation only after GZH Semantic Gate GREEN for that market. */
    indexableWhenGreen: boolean;
  }
> = {
  tw: {
    script: "Hant",
    hreflang: "zh-TW",
    htmlLang: "zh-Hant-TW",
    indexableWhenGreen: true,
  },
  hk: {
    script: "Hant",
    hreflang: "zh-HK",
    htmlLang: "zh-Hant-HK",
    indexableWhenGreen: true,
  },
  sg: {
    script: "Hans",
    hreflang: "zh-SG",
    htmlLang: "zh-Hans-SG",
    indexableWhenGreen: true,
  },
  my: {
    script: "Hans",
    hreflang: "zh-MY",
    htmlLang: "zh-Hans-MY",
    indexableWhenGreen: true,
  },
};

export function isGzhMarket(value: string): value is GzhMarket {
  return (GZH_MARKETS as readonly string[]).includes(value);
}

/** Resolve GZH context from a public pathname (`/tw/...`). */
export function resolveGzhFromPathname(pathname: string): GzhLocaleContext | null {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0]?.toLowerCase();
  if (!first || !isGzhMarket(first)) return null;
  const defaults = GZH_MARKET_DEFAULTS[first];
  return {
    track: "gzh",
    market: first,
    language: "zh",
    script: defaults.script,
  };
}

export function gzhHref(market: GzhMarket, subpath = ""): string {
  const clean = subpath.replace(/^\/+/, "").replace(/\/+$/, "");
  return clean ? `/${market}/${clean}` : `/${market}`;
}

/** Analytics / event metadata dims for GZH paths. */
export function gzhAnalyticsDims(
  ctx: GzhLocaleContext,
): Record<string, string> {
  return {
    product_track: ctx.track,
    market: ctx.market,
    language: ctx.language,
    script: ctx.script.toLowerCase(),
  };
}
