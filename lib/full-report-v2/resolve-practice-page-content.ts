import { getAdvancedModuleCardImageUrlFromCode } from "@/lib/advanced-module-card-asset";
import {
  PRACTICE_DAY_FRAMEWORK,
  PRACTICE_DAILY_REMINDERS,
  PRACTICE_FINAL_REMEMBRANCE,
  PRACTICE_INTEGRATION_GUIDELINES,
  PRACTICE_INTEGRATION_QUOTE,
  PRACTICE_INTEGRATION_TIP_DEFAULT,
  PRACTICE_INTEGRATION_TIP_TITLE,
  PRACTICE_JOURNAL_INTRO,
  PRACTICE_JOURNAL_PROMPTS,
  PRACTICE_KEY_INSIGHT_DEFAULT,
  PRACTICE_KEY_INSIGHT_TITLE,
  PRACTICE_OPENING_REMINDER,
  PRACTICE_PAGE_HERO,
  PRACTICE_PURPOSE_COPY,
  PRACTICE_PURPOSE_TITLE,
  PRACTICE_REPEAT_NOTE,
  PRACTICE_SUPPORTS_YOU_DEFAULT,
  PRACTICE_SUPPORTS_YOU_TITLE,
} from "@/lib/full-report-v2/practice-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";
import { sanitizeCustomerFacingCopy } from "@/lib/report/customer-facing-copy";
import { getSegmentCardImageUrl } from "@/lib/segment-card-asset";

export type PracticeDayContent = {
  dayNumber: number;
  codeLabel: string;
  themeTitle: string;
  icon: string;
  iconUrl?: string;
  iconAlt: string;
  focus: string;
  practice: string;
  reflection: string;
};

