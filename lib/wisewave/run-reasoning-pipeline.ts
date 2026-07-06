import type { RelationshipMemoryRow } from "@/lib/db/types";
import type { WisewaveTurnRow } from "@/lib/db/types";
import type { ExpressionState } from "@/lib/platform-domain";
import { generateWisewaveLlmResponse } from "@/lib/wisewave/generate-llm-response";
import { isOpenAiConfigured, getOpenAiModel } from "@/lib/wisewave/openai-config";
import {
  detectWisewaveIntent,
  inferBlueprintCodes,
  reviseForRelationshipQa,
  validateRelationshipQa,
} from "@/lib/wisewave/reasoning-helpers";
import type { ReasoningAudit, ReasoningLayerId, RelationshipQaResult, WisewaveIntent } from "@/lib/wisewave/types";
import { WISEWAVE_API_VERSION } from "@/lib/wisewave/types";

type PipelineInput = {
  userMessage: string;
  clientName: string;
  codes: { s1: string; s3: string; s2: string; s0: string };
  expressionState: ExpressionState;
  memories: RelationshipMemoryRow[];
  priorTurns: WisewaveTurnRow[];
};

function layer(id: ReasoningLayerId, summary: string): ReasoningLayerRecord {
  return { summary };
}

type ReasoningLayerRecord = { summary: string };

function buildLifeContext(priorTurns: WisewaveTurnRow[], message: string): string {
  const userTurns = priorTurns.filter((t) => t.role === "user").slice(-3);
  if (userTurns.length === 0) return `Present focus: ${message.slice(0, 160)}`;
  return `Continuity from recent reflections: ${userTurns.map((t) => t.content.slice(0, 80)).join(" · ")}`;
}

function synthesizeGrowthEdge(intent: WisewaveIntent, message: string, codes: string[]): string {
  const codeRef = codes[0] ?? "your blueprint";
  if (intent === "integration") {
    return `Name one small practice where ${codeRef} can be lived this week — without forcing an outcome.`;
  }
  if (intent === "emotional_processing") {
    return `Pause before interpreting — notice where the feeling lives in your body, then ask what ${codeRef} mirrors in this moment.`;
  }
  return `Choose one honest question about ${codeRef} you can carry for the next few days.`;
}

function composeRuleBasedResponse(input: {
  intent: WisewaveIntent;
  clientName: string;
  codes: string[];
  expressionState: ExpressionState;
  growthEdge: string;
  synthesis: string;
  memorySnippet: string | null;
}): string {
  const codeLine = input.codes.slice(0, 2).join(" and ");
  const memoryLine = input.memorySnippet
    ? `You have named this theme before: ${input.memorySnippet} `
    : "";

  const openings: Record<WisewaveIntent, string> = {
    understanding: `Thank you for bringing this, ${input.clientName}. `,
    reflection: `I hear you reflecting, ${input.clientName}. `,
    reassurance: `${input.clientName}, what you are feeling deserves space — not a quick fix. `,
    clarity: `${input.clientName}, you are asking for clarity — and that belongs with you. `,
    emotional_processing: `${input.clientName}, let's stay with what is present before we interpret it. `,
    integration: `${input.clientName}, integration is a practice, not a performance. `,
    curiosity: `${input.clientName}, curiosity is a good place to begin. `,
  };

  return [
    openings[input.intent],
    memoryLine,
    `Your codes ${codeLine} may offer a symbolic mirror here — not a verdict. ${input.synthesis} `,
    `Expression-wise, your profile reads as ${input.expressionState} — how this pattern is being lived right now matters more than naming it perfectly. `,
    `One possible growth edge: ${input.growthEdge} `,
    `What feels true for you when you sit with this?`,
  ].join("");
}

export async function runReasoningPipeline(input: PipelineInput): Promise<{
  response: string;
  reasoning: ReasoningAudit;
  qa: RelationshipQaResult;
}> {
  const intent = detectWisewaveIntent(input.userMessage);
  const blueprintCodes = inferBlueprintCodes(input.userMessage, input.codes);
  const lifeContext = buildLifeContext(input.priorTurns, input.userMessage);
  const memorySnippet = input.memories[0]?.content?.slice(0, 120) ?? null;

  const synthesis = `Blueprint (${blueprintCodes.join(", ")}) ↔ Expression (${input.expressionState}) ↔ lived experience.`;
  const growthEdge = synthesizeGrowthEdge(intent, input.userMessage, blueprintCodes);

  let responseEngine = "rule-based";
  let draft = composeRuleBasedResponse({
    intent,
    clientName: input.clientName,
    codes: blueprintCodes,
    expressionState: input.expressionState,
    growthEdge,
    synthesis,
    memorySnippet,
  });

  if (isOpenAiConfigured()) {
    try {
      draft = await generateWisewaveLlmResponse({
        userMessage: input.userMessage,
        clientName: input.clientName,
        codes: input.codes,
        blueprintCodesReferenced: blueprintCodes,
        expressionState: input.expressionState,
        intent,
        growthEdge,
        synthesis,
        lifeContext,
        memorySnippet,
        priorTurns: input.priorTurns,
      });
      responseEngine = `openai:${getOpenAiModel()}`;
    } catch (error) {
      console.error("Wisewave OpenAI response failed; using rule-based fallback:", error);
    }
  }

  const qaCheck = validateRelationshipQa(draft, intent);
  const response = qaCheck.passed ? draft : reviseForRelationshipQa(draft, qaCheck.flags);
  const qaAfter = validateRelationshipQa(response, intent);

  const reasoning: ReasoningAudit = {
    version: WISEWAVE_API_VERSION,
    intent,
    blueprintCodesReferenced: blueprintCodes,
    expressionState: input.expressionState,
    growthEdge,
    relationshipMemoryUsed: input.memories.length,
    layers: {
      user_experience: layer("user_experience", input.userMessage.slice(0, 200)),
      intent_recognition: layer("intent_recognition", intent),
      blueprint_recognition: layer("blueprint_recognition", blueprintCodes.join(", ")),
      expression_recognition: layer("expression_recognition", input.expressionState),
      life_context: layer("life_context", lifeContext),
      relationship_synthesis: layer("relationship_synthesis", synthesis),
      growth_edge: layer("growth_edge", growthEdge),
      behaviour_validation: layer(
        "behaviour_validation",
        qaAfter.passed ? "passed" : qaAfter.flags.join(", "),
      ),
      brand_expression: layer("brand_expression", `${responseEngine}; calm, invitational, non-deterministic`),
    },
  };

  return {
    response,
    reasoning,
    qa: {
      passed: qaAfter.passed,
      flags: qaAfter.flags,
      revised: !qaCheck.passed,
    },
  };
}
