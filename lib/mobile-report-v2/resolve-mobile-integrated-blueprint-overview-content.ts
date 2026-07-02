import { getMobileIntegratedBlueprintBackgroundFallbackUrl, getMobileIntegratedBlueprintBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-integrated-blueprint-background";
import {
  INTEGRATED_CODE_ROLES,
  INTEGRATED_FINAL_REMEMBRANCE,
} from "@/lib/full-report-v2/integrated-page-static";
import { resolveIntegratedPageContent } from "@/lib/full-report-v2/resolve-integrated-page-content";
import { sanitizeCustomerFacingCopy } from "@/lib/report/customer-facing-copy";
import type { SoulCodeLogo } from "@/lib/full-report-v2/soul-code-logos";
import {
  MOBILE_INTEGRATED_BLUEPRINT_ARCHETYPE_COPY_FALLBACK,
  MOBILE_INTEGRATED_BLUEPRINT_ARCHETYPE_LEAD,
  MOBILE_INTEGRATED_BLUEPRINT_ARCHETYPE_TITLE,
  MOBILE_INTEGRATED_BLUEPRINT_ARCHETYPE_TITLE_FALLBACK,
  MOBILE_INTEGRATED_BLUEPRINT_BRAND_NAME,
  MOBILE_INTEGRATED_BLUEPRINT_BRAND_SUBTITLE,
  MOBILE_INTEGRATED_BLUEPRINT_CLOSING_LINES,
  MOBILE_INTEGRATED_BLUEPRINT_CLOSING_TITLE,
  MOBILE_INTEGRATED_BLUEPRINT_CODE_ORDER,
  MOBILE_INTEGRATED_BLUEPRINT_FINAL_REMINDER_FALLBACK,
  MOBILE_INTEGRATED_BLUEPRINT_FLOW_ITEMS,
  MOBILE_INTEGRATED_BLUEPRINT_FLOW_TITLE,
  MOBILE_INTEGRATED_BLUEPRINT_GIFT_FALLBACKS,
  MOBILE_INTEGRATED_BLUEPRINT_GIFTS_TITLE,
  MOBILE_INTEGRATED_BLUEPRINT_GUIDANCE_FALLBACK,
  MOBILE_INTEGRATED_BLUEPRINT_GUIDANCE_TITLE,
  MOBILE_INTEGRATED_BLUEPRINT_KICKER,
  MOBILE_INTEGRATED_BLUEPRINT_MAP_COPY_FALLBACKS,
  MOBILE_INTEGRATED_BLUEPRINT_MAP_TITLE,
  MOBILE_INTEGRATED_BLUEPRINT_MODULE_LABELS,
  MOBILE_INTEGRATED_BLUEPRINT_PAGE_INDEX,
  MOBILE_INTEGRATED_BLUEPRINT_SHORT_LINE_FALLBACKS,
  MOBILE_INTEGRATED_BLUEPRINT_SOUL_CODES_TITLE,
  MOBILE_INTEGRATED_BLUEPRINT_SUBTITLE_LINES,
  MOBILE_INTEGRATED_BLUEPRINT_SYNERGY_ITEMS,
  MOBILE_INTEGRATED_BLUEPRINT_SYNERGY_TITLE,
  MOBILE_INTEGRATED_BLUEPRINT_TITLE_EMPHASIS,
  MOBILE_INTEGRATED_BLUEPRINT_TITLE_LINE,
  MOBILE_INTEGRATED_BLUEPRINT_WORK_ITEMS,
  MOBILE_INTEGRATED_BLUEPRINT_WORK_TITLE,
  type MobileIntegratedCodeKey,
} from "@/lib/mobile-report-v2/integrated-blueprint-overview-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileIntegratedSoulCode = {
  key: MobileIntegratedCodeKey;
  code: string;
  mapLabel: string;
  moduleLabel: string;
  title: string;
  shortLine: string;
};

export type MobileIntegratedWorkItem = {
  key: MobileIntegratedCodeKey;
  badge: string;
  title: string;
  copy: string;
};

export type MobileIntegratedSynergyItem = {
  title: string;
  icon: SoulCodeLogo;
  copy: string;
};

export type MobileIntegratedFlowItem = {
  title: string;
  icon: SoulCodeLogo;
  copy: string;
};

export type MobileIntegratedBlueprintOverviewContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  kicker: string;
  titleLine: string;
  titleEmphasis: string;
  subtitleLines: string[];
  soulCodesTitle: string;
  soulCodes: MobileIntegratedSoulCode[];
  mapTitle: string;
  mapBackgroundUrl: string;
  mapBackgroundFallbackUrl: string;
  mapCopy: Record<MobileIntegratedCodeKey, string>;
  workTitle: string;
  workItems: MobileIntegratedWorkItem[];
  archetypeTitle: string;
  archetypeLead: string;
  archetypeBlendTitle: string;
  archetypeBlendCopy: string;
  synergyTitle: string;
  synergies: MobileIntegratedSynergyItem[];
  flowTitle: string;
  flowItems: MobileIntegratedFlowItem[];
  giftsTitle: string;
  gifts: string[];
  guidanceTitle: string;
  integrationGuidance: string;
  closingTitle: string;
  closingLines: string[];
  finalReminder: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? sanitizeCustomerFacingCopy(value.trim()) : "";
}

function pickOrFallback(value: string, fallback: string): string {
  return value || fallback;
}

function mapLabelFromCode(code: string, key: MobileIntegratedCodeKey): string {
  const match = /^S[0-3]-/i.test(code) ? key.toUpperCase() : "";
  return match || key.toUpperCase();
}

function buildShortLine(key: MobileIntegratedCodeKey, slot: Record<string, unknown>): string {
  const essence = asString(slot.essence);
  const relationship = asString(slot.relationship_dynamic);
  const coreIllusion = asString(slot.core_illusion);
  const guidance = asString(slot.wisewave_guidance);

  switch (key) {
    case "s1":
      return essence || MOBILE_INTEGRATED_BLUEPRINT_SHORT_LINE_FALLBACKS.s1;
    case "s3":
      return essence || guidance.split(/(?<=[.!?])\s+/)[0] || MOBILE_INTEGRATED_BLUEPRINT_SHORT_LINE_FALLBACKS.s3;
    case "s2":
      return relationship || essence || MOBILE_INTEGRATED_BLUEPRINT_SHORT_LINE_FALLBACKS.s2;
    case "s0":
      return coreIllusion || essence || MOBILE_INTEGRATED_BLUEPRINT_SHORT_LINE_FALLBACKS.s0;
  }
}

function buildWorkCopy(key: MobileIntegratedCodeKey, integratedContent: ReturnType<typeof resolveIntegratedPageContent>): string {
  const role = integratedContent.codeRoles.find((item) => item.key === key);
  const staticItem = MOBILE_INTEGRATED_BLUEPRINT_WORK_ITEMS.find((item) => item.key === key);
  return pickOrFallback(role?.copy ?? "", staticItem?.copyFallback ?? "");
}

