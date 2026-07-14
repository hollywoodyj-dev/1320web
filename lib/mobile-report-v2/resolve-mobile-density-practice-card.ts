import type { MobileReportPracticeCardAccent } from "@/components/mobile-report-v2/density";
import type { Mobile7DipDay } from "@/lib/mobile-report-v2/resolve-mobile-seven-day-integration-practice-overview-content";

const ACCENT_BY_LABEL: Record<string, MobileReportPracticeCardAccent> = {
  S1: "origin",
  S3: "expression",
  S2: "mirror",
  S0: "void",
  S4: "shadow",
  S5: "mission",
  S6: "value",
  S7: "sovereignty",
  S8: "contribution",
  S9: "return",
};

export function resolvePracticeCardAccent(day: Mobile7DipDay): MobileReportPracticeCardAccent {
  const primary = day.codes[0]?.label ?? "S1";
  return ACCENT_BY_LABEL[primary] ?? "origin";
}

export function resolvePracticeCardTitle(day: Mobile7DipDay): string {
  if (day.codes.length === 1) {
    const code = day.codes[0];
    return `${code.label} · ${code.title}`;
  }

  return day.codes.map((code) => code.label).join(" · ");
}

export function resolvePracticeCardSubtitle(day: Mobile7DipDay): string {
  return day.focus.trim() || day.copy.trim();
}
