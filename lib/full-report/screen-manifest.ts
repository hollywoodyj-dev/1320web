import { fullReportBackgroundSrc } from "@/lib/full-report/backgrounds";

/** Where dynamic copy sits relative to the art safe zones. */
export type FullReportLayout =
  | "cover"
  | "divider"
  | "content-left"
  | "content-center"
  | "dashboard"
  | "portrait"
  | "practice"
  | "closing";

export type FullReportNavGroup =
  | "intro"
  | "s1"
  | "s3"
  | "s2"
  | "s0"
  | "s4"
  | "integrated"
  | "s5"
  | "s6"
  | "s7"
  | "s8"
  | "s9"
  | "practice"
  | "close";

export type FullReportScreenDef = {
  id: string;
  /** Original art pack page number (01-37). */
  artPage: number;
  title: string;
  background: string;
  layout: FullReportLayout;
  aspectRatio: "16/9" | "4/3";
  navGroup: FullReportNavGroup;
};

export function screenScrim(layout: FullReportLayout): "none" | "left" | "light" {
  if (layout === "divider" || layout === "cover" || layout === "dashboard") return "none";
  if (layout === "content-left" || layout === "practice") return "left";
  return "light";
}

export const FULL_REPORT_SCREENS: FullReportScreenDef[] = [
  {
    id: "cover",
    artPage: 1,
    title: "Cover",
    background: "01-cover.png",
    layout: "cover",
    aspectRatio: "16/9",
    navGroup: "intro",
  },
  {
    id: "dashboard",
    artPage: 2,
    title: "Dashboard",
    background: "02-dashboard.png",
    layout: "dashboard",
    aspectRatio: "16/9",
    navGroup: "intro",
  },
  {
    id: "how-to-read",
    artPage: 3,
    title: "How to Read",
    background: "03-how-to-read.png",
    layout: "portrait",
    aspectRatio: "4/3",
    navGroup: "intro",
  },
  {
    id: "soul-archetype",
    artPage: 4,
    title: "Soul Archetype",
    background: "04-soul-archetype.png",
    layout: "content-center",
    aspectRatio: "16/9",
    navGroup: "intro",
  },
  {
    id: "s1-divider",
    artPage: 5,
    title: "S1 Soul Frequency",
    background: "05-s1-divide.png",
    layout: "divider",
    aspectRatio: "16/9",
    navGroup: "s1",
  },
  {
    id: "s1-content",
    artPage: 6,
    title: "Soul Frequency S1",
    background: "06-s1-content.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s1",
  },
  {
    id: "s1-overflow",
    artPage: 7,
    title: "Soul Frequency S1",
    background: "07-s1-overflow.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s1",
  },
  {
    id: "s3-divider",
    artPage: 8,
    title: "S3 Vibration Tier",
    background: "08-s3-divider-v2.png",
    layout: "divider",
    aspectRatio: "16/9",
    navGroup: "s3",
  },
  {
    id: "s3-content",
    artPage: 9,
    title: "S3 Overview",
    background: "08-s3-content.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s3",
  },
  {
    id: "s2-divider",
    artPage: 10,
    title: "S2 Mirror Path",
    background: "09-s2-divider-v2.png",
    layout: "divider",
    aspectRatio: "16/9",
    navGroup: "s2",
  },
  {
    id: "s2-content",
    artPage: 11,
    title: "S2 Overview",
    background: "10-s2-content.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s2",
  },
  {
    id: "s2-gifts",
    artPage: 12,
    title: "S2 Relationship Gifts",
    background: "11-s2-gifts-relationship-gifts.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s2",
  },
  {
    id: "s2-lessons",
    artPage: 13,
    title: "S2 Relationship Lessons",
    background: "12-s2-lessons-relationship-lessons.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s2",
  },
  {
    id: "s2-alignment",
    artPage: 14,
    title: "S2 Relationship Alignment",
    background: "13-s2-alignment-relationship-alignment.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s2",
  },
  {
    id: "s0-divider",
    artPage: 15,
    title: "S0 Void Gate",
    background: "14-s0-divide.png",
    layout: "divider",
    aspectRatio: "16/9",
    navGroup: "s0",
  },
  {
    id: "s0-overview",
    artPage: 16,
    title: "S0 Overview",
    background: "15-s0-overview.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s0",
  },
  {
    id: "s0-shadow",
    artPage: 17,
    title: "S0 Shadow Pattern",
    background: "16-s0-shadow-pattern.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s0",
  },
  {
    id: "s0-healing",
    artPage: 18,
    title: "S0 Healing Path",
    background: "17-s0-healing-path.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s0",
  },
  {
    id: "s4-divider",
    artPage: 19,
    title: "S4 Core Shadow Pattern",
    background: "18-s4-core-shadow-pattern-divide.png",
    layout: "divider",
    aspectRatio: "16/9",
    navGroup: "s4",
  },
  {
    id: "s4-content",
    artPage: 20,
    title: "S4 Core Shadow Pattern",
    background: "19-s4-core-shadow-pattern.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s4",
  },
  {
    id: "integrated-divider",
    artPage: 21,
    title: "Integrated Soul Blueprint",
    background: "20-integrated-soul-blueprint-divide.png",
    layout: "divider",
    aspectRatio: "16/9",
    navGroup: "integrated",
  },
  {
    id: "integrated-overview",
    artPage: 22,
    title: "Integrated Overview",
    background: "21-integrated-soul-blueprint-overview.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "integrated",
  },
  {
    id: "integrated-pattern",
    artPage: 23,
    title: "Pattern in Action",
    background: "22-integrated-pattern-in-action.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "integrated",
  },
  {
    id: "s5-divider",
    artPage: 24,
    title: "S5 Soul Mission",
    background: "23-s5-divider.png",
    layout: "divider",
    aspectRatio: "16/9",
    navGroup: "s5",
  },
  {
    id: "s5-overview",
    artPage: 25,
    title: "S5 Mission Overview",
    background: "24-s5-mission-overview.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s5",
  },
  {
    id: "s5-roadmap",
    artPage: 26,
    title: "S5 Mission Roadmap",
    background: "25-s5-mission-roadmap.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s5",
  },
  {
    id: "s5-guidance",
    artPage: 27,
    title: "S5 Mission Guidance",
    background: "26-s5-mission-guidance.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s5",
  },
  {
    id: "s6-divider",
    artPage: 28,
    title: "S6 Value & Receiving",
    background: "27-s6-divider.png",
    layout: "divider",
    aspectRatio: "16/9",
    navGroup: "s6",
  },
  {
    id: "s6-overview",
    artPage: 29,
    title: "S6 Overview",
    background: "28-s6-value-receiving-overview.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s6",
  },
  {
    id: "s6-alignment",
    artPage: 30,
    title: "S6 Gifts · Shadow · Alignment",
    background: "29-s6-gifts-shadow-alignment.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "s6",
  },
  {
    id: "practice-divider",
    artPage: 31,
    title: "7-Day Integration",
    background: "30-7-day-integration-practice.png",
    layout: "divider",
    aspectRatio: "16/9",
    navGroup: "practice",
  },
  {
    id: "practice-overview",
    artPage: 32,
    title: "7-Day Practice Overview",
    background: "31-7-day-practice-overview.png",
    layout: "content-left",
    aspectRatio: "16/9",
    navGroup: "practice",
  },
  {
    id: "practice-days-1-3",
    artPage: 33,
    title: "Days 1–3",
    background: "32-day-1-3-practice.png",
    layout: "practice",
    aspectRatio: "16/9",
    navGroup: "practice",
  },
  {
    id: "practice-days-4-7",
    artPage: 34,
    title: "Days 4–7",
    background: "33-day-4-7-practice.png",
    layout: "practice",
    aspectRatio: "16/9",
    navGroup: "practice",
  },
  {
    id: "three-actions",
    artPage: 35,
    title: "Three Actions to Begin",
    background: "34-three-actions-to-begin.png",
    layout: "content-center",
    aspectRatio: "16/9",
    navGroup: "practice",
  },
  {
    id: "closing",
    artPage: 36,
    title: "Closing Reflection",
    background: "35-closing-reflection.png",
    layout: "closing",
    aspectRatio: "16/9",
    navGroup: "close",
  },
  {
    id: "thank-you",
    artPage: 37,
    title: "Thank You",
    background: "36-thank-you-final-seal.png",
    layout: "cover",
    aspectRatio: "16/9",
    navGroup: "close",
  },
];

export const FULL_REPORT_ATTRIBUTION = "Prepared by 1320 Soul Origin Code System";

export function screenBackgroundUrl(
  screen: FullReportScreenDef,
  variant: "desktop" | "mobile" = "desktop",
): string {
  return fullReportBackgroundSrc(screen.background, variant);
}

export const FULL_REPORT_NAV_GROUPS: { id: FullReportNavGroup; label: string }[] = [
  { id: "intro", label: "Intro" },
  { id: "s1", label: "S1" },
  { id: "s3", label: "S3" },
  { id: "s2", label: "S2" },
  { id: "s0", label: "S0" },
  { id: "s4", label: "S4" },
  { id: "integrated", label: "Blueprint" },
  { id: "s5", label: "S5" },
  { id: "s6", label: "S6" },
  { id: "practice", label: "7-Day" },
  { id: "close", label: "Close" },
];
