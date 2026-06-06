import { buildCombinationSignature } from "@/lib/combination-signature";
import type { Locale } from "@/lib/types/1320-content";
import type { IntegratedSoulBlueprint, SynthesisLayerInput } from "@/lib/types/integrated-soul-blueprint";

const CONTENT_VERSION = "canonical-v1";
const TEMPLATE_VERSION = "integrated-blueprint-v1";
const GENERATION_VERSION = "synthesis-v1";

const SAFETY_DISCLAIMER_EN =
  "This synthesis is a symbolic mirror for reflection — not prediction, fate, or professional advice. You remain the one who chooses how to live it.";
const SAFETY_DISCLAIMER_ZH =
  "这份整合解读是象征性的觉察镜像，而非预测、命运或专业建议。你如何活出它，仍由你自己选择。";

function firstTrait(input: SynthesisLayerInput): string {
  return input.s1.soulTraits[0] ?? input.s1.strengths[0] ?? "a distinct soul frequency";
}

function lowerFirst(text: string): string {
  if (!text) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function buildIntegrationTheme(input: SynthesisLayerInput, locale: Locale): string {
  if (locale === "zh") {
    if (input.s1.chineseTitle.includes("光耀") || input.s1.englishTitle.toLowerCase().includes("radiant")) {
      return "发光但不表演。";
    }
    if (input.s2.lesson.includes("付出") || input.s2.englishTitle.toLowerCase().includes("overgiving")) {
      return "给予但不背叛自己。";
    }
    return "从内在整合，而非向外证明。";
  }

  if (input.s1.englishTitle.toLowerCase().includes("radiant")) {
    return "Radiate without performing.";
  }
  if (input.s2.englishTitle.toLowerCase().includes("overgiving")) {
    return "Give without self-abandoning.";
  }
  if (input.s0.englishTitle.toLowerCase().includes("judgment")) {
    return "Awaken without judging.";
  }
  return "Integrate from within, not from external proof.";
}

function buildMainInnerConflict(input: SynthesisLayerInput, locale: Locale): string {
  if (locale === "zh") {
    return `主要内在张力可能在于：${input.s1.chineseTitle}渴望被看见与表达，而${input.s2.chineseTitle}与${input.s0.chineseTitle}则提醒你，${lowerFirst(input.s0.coreIllusion)}`;
  }
  return `The main inner conflict may be between ${lowerFirst(firstTrait(input))} and the pattern where ${lowerFirst(input.s2.relationshipDynamic)} while ${lowerFirst(input.s0.coreIllusion)}`;
}

function buildEmbodimentPractice(input: SynthesisLayerInput, locale: Locale): string {
  if (locale === "zh") {
    return `接下来 7 天，每天留意一个时刻：你是否在${input.s2.lesson || "关系模式"}中失去平衡。暂停并问自己：${input.s0.pathOfReturn || "我能否回到内在真实？"}`;
  }
  return `For the next 7 days, notice one moment each day where ${lowerFirst(input.s2.lesson || input.s2.relationshipDynamic)}. Pause and ask: ${input.s0.pathOfReturn || "What would change if I returned to inner truth?"}`;
}

function buildReflectionQuestions(input: SynthesisLayerInput, locale: Locale): string[] {
  if (locale === "zh") {
    return [
      `我在哪里仍在${input.s1.shadows[0] ?? "表演自己"}，而不是自然表达？`,
      `我在哪里通过${input.s2.lesson || "关系模式"}来换取价值？`,
      `我在哪里仍让${input.s0.coreIllusion}变得更响亮？`,
    ];
  }
  return [
    `Where am I performing ${input.s1.englishTitle.replace(/^The /, "").toLowerCase()} instead of allowing it to be natural?`,
    `Where am I giving or relating in order to feel chosen, needed, or worthy?`,
    `Where am I letting ${lowerFirst(input.s0.coreIllusion)}`,
  ];
}

function generateEnglish(input: SynthesisLayerInput): Omit<IntegratedSoulBlueprint, "combinationSignature" | "generationMeta"> {
  const { s1, s3, s2, s0 } = input;

  const coreEssenceSummary = `At your core, ${s1.code} · ${s1.englishTitle} shows a soul that ${lowerFirst(s1.soulTraits.slice(0, 2).join("; ") || firstTrait(input))}. Your light is not something you need to perform; it becomes stronger when it is calm and unforced.`;

  const energyExpressionSummary = `Through ${s3.code} · ${s3.englishTitle}, this frequency expresses through ${lowerFirst(s3.energyExpression)}. The growth edge is to let this expression become grounded service${s3.challenges ? `, not ${lowerFirst(s3.challenges)}` : ""}.`;

  const relationshipMirrorSummary = `In relationships, ${s2.code} · ${s2.englishTitle} may mirror ${lowerFirst(s2.relationshipDynamic)}. This can reveal where ${lowerFirst(s2.karmicLoop || s2.lesson)} is asking to be seen with more honesty.`;

  const awakeningPathSummary = `${s0.code} · ${s0.englishTitle} shows that the deeper awakening path is to recognize ${lowerFirst(s0.coreIllusion)}. The path of return is ${lowerFirst(s0.pathOfReturn)}`;

  const integratedSummary = [
    `Your blueprint carries the frequency of ${s1.englishTitle.replace(/^The /, "")} and ${s3.englishTitle.toLowerCase()} expression. ${coreEssenceSummary}`,
    energyExpressionSummary,
    relationshipMirrorSummary,
    `${awakeningPathSummary} Your integration is not to shine harder, give more, or prove your goodness. It is to return to a truth that does not need permission.`,
    `Integrated together, your soul blueprint invites you to ${buildIntegrationTheme(input, "en").replace(/\.$/, "")}, awaken without judging, give without self-abandoning, and define your value from within.`,
  ].join("\n\n");

  return {
    coreEssenceSummary,
    energyExpressionSummary,
    relationshipMirrorSummary,
    awakeningPathSummary,
    integratedSummary,
    mainInnerConflict: buildMainInnerConflict(input, "en"),
    integrationTheme: buildIntegrationTheme(input, "en"),
    embodimentPractice: buildEmbodimentPractice(input, "en"),
    reflectionQuestions: buildReflectionQuestions(input, "en"),
    safetyDisclaimer: SAFETY_DISCLAIMER_EN,
  };
}

function generateChinese(input: SynthesisLayerInput): Omit<IntegratedSoulBlueprint, "combinationSignature" | "generationMeta"> {
  const { s1, s3, s2, s0 } = input;

  const coreEssenceSummary = `${s1.code} · ${s1.chineseTitle}显示，你的核心原频是${s1.soulTraits.slice(0, 2).join("；") || firstTrait(input)}。你的光不需要被表演，它越平静，越有力量。`;

  const energyExpressionSummary = `通过 ${s3.code} · ${s3.chineseTitle}，这股原频会以${s3.energyExpression}的方式表达。成长点在于：让表达成为落地的服务${s3.challenges ? `，而不是${s3.challenges}` : ""}。`;

  const relationshipMirrorSummary = `在关系中，${s2.code} · ${s2.chineseTitle}会照见${s2.relationshipDynamic}。它让你看见：${s2.karmicLoop || s2.lesson}。`;

  const awakeningPathSummary = `${s0.code} · ${s0.chineseTitle}显示，更深的觉醒入口是：${s0.coreIllusion}。回归之路是：${s0.pathOfReturn}`;

  const integratedSummary = [
    `你的蓝图带有${s1.chineseTitle}与${s3.chineseTitle}的频率。${coreEssenceSummary}`,
    energyExpressionSummary,
    relationshipMirrorSummary,
    `${awakeningPathSummary} 你的整合不是更努力地发光、更多地给予，或证明自己是好的，而是回到一种不需要许可的真实。`,
    `整合来看，你的灵魂蓝图邀请你：${buildIntegrationTheme(input, "zh")}觉醒但不评判，给予但不背叛自己，并从内在重新定义价值。`,
  ].join("\n\n");

  return {
    coreEssenceSummary,
    energyExpressionSummary,
    relationshipMirrorSummary,
    awakeningPathSummary,
    integratedSummary,
    mainInnerConflict: buildMainInnerConflict(input, "zh"),
    integrationTheme: buildIntegrationTheme(input, "zh"),
    embodimentPractice: buildEmbodimentPractice(input, "zh"),
    reflectionQuestions: buildReflectionQuestions(input, "zh"),
    safetyDisclaimer: SAFETY_DISCLAIMER_ZH,
  };
}

export function generateIntegratedSoulBlueprint(
  input: SynthesisLayerInput,
  missingFields: string[] = [],
): IntegratedSoulBlueprint {
  const combinationSignature = buildCombinationSignature({
    s1Code: input.s1.code,
    s3Code: input.s3.code,
    s2Code: input.s2.code,
    s0Code: input.s0.code,
  });

  const body = input.locale === "zh" ? generateChinese(input) : generateEnglish(input);

  return {
    combinationSignature,
    ...body,
    generationMeta: {
      contentVersion: CONTENT_VERSION,
      templateVersion: TEMPLATE_VERSION,
      generationVersion: GENERATION_VERSION,
      usedFallback: missingFields.length > 0,
      missingFields,
      generatedAt: new Date().toISOString(),
    },
  };
}
