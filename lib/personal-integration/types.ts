export type {
  PersonalIntegrationSessionVariant,
  LegacySessionVariant,
  StoredSessionVariant,
} from "@/lib/personal-integration/session-catalog";

export const PERSONAL_INTEGRATION_SESSION_KIND = "personal_integration" as const;

export type PersonalIntegrationPrepPayload = {
  growthEdge: string;
  prepNotes?: string;
};
