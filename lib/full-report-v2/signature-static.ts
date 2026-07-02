/** Fixed copy for Page 03 — Your Soul Code Signature */

import type { ReportGlyphName } from "@/components/full-report-v2/report-glyph";

export const SIGNATURE_HERO = {
  title: "Your Soul Code Signature",
  subtitleLead: "A symbolic pattern generated from your birth date through the",
  subtitleHighlight: "internal mapping structure",
  subtitleTail: "of the 1320 Soul Origin Code System.",
} as const;

export const SIGNATURE_WHAT_ITEMS = [
  { icon: "✺", text: "A symbolic code signature" },
  { icon: "◉", text: "A mirror for awareness" },
  { icon: "⌂", text: "An entry point into your full report" },
] as const;

export type SignatureCodeCardKey = "s1" | "s3" | "s2" | "s0";

export const SIGNATURE_CODE_CARD_META: Record<
  SignatureCodeCardKey,
  { icon: string; dimension: string; description: string }
> = {
  s1: {
    icon: "♧",
    dimension: "Soul Origin",
    description: "Your core essence",
  },
  s3: {
    icon: "✦",
    dimension: "Soul Vibration",
    description: "How your frequency moves",
  },
  s2: {
    icon: "◌",
    dimension: "Soul Mirror",
    description: "What life and relationships may activate",
  },
  s0: {
    icon: "⌂",
    dimension: "Void Gate",
    description: "The illusion your soul is learning to see through",
  },
};

export const SIGNATURE_EXPLAIN_COPY = [
  "Your code is generated from your birth date, but the purpose of this report is not to reduce you to mathematics.",
  "The code serves as a symbolic mirror for awareness, integration, and conscious choice.",
] as const;

export const SIGNATURE_NEXT_ITEMS: ReadonlyArray<{
  layer: SignatureCodeCardKey;
  icon: string;
  text: string;
}> = [
  { layer: "s1", icon: "♧", text: "You will explore S1 · Soul Origin" },
  { layer: "s3", icon: "✦", text: "Then S3 · Soul Vibration" },
  { layer: "s2", icon: "◌", text: "Then S2 · Soul Mirror" },
  { layer: "s0", icon: "⌂", text: "Then S0 · Void Gate" },
];

export const SIGNATURE_NEXT_NOTE =
  "From there, the report expands into your deeper pattern, mission, value, sovereignty, contribution, and return.";

export const SIGNATURE_FOOTER_ITEMS: ReadonlyArray<{
  icon: ReportGlyphName;
  lines: [string, string];
}> = [
  {
    icon: "mirror",
    lines: ["Your code is a mirror —", "not a sentence."],
  },
  {
    icon: "pattern",
    lines: ["This report does not reveal a fate.", "It reveals a pattern."],
  },
  {
    icon: "eye",
    lines: ["Use it with awareness,", "discernment, and choice."],
  },
];
