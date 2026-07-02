import { resolveSharedS7Section } from "@/lib/canonical-report/shared-expansion-resolvers";
import { getMobileS0RevealBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s0-reveal-background";
import {
  firstSentence,
  mapNodeFullCopies,
  pickOrFallback,
  pickStringAt,
  appendUniqueSentences,
} from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import { resolveS7PrimaryIconAsset } from "@/lib/full-report-v2/s7-icon-registry";
import {
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_ALIGNMENT_ITEMS,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_ALIGNMENT_NOTE,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_ALIGNMENT_TITLE,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_BRAND_NAME,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_BRAND_SUBTITLE,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_CODE_FALLBACK,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_CODE_LABEL,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_FALLBACK_ICON,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_KEY_MESSAGES,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_KEY_MESSAGES_TITLE,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_KICKER,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_MANTRA_CENTER,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_MANTRA_LEFT,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_MANTRA_RIGHT,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_ONE_LINE_SOVEREIGNTY_FALLBACK,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_PAGE_INDEX,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_REMINDER_BODY,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_REMINDER_ICON,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_REMINDER_LEAD,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_SOVEREIGN_FIELD_COPY,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_SUBTITLE,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_TITLE_EMPHASIS,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_TITLE_FALLBACK,
  MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_TITLE_LINE,
} from "@/lib/mobile-report-v2/s7-soul-sovereignty-reveal-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS7KeyMessage = {
  key: string;
  title: string;
  icon: string;
  copy: string;
};

export type MobileS7AlignmentItem = {
  key: string;
  title: string;
  icon: string;
  state: string;
  copy: string;
};

export type MobileS7SoulSovereigntyRevealPageContent = {
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
  oneLineSovereignty: string;
  sovereignFieldCopy: string;
  keyMessagesTitle: string;
  keyMessages: MobileS7KeyMessage[];
  alignmentTitle: string;
  alignmentItems: MobileS7AlignmentItem[];
  alignmentNote: string;
  reminderIcon: string;
  reminderLead: string;
  reminderBody: string;
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

const S7_KEY_MESSAGE_SOURCES = [
  (s7: ReturnType<typeof resolveSharedS7Section>) => pickStringAt(s7.essenceParagraphs, 0, ""),
  (s7: ReturnType<typeof resolveSharedS7Section>) =>
    pickStringAt(s7.essenceParagraphs, 1, s7.sovereigntyShowsUp[0] ?? ""),
  (s7: ReturnType<typeof resolveSharedS7Section>) =>
    pickStringAt(s7.sovereigntyShowsUp, 0, s7.gifts[0] ?? ""),
];

export function resolveMobileS7SoulSovereigntyRevealContent(
  payload: FullReportV2Payload,
): MobileS7SoulSovereigntyRevealPageContent {
  const s7 = resolveSharedS7Section(payload);
  const code = s7.code || MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_CODE_FALLBACK;
  const title = s7.title || MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_TITLE_FALLBACK;

  const s7Icon = resolveS7PrimaryIconAsset(code, title);
  const imageUrl = s7.primary_icon_url || s7Icon.primary_icon_url || undefined;

  const mapCopies = mapNodeFullCopies(s7.mapNodes);

  const keyMessages: MobileS7KeyMessage[] = MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_KEY_MESSAGES.map(
    (item, index) => ({
      key: item.key,
      title: item.title,
      icon: item.icon,
      copy: pickOrFallback(S7_KEY_MESSAGE_SOURCES[index]?.(s7) ?? "", item.copyFallback),
    }),
  );

  const alignmentItems: MobileS7AlignmentItem[] = MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_ALIGNMENT_ITEMS.map(
    (item, index) => ({
      key: item.key,
      title: item.title,
      icon: item.icon,
      state: pickOrFallback(s7.focusRows[index]?.label ?? "", item.stateFallback),
      copy: pickOrFallback(mapCopies[index] ?? "", item.copyFallback),
    }),
  );

  return {
    brandName: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_BRAND_NAME,
    brandSubtitle: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_BRAND_SUBTITLE,
    pageIndex: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_PAGE_INDEX,
    kicker: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_KICKER,
    titleLine: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_TITLE_LINE,
    titleEmphasis: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_TITLE_EMPHASIS,
    subtitle: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_SUBTITLE,
    codeLabel: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_CODE_LABEL,
    code,
    title,
    fallbackIcon: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_FALLBACK_ICON,
    imageUrl,
    revealBackgroundUrl: getMobileS0RevealBackgroundUrl(),
    oneLineSovereignty: pickOrFallback(
      firstSentence(
        pickStringAt(s7.essenceParagraphs, 1, s7.sovereigntyShowsUp[0] ?? s7.essenceParagraphs[0] ?? ""),
      ),
      MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_ONE_LINE_SOVEREIGNTY_FALLBACK,
    ),
    sovereignFieldCopy: pickOrFallback(
      appendUniqueSentences(s7.keyInsight, s7.reflectionPrompts),
      MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_SOVEREIGN_FIELD_COPY,
    ),
    keyMessagesTitle: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_KEY_MESSAGES_TITLE,
    keyMessages,
    alignmentTitle: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_ALIGNMENT_TITLE,
    alignmentItems,
    alignmentNote: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_ALIGNMENT_NOTE,
    reminderIcon: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_REMINDER_ICON,
    reminderLead: pickOrFallback(s7.integrationGuidance, MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_REMINDER_LEAD),
    reminderBody: pickOrFallback(
      appendUniqueSentences(s7.finalRemembrance, s7.reflectionPrompts.slice(1)),
      MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_REMINDER_BODY,
    ),
    mantraLeft: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_MANTRA_LEFT,
    mantraCenter: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_MANTRA_CENTER,
    mantraRight: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_S7_SOUL_SOVEREIGNTY_REVEAL_FOOTER_LOTUS_LOGO_SRC,
  };
}
