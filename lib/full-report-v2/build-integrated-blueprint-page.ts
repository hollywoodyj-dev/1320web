import type { Get1320ContentResult } from "@/lib/types/1320-content";
import type { IntegratedSoulBlueprint, SynthesisLayerInput } from "@/lib/types/integrated-soul-blueprint";
import { INTEGRATED_FINAL_REMEMBRANCE } from "@/lib/full-report-v2/integrated-page-static";
import type { FullReportV2IntegratedBlueprint } from "@/lib/full-report-v2/types";

function stripThe(title: string): string {
  return title.replace(/^The\s+/i, "").trim();
}

function lowerFirst(text: string): string {
  if (!text) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function firstSentence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  const match = trimmed.match(/^[^.!?]+[.!?]?/);
  return match ? match[0].replace(/\.$/, "").trim() : trimmed;
}

function buildArchetypeTitle(input: SynthesisLayerInput): string {
  const s1 = stripThe(input.s1.englishTitle);
  const s3 = stripThe(input.s3.englishTitle);
  if (/transform/i.test(s1) && /explor/i.test(s3)) return `Transformative ${s3}`;
  if (/transform/i.test(s1)) return `Transformative ${s3}`;
  return `${s1} ${s3}`;
}

function buildArchetypeSummary(input: SynthesisLayerInput): string {
  const s1 = stripThe(input.s1.englishTitle).toLowerCase();
  const s3 = stripThe(input.s3.englishTitle).toLowerCase();
  if (s1.includes("transform") && s3.includes("explor")) {
    return "Here to transform, explore life through experience, awaken through truth, and return to inner worth.";
  }
  return `Here to embody ${lowerFirst(s1)}, express ${lowerFirst(s3)}, integrate ${lowerFirst(stripThe(input.s2.englishTitle))}, and return beyond ${lowerFirst(stripThe(input.s0.englishTitle))}.`;
}

function archetypeShortExpression(
  key: "s1" | "s2" | "s3" | "s0",
  input: SynthesisLayerInput,
): string {
  const s1 = stripThe(input.s1.englishTitle).toLowerCase();
  const s3 = stripThe(input.s3.englishTitle).toLowerCase();
  const s2 = stripThe(input.s2.englishTitle).toLowerCase();
  const s0 = stripThe(input.s0.englishTitle).toLowerCase();

  switch (key) {
    case "s1":
      if (s1.includes("transform")) return "You transform realities and bring healing through change.";
      return input.s1.soulTraits[0] ? `You ${lowerFirst(input.s1.soulTraits[0])}.` : "";
    case "s3":
      if (s3.includes("explor")) return "You explore life with curiosity and bring fresh perspectives.";
      return input.s3.strengths
        ? `You express life through ${lowerFirst(input.s3.strengths)}.`
        : "";
    case "s2":
      if (s2.includes("shock")) return "You grow through mirrors that awaken truth.";
      return input.s2.lesson
        ? `You grow through mirrors that ${lowerFirst(input.s2.lesson)}.`
        : "";
    case "s0":
      if (s0.includes("worth")) return "You break the illusion of not enough and return to worth.";
      return input.s0.pathOfReturn
        ? `You return through ${lowerFirst(input.s0.pathOfReturn)}.`
        : "";
  }
}

function buildGifts(input: SynthesisLayerInput): [string, string, string, string] {
  const s1 = stripThe(input.s1.englishTitle).toLowerCase();
  const rebuildStrength = input.s1.strengths.find((s) => /rebuild|transform/i.test(s));

  const g1 =
    s1.includes("transform")
      ? "You help others transform and rebuild."
      : rebuildStrength
        ? `You help others ${lowerFirst(rebuildStrength.replace(/^naturally able to /i, ""))}.`
        : input.s1.strengths[0]
          ? `You help others through ${lowerFirst(input.s1.strengths[0])}.`
          : `You bring ${lowerFirst(s1)} into the world.`;

  const g2 =
    input.s2.lesson && /awaken/i.test(input.s2.lesson)
      ? "You awaken truth through authentic reflection."
      : input.s2.lesson
        ? `You grow through mirrors that ${lowerFirst(input.s2.lesson)}.`
        : `You awaken through ${lowerFirst(stripThe(input.s2.englishTitle))}.`;

  const g3 =
    stripThe(input.s3.englishTitle).toLowerCase().includes("explor")
      ? "You bring adventure, innovation, and new perspectives."
      : input.s3.strengths
        ? `You bring ${lowerFirst(input.s3.strengths)} into life.`
        : `You express ${lowerFirst(stripThe(input.s3.englishTitle))} energy freely.`;

  const g4 =
    stripThe(input.s0.englishTitle).toLowerCase().includes("worth")
      ? "You remind others that worth does not need to be proven."
      : input.s0.guidance
        ? `You remind others: ${lowerFirst(input.s0.guidance)}.`
        : input.s0.voidPower
          ? `You remind others of ${lowerFirst(input.s0.voidPower)}.`
          : `You return through ${lowerFirst(stripThe(input.s0.englishTitle))}.`;

  return [g1, g2, g3, g4];
}

function essenceExpression(summary: string, input: SynthesisLayerInput): string {
  const short = archetypeShortExpression("s1", input);
  if (short) return short;
  const rewritten = summary
    .replace(/^At your core,\s*[^,]+,\s*/i, "")
    .replace(/^[^:]+:\s*/i, "")
    .replace(/^shows a soul that\s+/i, "You ");
  const sentence = firstSentence(rewritten);
  return sentence.startsWith("You ") ? sentence : `You ${lowerFirst(sentence)}`;
}

