import { resolveSharedS5Section } from "@/lib/canonical-report/shared-foundation-resolvers";
import { getMobileS0RevealBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s0-reveal-background";
import {
  firstSentence,
  joinEssenceParagraphs,
  mapNodeShortCopies,
  padStringList,
  pickOrFallback,
  pickStringAt,
  uniqueStrings,
  appendUniqueSentences,
} from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import { resolveS5PrimaryIconAsset } from "@/lib/full-report-v2/s5-icon-registry";
import {
  MOBILE_S5_SOUL_MISSION_REVEAL_ALIGNMENT_KEYS_FALLBACK,
  MOBILE_S5_SOUL_MISSION_REVEAL_ALIGNMENT_TITLE,
  MOBILE_S5_SOUL_MISSION_REVEAL_BRAND_NAME,
  MOBILE_S5_SOUL_MISSION_REVEAL_BRAND_SUBTITLE,
  MOBILE_S5_SOUL_MISSION_REVEAL_CODE_FALLBACK,
  MOBILE_S5_SOUL_MISSION_REVEAL_CODE_LABEL,
  MOBILE_S5_SOUL_MISSION_REVEAL_ESSENCE_ICON,
  MOBILE_S5_SOUL_MISSION_REVEAL_ESSENCE_LOGO_SRC,
  MOBILE_S5_SOUL_MISSION_REVEAL_ESSENCE_TITLE,
  MOBILE_S5_SOUL_MISSION_REVEAL_EXPRESSIONS_FALLBACK,
  MOBILE_S5_SOUL_MISSION_REVEAL_EXPRESSIONS_TITLE,
  MOBILE_S5_SOUL_MISSION_REVEAL_FALLBACK_ICON,
  MOBILE_S5_SOUL_MISSION_REVEAL_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_S5_SOUL_MISSION_REVEAL_KICKER,
  MOBILE_S5_SOUL_MISSION_REVEAL_MANTRA_CENTER,
  MOBILE_S5_SOUL_MISSION_REVEAL_MANTRA_LEFT,
  MOBILE_S5_SOUL_MISSION_REVEAL_MANTRA_RIGHT,
  MOBILE_S5_SOUL_MISSION_REVEAL_MISSION_ESSENCE_FALLBACK,
  MOBILE_S5_SOUL_MISSION_REVEAL_MISSION_MANTRA,
  MOBILE_S5_SOUL_MISSION_REVEAL_ONE_LINE_MISSION_FALLBACK,
  MOBILE_S5_SOUL_MISSION_REVEAL_PAGE_INDEX,
  MOBILE_S5_SOUL_MISSION_REVEAL_PRACTICE_ICON,
  MOBILE_S5_SOUL_MISSION_REVEAL_PRACTICE_TITLE,
  MOBILE_S5_SOUL_MISSION_REVEAL_PRACTICE_TODAY_FALLBACK,
  MOBILE_S5_SOUL_MISSION_REVEAL_REFLECTION_FALLBACK,
  MOBILE_S5_SOUL_MISSION_REVEAL_REFLECTION_ICON,
  MOBILE_S5_SOUL_MISSION_REVEAL_REFLECTION_TITLE,
  MOBILE_S5_SOUL_MISSION_REVEAL_SUBTITLE,
  MOBILE_S5_SOUL_MISSION_REVEAL_TITLE_EMPHASIS,
  MOBILE_S5_SOUL_MISSION_REVEAL_TITLE_FALLBACK,
  MOBILE_S5_SOUL_MISSION_REVEAL_TITLE_LINE,
} from "@/lib/mobile-report-v2/s5-soul-mission-reveal-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS5ExpressionItem = {
  title: string;
  copy: string;
  icon: string;
};

export type MobileS5SoulMissionRevealPageContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  kicker: string;
  titleLine: string;
  titleEmphasis: string;
  subtitle: string;
  codeLabel: string;
  code: string;
  title: string;
  fallbackIcon: string;
  imageUrl?: string;
  revealBackgroundUrl: string;
  oneLineMission: string;
  essenceTitle: string;
  essenceIcon: string;
  essenceLogoUrl: string;
  missionEssence: string;
  expressionsTitle: string;
  expressions: MobileS5ExpressionItem[];
  alignmentTitle: string;
  alignmentKeys: string[];
  reflectionTitle: string;
  reflectionIcon: string;
  reflectionPrompt: string;
  practiceTitle: string;
  practiceIcon: string;
  practiceToday: string;
  missionMantra: string;
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => asString(item)).filter(Boolean);
}


function buildExpressions(
  s5: ReturnType<typeof resolveSharedS5Section>,
): MobileS5ExpressionItem[] {
  const copies = padStringList(
    [...s5.missionShowsUp, ...s5.gifts],
    MOBILE_S5_SOUL_MISSION_REVEAL_EXPRESSIONS_FALLBACK.map((item) => item.copy),
    4,
  );

  return MOBILE_S5_SOUL_MISSION_REVEAL_EXPRESSIONS_FALLBACK.map((fallback, index) => ({
    title: fallback.title,
    copy: pickOrFallback(copies[index] ?? "", fallback.copy),
    icon: fallback.icon,
  }));
}

