/** FS-007 — Wisewave API types (Reasoning Architecture + Conversation). */

export const WISEWAVE_API_VERSION = "wisewave-api-v1" as const;

export type ReasoningLayerId =
  | "user_experience"
  | "intent_recognition"
  | "blueprint_recognition"
  | "expression_recognition"
  | "life_context"
  | "relationship_synthesis"
  | "growth_edge"
  | "behaviour_validation"
  | "brand_expression";

export type WisewaveIntent =
  | "understanding"
  | "reflection"
  | "reassurance"
  | "clarity"
  | "emotional_processing"
  | "integration"
  | "curiosity";

export type ReasoningLayerRecord = {
  summary: string;
};

export type ReasoningAudit = {
  version: typeof WISEWAVE_API_VERSION;
  intent: WisewaveIntent;
  layers: Record<ReasoningLayerId, ReasoningLayerRecord>;
  blueprintCodesReferenced: string[];
  expressionState: string;
  growthEdge: string | null;
  relationshipMemoryUsed: number;
};

export type RelationshipQaResult = {
  passed: boolean;
  flags: string[];
  revised: boolean;
};

export type WisewaveTurnResult = {
  sessionId: string;
  userMessage: string;
  response: string;
  reasoning: ReasoningAudit;
  qa: RelationshipQaResult;
};

export type WisewaveSessionContext = {
  sessionId: string;
  accessToken: string;
  reportId: string;
  clientName: string;
  codes: { s1: string; s3: string; s2: string; s0: string };
  expressionState: string;
  turns: Array<{ role: "user" | "wisewave"; content: string; createdAt: string }>;
};
