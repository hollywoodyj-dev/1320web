/** FS-008 — Living Blueprint / Membership types. */

export const LIVING_BLUEPRINT_VERSION = "living-blueprint-v1" as const;

export type MemoryLayer = "blueprint" | "reflection" | "expression" | "journey";

export type LivingBlueprintSnapshot = {
  version: typeof LIVING_BLUEPRINT_VERSION;
  reportId: string;
  clientName: string;
  codes: { s1: string; s3: string; s2: string; s0: string };
  expressionState: string;
  journeyStatus: string;
  membershipTier: string | null;
  lastReviewAt: string | null;
  memoriesByLayer: Record<MemoryLayer, Array<{ id: string; content: string; kind: string }>>;
  recentReflections: Array<{ id: string; kind: string; body: string; createdAt: string }>;
  continuityNote: string;
};

export type ContinuityQaResult = {
  passed: boolean;
  flags: string[];
};
