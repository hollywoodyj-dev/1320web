import {
  CLOSING_BEFORE_FORWARD_COPY,
  CLOSING_BEFORE_FORWARD_TITLE,
  CLOSING_BLESSING_LINES,
  CLOSING_BLESSING_TITLE,
  CLOSING_FINAL_REFLECTION_PROMPT,
  CLOSING_FINAL_REFLECTION_TITLE,
  CLOSING_FOOTER_MANTRA,
  CLOSING_GENTLE_INTEGRATION_COPY,
  CLOSING_GENTLE_INTEGRATION_TITLE,
  CLOSING_INSIGHT_DEFAULT,
  CLOSING_INSIGHT_LEAD,
  CLOSING_INSIGHT_TITLE,
  CLOSING_LIVING_BLUEPRINT_COPY,
  CLOSING_LIVING_BLUEPRINT_TITLE,
  CLOSING_NEXT_STEP_DEFAULT,
  CLOSING_NEXT_STEP_TITLE,
  CLOSING_PAGE_HERO,
  CLOSING_REMEMBER_ITEMS,
  CLOSING_REMEMBER_TITLE,
  CLOSING_SEAL_NODES,
  CLOSING_SEAL_TITLE,
  CLOSING_SHOWN_COPY,
  CLOSING_SHOWN_TITLE,
  CLOSING_STATEMENT_LINES,
} from "@/lib/full-report-v2/closing-page-static";
import {
  CLOSING_INTEGRATION_SEAL_LOGO_ALTS,
  CLOSING_INTEGRATION_SEAL_LOGO_URLS,
} from "@/lib/full-report-v2/closing-integration-seal-logos";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type ClosingSealNode = {
  position: "top" | "right" | "bottom" | "left";
  title: string;
  copy: string;
  icon: string;
  iconUrl: string;
  iconAlt: string;
};

export type ClosingPageContent = {
  hero: typeof CLOSING_PAGE_HERO;
  shownTitle: string;
  shownCopy: string[];
  rememberTitle: string;
  rememberItems: string[];
  beforeForwardTitle: string;
  beforeForwardCopy: string;
  sealTitle: string;
  sealNodes: ClosingSealNode[];
  statementLines: string[];
  blessingTitle: string;
  blessingLines: string[];
  finalReflectionTitle: string;
  finalReflectionPrompt: string;
  nextStepTitle: string;
  nextStep: string;
  gentleIntegrationTitle: string;
  gentleIntegrationCopy: string;
  livingBlueprintTitle: string;
  livingBlueprintCopy: string;
  closingInsightTitle: string;
  closingInsightLead: string;
  closingInsight: string;
  footerMantra: string[];
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function resolveClosingPageContent(payload: FullReportV2Payload): ClosingPageContent {
  const blueprint = payload.integrated_blueprint;
  const archetypeTitle = asString(blueprint.archetype_title);
  const name = asString(payload.client.name);

  const shownCopy: string[] = [...CLOSING_SHOWN_COPY];
  if (archetypeTitle) {
    shownCopy[0] = `${shownCopy[0]} Your integrated archetype — ${archetypeTitle} — is a mirror, not a cage.`;
  }

  const blessingLines: string[] = [...CLOSING_BLESSING_LINES];
  if (name) {
    blessingLines[0] = `May you walk forward with clarity, ${name}.`;
  }

  const reflectionQuestions = blueprint.reflection_questions;
  const finalReflectionPrompt =
    (Array.isArray(reflectionQuestions) && asString(reflectionQuestions[0])) ||
    CLOSING_FINAL_REFLECTION_PROMPT;

  return {
    hero: CLOSING_PAGE_HERO,
    shownTitle: CLOSING_SHOWN_TITLE,
    shownCopy,
    rememberTitle: CLOSING_REMEMBER_TITLE,
    rememberItems: [...CLOSING_REMEMBER_ITEMS],
    beforeForwardTitle: CLOSING_BEFORE_FORWARD_TITLE,
    beforeForwardCopy: CLOSING_BEFORE_FORWARD_COPY,
    sealTitle: CLOSING_SEAL_TITLE,
    sealNodes: CLOSING_SEAL_NODES.map((node) => ({
      ...node,
      iconUrl: CLOSING_INTEGRATION_SEAL_LOGO_URLS[node.position],
      iconAlt: CLOSING_INTEGRATION_SEAL_LOGO_ALTS[node.position],
    })),
    statementLines: [...CLOSING_STATEMENT_LINES],
    blessingTitle: CLOSING_BLESSING_TITLE,
    blessingLines,
    finalReflectionTitle: CLOSING_FINAL_REFLECTION_TITLE,
    finalReflectionPrompt,
    nextStepTitle: CLOSING_NEXT_STEP_TITLE,
    nextStep: asString(blueprint.embodiment_practice) || CLOSING_NEXT_STEP_DEFAULT,
    gentleIntegrationTitle: CLOSING_GENTLE_INTEGRATION_TITLE,
    gentleIntegrationCopy:
      asString(blueprint.integration_guidance) || CLOSING_GENTLE_INTEGRATION_COPY,
    livingBlueprintTitle: CLOSING_LIVING_BLUEPRINT_TITLE,
    livingBlueprintCopy: CLOSING_LIVING_BLUEPRINT_COPY,
    closingInsightTitle: CLOSING_INSIGHT_TITLE,
    closingInsightLead: CLOSING_INSIGHT_LEAD,
    closingInsight: asString(blueprint.final_remembrance) || CLOSING_INSIGHT_DEFAULT,
    footerMantra: [...CLOSING_FOOTER_MANTRA],
  };
}
