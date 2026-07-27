/** Locked foundation presentation order for all Session / Facilitator views. */
export const FOUNDATION_ORDER = ["s1", "s3", "s2", "s0"] as const;
export type FoundationSegmentKey = (typeof FOUNDATION_ORDER)[number];

export const FOUNDATION_LABELS: Record<FoundationSegmentKey, string> = {
  s1: "S1",
  s3: "S3",
  s2: "S2",
  s0: "S0",
};

export const ADVANCED_ORDER = ["s4", "s5", "s6", "s7", "s8", "s9"] as const;
export type AdvancedSegmentKey = (typeof ADVANCED_ORDER)[number];

/** Max tentative advanced-layer suggestions in a standard session. */
export const MAX_ADVANCED_SUGGESTIONS = 2;

export const INTAKE_STATUSES = ["not_started", "draft", "submitted", "reviewed"] as const;
export type IntakeStatus = (typeof INTAKE_STATUSES)[number];

export const SUMMARY_STATUSES = ["none", "draft", "ready_for_review", "published", "sent"] as const;
export type SummaryStatus = (typeof SUMMARY_STATUSES)[number];

export const INTAKE_CONSENT_VERSION = "pi-intake-consent-v1.1-easy-access" as const;
