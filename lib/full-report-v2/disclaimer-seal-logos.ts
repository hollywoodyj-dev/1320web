/**
 * Circle logos for Page 18 disclaimer seal wheel nodes.
 * Assets: `public/full-report-v2/disclaimer-seal-logos/`
 */

import { CLOSING_INTEGRATION_SEAL_BG_URL } from "@/lib/full-report-v2/closing-integration-seal-logos";

export const DISCLAIMER_SEAL_BG_URL = CLOSING_INTEGRATION_SEAL_BG_URL;

export const DISCLAIMER_SEAL_LOGO_URLS = {
  top: "/full-report-v2/disclaimer-seal-logos/right-way-report-circle-logo-reflect-gpt-v1.webp",
  right: "/full-report-v2/disclaimer-seal-logos/right-way-report-circle-logo-discern-gpt-v1.webp",
  bottom: "/full-report-v2/disclaimer-seal-logos/right-way-report-circle-logo-integrate-gpt-v1.webp",
  left: "/full-report-v2/disclaimer-seal-logos/right-way-report-circle-logo-choose-gpt-v1.webp",
} as const;

export const DISCLAIMER_SEAL_LOGO_ALTS = {
  top: "Reflect seal logo",
  right: "Discern seal logo",
  bottom: "Integrate seal logo",
  left: "Choose seal logo",
} as const;
