/**
 * GZH Semantic Gate status — public copy must not claim GREEN until reviewed.
 * Existing zh locale strings = candidates only.
 */
import type { GzhMarket, GzhSemanticStatus } from "@/lib/gzh/locale";

/** Per-market public semantics status (GZH Gate). */
export const GZH_MARKET_SEMANTIC_STATUS: Record<GzhMarket, GzhSemanticStatus> = {
  tw: "YELLOW",
  hk: "RED",
  sg: "RED",
  my: "RED",
};

/** TW landing chrome uses Founder-locked brand lines only — still YELLOW for full product GREEN. */
export function gzhMarketIsPublicIndexable(market: GzhMarket): boolean {
  return GZH_MARKET_SEMANTIC_STATUS[market] === "GREEN";
}
