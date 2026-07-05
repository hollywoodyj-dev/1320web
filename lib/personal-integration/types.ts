export type PersonalIntegrationSessionVariant = "intro" | "deep" | "integration" | "not-sure";

export const PERSONAL_INTEGRATION_SESSION_KIND = "personal_integration" as const;

export type PersonalIntegrationPrepPayload = {
  growthEdge: string;
  prepNotes?: string;
};
