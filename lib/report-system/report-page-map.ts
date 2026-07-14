import type { ReportPageDef } from "@/lib/report-system/report-surface";

export const FULL_REPORT_PAGE_MAP = [
  {
    pageId: "cover",
    pageType: "cover",
    title: "Your Soul Blueprint",
  },
  {
    pageId: "blueprint-overview",
    pageType: "overview",
    title: "Blueprint Overview",
  },
  {
    pageId: "s1-origin",
    pageType: "segment",
    segment: "S1",
    title: "S1 · Soul Origin",
  },
  {
    pageId: "s3-vibration",
    pageType: "segment",
    segment: "S3",
    title: "S3 · Soul Vibration",
  },
  {
    pageId: "s2-mirror",
    pageType: "segment",
    segment: "S2",
    title: "S2 · Soul Mirror",
  },
  {
    pageId: "s0-void",
    pageType: "segment",
    segment: "S0",
    title: "S0 · Void Gate",
  },
  {
    pageId: "integrated-foundation",
    pageType: "integration",
    segments: ["S1", "S3", "S2", "S0"],
    title: "Integrated Foundation",
  },
  {
    pageId: "s4-shadow",
    pageType: "segment",
    segment: "S4",
    title: "S4 · Core Shadow Pattern",
  },
  {
    pageId: "s5-mission",
    pageType: "segment",
    segment: "S5",
    title: "S5 · Soul Mission",
  },
  {
    pageId: "s6-value",
    pageType: "segment",
    segment: "S6",
    title: "S6 · Value & Receiving",
  },
  {
    pageId: "s7-sovereignty",
    pageType: "segment",
    segment: "S7",
    title: "S7 · Soul Sovereignty",
  },
  {
    pageId: "s8-contribution",
    pageType: "segment",
    segment: "S8",
    title: "S8 · Soul Contribution",
  },
  {
    pageId: "s9-return",
    pageType: "segment",
    segment: "S9",
    title: "S9 · Return to Source",
  },
  {
    pageId: "seven-day-practice",
    pageType: "practice",
    title: "7-Day Integration Practice",
  },
  {
    pageId: "reflection-journal",
    pageType: "journal",
    title: "Reflection Journal",
  },
  {
    pageId: "closing-reflection",
    pageType: "closing",
    title: "Closing Reflection",
  },
  {
    pageId: "final-disclaimer",
    pageType: "disclaimer",
    title: "Final Disclaimer",
  },
] as const satisfies readonly ReportPageDef[];

export const FULL_REPORT_PAGE_COUNT = FULL_REPORT_PAGE_MAP.length;