export type PracticePageContent = {
  hero: typeof PRACTICE_PAGE_HERO;
  purposeTitle: string;
  purpose: string;
  openingReminder: string;
  days: PracticeDayContent[];
  repeatNote: string;
  reminders: string[];
  guidelines: string[];
  journalIntro: string;
  journalPrompts: string[];
  integrationQuote: string;
  supportsYouTitle: string;
  supportsYou: string;
  integrationTipTitle: string;
  integrationTip: string;
  keyInsightTitle: string;
  keyInsight: string;
  finalRemembrance: string;
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

function firstSentence(text: string): string {
  const match = text.match(/^[\s\S]*?[.!?](?:\s|$)/);
  return match ? match[0].trim() : text.trim();
}

function combineParts(parts: string[], separator = " · "): string {
  return parts.filter(Boolean).join(separator);
}

function moduleSlot(payload: FullReportV2Payload, key: ModuleKey): Record<string, unknown> {
  return payload.modules[key] as Record<string, unknown>;
}

function resolvePracticeDayIconUrl(
  payload: FullReportV2Payload,
  moduleKey: ModuleKey,
): string | undefined {
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

function pickFocus(slot: Record<string, unknown>, keys: string[], fallback: string): string {
  for (const key of keys) {
    const value = slotString(slot, key);
    if (value) return sanitizeCustomerFacingCopy(firstSentence(value));
  }
  return fallback;
}

function pickPractice(slot: Record<string, unknown>, keys: string[], fallback: string): string {
  for (const key of keys) {
    const value = slotString(slot, key);
    if (value) return sanitizeCustomerFacingCopy(firstSentence(value));
  }
  return fallback;
}

function pickReflection(slot: Record<string, unknown>, keys: string[], fallback: string): string {
  for (const key of keys) {
    const value = slotString(slot, key);
    if (value) {
      const text = value.endsWith("?") ? value : firstSentence(value);
      return sanitizeCustomerFacingCopy(text);
    }
  }
  return fallback;
}

function dayContentForModule(
  slot: Record<string, unknown>,
  themeTitle: string,
  focusKeys: string[],
  practiceKeys: string[],
  reflectionKeys: string[],
): { focus: string; practice: string; reflection: string } {
  return {
    focus: pickFocus(slot, focusKeys, `Connect with the essence of your ${themeTitle.toLowerCase()}.`),
    practice: pickPractice(
      slot,
      practiceKeys,
      "Take one small aligned action that honors this code today.",
    ),
    reflection: pickReflection(
      slot,
      reflectionKeys,
      "What is this code inviting me to notice right now?",
    ),
  };
}

function resolveDayFields(
  payload: FullReportV2Payload,
  moduleKeys: readonly ModuleKey[],
  themeTitle: string,
): { focus: string; practice: string; reflection: string } {
  if (moduleKeys.length === 1) {
    const key = moduleKeys[0];
    const slot = moduleSlot(payload, key);
    switch (key) {
      case "s1":
        return dayContentForModule(
          slot,
          themeTitle,
          ["essence", "aligned_expression"],
          ["integration_key", "integration_advice", "energy_expression"],
          ["reflection"],
        );
      case "s2":
        return dayContentForModule(
          slot,
          themeTitle,
          ["core_lesson", "lesson", "essence"],
          ["healing_path", "boundary_lesson", "integration_key"],
          ["reflection"],
        );
      case "s3":
        return dayContentForModule(
          slot,
          themeTitle,
          ["essence", "energy_expression"],
          ["integration_key", "integration_advice"],
          ["reflection"],
        );
      case "s4":
        return {
          focus: pickFocus(
            slot,
            ["emotional_trigger", "core_loop", "essence"],
            "Notice the pattern without judging it.",
          ),
          practice: pickPractice(
            slot,
            ["healing_path", "boundary_lesson", "integration_key"],
            "Name one pattern gently and choose a kinder response.",
          ),
          reflection: pickReflection(
            slot,
            ["reflection"],
            "What is this pattern trying to teach me?",
          ),
        };
      case "s5":
        return dayContentForModule(
          slot,
          themeTitle,
          ["mission_essence", "essence"],
          ["mature_expression", "integration_key", "wisewave_guidance"],
          ["reflection", "wisewave_reflection"],
        );
      default:
        return dayContentForModule(slot, themeTitle, ["essence"], ["integration_key"], ["reflection"]);
    }
  }

  const focusByModule: Record<ModuleKey, string[]> = {
    s1: ["essence", "aligned_expression"],
    s2: ["core_lesson", "lesson", "essence"],
    s3: ["essence", "energy_expression"],
    s4: ["emotional_trigger", "core_loop", "essence"],
    s5: ["mission_essence", "essence"],
    s6: ["value_essence", "essence"],
    s7: ["sovereignty_essence", "essence"],
    s8: ["contribution_essence", "essence"],
    s9: ["return_essence", "essence"],
  };

  const practiceByModule: Record<ModuleKey, string[]> = {
    s1: ["integration_key", "integration_advice", "energy_expression"],
    s2: ["healing_path", "boundary_lesson", "integration_key"],
    s3: ["integration_key", "integration_advice"],
    s4: ["healing_path", "boundary_lesson", "integration_key"],
    s5: ["mature_expression", "integration_key", "wisewave_guidance"],
    s6: ["mature_receiving_expression", "integration_key", "wisewave_guidance"],
    s7: ["mature_sovereignty_expression", "integration_key", "wisewave_guidance"],
    s8: ["mature_contribution_expression", "integration_key", "wisewave_guidance"],
    s9: ["mature_return_expression", "integration_key", "wisewave_guidance"],
  };

  const reflectionByModule: Record<ModuleKey, string[]> = {
    s1: ["reflection"],
    s2: ["reflection"],
    s3: ["reflection"],
    s4: ["reflection"],
    s5: ["reflection", "wisewave_reflection"],
    s6: ["reflection", "wisewave_reflection"],
    s7: ["reflection", "wisewave_reflection"],
    s8: ["reflection", "wisewave_reflection"],
    s9: ["reflection", "wisewave_reflection"],
  };

  const focus = combineParts(
    moduleKeys.map((key) =>
      pickFocus(moduleSlot(payload, key), focusByModule[key], ""),
    ),
  );
  const practice = combineParts(
    moduleKeys.map((key) =>
      pickPractice(moduleSlot(payload, key), practiceByModule[key], ""),
    ),
  );
  const reflection = combineParts(
    moduleKeys.map((key) =>
      pickReflection(moduleSlot(payload, key), reflectionByModule[key], ""),
    ),
    " ",
  );

  return {
    focus: focus || `Integrate the themes of ${themeTitle.toLowerCase()}.`,
    practice:
      practice || "Let both codes inform one honest choice you make today.",
    reflection:
      reflection || "How are these codes asking to work together in my life?",
  };
}

export function resolvePracticePageContent(payload: FullReportV2Payload): PracticePageContent {
  const blueprint = payload.integrated_blueprint;
  const blueprintReflections = asStringArray(blueprint.reflection_questions);

  const days: PracticeDayContent[] = PRACTICE_DAY_FRAMEWORK.map((frame) => {
    const primaryKey = frame.moduleKeys[0];
    const primarySlot = moduleSlot(payload, primaryKey);
    const { focus, practice, reflection } = resolveDayFields(
      payload,
      frame.moduleKeys,
      frame.themeTitle,
    );
    const iconUrl = resolvePracticeDayIconUrl(payload, primaryKey);
    const code = slotString(primarySlot, "code");
    const title = slotString(primarySlot, "title") || slotString(primarySlot, "archetype");

    return {
      dayNumber: frame.day,
      codeLabel: frame.codeLabel,
      themeTitle: frame.themeTitle,
      icon: frame.fallbackIcon,
      iconUrl,
      iconAlt: `${code} ${title} practice icon`.trim(),
      focus,
      practice,
      reflection,
    };
  });

  const journalPrompts =
    blueprintReflections.length >= 3
      ? blueprintReflections.slice(0, 3)
      : [...PRACTICE_JOURNAL_PROMPTS];

  return {
    hero: PRACTICE_PAGE_HERO,
    purposeTitle: PRACTICE_PURPOSE_TITLE,
    purpose: PRACTICE_PURPOSE_COPY,
    openingReminder: PRACTICE_OPENING_REMINDER,
    days,
    repeatNote: PRACTICE_REPEAT_NOTE,
    reminders: [...PRACTICE_DAILY_REMINDERS],
    guidelines: [...PRACTICE_INTEGRATION_GUIDELINES],
    journalIntro: PRACTICE_JOURNAL_INTRO,
    journalPrompts,
    integrationQuote: PRACTICE_INTEGRATION_QUOTE,
    supportsYouTitle: PRACTICE_SUPPORTS_YOU_TITLE,
    supportsYou: sanitizeCustomerFacingCopy(
      asString(blueprint.integration_guidance) ||
        asString(blueprint.integrated_pattern) ||
        PRACTICE_SUPPORTS_YOU_DEFAULT,
    ),
    integrationTipTitle: PRACTICE_INTEGRATION_TIP_TITLE,
    integrationTip: sanitizeCustomerFacingCopy(
      asString(blueprint.embodiment_practice) || PRACTICE_INTEGRATION_TIP_DEFAULT,
    ),
    keyInsightTitle: PRACTICE_KEY_INSIGHT_TITLE,
    keyInsight: PRACTICE_KEY_INSIGHT_DEFAULT,
    finalRemembrance:
      asString(blueprint.final_remembrance) || PRACTICE_FINAL_REMEMBRANCE,
  };
}
