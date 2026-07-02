import {
  INTEGRATED_CODE_ROLES,
  INTEGRATED_PAGE_HERO,
  INTEGRATED_SEE_IT_COPY,
  INTEGRATED_SYNERGY_SECTIONS,
} from "@/lib/full-report-v2/integrated-page-static";
import { sanitizeCustomerFacingCopy } from "@/lib/report/customer-facing-copy";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type IntegratedCodeCard = {
  key: "s1" | "s2" | "s3" | "s0";
  code: string;
  label: string;
  title: string;
};

export type SoulCodeLogo = "flame" | "mirror" | "waves" | "ring";

export type IntegratedSynergyItem = {
  title: string;
  copy: string;
  icon: SoulCodeLogo;
};

export type IntegratedFlowStep = {
  title: string;
  copy: string;
  icon: SoulCodeLogo;
};

export type IntegratedPageContent = {
  hero: typeof INTEGRATED_PAGE_HERO;
  codes: IntegratedCodeCard[];
  codeRoles: typeof INTEGRATED_CODE_ROLES;
  archetypeTitle: string;
  archetypeSummary: string;
  gifts: string[];
  s1Expression: string;
  s2Expression: string;
  s3Expression: string;
  s0Expression: string;
  synergies: IntegratedSynergyItem[];
  flowSteps: IntegratedFlowStep[];
  integrationGuidance: string;
  seeItCopy: string;
  finalRemembrance: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? sanitizeCustomerFacingCopy(value.trim()) : "";
}

function slotString(slot: Record<string, unknown>, key: string): string {
  return asString(slot[key]);
}

export function resolveIntegratedPageContent(payload: FullReportV2Payload): IntegratedPageContent {
  const integrated = payload.integrated_blueprint;
  const calc = payload.calculation;

  const codes: IntegratedCodeCard[] = [
    {
      key: "s1",
      code: calc.s1.code,
      label: "Soul Origin",
      title: calc.s1.title || slotString(payload.modules.s1, "title"),
    },
    {
      key: "s2",
      code: calc.s2.code,
      label: "Soul Mirror",
      title: calc.s2.title || slotString(payload.modules.s2, "title"),
    },
    {
      key: "s3",
      code: calc.s3.code,
      label: "Soul Vibration",
      title: calc.s3.title || slotString(payload.modules.s3, "title"),
    },
    {
      key: "s0",
      code: calc.s0.code,
      label: "Void Gate",
      title: calc.s0.title || slotString(payload.modules.s0, "title"),
    },
  ];

  const synergyCopyById: Record<string, string> = {
    essence_vibration: asString(integrated.synergy_essence_vibration),
    mirror_vibration: asString(integrated.synergy_mirror_vibration),
    essence_mirror: asString(integrated.synergy_essence_mirror),
    void_all: asString(integrated.synergy_void_all),
  };

  const synergies: IntegratedSynergyItem[] = INTEGRATED_SYNERGY_SECTIONS.map((section) => ({
    title: section.title,
    copy: synergyCopyById[section.id],
    icon: section.icon,
  }));

  const flowSteps: IntegratedFlowStep[] = [
    {
      title: asString(integrated.flow_1_title) || "Transform",
      copy: asString(integrated.flow_1_copy),
      icon: "flame",
    },
    {
      title: asString(integrated.flow_2_title) || "Awaken",
      copy: asString(integrated.flow_2_copy),
      icon: "mirror",
    },
    {
      title: asString(integrated.flow_3_title) || "Explore",
      copy: asString(integrated.flow_3_copy),
      icon: "waves",
    },
    {
      title: asString(integrated.flow_4_title) || "Return",
      copy: asString(integrated.flow_4_copy),
      icon: "ring",
    },
  ];

  return {
    hero: INTEGRATED_PAGE_HERO,
    codes,
    codeRoles: INTEGRATED_CODE_ROLES,
    archetypeTitle: asString(integrated.archetype_title),
    archetypeSummary: asString(integrated.archetype_summary),
    gifts: [
      asString(integrated.gift_1),
      asString(integrated.gift_2),
      asString(integrated.gift_3),
      asString(integrated.gift_4),
    ].filter(Boolean),
    s1Expression: asString(integrated.s1_expression),
    s2Expression: asString(integrated.s2_expression),
    s3Expression: asString(integrated.s3_expression),
    s0Expression: asString(integrated.s0_expression),
    synergies,
    flowSteps,
    integrationGuidance: asString(integrated.integration_guidance),
    seeItCopy: INTEGRATED_SEE_IT_COPY,
    finalRemembrance: asString(integrated.final_remembrance),
  };
}
