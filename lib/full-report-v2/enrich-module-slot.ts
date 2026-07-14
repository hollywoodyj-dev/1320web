import type { LocalizedText, SegmentContent } from "@/lib/types/1320-content";
import type { SoulMissionSection } from "@/lib/types/s5-soul-mission";
import { resolveS4PrimaryIconAsset } from "@/lib/full-report-v2/s4-icon-registry";
import { resolveS5PrimaryIconAsset } from "@/lib/full-report-v2/s5-icon-registry";
import { resolveS6PrimaryIconAsset } from "@/lib/full-report-v2/s6-icon-registry";
import { resolveS7PrimaryIconAsset } from "@/lib/full-report-v2/s7-icon-registry";
import { resolveS8PrimaryIconAsset } from "@/lib/full-report-v2/s8-icon-registry";
import { resolveS9PrimaryIconAsset } from "@/lib/full-report-v2/s9-icon-registry";

function line(text?: LocalizedText): string {
  return text?.en?.trim() ?? "";
}

function lines(items?: LocalizedText[]): string[] {
  return items?.map((item) => item.en?.trim()).filter(Boolean) ?? [];
}

/** Split steward comma / semicolon / "and" lists into bullet lines. */
function splitListText(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  return trimmed
    .split(/\s*[,;]\s*|\s+and\s+/i)
    .map((part) => part.replace(/^and\s+/i, "").trim())
    .filter(Boolean);
}

/** Split karmic loop arrows into pattern steps for S2 shadow/repeating display. */
function splitKarmicLoop(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  return trimmed
    .split(/\s*(?:→|->)\s*/)
    .map((part) => part.replace(/\.$/, "").trim())
    .filter(Boolean);
}

function stripIntegrationPrefix(text: string): string {
  return text.replace(/^The integration begins through:\s*/i, "").trim();
}

function s4SectionBody(sections: SoulMissionSection[] | undefined, key: string): string {
  return moduleSectionBody(sections, "S4", key);
}

function s4SectionLabel(sections: SoulMissionSection[] | undefined, key: string): string {
  return moduleSectionLabel(sections, "S4", key);
}

function moduleSectionBody(
  sections: SoulMissionSection[] | undefined,
  modulePrefix: string,
  key: string,
): string {
  if (!sections) return "";
  const match = sections.find(
    (section) =>
      section.id === `${modulePrefix}-${key}` ||
      section.id === `${modulePrefix}-commercial-${key}`,
  );
  return match?.body.en?.trim() ?? "";
}

function moduleSectionLabel(
  sections: SoulMissionSection[] | undefined,
  modulePrefix: string,
  key: string,
): string {
  if (!sections) return "";
  const match = sections.find(
    (section) =>
      section.id === `${modulePrefix}-${key}` ||
      section.id === `${modulePrefix}-commercial-${key}`,
  );
  return match?.label.en?.trim() ?? "";
}

function s5SectionBody(sections: SoulMissionSection[] | undefined, key: string): string {
  return moduleSectionBody(sections, "S5", key);
}

function s6SectionBody(sections: SoulMissionSection[] | undefined, key: string): string {
  return moduleSectionBody(sections, "S6", key);
}

function s7SectionBody(sections: SoulMissionSection[] | undefined, key: string): string {
  return moduleSectionBody(sections, "S7", key);
}

function s8SectionBody(sections: SoulMissionSection[] | undefined, key: string): string {
  return moduleSectionBody(sections, "S8", key);
}

function s9SectionBody(sections: SoulMissionSection[] | undefined, key: string): string {
  return moduleSectionBody(sections, "S9", key);
}

function parseBulletBody(text: string): string[] {
  if (!text) return [];
  return text
    .split(/\n/)
    .map((line) => line.replace(/^•\s*/, "").trim())
    .filter(Boolean);
}

