import type { ReportAccessLevel, ReportType } from "@/lib/report-system/report-surface";

export const SAMPLE_REPORT_ACCESS = {
  cover: "open",
  "blueprint-overview": "open",
  "s1-origin": "open",
  "s3-vibration": "open",
  "s2-mirror": "open",
  "s0-void": "open",
  "integrated-foundation": "open",
  "s4-shadow": "locked-preview",
  "s5-mission": "locked-preview",
  "s6-value": "locked-preview",
  "s7-sovereignty": "locked-preview",
  "s8-contribution": "locked-preview",
  "s9-return": "locked-preview",
  "seven-day-practice": "locked-preview",
  "reflection-journal": "locked-preview",
  "closing-reflection": "locked-preview",
  "final-disclaimer": "open",
} as const satisfies Record<string, ReportAccessLevel>;

export type SampleReportPageId = keyof typeof SAMPLE_REPORT_ACCESS;

export const LOCKED_PREVIEW_COPY: Record<
  SampleReportPageId,
  { title: string; description: string }
> = {
  cover: { title: "", description: "" },
  "blueprint-overview": { title: "", description: "" },
  "s1-origin": { title: "", description: "" },
  "s3-vibration": { title: "", description: "" },
  "s2-mirror": { title: "", description: "" },
  "s0-void": { title: "", description: "" },
  "integrated-foundation": { title: "", description: "" },
  "s4-shadow": {
    title: "S4 · Core Shadow Pattern",
    description:
      "Explore the protective pattern that once kept you safe — and how it may limit connection today.",
  },
  "s5-mission": {
    title: "S5 · Soul Mission",
    description:
      "Reconnect with directional themes for contribution — symbolic orientation, not a fixed career command.",
  },
  "s6-value": {
    title: "S6 · Value & Receiving",
    description:
      "Understand how you relate to worth, support, and receiving — without money or wealth framing.",
  },
  "s7-sovereignty": {
    title: "S7 · Soul Sovereignty",
    description:
      "Strengthen boundaries, choice, and self-authority through qualitative integration and lived discernment.",
  },
  "s8-contribution": {
    title: "S8 · Soul Contribution",
    description:
      "See how your blueprint may express through contribution — not a measure of public success.",
  },
  "s9-return": {
    title: "S9 · Return to Source",
    description:
      "Return-path reflection and remembrance — not a claim of spiritual superiority or final attainment.",
  },
  "seven-day-practice": {
    title: "7-Day Integration Practice",
    description:
      "Seven guided daily themes to integrate your full S0–S9 Soul Blueprint through reflection and action.",
  },
  "reflection-journal": {
    title: "Reflection Journal",
    description:
      "Journal prompts and practices that support awareness before action across your complete blueprint.",
  },
  "closing-reflection": {
    title: "Closing Reflection",
    description:
      "Integration reminders and closing reflection to help you embody what you have recognized.",
  },
  "final-disclaimer": { title: "", description: "" },
};

export function resolvePageAccess(
  reportType: ReportType,
  pageId: string,
): ReportAccessLevel {
  if (reportType === "full") return "open";
  return SAMPLE_REPORT_ACCESS[pageId as SampleReportPageId] ?? "open";
}
