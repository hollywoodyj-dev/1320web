/**
 * Privacy / legal overlay slots — counsel fills text; Nova does not invent PDPA/PCOPD copy.
 */

import type { GzhMarket } from "@/lib/gzh/locale";

export type GzhPrivacyOverlaySlot = {
  market: GzhMarket;
  /** Counsel-owned; empty until reviewed. */
  status: "placeholder" | "draft" | "approved";
  privacyHref: string;
  termsHref: string;
  supportNote: string;
};

export const GZH_PRIVACY_OVERLAY: Record<GzhMarket, GzhPrivacyOverlaySlot> = {
  tw: {
    market: "tw",
    status: "placeholder",
    privacyHref: "/privacy",
    termsHref: "/terms",
    supportNote: "",
  },
  hk: {
    market: "hk",
    status: "placeholder",
    privacyHref: "/privacy",
    termsHref: "/terms",
    supportNote: "香港市場疊層待法務確認；GZH-2 organic 開啟前不得當作已批准文案。",
  },
  sg: {
    market: "sg",
    status: "placeholder",
    privacyHref: "/privacy",
    termsHref: "/terms",
    supportNote: "新加坡市場疊層待法務確認。",
  },
  my: {
    market: "my",
    status: "placeholder",
    privacyHref: "/privacy",
    termsHref: "/terms",
    supportNote: "馬來西亞市場疊層待法務確認。",
  },
};
