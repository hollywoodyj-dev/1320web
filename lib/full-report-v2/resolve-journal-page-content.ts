import { getAdvancedModuleCardImageUrlFromCode } from "@/lib/advanced-module-card-asset";
import {
  JOURNAL_CHECKIN_QUESTIONS,
  JOURNAL_CHECKIN_TITLE,
  JOURNAL_DOODLE_TITLE,
  JOURNAL_FOOTER_MANTRA,
  JOURNAL_GUIDELINES,
  JOURNAL_GUIDELINES_TITLE,
  JOURNAL_GRATEFUL_TITLE,
  JOURNAL_PAGE_HERO,
  JOURNAL_PROMPT_FRAMEWORK,
  JOURNAL_PROMPTS_PANEL_TITLE,
  JOURNAL_QUOTE,
  JOURNAL_REMEMBER_COPY,
  JOURNAL_REMEMBER_TITLE,
  JOURNAL_REMEMBRANCE_ITEMS,
  JOURNAL_REMEMBRANCE_TITLE,
  JOURNAL_SOUL_INSIGHT_PROMPT,
  JOURNAL_SOUL_INSIGHT_TITLE,
  JOURNAL_TODAY_CHOOSE_TITLE,
  JOURNAL_WHY_REFLECTION_COPY,
  JOURNAL_WHY_REFLECTION_TITLE,
} from "@/lib/full-report-v2/journal-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";
import { getSegmentCardImageUrl } from "@/lib/segment-card-asset";

export type JournalPromptCard = {
  codeLabel: string;
  themeTitle: string;
  displayTitle: string;
  icon: string;
  iconUrl?: string;
  iconAlt: string;
  prompt: string;
};

export type JournalPageContent = {
  hero: typeof JOURNAL_PAGE_HERO;
  whyReflectionTitle: string;
  whyReflectionCopy: string;
  guidelinesTitle: string;
  guidelines: string[];
  todayChooseTitle: string;
  gratefulTitle: string;
  promptsPanelTitle: string;
  promptCards: JournalPromptCard[];
  checkinTitle: string;
  checkinQuestions: string[];
  soulInsightTitle: string;
  soulInsightPrompt: string;
  doodleTitle: string;
  rememberTitle: string;
  rememberCopy: string;
  quote: string;
  remembranceTitle: string;
  remembranceItems: string[];
  footerMantra: string[];
};

type ModuleKey = "s1" | "s2" | "s3" | "s4" | "s5" | "s6" | "s7" | "s8" | "s9";

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => asString(item)).filter(Boolean);
}

function slotString(slot: Record<string, unknown>, key: string): string {
  return asString(slot[key]);
}

function moduleSlot(payload: FullReportV2Payload, key: ModuleKey): Record<string, unknown> {
  return payload.modules[key] as Record<string, unknown>;
}

function resolveJournalIconUrl(payload: FullReportV2Payload, moduleKey: ModuleKey): string | undefined {
  const slot = moduleSlot(payload, moduleKey);
  const calc = payload.calculation;

  switch (moduleKey) {
    case "s1":
      return getSegmentCardImageUrl("s1", calc.s1.raw);
    case "s2":
      return getSegmentCardImageUrl("s2", calc.s2.raw);
    case "s3":
      return getSegmentCardImageUrl("s3", calc.s3.raw);
    default: {
      const fromSlot = slotString(slot, "primary_icon_url");
      if (fromSlot) return fromSlot;

      const code = slotString(slot, "code");
      return code ? getAdvancedModuleCardImageUrlFromCode(code) : undefined;
    }
  }
}

function pickModuleReflection(slot: Record<string, unknown>): string {
  return (
    slotString(slot, "reflection") ||
    slotString(slot, "wisewave_reflection") ||
    ""
  );
}

function pickModuleTitle(slot: Record<string, unknown>, fallback: string): string {
  return slotString(slot, "title") || slotString(slot, "archetype") || fallback;
}

export function resolveJournalPageContent(payload: FullReportV2Payload): JournalPageContent {
  const blueprint = payload.integrated_blueprint;
  const blueprintReflections = asStringArray(blueprint.reflection_questions);

  const promptCards: JournalPromptCard[] = JOURNAL_PROMPT_FRAMEWORK.map((frame) => {
    const slot = moduleSlot(payload, frame.moduleKey);
    const archetypeTitle = pickModuleTitle(slot, frame.themeTitle);
    const reflection = pickModuleReflection(slot);
    const code = slotString(slot, "code");

    return {
      codeLabel: frame.codeLabel,
      themeTitle: frame.themeTitle,
      displayTitle: `${frame.codeLabel} · ${archetypeTitle}`,
      icon: frame.fallbackIcon,
      iconUrl: resolveJournalIconUrl(payload, frame.moduleKey),
      iconAlt: `${code} ${archetypeTitle} journal icon`.trim(),
      prompt: reflection || frame.defaultPrompt,
    };
  });

  const checkinQuestions =
    blueprintReflections.length >= 4
      ? blueprintReflections.slice(0, 4)
      : [...JOURNAL_CHECKIN_QUESTIONS];

  return {
    hero: JOURNAL_PAGE_HERO,
    whyReflectionTitle: JOURNAL_WHY_REFLECTION_TITLE,
    whyReflectionCopy: JOURNAL_WHY_REFLECTION_COPY,
    guidelinesTitle: JOURNAL_GUIDELINES_TITLE,
    guidelines: [...JOURNAL_GUIDELINES],
    todayChooseTitle: JOURNAL_TODAY_CHOOSE_TITLE,
    gratefulTitle: JOURNAL_GRATEFUL_TITLE,
    promptsPanelTitle: JOURNAL_PROMPTS_PANEL_TITLE,
    promptCards,
    checkinTitle: JOURNAL_CHECKIN_TITLE,
    checkinQuestions,
    soulInsightTitle: JOURNAL_SOUL_INSIGHT_TITLE,
    soulInsightPrompt: JOURNAL_SOUL_INSIGHT_PROMPT,
    doodleTitle: JOURNAL_DOODLE_TITLE,
    rememberTitle: JOURNAL_REMEMBER_TITLE,
    rememberCopy: JOURNAL_REMEMBER_COPY,
    quote: JOURNAL_QUOTE,
    remembranceTitle: JOURNAL_REMEMBRANCE_TITLE,
    remembranceItems: [...JOURNAL_REMEMBRANCE_ITEMS],
    footerMantra: [...JOURNAL_FOOTER_MANTRA],
  };
}