function moduleExpression(
  key: "s2" | "s3" | "s0",
  summary: string,
  input: SynthesisLayerInput,
  fallback: string,
): string {
  const short = archetypeShortExpression(key, input);
  if (short) return short;
  const sentence = firstSentence(
    summary.replace(/^Through [^,]+,\s*/i, "").replace(/^In relationships,\s*/i, ""),
  );
  if (sentence.length > 12) return sentence.startsWith("You ") ? sentence : lowerFirst(sentence);
  return fallback;
}

function flowTitle(key: "s1" | "s2" | "s3" | "s0", title: string): string {
  const t = stripThe(title).toLowerCase();
  if (key === "s1" && t.includes("transform")) return "Transform";
  if (key === "s2") return "Awaken";
  if (key === "s3" && t.includes("explor")) return "Explore";
  if (key === "s0") return "Return";
  return stripThe(title).split(/\s+/)[0] ?? title;
}

function flowCopy(key: "s1" | "s2" | "s3" | "s0", input: SynthesisLayerInput): string {
  switch (key) {
    case "s1":
      return input.s1.soulDirection[0]
        ? lowerFirst(input.s1.soulDirection[0])
        : lowerFirst(input.s1.coreLesson || "Bring change and healing.");
    case "s2":
      return lowerFirst(input.s2.healingPath || input.s2.lesson || "Heal through truth and reflection.");
    case "s3":
      return lowerFirst(input.s3.strengths || input.s3.energyExpression || "Share wisdom through experience.");
    case "s0":
      return lowerFirst(input.s0.pathOfReturn || "Return to self, worth, and Source.");
  }
}

export function buildIntegratedBlueprintPageSlot(
  content: Get1320ContentResult,
  blueprint: IntegratedSoulBlueprint,
  synthesisInput: SynthesisLayerInput,
): FullReportV2IntegratedBlueprint {
  const gifts = buildGifts(synthesisInput);

  const s1Expression = essenceExpression(blueprint.coreEssenceSummary, synthesisInput);
  const s3Expression = moduleExpression(
    "s3",
    blueprint.energyExpressionSummary,
    synthesisInput,
    `You explore life as ${lowerFirst(stripThe(synthesisInput.s3.englishTitle))}.`,
  );
  const s2Expression = moduleExpression(
    "s2",
    blueprint.relationshipMirrorSummary,
    synthesisInput,
    `You grow through mirrors that ${lowerFirst(synthesisInput.s2.lesson || "awaken truth")}.`,
  );
  const s0Expression = moduleExpression(
    "s0",
    blueprint.awakeningPathSummary,
    synthesisInput,
    `You break ${lowerFirst(synthesisInput.s0.coreIllusion)} and return to worth.`,
  );

  return {
    core_essence: blueprint.coreEssenceSummary,
    energy_expression: blueprint.energyExpressionSummary,
    relationship_mirror: blueprint.relationshipMirrorSummary,
    awakening_path: blueprint.awakeningPathSummary,
    integrated_pattern: blueprint.integratedSummary,
    main_inner_conflict: blueprint.mainInnerConflict,
    integration_theme: blueprint.integrationTheme,
    embodiment_practice: blueprint.embodimentPractice,
    reflection_questions: blueprint.reflectionQuestions,
    archetype_title: buildArchetypeTitle(synthesisInput),
    archetype_summary: buildArchetypeSummary(synthesisInput),
    gift_1: gifts[0],
    gift_2: gifts[1],
    gift_3: gifts[2],
    gift_4: gifts[3],
    s1_expression: s1Expression,
    s2_expression: s2Expression,
    s3_expression: s3Expression,
    s0_expression: s0Expression,
    synergy_essence_vibration: firstSentence(
      `${stripThe(synthesisInput.s1.englishTitle)} essence meets ${stripThe(synthesisInput.s3.englishTitle)} vibration — ${lowerFirst(synthesisInput.s3.energyExpression)}`,
    ),
    synergy_mirror_vibration: firstSentence(
      `Mirrors and vibration invite you to ${lowerFirst(synthesisInput.s2.lesson || synthesisInput.s2.relationshipDynamic)} while expressing ${lowerFirst(stripThe(synthesisInput.s3.englishTitle))} energy.`,
    ),
    synergy_essence_mirror: firstSentence(
      `Your essence and mirrors refine each other through ${lowerFirst(synthesisInput.s2.relationshipDynamic)}.`,
    ),
    synergy_void_all: firstSentence(
      `${stripThe(synthesisInput.s0.englishTitle)} helps you see through ${lowerFirst(synthesisInput.s0.coreIllusion)} and integrate all four codes.`,
    ),
    flow_1_title: flowTitle("s1", synthesisInput.s1.englishTitle),
    flow_1_copy: flowCopy("s1", synthesisInput),
    flow_2_title: flowTitle("s2", synthesisInput.s2.englishTitle),
    flow_2_copy: flowCopy("s2", synthesisInput),
    flow_3_title: flowTitle("s3", synthesisInput.s3.englishTitle),
    flow_3_copy: flowCopy("s3", synthesisInput),
    flow_4_title: flowTitle("s0", synthesisInput.s0.englishTitle),
    flow_4_copy: flowCopy("s0", synthesisInput),
    integration_guidance: firstSentence(
      blueprint.integratedSummary.split("\n\n").slice(-1)[0] ||
        `${blueprint.integrationTheme} ${blueprint.embodimentPractice}`,
    ),
    final_remembrance: INTEGRATED_FINAL_REMEMBRANCE,
    combination_signature: blueprint.combinationSignature,
  };
}
