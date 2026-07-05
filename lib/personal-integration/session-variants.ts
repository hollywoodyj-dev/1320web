import type { PersonalIntegrationSessionVariant } from "@/lib/personal-integration/types";

export const SESSION_VARIANT_LABELS: Record<PersonalIntegrationSessionVariant, string> = {
  intro: "Intro Integration Session (45 minutes)",
  deep: "Deep Integration Session (75 minutes)",
  integration: "Focused Integration Session (60 minutes)",
  "not-sure": "Personal Integration Session",
};

export function isPersonalIntegrationSessionVariant(
  value: string,
): value is PersonalIntegrationSessionVariant {
  return value in SESSION_VARIANT_LABELS;
}
