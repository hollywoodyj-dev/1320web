import { resolveSharedS8Section } from "@/lib/canonical-report/shared-expansion-resolvers";
import { resolveS8PrimaryIconAsset } from "@/lib/full-report-v2/s8-icon-registry";
import { getMobileS0RevealBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s0-reveal-background";
import {
  firstSentence,
  joinEssenceParagraphs,
  padStringList,
  pickOrFallback,
  pickStringAt,
} from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import {
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_BRAND_NAME,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_BRAND_SUBTITLE,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_CODE_FALLBACK,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_CONTRIBUTION_ICON_DESCRIPTION_FALLBACK,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_CONTRIBUTION_ICON_LABEL,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_CONTRIBUTION_ICON_TITLE_FALLBACK,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_ESSENCE_COPY_FALLBACK,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_ESSENCE_ICON,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_ESSENCE_TITLE,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_FALLBACK_ICON,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_KEYS,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_KEYS_TITLE,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_KICKER,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_MANTRA_CENTER,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_MANTRA_LEFT,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_MANTRA_RIGHT,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_PAGE_INDEX,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_REMINDER_BODY,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_REMINDER_ICON,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_REMINDER_LEAD,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_REMINDER_TITLE,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_SUBTITLE,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_TITLE_EMPHASIS,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_TITLE_FALLBACK,
  MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_TITLE_LINE,
} from "@/lib/mobile-report-v2/s8-soul-contribution-reveal-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS8ContributionKey = {
  key: string;
  tone: string;
  title: string;
  icon: string;
  copy: string;
};

export type MobileS8SoulContributionRevealPageContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  kicker: string;
  titleLine: string;
  titleEmphasis: string;
  subtitle: string;
  code: string;
  title: string;
  fallbackIcon: string;
  imageUrl?: string;
  iconBackgroundUrl: string;
  contributionIconLabel: string;
  contributionIconTitle: string;
  contributionIconDescription: string;
  essenceIcon: string;
  essenceTitle: string;
  essenceCopy: string;
  keysTitle: string;
  keys: MobileS8ContributionKey[];
  reminderIcon: string;
  reminderTitle: string;
  reminderLead: string;
  reminderBody: string;
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

export function resolveMobileS8SoulContributionRevealContent(
  payload: FullReportV2Payload,
): MobileS8SoulContributionRevealPageContent {
  const s8 = resolveSharedS8Section(payload);
  const code = s8.code || MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_CODE_FALLBACK;
  const title = s8.title || MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_TITLE_FALLBACK;

  const s8Icon = resolveS8PrimaryIconAsset(code, title);
  const imageUrl = s8.primary_icon_url || s8Icon.primary_icon_url || undefined;

  const contributionShowsUp = padStringList(
    [...s8.contributionShowsUp, ...s8.reflectionPrompts, pickStringAt(s8.essenceParagraphs, 1, "")],
    s8.gifts,
    5,
  );

  const keys: MobileS8ContributionKey[] = MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_KEYS.map((item, index) => ({
    key: item.key,
    tone: item.tone,
    title: item.title,
    icon: item.icon,
    copy: pickOrFallback(contributionShowsUp[index] ?? "", item.copyFallback),
  }));

  return {
    brandName: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_BRAND_NAME,
    brandSubtitle: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_BRAND_SUBTITLE,
    pageIndex: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_PAGE_INDEX,
    kicker: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_KICKER,
    titleLine: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_TITLE_LINE,
    titleEmphasis: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_TITLE_EMPHASIS,
    subtitle: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_SUBTITLE,
    code,
    title,
    fallbackIcon: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_FALLBACK_ICON,
    imageUrl,
    iconBackgroundUrl: getMobileS0RevealBackgroundUrl(),
    contributionIconLabel: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_CONTRIBUTION_ICON_LABEL,
    contributionIconTitle: pickOrFallback(title, MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_CONTRIBUTION_ICON_TITLE_FALLBACK),
    contributionIconDescription: pickOrFallback(
      firstSentence(pickStringAt(s8.contributionShowsUp, 0, s8.essenceParagraphs[0] ?? "")),
      MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_CONTRIBUTION_ICON_DESCRIPTION_FALLBACK,
    ),
    essenceIcon: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_ESSENCE_ICON,
    essenceTitle: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_ESSENCE_TITLE,
    essenceCopy: pickOrFallback(
      joinEssenceParagraphs(s8.essenceParagraphs),
      MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_ESSENCE_COPY_FALLBACK,
    ),
    keysTitle: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_KEYS_TITLE,
    keys,
    reminderIcon: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_REMINDER_ICON,
    reminderTitle: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_REMINDER_TITLE,
    reminderLead: pickOrFallback(s8.integrationGuidance, MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_REMINDER_LEAD),
    reminderBody: pickOrFallback(s8.finalRemembrance, MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_REMINDER_BODY),
    mantraLeft: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_MANTRA_LEFT,
    mantraCenter: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_MANTRA_CENTER,
    mantraRight: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_S8_SOUL_CONTRIBUTION_REVEAL_FOOTER_LOTUS_LOGO_SRC,
  };
}
