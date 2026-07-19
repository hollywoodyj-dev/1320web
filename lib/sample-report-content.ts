/** Sample Report Viewer (`/full-report-v2`) — Page 09 + Page 10 Wisewave refinements. */

import type { ReportSegmentView } from "@/lib/report-system/report-surface";

export const SAMPLE_REPORT_META = {
  title: "Sample Soul Blueprint Report | 1320 Soul Code",
  description:
    "Explore the structure, tone, and depth of a 1320 Full Report — a guided preview of selected S0–S9 Soul Blueprint pages. Not your personal full report.",
};

/** Quiet close for immersive sample shell (no marketing footer). */
export const SAMPLE_REPORT_MANTRA = "YOUR BLUEPRINT IS A MIRROR — NOT A FIXED IDENTITY.";

export const SAMPLE_REPORT_INTRO = {
  eyebrow: "Sample Report · Preview Mode",
  title: "Sample Soul Blueprint Report",
  body: "Explore the structure, tone, and depth of a 1320 Full Report.",
  note: "This preview shows selected pages from the complete S0–S9 Soul Blueprint experience.",
  boundary:
    "This is a sample preview. Your personal report will be generated from your own birth date.",
  primaryCta: "Unlock My Full Report",
  primaryHref: "/full-report",
  secondaryCta: "Generate My Code",
  secondaryHref: "/your-code",
};

/** Mobile sample shell only — web sample viewer uses intro + sticky nav instead. */
export const SAMPLE_REPORT_BANNER =
  "Sample Report · Preview Mode — foundation layers are open; advanced layers remain locked in the Full Report.";

export const SAMPLE_COVER = {
  eyebrow: "Sample Report",
  title: "Your Soul Blueprint",
  description: "A preview of the 1320 Full Soul Blueprint experience.",
  boundary: "This is a symbolic mirror for reflection, not prediction or fixed identity.",
};

export const SAMPLE_FOUNDATION = {
  eyebrow: "Blueprint Overview",
  title: "Four Foundation Layers",
  description: "Your Full Report begins with four foundation mirrors:",
  layers: [
    { code: "S1", title: "Soul Origin", text: "Who you are beneath adaptation." },
    { code: "S3", title: "Soul Vibration", text: "How your essence expresses." },
    { code: "S2", title: "Soul Mirror", text: "What relationships reflect back." },
    { code: "S0", title: "Void Gate", text: "How you meet uncertainty and return to self." },
  ],
};

/** Sticky reading nav — ids match report page / chapter anchors. */
export const SAMPLE_NAV = [
  { id: "cover", label: "Cover", short: "Cover" },
  { id: "blueprint-overview", label: "Foundation", short: "Found." },
  { id: "s1-origin", label: "S1", short: "S1" },
  { id: "s3-vibration", label: "S3", short: "S3" },
  { id: "s2-mirror", label: "S2", short: "S2" },
  { id: "s0-void", label: "S0", short: "S0" },
  { id: "integrated-foundation", label: "Mirror", short: "Mirror" },
  { id: "locked", label: "Locked", short: "Locked" },
  { id: "final-disclaimer", label: "Reflection", short: "Reflect" },
] as const;

export const SAMPLE_CHAPTERS = [
  {
    id: "chapter-opening",
    label: "Chapter 01 · Opening",
    pageIds: ["cover", "blueprint-overview"],
  },
  {
    id: "chapter-foundation",
    label: "Chapter 02 · Foundation Preview",
    pageIds: ["s1-origin", "s3-vibration", "s2-mirror", "s0-void"],
  },
  {
    id: "chapter-mirror",
    label: "Chapter 03 · Integrated Mirror",
    pageIds: ["integrated-foundation"],
  },
  {
    id: "chapter-locked",
    label: "Chapter 04 · Full Report Preview",
    pageIds: ["locked"],
  },
  {
    id: "chapter-closing",
    label: "Chapter 05 · Closing Boundary",
    pageIds: ["final-disclaimer"],
  },
] as const;

/** Pages collapsed into the compact locked preview chapter (sample web). */
export const SAMPLE_LOCKED_PAGE_IDS = [
  "s4-shadow",
  "s5-mission",
  "s6-value",
  "s7-sovereignty",
  "s8-contribution",
  "s9-return",
  "seven-day-practice",
  "reflection-journal",
  "closing-reflection",
] as const;

