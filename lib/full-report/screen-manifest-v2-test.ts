import type { FullReportScreenDef } from "@/lib/full-report/screen-manifest";

/** Placeholder backgrounds until Lumen delivers S7/S8 art. */
const PLACEHOLDER_S7_DIVIDER = "27-s6-divider.png";
const PLACEHOLDER_S7_CONTENT_A = "28-s6-value-receiving-overview.png";
const PLACEHOLDER_S7_CONTENT_B = "29-s6-gifts-shadow-alignment.png";
const PLACEHOLDER_S8_DIVIDER = "30-7-day-integration-practice.png";

/**
 * Minimal v2 content test screens — not the production 37-page manifest.
 * Used by `/sample-report-v2` while the new full-report UI is in design.
 */
export const FULL_REPORT_V2_TEST_SCREENS: FullReportScreenDef[] = [
  {
    id: "v2-s7-divider",
    artPage: 38,
    title: "S7 Soul Sovereignty",
    background: PLACEHOLDER_S7_DIVIDER,
    layout: "divider",
    aspectRatio: "16/9",
    navGroup: "s7",
  },
  {
    id: "v2-s7-essence",
    artPage: 39,
    title: "S7 Sovereignty Essence",
    background: PLACEHOLDER_S7_CONTENT_A,
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s7",
  },
  {
    id: "v2-s7-patterns",
    artPage: 40,
    title: "S7 Reclaim · Power · Fields",
    background: PLACEHOLDER_S7_CONTENT_B,
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s7",
  },
  {
    id: "v2-s7-integration",
    artPage: 41,
    title: "S7 Shadow · Mature Expression",
    background: PLACEHOLDER_S7_CONTENT_A,
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s7",
  },
  {
    id: "v2-s8-divider",
    artPage: 42,
    title: "S8 Soul Contribution",
    background: PLACEHOLDER_S8_DIVIDER,
    layout: "divider",
    aspectRatio: "16/9",
    navGroup: "s8",
  },
];
