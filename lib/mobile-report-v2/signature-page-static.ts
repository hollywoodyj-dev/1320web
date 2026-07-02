/** Mobile Page 03 — Your Soul Code Signature static content */

import {
  SIGNATURE_CODE_CARD_META,
  SIGNATURE_NEXT_ITEMS,
  SIGNATURE_NEXT_NOTE,
  SIGNATURE_WHAT_ITEMS,
  type SignatureCodeCardKey,
} from "@/lib/full-report-v2/signature-static";

export const MOBILE_SIGNATURE_BRAND_NAME = "1320 Soul Origin Code System";

export const MOBILE_SIGNATURE_PAGE_INDEX = "03";

export const MOBILE_SIGNATURE_KICKER = "Core Signature";

export const MOBILE_SIGNATURE_TITLE_LINES = ["Your Soul Code", "Signature"] as const;

export const MOBILE_SIGNATURE_SUBTITLE =
  "A symbolic pattern generated from your birth date through the 1320 Soul Origin Code System.";

export const MOBILE_SIGNATURE_BIRTH_LABEL = "Birth Date";

export const MOBILE_SIGNATURE_CORE_LABEL = "Core Signature";

export const MOBILE_SIGNATURE_BLUEPRINT_SUBTITLE = "Your four-part blueprint";

export const MOBILE_SIGNATURE_CODE_ORDER: SignatureCodeCardKey[] = ["s1", "s3", "s2", "s0"];

export const MOBILE_SIGNATURE_WHAT_TITLE = "What This Is";

export const MOBILE_SIGNATURE_EXPLAIN_TITLE = "Why We Do Not Reduce You to Numbers";

export const MOBILE_SIGNATURE_EXPLAIN_LEAD =
  "Your code is generated from your birth date, but the purpose of this report is not to reduce you to mathematics. The code serves as a";

export const MOBILE_SIGNATURE_EXPLAIN_EMPHASIS =
  "symbolic mirror for awareness, integration, and conscious choice.";

export const MOBILE_SIGNATURE_NEXT_TITLE = "What Happens Next";

export const MOBILE_SIGNATURE_REMINDERS = [
  { icon: "☽", text: "Your code is a mirror — not a sentence." },
  { icon: "✺", text: "This report does not reveal a fate. It reveals a pattern." },
  { icon: "✦", text: "Use it with awareness, discernment, and choice." },
] as const;

export { SIGNATURE_CODE_CARD_META, SIGNATURE_WHAT_ITEMS, SIGNATURE_NEXT_ITEMS, SIGNATURE_NEXT_NOTE };