export const SAMPLE_LOCKED_ITEMS = [
  { title: "S4 · Core Shadow Pattern" },
  { title: "S5 · Soul Mission" },
  { title: "S6 · Value & Receiving" },
  { title: "S7 · Soul Sovereignty" },
  { title: "S8 · Soul Contribution" },
  { title: "S9 · Return to Source" },
  { title: "7-Day Integration Practice" },
  { title: "Reflection Journal" },
] as const;

export const SAMPLE_LOCKED_SECTION = {
  eyebrow: "Available in the Full Report",
  title: "Full Report Preview",
  body: "Advanced layers and integration practices open when you unlock your complete Soul Blueprint.",
  cta: "Unlock Full Report",
  href: "/full-report",
};

export const SAMPLE_SEGMENT_PREVIEW = {
  S1: [
    { key: "opening_essence", title: "Core Essence" },
    { key: "core_gift", title: "Core Gift" },
    { key: "growth_edge", title: "Growth Edge" },
    { key: "wisewave_reflection", title: "Reflection Prompt" },
  ],
  S3: [
    { key: "opening_essence", title: "Expression Style" },
    { key: "core_gift", title: "Natural Movement" },
    { key: "growth_edge", title: "Growth Edge" },
    { key: "wisewave_reflection", title: "Reflection Prompt" },
  ],
  S2: [
    { key: "opening_essence", title: "Relational Mirror" },
    { key: "how_this_may_show_up", title: "Repeating Pattern" },
    { key: "growth_edge", title: "Growth Edge" },
    { key: "wisewave_reflection", title: "Reflection Prompt" },
  ],
  S0: [
    { key: "opening_essence", title: "Void Pattern" },
    { key: "growth_edge", title: "Inner Challenge" },
    { key: "integration_key", title: "Integration Key" },
    { key: "wisewave_reflection", title: "Reflection Prompt" },
  ],
} as const;

export const SAMPLE_FINAL = {
  title: "Ready to open your own Soul Blueprint?",
  body: "Generate your personal code, or unlock the complete S0–S9 Full Report.",
  primaryCta: "Generate My Code",
  primaryHref: "/your-code",
  secondaryCta: "Unlock Full Report",
  secondaryHref: "/full-report",
};

export const SAMPLE_CLOSING_BOUNDARY = {
  title: "Reflection, Not Instruction",
  lines: [
    "1320 is a symbolic mirror for self-awareness and integration.",
    "It does not predict your future, diagnose your condition, define your identity, or replace professional support.",
    "You remain the authority of your life.",
  ],
};

export function truncateSamplePreviewText(text: string, maxWords = 48): string {
  const cleaned = text.trim();
  if (!cleaned) return "";
  const sentences = cleaned
    .split(/(?<=[.!?。！？])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const picked = sentences.slice(0, 2);
  const joined = picked.length ? picked.join(" ") : cleaned;
  const words = joined.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) {
    return /[.!?…。！？]$/.test(joined) ? joined : `${joined}.`;
  }
  return `${words.slice(0, maxWords).join(" ")}…`;
}

export function sampleSegmentUnlockLabel(code: keyof typeof SAMPLE_SEGMENT_PREVIEW): string {
  return `Unlock Full ${code} Segment`;
}

export function listSamplePreviewInsightCards(segment: ReportSegmentView): Array<{
  key: string;
  kicker: string;
  title: string;
  body: string;
}> {
  const keys = SAMPLE_SEGMENT_PREVIEW[segment.code as keyof typeof SAMPLE_SEGMENT_PREVIEW];
  if (!keys) return [];

  return keys
    .map((item) => {
      const raw = segment.commercialBlocks[item.key]?.trim() ?? "";
      if (!raw) return null;
      const maxWords = item.title === "Reflection Prompt" ? 36 : 48;
      return {
        key: item.key,
        kicker: `${segment.code} · Preview`,
        title: item.title,
        body: truncateSamplePreviewText(raw, maxWords),
      };
    })
    .filter((card): card is NonNullable<typeof card> => Boolean(card));
}

export function isSampleLockedPageId(pageId: string): boolean {
  return (SAMPLE_LOCKED_PAGE_IDS as readonly string[]).includes(pageId);
}