export function resolveMobileS5SoulMissionRevealContent(
  payload: FullReportV2Payload,
): MobileS5SoulMissionRevealPageContent {
  const s5 = resolveSharedS5Section(payload);
  const slot = payload.modules.s5;
  const code = s5.code || MOBILE_S5_SOUL_MISSION_REVEAL_CODE_FALLBACK;
  const title = s5.title || MOBILE_S5_SOUL_MISSION_REVEAL_TITLE_FALLBACK;

  const s5Icon = resolveS5PrimaryIconAsset(code, title);
  const imageUrl = s5.primary_icon_url || s5Icon.primary_icon_url || undefined;

  const alignmentKeys = padStringList(
    uniqueStrings(s5.missionShowsUp, s5.gifts, s5.reflectionPrompts, [s5.wisewaveGuidance]),
    MOBILE_S5_SOUL_MISSION_REVEAL_ALIGNMENT_KEYS_FALLBACK,
    Math.max(4, s5.reflectionPrompts.length),
  );

  const matureExpression = s5.mapNodes.bottom.fullCopy;
  const missionEssence = appendUniqueSentences(
    joinEssenceParagraphs(s5.essenceParagraphs),
    uniqueStrings(
      mapNodeShortCopies(s5.mapNodes),
      s5.reflectionPrompts,
      [s5.wisewaveGuidance, s5.integrationGuidance, matureExpression],
    ),
  );

  return {
    brandName: MOBILE_S5_SOUL_MISSION_REVEAL_BRAND_NAME,
    brandSubtitle: MOBILE_S5_SOUL_MISSION_REVEAL_BRAND_SUBTITLE,
    pageIndex: MOBILE_S5_SOUL_MISSION_REVEAL_PAGE_INDEX,
    kicker: MOBILE_S5_SOUL_MISSION_REVEAL_KICKER,
    titleLine: MOBILE_S5_SOUL_MISSION_REVEAL_TITLE_LINE,
    titleEmphasis: MOBILE_S5_SOUL_MISSION_REVEAL_TITLE_EMPHASIS,
    subtitle: MOBILE_S5_SOUL_MISSION_REVEAL_SUBTITLE,
    codeLabel: MOBILE_S5_SOUL_MISSION_REVEAL_CODE_LABEL,
    code,
    title,
    fallbackIcon: MOBILE_S5_SOUL_MISSION_REVEAL_FALLBACK_ICON,
    imageUrl,
    revealBackgroundUrl: getMobileS0RevealBackgroundUrl(),
    oneLineMission: pickOrFallback(
      firstSentence(pickStringAt(s5.missionShowsUp, 0, s5.essenceParagraphs[0] ?? "")),
      MOBILE_S5_SOUL_MISSION_REVEAL_ONE_LINE_MISSION_FALLBACK,
    ),
    essenceTitle: MOBILE_S5_SOUL_MISSION_REVEAL_ESSENCE_TITLE,
    essenceIcon: MOBILE_S5_SOUL_MISSION_REVEAL_ESSENCE_ICON,
    essenceLogoUrl: MOBILE_S5_SOUL_MISSION_REVEAL_ESSENCE_LOGO_SRC,
    missionEssence: pickOrFallback(
      missionEssence,
      MOBILE_S5_SOUL_MISSION_REVEAL_MISSION_ESSENCE_FALLBACK,
    ),
    expressionsTitle: MOBILE_S5_SOUL_MISSION_REVEAL_EXPRESSIONS_TITLE,
    expressions: buildExpressions(s5),
    alignmentTitle: MOBILE_S5_SOUL_MISSION_REVEAL_ALIGNMENT_TITLE,
    alignmentKeys,
    reflectionTitle: MOBILE_S5_SOUL_MISSION_REVEAL_REFLECTION_TITLE,
    reflectionIcon: MOBILE_S5_SOUL_MISSION_REVEAL_REFLECTION_ICON,
    reflectionPrompt: pickOrFallback(
      pickStringAt(s5.reflectionPrompts, 0, ""),
      MOBILE_S5_SOUL_MISSION_REVEAL_REFLECTION_FALLBACK,
    ),
    practiceTitle: MOBILE_S5_SOUL_MISSION_REVEAL_PRACTICE_TITLE,
    practiceIcon: MOBILE_S5_SOUL_MISSION_REVEAL_PRACTICE_ICON,
    practiceToday: pickOrFallback(
      appendUniqueSentences(s5.integrationGuidance, [matureExpression, ...s5.reflectionPrompts.slice(1)]),
      MOBILE_S5_SOUL_MISSION_REVEAL_PRACTICE_TODAY_FALLBACK,
    ),
    missionMantra: MOBILE_S5_SOUL_MISSION_REVEAL_MISSION_MANTRA,
    mantraLeft: MOBILE_S5_SOUL_MISSION_REVEAL_MANTRA_LEFT,
    mantraCenter: MOBILE_S5_SOUL_MISSION_REVEAL_MANTRA_CENTER,
    mantraRight: MOBILE_S5_SOUL_MISSION_REVEAL_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_S5_SOUL_MISSION_REVEAL_FOOTER_LOTUS_LOGO_SRC,
  };
}