export function resolveMobileIntegratedBlueprintOverviewContent(
  payload: FullReportV2Payload,
): MobileIntegratedBlueprintOverviewContent {
  const integratedContent = resolveIntegratedPageContent(payload);
  const calc = payload.calculation;

  const codeMeta: Record<
    MobileIntegratedCodeKey,
    { code: string; title: string; slot: Record<string, unknown> }
  > = {
    s1: { code: calc.s1.code, title: calc.s1.title, slot: payload.modules.s1 },
    s3: { code: calc.s3.code, title: calc.s3.title, slot: payload.modules.s3 },
    s2: { code: calc.s2.code, title: calc.s2.title, slot: payload.modules.s2 },
    s0: { code: calc.s0.code, title: calc.s0.title, slot: payload.modules.s0 },
  };

  const soulCodes: MobileIntegratedSoulCode[] = MOBILE_INTEGRATED_BLUEPRINT_CODE_ORDER.map((key) => {
    const meta = codeMeta[key];
    const title = asString(meta.slot.title) || meta.title;
    return {
      key,
      code: meta.code,
      mapLabel: mapLabelFromCode(meta.code, key),
      moduleLabel: MOBILE_INTEGRATED_BLUEPRINT_MODULE_LABELS[key],
      title,
      shortLine: buildShortLine(key, meta.slot),
    };
  });

  const mapCopy = MOBILE_INTEGRATED_BLUEPRINT_CODE_ORDER.reduce(
    (acc, key) => {
      const expression =
        key === "s1"
          ? integratedContent.s1Expression
          : key === "s3"
            ? integratedContent.s3Expression
            : key === "s2"
              ? integratedContent.s2Expression
              : integratedContent.s0Expression;
      acc[key] = pickOrFallback(
        expression,
        pickOrFallback(
          integratedContent.codeRoles.find((role) => role.key === key)?.copy ?? "",
          MOBILE_INTEGRATED_BLUEPRINT_MAP_COPY_FALLBACKS[key],
        ),
      );
      return acc;
    },
    {} as Record<MobileIntegratedCodeKey, string>,
  );

  const workItems: MobileIntegratedWorkItem[] = MOBILE_INTEGRATED_BLUEPRINT_WORK_ITEMS.map((item) => ({
    key: item.key,
    badge: item.badge,
    title: item.title,
    copy: buildWorkCopy(item.key, integratedContent),
  }));

  const synergyCopyByTitle: Record<string, string> = {};
  integratedContent.synergies.forEach((item, index) => {
    synergyCopyByTitle[item.title] = item.copy;
    const staticItem = MOBILE_INTEGRATED_BLUEPRINT_SYNERGY_ITEMS[index];
    if (staticItem && !synergyCopyByTitle[staticItem.title]) {
      synergyCopyByTitle[staticItem.title] = item.copy;
    }
  });

  const synergies: MobileIntegratedSynergyItem[] = MOBILE_INTEGRATED_BLUEPRINT_SYNERGY_ITEMS.map(
    (item, index) => ({
      title: item.title,
      icon: item.icon,
      copy: pickOrFallback(
        synergyCopyByTitle[item.title] || integratedContent.synergies[index]?.copy,
        item.copyFallback,
      ),
    }),
  );

  const flowItems: MobileIntegratedFlowItem[] = MOBILE_INTEGRATED_BLUEPRINT_FLOW_ITEMS.map(
    (item, index) => ({
      title: pickOrFallback(integratedContent.flowSteps[index]?.title, item.title),
      icon: item.icon,
      copy: pickOrFallback(integratedContent.flowSteps[index]?.copy, item.copyFallback),
    }),
  );

  const gifts =
    integratedContent.gifts.length >= 4
      ? integratedContent.gifts.slice(0, 4)
      : [
          ...integratedContent.gifts,
          ...MOBILE_INTEGRATED_BLUEPRINT_GIFT_FALLBACKS.slice(integratedContent.gifts.length),
        ].slice(0, 4);

  return {
    brandName: MOBILE_INTEGRATED_BLUEPRINT_BRAND_NAME,
    brandSubtitle: MOBILE_INTEGRATED_BLUEPRINT_BRAND_SUBTITLE,
    pageIndex: MOBILE_INTEGRATED_BLUEPRINT_PAGE_INDEX,
    kicker: MOBILE_INTEGRATED_BLUEPRINT_KICKER,
    titleLine: MOBILE_INTEGRATED_BLUEPRINT_TITLE_LINE,
    titleEmphasis: MOBILE_INTEGRATED_BLUEPRINT_TITLE_EMPHASIS,
    subtitleLines: [...MOBILE_INTEGRATED_BLUEPRINT_SUBTITLE_LINES],
    soulCodesTitle: MOBILE_INTEGRATED_BLUEPRINT_SOUL_CODES_TITLE,
    soulCodes,
    mapTitle: MOBILE_INTEGRATED_BLUEPRINT_MAP_TITLE,
    mapBackgroundUrl: getMobileIntegratedBlueprintBackgroundUrl(),
    mapBackgroundFallbackUrl: getMobileIntegratedBlueprintBackgroundFallbackUrl(),
    mapCopy,
    workTitle: MOBILE_INTEGRATED_BLUEPRINT_WORK_TITLE,
    workItems,
    archetypeTitle: MOBILE_INTEGRATED_BLUEPRINT_ARCHETYPE_TITLE,
    archetypeLead: MOBILE_INTEGRATED_BLUEPRINT_ARCHETYPE_LEAD,
    archetypeBlendTitle: pickOrFallback(
      integratedContent.archetypeTitle,
      MOBILE_INTEGRATED_BLUEPRINT_ARCHETYPE_TITLE_FALLBACK,
    ),
    archetypeBlendCopy: pickOrFallback(
      integratedContent.archetypeSummary,
      MOBILE_INTEGRATED_BLUEPRINT_ARCHETYPE_COPY_FALLBACK,
    ),
    synergyTitle: MOBILE_INTEGRATED_BLUEPRINT_SYNERGY_TITLE,
    synergies,
    flowTitle: MOBILE_INTEGRATED_BLUEPRINT_FLOW_TITLE,
    flowItems,
    giftsTitle: MOBILE_INTEGRATED_BLUEPRINT_GIFTS_TITLE,
    gifts,
    guidanceTitle: MOBILE_INTEGRATED_BLUEPRINT_GUIDANCE_TITLE,
    integrationGuidance: pickOrFallback(
      integratedContent.integrationGuidance,
      MOBILE_INTEGRATED_BLUEPRINT_GUIDANCE_FALLBACK,
    ),
    closingTitle: MOBILE_INTEGRATED_BLUEPRINT_CLOSING_TITLE,
    closingLines: [...MOBILE_INTEGRATED_BLUEPRINT_CLOSING_LINES],
    finalReminder: pickOrFallback(
      integratedContent.finalRemembrance || INTEGRATED_FINAL_REMEMBRANCE,
      MOBILE_INTEGRATED_BLUEPRINT_FINAL_REMINDER_FALLBACK,
    ),
  };
}
