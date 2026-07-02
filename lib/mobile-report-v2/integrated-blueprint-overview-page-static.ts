/** Mobile Page 14 — Integrated Soul Blueprint Overview static UI chrome */

import type { SoulCodeLogo } from "@/lib/full-report-v2/soul-code-logos";

export const MOBILE_INTEGRATED_BLUEPRINT_BRAND_NAME = "1320 Soul Origin Code System";

export const MOBILE_INTEGRATED_BLUEPRINT_BRAND_SUBTITLE = "Full Soul Origin Report";

export const MOBILE_INTEGRATED_BLUEPRINT_PAGE_INDEX = "14";

export const MOBILE_INTEGRATED_BLUEPRINT_KICKER = "Integrated Soul Blueprint";

export const MOBILE_INTEGRATED_BLUEPRINT_TITLE_LINE = "Your Integrated";

export const MOBILE_INTEGRATED_BLUEPRINT_TITLE_EMPHASIS = "Soul Blueprint";

export const MOBILE_INTEGRATED_BLUEPRINT_SUBTITLE_LINES = [
  "Your complete soul map — how your codes work together as one living pattern.",
] as const;

export const MOBILE_INTEGRATED_BLUEPRINT_SOUL_CODES_TITLE = "Your Soul Codes";

export const MOBILE_INTEGRATED_BLUEPRINT_MAP_TITLE = "Your Integrated Soul Blueprint";

export const MOBILE_INTEGRATED_BLUEPRINT_WORK_TITLE = "How Your Codes Work Together";

export const MOBILE_INTEGRATED_BLUEPRINT_ARCHETYPE_TITLE = "Your Soul Archetype Blend";

export const MOBILE_INTEGRATED_BLUEPRINT_ARCHETYPE_LEAD = "You are a:";

export const MOBILE_INTEGRATED_BLUEPRINT_SYNERGY_TITLE = "Your Soul Synergy";

export const MOBILE_INTEGRATED_BLUEPRINT_FLOW_TITLE = "Your Life Purpose Flow";

export const MOBILE_INTEGRATED_BLUEPRINT_GIFTS_TITLE = "Your Soul Gifts to the World";

export const MOBILE_INTEGRATED_BLUEPRINT_GUIDANCE_TITLE = "Integration Guidance";

export const MOBILE_INTEGRATED_BLUEPRINT_CLOSING_TITLE = "See It. Own It. Live It.";

export const MOBILE_INTEGRATED_BLUEPRINT_CLOSING_LINES = [
  "This is your integrated soul blueprint.",
  "Not a label — but a mirror.",
  "Not a limit — but a map.",
  "Not a prediction — but a possibility.",
] as const;

export const MOBILE_INTEGRATED_BLUEPRINT_CODE_ORDER = ["s1", "s3", "s2", "s0"] as const;

export type MobileIntegratedCodeKey = "s1" | "s3" | "s2" | "s0";

export const MOBILE_INTEGRATED_BLUEPRINT_MODULE_LABELS: Record<MobileIntegratedCodeKey, string> = {
  s1: "Soul Origin",
  s3: "Soul Vibration",
  s2: "Soul Mirror",
  s0: "Void Gate",
};

export const MOBILE_INTEGRATED_BLUEPRINT_SHORT_LINE_FALLBACKS: Record<MobileIntegratedCodeKey, string> = {
  s1: "Your core essence and soul origin frequency.",
  s3: "How your frequency moves, expresses, and influences.",
  s2: "What life and relationships may activate and reflect back to you.",
  s0: "The illusion your awareness is learning to see through.",
};

export const MOBILE_INTEGRATED_BLUEPRINT_MAP_COPY_FALLBACKS: Record<MobileIntegratedCodeKey, string> = {
  s1: "You transform realities and bring healing through change.",
  s3: "You explore life with curiosity and bring fresh perspectives.",
  s2: "You heal through deep soul shocks that awaken your truth.",
  s0: "You break the illusion of not enough and return to your true worth.",
};

export const MOBILE_INTEGRATED_BLUEPRINT_WORK_ITEMS = [
  {
    key: "s1" as const,
    badge: "S1",
    title: "Essence",
    copyFallback:
      "Your core essence and soul mission — what you came here to be.",
  },
  {
    key: "s3" as const,
    badge: "S3",
    title: "Expression",
    copyFallback: "Your natural vibration — how you move, express, and influence.",
  },
  {
    key: "s2" as const,
    badge: "S2",
    title: "Reflection",
    copyFallback: "Your lessons and mirrors — how you learn, reflect, and evolve.",
  },
  {
    key: "s0" as const,
    badge: "S0",
    title: "Return",
    copyFallback: "Your awakening gate — the illusion you transcend to return to truth.",
  },
] as const;

export const MOBILE_INTEGRATED_BLUEPRINT_ARCHETYPE_TITLE_FALLBACK = "Transformative Explorer";

export const MOBILE_INTEGRATED_BLUEPRINT_ARCHETYPE_COPY_FALLBACK =
  "Here to transform, inspire through exploration, mirror truth, and return to self-worth.";

export const MOBILE_INTEGRATED_BLUEPRINT_SYNERGY_ITEMS: ReadonlyArray<{
  title: string;
  icon: SoulCodeLogo;
  copyFallback: string;
}> = [
  {
    title: "Essence + Vibration",
    icon: "flame",
    copyFallback: "You express your mission with dynamic energy.",
  },
  {
    title: "Mirror + Vibration",
    icon: "waves",
    copyFallback: "You attract lessons that help you grow and expand.",
  },
  {
    title: "Essence + Mirror",
    icon: "mirror",
    copyFallback: "Your life purpose is refined through deep reflection.",
  },
  {
    title: "Void Gate + All Codes",
    icon: "ring",
    copyFallback: "You return to Source and integrate all lessons.",
  },
];

export const MOBILE_INTEGRATED_BLUEPRINT_FLOW_ITEMS: ReadonlyArray<{
  title: string;
  icon: SoulCodeLogo;
  copyFallback: string;
}> = [
  {
    title: "Transform",
    icon: "flame",
    copyFallback: "Bring change and healing.",
  },
  {
    title: "Awaken",
    icon: "mirror",
    copyFallback: "Heal through truth and reflection.",
  },
  {
    title: "Explore",
    icon: "waves",
    copyFallback: "Share wisdom and inspire through experience.",
  },
  {
    title: "Return",
    icon: "ring",
    copyFallback: "Return to self, worth, and Source.",
  },
];

export const MOBILE_INTEGRATED_BLUEPRINT_GIFT_FALLBACKS = [
  "You help others transform and rebuild.",
  "You awaken truth in others through authentic reflection.",
  "You bring adventure, innovation, and new perspectives.",
  "You inspire self-worth and remind others of their light.",
] as const;

export const MOBILE_INTEGRATED_BLUEPRINT_GUIDANCE_FALLBACK =
  "When all four codes are in harmony, you live in alignment with your soul. You transform with purpose, learn with awareness, express with freedom, and return to worth. You are here to live your soul blueprint fully.";

export const MOBILE_INTEGRATED_BLUEPRINT_FINAL_REMINDER_FALLBACK = "You are here for so much more.";