/** Maps canonical segment content into full-report v2 module slot fields. */
export function enrichModuleFromSegment(
  segment: SegmentContent | null | undefined,
  code: string,
  extra?: Record<string, unknown>,
): Record<string, unknown> {
  if (!segment) return { code, ...extra };

  const traitLines = lines(segment.soulTraits);
  const vibrationTraitsText = line(segment.vibrationTraits);
  const strengthText =
    line(segment.strengthSummary) || line(segment.expressionPattern);
  const challengesText =
    line(segment.challenges) || line(segment.growthEdge);
  const essenceText = line(segment.fullEssence ?? segment.freeEssence);
  const integrationAdvice =
    line(segment.integrationKey) || line(segment.integrationPrompt);
  const guidance = line(segment.guidance);
  const mirrorLesson = line(segment.mirrorLesson) || line(segment.lesson);
  const relationshipDynamic = line(segment.relationshipPattern);
  const karmicLoop = line(segment.karmicLoop);
  const healingPath = line(segment.integrationPrompt);
  const integrationKeyRaw = line(segment.integrationKey);
  const coreIllusion = line(segment.coreIllusion);
  const voidChallenge = line(segment.voidChallenge);
  const voidPower = line(segment.voidPower);
  const pathOfReturn = line(segment.awakeningPath) || line(segment.practice);

  const soulTraits =
    traitLines.length > 0
      ? traitLines
      : vibrationTraitsText
        ? splitListText(vibrationTraitsText).length > 1
          ? splitListText(vibrationTraitsText)
          : [vibrationTraitsText]
        : essenceText
          ? [essenceText]
          : [];

  const coreGifts =
    lines(segment.coreGifts).length > 0
      ? lines(segment.coreGifts)
      : splitListText(strengthText);

  const s2Strengths = [mirrorLesson, healingPath].filter(Boolean);
  const s0Strengths = [voidPower, pathOfReturn].filter(Boolean);
  const s0Shadows = voidChallenge
    ? splitListText(voidChallenge).length > 1
      ? splitListText(voidChallenge)
      : [voidChallenge]
    : [];

  const fallbackStrengths =
    s0Strengths.length > 0 ? s0Strengths : s2Strengths.length > 0 ? s2Strengths : [];

  const shadowPatterns =
    lines(segment.shadowPatterns).length > 0
      ? lines(segment.shadowPatterns)
      : challengesText
        ? splitListText(challengesText).length > 1
          ? splitListText(challengesText)
          : [challengesText]
        : karmicLoop
          ? splitKarmicLoop(karmicLoop)
          : s0Shadows;

  const expressionPatternText = line(segment.expressionPattern);
  const energyExpression =
    expressionPatternText && expressionPatternText !== strengthText
      ? expressionPatternText
      : vibrationTraitsText && vibrationTraitsText !== essenceText
        ? vibrationTraitsText
        : "";

  const isS4 = /^S4-/i.test(code);
  const isS5 = /^S5-/i.test(code);
  const isS6 = /^S6-/i.test(code);
  const isS7 = /^S7-/i.test(code);
  const isS8 = /^S8-/i.test(code);
  const isS9 = /^S9-/i.test(code);
  const s4Sections = segment.soulMissionSections;
  const s5Sections = isS5 ? segment.soulMissionSections : undefined;
  const s6Sections = isS6 ? segment.soulMissionSections : undefined;
  const s7Sections = isS7 ? segment.soulMissionSections : undefined;
  const s8Sections = isS8 ? segment.soulMissionSections : undefined;
  const s9Sections = isS9 ? segment.soulMissionSections : undefined;
  let s4CoreLoop = isS4 ? s4SectionBody(s4Sections, "core_loop") : "";
  let s4EmotionalTrigger = isS4 ? s4SectionBody(s4Sections, "emotional_trigger") : "";
  const s4DefensePattern = isS4 ? s4SectionBody(s4Sections, "defense_pattern") : "";
  let s4HiddenNeed = isS4 ? s4SectionBody(s4Sections, "hidden_need") : "";
  const s4RelationshipPattern = isS4 ? s4SectionBody(s4Sections, "relationship_pattern") : "";
  const s4WorkLifePattern = isS4 ? s4SectionBody(s4Sections, "work_life_pattern") : "";
  const s4ReflectiveSummary = isS4 ? essenceText : "";
  if (isS4 && segment.contentLayer === "commercial") {
    const opening = moduleSectionBody(s4Sections, "S4", "opening_essence");
    const howShowUp = moduleSectionBody(s4Sections, "S4", "how_this_may_show_up");
    const hiddenNeedCommercial = moduleSectionBody(s4Sections, "S4", "hidden_need");
    if (!s4CoreLoop && opening) s4CoreLoop = opening;
    if (!s4EmotionalTrigger && howShowUp) s4EmotionalTrigger = howShowUp;
    if (!s4HiddenNeed && hiddenNeedCommercial) s4HiddenNeed = hiddenNeedCommercial;
  }
  const s4ShowsUp = isS4
    ? [
        s4EmotionalTrigger,
        s4DefensePattern,
        s4RelationshipPattern,
        s4WorkLifePattern,
        s4HiddenNeed,
        s4CoreLoop,
      ].filter(Boolean)
    : [];
  const s4Icon = isS4 ? resolveS4PrimaryIconAsset(code, line(segment.title)) : null;

  let s5MissionEssence = isS5 ? s5SectionBody(s5Sections, "mission_essence") : "";
  let s5SoulExpression = isS5
    ? s5SectionBody(s5Sections, "what_your_soul_is_learning_to_express")
    : "";
  let s5PatternsMission = isS5 ? s5SectionBody(s5Sections, "how_your_patterns_become_mission") : "";
  const s5NaturalFields = isS5 ? s5SectionBody(s5Sections, "natural_mission_fields") : "";
  let s5ShadowDistortion = isS5
    ? s5SectionBody(s5Sections, "shadow_distortion_of_this_mission")
    : "";
  let s5MatureExpression = isS5 ? s5SectionBody(s5Sections, "mature_expression") : "";
  let s5Wisewave = isS5 ? s5SectionBody(s5Sections, "wisewave_reflection") : "";
  if (isS5 && segment.contentLayer === "commercial") {
    const opening = moduleSectionBody(s5Sections, "S5", "opening_essence");
    const howShowUp = moduleSectionBody(s5Sections, "S5", "how_this_may_show_up");
    const gift = moduleSectionBody(s5Sections, "S5", "core_gift");
    const growth = moduleSectionBody(s5Sections, "S5", "growth_edge");
    const integration = moduleSectionBody(s5Sections, "S5", "integration_key");
    const reflection = moduleSectionBody(s5Sections, "S5", "wisewave_reflection");
    if (!s5MissionEssence && opening) s5MissionEssence = opening;
    if (!s5PatternsMission && howShowUp) s5PatternsMission = howShowUp;
    if (!s5SoulExpression && gift) s5SoulExpression = gift;
    if (!s5ShadowDistortion && growth) s5ShadowDistortion = growth;
    if (!s5MatureExpression && integration) s5MatureExpression = integration;
    if (!s5Wisewave && reflection) s5Wisewave = reflection;
  }
  const s5Icon = isS5 ? resolveS5PrimaryIconAsset(code, line(segment.title)) : null;
  const s5Gifts = isS5 ? parseBulletBody(s5NaturalFields) : [];
  const s5ShowsUp = isS5
    ? [
        s5PatternsMission,
        s5ShadowDistortion ? `When filtered through fear: ${s5ShadowDistortion}` : "",
        s5SoulExpression,
      ].filter(Boolean)
    : [];

  let s6ValueEssence = isS6 ? s6SectionBody(s6Sections, "value_essence") : "";
  const s6SoulLearning = isS6
    ? s6SectionBody(s6Sections, "what_your_soul_is_learning_to_receive")
    : "";
  let s6ValueFlow = isS6 ? s6SectionBody(s6Sections, "how_value_wants_to_flow") : "";
  const s6NaturalFields = isS6 ? s6SectionBody(s6Sections, "natural_value_fields") : "";
  const s6ShadowDistortion = isS6
    ? s6SectionBody(s6Sections, "shadow_distortion_of_receiving")
    : "";
  let s6MatureExpression = isS6 ? s6SectionBody(s6Sections, "mature_receiving_expression") : "";
  let s6Wisewave = isS6 ? s6SectionBody(s6Sections, "wisewave_reflection") : "";
  if (isS6 && segment.contentLayer === "commercial") {
    const opening = moduleSectionBody(s6Sections, "S6", "opening_essence");
    const valueFlow = moduleSectionBody(s6Sections, "S6", "how_value_wants_to_flow");
    const mature = moduleSectionBody(s6Sections, "S6", "mature_receiving_expression");
    if (!s6ValueEssence && opening) s6ValueEssence = opening;
    if (!s6ValueFlow && valueFlow) s6ValueFlow = valueFlow;
    if (!s6MatureExpression && mature) s6MatureExpression = mature;
    if (!s6Wisewave) {
      const reflection = moduleSectionBody(s6Sections, "S6", "wisewave_reflection");
      if (reflection) s6Wisewave = reflection;
    }
  }
  const s6Icon = isS6 ? resolveS6PrimaryIconAsset(code, line(segment.title)) : null;
  const s6Gifts = isS6 ? parseBulletBody(s6NaturalFields) : [];
  const s6ShowsUp = isS6
    ? [
        s6ValueFlow,
        s6ShadowDistortion ? `When filtered through fear: ${s6ShadowDistortion}` : "",
        s6SoulLearning,
      ].filter(Boolean)
    : [];

  let s7SovereigntyEssence = isS7 ? s7SectionBody(s7Sections, "sovereignty_essence") : "";
  let s7SoulReclaim = isS7
    ? s7SectionBody(s7Sections, "what_your_soul_is_learning_to_reclaim")
    : "";
  let s7PowerGivenAway = isS7 ? s7SectionBody(s7Sections, "where_power_was_given_away") : "";
  const s7NaturalFields = isS7 ? s7SectionBody(s7Sections, "natural_sovereignty_fields") : "";
  let s7ShadowDistortion = isS7
    ? s7SectionBody(s7Sections, "shadow_distortion_of_sovereignty")
    : "";
  let s7MatureExpression = isS7 ? s7SectionBody(s7Sections, "mature_sovereignty_expression") : "";
  let s7Wisewave = isS7 ? s7SectionBody(s7Sections, "wisewave_reflection") : "";
  if (isS7 && segment.contentLayer === "commercial") {
    const opening = moduleSectionBody(s7Sections, "S7", "opening_essence");
    const howShowUp = moduleSectionBody(s7Sections, "S7", "how_this_may_show_up");
    const gift = moduleSectionBody(s7Sections, "S7", "core_gift");
    const growth = moduleSectionBody(s7Sections, "S7", "growth_edge");
    const integration = moduleSectionBody(s7Sections, "S7", "integration_key");
    const reflection = moduleSectionBody(s7Sections, "S7", "wisewave_reflection");
    if (!s7SovereigntyEssence && opening) s7SovereigntyEssence = opening;
    if (!s7SoulReclaim && gift) s7SoulReclaim = gift;
    if (!s7PowerGivenAway && howShowUp) s7PowerGivenAway = howShowUp;
    if (!s7ShadowDistortion && growth) s7ShadowDistortion = growth;
    if (!s7MatureExpression && integration) s7MatureExpression = integration;
    if (!s7Wisewave && reflection) s7Wisewave = reflection;
  }
  const s7Icon = isS7 ? resolveS7PrimaryIconAsset(code, line(segment.title)) : null;
  const s7Gifts = isS7 ? parseBulletBody(s7NaturalFields) : [];
  const s7ShowsUp = isS7
    ? [
        s7PowerGivenAway,
        s7ShadowDistortion ? `When filtered through fear: ${s7ShadowDistortion}` : "",
        s7SoulReclaim,
      ].filter(Boolean)
    : [];

  let s8ContributionEssence = isS8 ? s8SectionBody(s8Sections, "contribution_essence") : "";
  let s8SoulOffers = isS8 ? s8SectionBody(s8Sections, "what_your_soul_offers") : "";
  let s8ContributionFlow = isS8 ? s8SectionBody(s8Sections, "how_contribution_flows") : "";
  const s8NaturalFields = isS8 ? s8SectionBody(s8Sections, "natural_contribution_fields") : "";
  let s8ShadowDistortion = isS8
    ? s8SectionBody(s8Sections, "shadow_distortion_of_contribution")
    : "";
  let s8MatureExpression = isS8
    ? s8SectionBody(s8Sections, "mature_contribution_expression")
    : "";
  let s8Wisewave = isS8 ? s8SectionBody(s8Sections, "wisewave_reflection") : "";
  if (isS8 && segment.contentLayer === "commercial") {
    const opening = moduleSectionBody(s8Sections, "S8", "opening_essence");
    const howShowUp = moduleSectionBody(s8Sections, "S8", "how_this_may_show_up");
    const gift = moduleSectionBody(s8Sections, "S8", "core_gift");
    const growth = moduleSectionBody(s8Sections, "S8", "growth_edge");
    const integration = moduleSectionBody(s8Sections, "S8", "integration_key");
    const reflection = moduleSectionBody(s8Sections, "S8", "wisewave_reflection");
    if (!s8ContributionEssence && opening) s8ContributionEssence = opening;
    if (!s8SoulOffers && gift) s8SoulOffers = gift;
    if (!s8ContributionFlow && howShowUp) s8ContributionFlow = howShowUp;
    if (!s8ShadowDistortion && growth) s8ShadowDistortion = growth;
    if (!s8MatureExpression && integration) s8MatureExpression = integration;
    if (!s8Wisewave && reflection) s8Wisewave = reflection;
  }
  const s8Icon = isS8 ? resolveS8PrimaryIconAsset(code, line(segment.title)) : null;
  const s8Gifts = isS8 ? parseBulletBody(s8NaturalFields) : [];
  const s8ShowsUp = isS8
    ? [
        s8ContributionFlow,
        s8ShadowDistortion ? `When filtered through fear: ${s8ShadowDistortion}` : "",
        s8SoulOffers,
      ].filter(Boolean)
    : [];

  let s9ReturnEssence = isS9 ? s9SectionBody(s9Sections, "return_essence") : "";
  let s9SoulRemembers = isS9 ? s9SectionBody(s9Sections, "what_your_soul_remembers") : "";
  let s9LifeThemesResolve = isS9 ? s9SectionBody(s9Sections, "how_life_themes_resolve") : "";
  const s9NaturalPractices = isS9 ? s9SectionBody(s9Sections, "natural_return_practices") : "";
  let s9ShadowDistortion = isS9
    ? s9SectionBody(s9Sections, "shadow_distortion_of_return")
    : "";
  let s9MatureExpression = isS9 ? s9SectionBody(s9Sections, "mature_return_expression") : "";
  let s9Wisewave = isS9 ? s9SectionBody(s9Sections, "wisewave_reflection") : "";
  if (isS9 && segment.contentLayer === "commercial") {
    const opening = moduleSectionBody(s9Sections, "S9", "opening_essence");
    const howShowUp = moduleSectionBody(s9Sections, "S9", "how_this_may_show_up");
    const gift = moduleSectionBody(s9Sections, "S9", "core_gift");
    const growth = moduleSectionBody(s9Sections, "S9", "growth_edge");
    const integration = moduleSectionBody(s9Sections, "S9", "integration_key");
    const reflection = moduleSectionBody(s9Sections, "S9", "wisewave_reflection");
    if (!s9ReturnEssence && opening) s9ReturnEssence = opening;
    if (!s9SoulRemembers && gift) s9SoulRemembers = gift;
    if (!s9LifeThemesResolve && howShowUp) s9LifeThemesResolve = howShowUp;
    if (!s9ShadowDistortion && growth) s9ShadowDistortion = growth;
    if (!s9MatureExpression && integration) s9MatureExpression = integration;
    if (!s9Wisewave && reflection) s9Wisewave = reflection;
  }
  const s9Icon = isS9 ? resolveS9PrimaryIconAsset(code, line(segment.title)) : null;
  const s9Gifts = isS9 ? parseBulletBody(s9NaturalPractices) : [];
  const s9ShowsUp = isS9
    ? [
        s9LifeThemesResolve,
        s9ShadowDistortion ? `When filtered through fear: ${s9ShadowDistortion}` : "",
        s9SoulRemembers,
      ].filter(Boolean)
    : [];

  return {
    code,
    segmentCode: segment.segmentCode ?? code,
    title: line(segment.title),
    subtitle: line(segment.subtitle),
    essence: essenceText,
    soul_traits: soulTraits,
    core_gifts: coreGifts.length > 0 ? coreGifts : fallbackStrengths,
    shadow_pattern: shadowPatterns,
    core_lesson: mirrorLesson,
    wisewave_guidance: guidance,
    mission_direction: lines(segment.direction),
    reflection: line(segment.reflectionQuestion),
    integration_key: integrationAdvice,
    energy_expression: energyExpression,
    aligned_expression: strengthText,
    distorted_expression: challengesText,
    integration_advice: integrationAdvice,
    relationship_dynamic: relationshipDynamic,
    trigger_pattern: relationshipDynamic,
    repeating_loop: karmicLoop,
    lesson: mirrorLesson,
    healing_path: healingPath || pathOfReturn,
    boundary_lesson: healingPath || stripIntegrationPrefix(integrationKeyRaw),
    core_illusion: coreIllusion || essenceText,
    illusion_mechanism: voidChallenge,
    void_challenge: voidChallenge,
    void_power: voidPower,
    path_of_return: pathOfReturn,
    content_sections: segment.soulMissionSections?.map((section) => ({
      title: section.label.en?.trim() ?? "",
      body: section.body.en?.trim() ?? "",
    })),
    archetype: isS4 || isS5 || isS6 || isS7 || isS8 || isS9 ? line(segment.title) : undefined,
    core_loop: s4CoreLoop,
    emotional_trigger: s4EmotionalTrigger,
    defense_pattern: s4DefensePattern,
    hidden_need: s4HiddenNeed,
    relationship_pattern: s4RelationshipPattern,
    work_life_pattern: s4WorkLifePattern,
    shows_up: s4ShowsUp,
    root_belief: s4HiddenNeed,
    life_influence: s4ReflectiveSummary,
    s4_section_labels: isS4
      ? {
          core_loop: s4SectionLabel(s4Sections, "core_loop"),
          emotional_trigger: s4SectionLabel(s4Sections, "emotional_trigger"),
          defense_pattern: s4SectionLabel(s4Sections, "defense_pattern"),
          hidden_need: s4SectionLabel(s4Sections, "hidden_need"),
          relationship_pattern: s4SectionLabel(s4Sections, "relationship_pattern"),
          work_life_pattern: s4SectionLabel(s4Sections, "work_life_pattern"),
        }
      : undefined,
    mission_essence: isS5 ? s5MissionEssence : undefined,
    soul_expression: isS5 ? s5SoulExpression : undefined,
    patterns_mission: isS5 ? s5PatternsMission : undefined,
    natural_mission_fields: isS5 ? s5NaturalFields : undefined,
    shadow_distortion: isS9
      ? s9ShadowDistortion
      : isS8
        ? s8ShadowDistortion
        : isS7
          ? s7ShadowDistortion
          : isS6
            ? s6ShadowDistortion
            : isS5
              ? s5ShadowDistortion
              : undefined,
    mature_expression: isS5 ? s5MatureExpression : undefined,
    wisewave_reflection: isS9
      ? s9Wisewave
      : isS8
        ? s8Wisewave
        : isS7
          ? s7Wisewave
          : isS6
            ? s6Wisewave
            : isS5
              ? s5Wisewave
              : undefined,
    mission_gifts: isS5 && s5Gifts.length > 0 ? s5Gifts : undefined,
    mission_shows_up: isS5 && s5ShowsUp.length > 0 ? s5ShowsUp : undefined,
    soul_mission_sections: isS5
      ? s5Sections?.map((section) => ({
          id: section.id,
          body: { en: section.body.en?.trim() ?? "" },
        }))
      : undefined,
    value_essence: isS6 ? s6ValueEssence : undefined,
    soul_learning_to_receive: isS6 ? s6SoulLearning : undefined,
    how_value_flows: isS6 ? s6ValueFlow : undefined,
    natural_value_fields: isS6 ? s6NaturalFields : undefined,
    mature_receiving_expression: isS6 ? s6MatureExpression : undefined,
    receiving_gifts: isS6 && s6Gifts.length > 0 ? s6Gifts : undefined,
    receiving_shows_up: isS6 && s6ShowsUp.length > 0 ? s6ShowsUp : undefined,
    primary_icon_url: isS9
      ? s9Icon?.primary_icon_url
      : isS8
        ? s8Icon?.primary_icon_url
        : isS7
          ? s7Icon?.primary_icon_url
          : isS6
            ? s6Icon?.primary_icon_url
            : isS5
              ? s5Icon?.primary_icon_url
              : isS4
                ? s4Icon?.primary_icon_url
                : undefined,
    primary_icon_svg: isS9
      ? s9Icon?.primary_icon_svg
      : isS8
        ? s8Icon?.primary_icon_svg
        : isS7
          ? s7Icon?.primary_icon_svg
          : isS6
            ? s6Icon?.primary_icon_svg
            : isS5
              ? s5Icon?.primary_icon_svg
              : isS4
                ? s4Icon?.primary_icon_svg
                : undefined,
    primary_icon_alt: isS9
      ? s9Icon?.primary_icon_alt
      : isS8
        ? s8Icon?.primary_icon_alt
        : isS7
          ? s7Icon?.primary_icon_alt
          : isS6
            ? s6Icon?.primary_icon_alt
            : isS5
              ? s5Icon?.primary_icon_alt
              : isS4
                ? s4Icon?.primary_icon_alt
                : undefined,
    value_receiving_sections: isS6
      ? s6Sections?.map((section) => ({
          id: section.id,
          body: { en: section.body.en?.trim() ?? "" },
        }))
      : undefined,
    sovereignty_essence: isS7 ? s7SovereigntyEssence : undefined,
    soul_learning_to_reclaim: isS7 ? s7SoulReclaim : undefined,
    where_power_given_away: isS7 ? s7PowerGivenAway : undefined,
    natural_sovereignty_fields: isS7 ? s7NaturalFields : undefined,
    mature_sovereignty_expression: isS7 ? s7MatureExpression : undefined,
    sovereignty_gifts: isS7 && s7Gifts.length > 0 ? s7Gifts : undefined,
    sovereignty_shows_up: isS7 && s7ShowsUp.length > 0 ? s7ShowsUp : undefined,
    sovereignty_sections: isS7
      ? s7Sections?.map((section) => ({
          id: section.id,
          body: { en: section.body.en?.trim() ?? "" },
        }))
      : undefined,
    contribution_essence: isS8 ? s8ContributionEssence : undefined,
    what_your_soul_offers: isS8 ? s8SoulOffers : undefined,
    how_contribution_flows: isS8 ? s8ContributionFlow : undefined,
    natural_contribution_fields: isS8 ? s8NaturalFields : undefined,
    mature_contribution_expression: isS8 ? s8MatureExpression : undefined,
    contribution_gifts: isS8 && s8Gifts.length > 0 ? s8Gifts : undefined,
    contribution_shows_up: isS8 && s8ShowsUp.length > 0 ? s8ShowsUp : undefined,
    contribution_sections: isS8
      ? s8Sections?.map((section) => ({
          id: section.id,
          body: { en: section.body.en?.trim() ?? "" },
        }))
      : undefined,
    return_essence: isS9 ? s9ReturnEssence : undefined,
    what_your_soul_remembers: isS9 ? s9SoulRemembers : undefined,
    how_life_themes_resolve: isS9 ? s9LifeThemesResolve : undefined,
    natural_return_practices: isS9 ? s9NaturalPractices : undefined,
    mature_return_expression: isS9 ? s9MatureExpression : undefined,
    return_gifts: isS9 && s9Gifts.length > 0 ? s9Gifts : undefined,
    return_shows_up: isS9 && s9ShowsUp.length > 0 ? s9ShowsUp : undefined,
    return_sections: isS9
      ? s9Sections?.map((section) => ({
          id: section.id,
          body: { en: section.body.en?.trim() ?? "" },
        }))
      : undefined,
    ...extra,
  };
}
