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
    supportNote: "台湾市场隐私与条款叠层待法务确认（GZH-1 organic · 非 CRM 营销主路径）。",
  },
  hk: {
    market: "hk",
    status: "placeholder",
    privacyHref: "/privacy",
    termsHref: "/terms",
    supportNote: "香港市场叠层待法务确认；GZH-2 organic 开启前不得当作已批准文案。",
  },
  sg: {
    market: "sg",
    status: "placeholder",
    privacyHref: "/privacy",
    termsHref: "/terms",
    supportNote: "新加坡市场叠层待法务确认。",
  },
  my: {
    market: "my",
    status: "placeholder",
    privacyHref: "/privacy",
    termsHref: "/terms",
    supportNote: "马来西亚市场叠层待法务确认。",
  },
};
