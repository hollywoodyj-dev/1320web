/**
 * GZH Semantic Gate status — public copy must not claim GREEN until reviewed.
 * Existing zh locale strings = candidates only.
 */
import type { GzhMarket, GzhSemanticStatus } from "@/lib/gzh/locale";

/** Per-market public semantics status (GZH Gate). */
export const GZH_MARKET_SEMANTIC_STATUS: Record<GzhMarket, GzhSemanticStatus> = {
  tw: "GREEN",
  hk: "RED",
  sg: "RED",
  my: "RED",
};

/** Public indexation follows the market gate. Taiwan is GREEN as of Holly's 2026-10-05 review. */
export function gzhMarketIsPublicIndexable(market: GzhMarket): boolean {
  return GZH_MARKET_SEMANTIC_STATUS[market] === "GREEN";
}
