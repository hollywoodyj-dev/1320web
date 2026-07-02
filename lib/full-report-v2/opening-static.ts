/** Fixed copy for Page 01 — Opening Note + Disclaimer (spec v1.0) */

import type { ReportGlyphName } from "@/components/full-report-v2/report-glyph";

export const OPENING_HOW_TO_USE: ReadonlyArray<{
  icon: ReportGlyphName;
  title: string;
  description: string;
}> = [
  {
    icon: "book",
    title: "Read Slowly",
    description: "Give yourself space to receive each part.",
  },
  {
    icon: "mirror",
    title: "Use as a Mirror",
    description: "This is not about “labels”, but about recognition.",
  },
  {
    icon: "feather",
    title: "Journal & Reflect",
    description: "Write freely. Let insights emerge in your own words.",
  },
  {
    icon: "eye",
    title: "Apply with Awareness",
    description: "Take what resonates. Leave what does not.",
  },
  {
    icon: "cycle",
    title: "Return Often",
    description: "Revisit as you grow. You evolve, so will your reflections.",
  },
];

export const OPENING_GUIDANCE_ROWS: ReadonlyArray<{
  icon: ReportGlyphName;
  title: string;
  copy: string;
}> = [
  {
    icon: "unlock",
    title: "This is a Mirror,\nNot a Sentence",
    copy: "You are not your code. Your code is a reflection of patterns, not a definition of your destiny.",
  },
  {
    icon: "choice",
    title: "You Have\nFree Will",
    copy: "You always have the freedom to choose, to grow, to change, and to create.",
  },
  {
    icon: "sprout",
    title: "Growth is\nNon-Linear",
    copy: "Insights may reveal layers over time. There is no “right pace” — trust your inner timing.",
  },
  {
    icon: "tuningFork",
    title: "Not Everything\nWill Resonate",
    copy: "Take what is true for you now. Leave what is not. Integration happens naturally.",
  },
  {
    icon: "wholeness",
    title: "You Are\nAlready Whole",
    copy: "This report points to potential, not lack. You are not incomplete. You are already whole.",
  },
];

export const OPENING_NOT_LIST: ReadonlyArray<{
  icon: ReportGlyphName;
  text: string;
}> = [
  { icon: "crystalBall", text: "Not a prediction of future events" },
  { icon: "medical", text: "Not medical or psychological advice or diagnosis" },
  { icon: "chat", text: "Not a substitute for therapy or professional support" },
  { icon: "coin", text: "Not financial, tax, business, or investment advice" },
  { icon: "scales", text: "Not legal advice or decision-making authority" },
  { icon: "wand", text: "Not superstition, fortune-telling, or fixed destiny" },
];

export const OPENING_FOOTER_ITEMS: ReadonlyArray<{
  icon: ReportGlyphName;
  content: string;
}> = [
  {
    icon: "mirror",
    content:
      "Use this report as a mirror for awareness, not as a fixed identity or absolute truth.",
  },
  {
    icon: "infinity",
    content: "You are more than any pattern. You are consciousness in motion.",
  },
  {
    icon: "heart",
    content: "Thank you for choosing self-awareness, discernment, and integration.",
  },
];
