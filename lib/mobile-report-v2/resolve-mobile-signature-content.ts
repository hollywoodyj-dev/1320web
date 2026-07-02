import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import type { SignatureCodeCardKey } from "@/lib/full-report-v2/signature-static";
import {
  MOBILE_SIGNATURE_BLUEPRINT_SUBTITLE,
  MOBILE_SIGNATURE_BIRTH_LABEL,
  MOBILE_SIGNATURE_BRAND_NAME,
  MOBILE_SIGNATURE_CODE_ORDER,
  MOBILE_SIGNATURE_CORE_LABEL,
  MOBILE_SIGNATURE_EXPLAIN_EMPHASIS,
  MOBILE_SIGNATURE_EXPLAIN_LEAD,
  MOBILE_SIGNATURE_EXPLAIN_TITLE,
  MOBILE_SIGNATURE_KICKER,
  MOBILE_SIGNATURE_NEXT_TITLE,
  MOBILE_SIGNATURE_PAGE_INDEX,
  MOBILE_SIGNATURE_REMINDERS,
  MOBILE_SIGNATURE_SUBTITLE,
  MOBILE_SIGNATURE_TITLE_LINES,
  MOBILE_SIGNATURE_WHAT_TITLE,
  SIGNATURE_CODE_CARD_META,
  SIGNATURE_NEXT_ITEMS,
  SIGNATURE_NEXT_NOTE,
  SIGNATURE_WHAT_ITEMS,
} from "@/lib/mobile-report-v2/signature-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileSignatureCodeLayer = {
  key: SignatureCodeCardKey;
  code: string;
  title: string;
  dimension: string;
  description: string;
  fallbackIcon: string;
  imageUrl?: string;
};

export type MobileSignaturePageContent = {
  brandName: string;
  pageIndex: string;
  kicker: string;
  titleLines: string[];
  subtitle: string;
  birthLabel: string;
  birthDateDisplay: string;
  sampleLabel: string;
  coreLabel: string;
  signatureLine: string;
  blueprintSubtitle: string;
  codeLayers: MobileSignatureCodeLayer[];
  whatTitle: string;
  whatItems: Array<{ icon: string; text: string }>;
  explainTitle: string;
  explainLead: string;
  explainEmphasis: string;
  nextTitle: string;
  nextItems: Array<{ icon: string; text: string }>;
  nextNote: string;
  reminders: Array<{ icon: string; text: string }>;
};

export function resolveMobileSignatureContent(payload: FullReportV2Payload): MobileSignaturePageContent {
  const { client, report, calculation } = payload;

  const codeLayers: MobileSignatureCodeLayer[] = MOBILE_SIGNATURE_CODE_ORDER.map((key) => {
    const meta = SIGNATURE_CODE_CARD_META[key];
    const layer = calculation[key];
    return {
      key,
      code: layer.code,
      title: layer.title,
      dimension: meta.dimension,
      description: meta.description,
      fallbackIcon: meta.icon,
      imageUrl: getSignatureCardImageUrl(key, calculation),
    };
  });

  const signatureLine = codeLayers.map((layer) => layer.code).join(" | ");

  return {
    brandName: MOBILE_SIGNATURE_BRAND_NAME,
    pageIndex: MOBILE_SIGNATURE_PAGE_INDEX,
    kicker: MOBILE_SIGNATURE_KICKER,
    titleLines: [...MOBILE_SIGNATURE_TITLE_LINES],
    subtitle: MOBILE_SIGNATURE_SUBTITLE,
    birthLabel: MOBILE_SIGNATURE_BIRTH_LABEL,
    birthDateDisplay: client.birth_date_display,
    sampleLabel: report.type,
    coreLabel: MOBILE_SIGNATURE_CORE_LABEL,
    signatureLine,
    blueprintSubtitle: MOBILE_SIGNATURE_BLUEPRINT_SUBTITLE,
    codeLayers,
    whatTitle: MOBILE_SIGNATURE_WHAT_TITLE,
    whatItems: [...SIGNATURE_WHAT_ITEMS],
    explainTitle: MOBILE_SIGNATURE_EXPLAIN_TITLE,
    explainLead: MOBILE_SIGNATURE_EXPLAIN_LEAD,
    explainEmphasis: MOBILE_SIGNATURE_EXPLAIN_EMPHASIS,
    nextTitle: MOBILE_SIGNATURE_NEXT_TITLE,
    nextItems: SIGNATURE_NEXT_ITEMS.map((item) => ({
      icon: item.icon,
      text: item.text,
    })),
    nextNote: SIGNATURE_NEXT_NOTE,
    reminders: [...MOBILE_SIGNATURE_REMINDERS],
  };
}
