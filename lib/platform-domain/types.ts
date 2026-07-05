/**
 * FS-005A — 1320 Platform Domain Model types.
 * Six core objects shared by FS-006 / FS-007 / FS-008.
 */

import type { CanonicalFullReport } from "@/lib/canonical-report/types";

/** Immutable symbolic structure — never overwritten by downstream systems. */
export const SOUL_BLUEPRINT_DOMAIN_VERSION = "soul-blueprint-v1" as const;

export type SoulBlueprintRef = {
  domainVersion: typeof SOUL_BLUEPRINT_DOMAIN_VERSION;
  /** Persistent row id (`soul_reports.id`) when stored. */
  reportId: string;
  userId: string;
  birthDate: string;
  combinationSignature: string;
  schemaVersion: CanonicalFullReport["schemaVersion"];
  /** Codes for quick lookup without rebuilding payload. */
  codes: {
    s1: string;
    s3: string;
    s2: string;
    s0: string;
  };
};

export type DomainAuthorship = "user" | "facilitator" | "wisewave" | "system";

export type ExpressionState =
  | "dormant"
  | "emerging"
  | "active"
  | "embodied"
  | "integrated";

export type ExpressionProfile = {
  id: string;
  userId: string;
  reportId: string;
  state: ExpressionState;
  /** Optional structured notes — never replaces Blueprint payload. */
  notes: Record<string, unknown> | null;
  authorship: DomainAuthorship;
  updatedAt: string;
};

export type RelationshipMemoryKind = "theme" | "question" | "insight" | "practice";

export type RelationshipMemory = {
  id: string;
  userId: string;
  reportId: string;
  kind: RelationshipMemoryKind;
  content: string;
  sourcePlatformSessionId: string | null;
  userRetained: boolean;
  authorship: DomainAuthorship;
  createdAt: string;
};

export type PlatformSessionKind =
  | "wisewave"
  | "personal_integration"
  | "membership_checkin"
  | "first_reflection";

export type PlatformSessionStatus = "scheduled" | "active" | "completed" | "cancelled";

/** Relationship / integration session — NOT auth cookie session. */
export type PlatformSession = {
  id: string;
  userId: string;
  reportId: string;
  kind: PlatformSessionKind;
  status: PlatformSessionStatus;
  growthEdge: string | null;
  summary: string | null;
  startedAt: string | null;
  completedAt: string | null;
  authorship: DomainAuthorship;
  createdAt: string;
};

export type ReflectionKind = "journal" | "practice" | "growth_edge" | "session_note";

export type Reflection = {
  id: string;
  userId: string;
  reportId: string;
  kind: ReflectionKind;
  body: string;
  sourcePlatformSessionId: string | null;
  authorship: DomainAuthorship;
  createdAt: string;
  deletedAt: string | null;
};

export type JourneyStatus = "active" | "paused" | "archived";

export type Journey = {
  id: string;
  userId: string;
  reportId: string;
  status: JourneyStatus;
  membershipTier: string | null;
  lastReviewAt: string | null;
  meta: Record<string, unknown> | null;
  authorship: DomainAuthorship;
  createdAt: string;
  updatedAt: string;
};

/** Read-only bundle for consumers — Blueprint payload must not be mutated in place. */
export type SoulBlueprintSnapshot = {
  ref: SoulBlueprintRef;
  canonical: CanonicalFullReport;
};

export type PlatformDomainObjects = {
  soulBlueprint: SoulBlueprintRef;
  expressionProfile: ExpressionProfile | null;
  relationshipMemories: RelationshipMemory[];
  platformSessions: PlatformSession[];
  reflections: Reflection[];
  journey: Journey | null;
};
