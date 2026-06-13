import { get1320V2ContentFromBirthDate } from "@/lib/get1320V2Content";
import type { FullReportBlock, FullReportScreenPayload } from "@/lib/full-report/build-full-report-payload";
import { FULL_REPORT_V2_TEST_SCREENS } from "@/lib/full-report/screen-manifest-v2-test";
import { pickLocalized } from "@/lib/getLocalized";

function sectionHeader(title: string, code?: string): FullReportBlock[] {
  const blocks: FullReportBlock[] = [{ type: "text", variant: "title", text: title }];
  if (code?.trim()) blocks.push({ type: "text", variant: "subtitle", text: code });
  return blocks;
}

function field(label: string, value: string, items?: string[]): FullReportBlock | null {
  if (!value.trim() && !items?.length) return null;
  return { type: "fields", items: [{ label, value, items }] };
}

function fieldsBlock(...items: (FullReportBlock | null)[]): FullReportBlock {
  const fields = items
    .filter((b): b is FullReportBlock => Boolean(b))
    .flatMap((b) => (b.type === "fields" ? b.items : []));
  return { type: "fields", items: fields };
}

function findSection(
  sections: { label: { en: string }; body: { en: string } }[] | undefined,
  labelEn: string,
): string {
  const section = sections?.find((s) => s.label.en === labelEn);
  return section?.body.en ?? "—";
}

export function buildFullReportV2TestPayload(birthDate: string): FullReportScreenPayload[] {
  const v2 = get1320V2ContentFromBirthDate(birthDate);
  const codes = v2.codes;
  const s7 = v2.s7Content;
  const sections = s7.soulMissionSections;

  const entry = {
    archetype: pickLocalized(s7.title, "en"),
    sovereignty_essence: findSection(sections, "Sovereignty Essence"),
    what_your_soul_is_learning_to_reclaim: findSection(
      sections,
      "What Your Soul Is Learning to Reclaim",
    ),
    where_power_was_given_away: findSection(sections, "Where Power Was Given Away"),
    natural_sovereignty_fields: findSection(sections, "Natural Sovereignty Fields")
      .split("\n")
      .map((line) => line.replace(/^•\s*/, "").trim())
      .filter(Boolean),
    shadow_distortion_of_sovereignty: findSection(sections, "Shadow Distortion of Sovereignty"),
    mature_sovereignty_expression: findSection(sections, "Mature Sovereignty Expression"),
    wisewave_reflection: findSection(sections, "Wisewave Reflection"),
    safe_language_note: pickLocalized(s7.integrationPrompt ?? { en: "" }, "en"),
  };

  const calcNote = `v2 calc inputs — ${codes.s4Code}, ${codes.s6Code} → ${codes.s7Code}`;
  const disclaimer = entry?.safe_language_note?.trim();

  const s7Divider: FullReportScreenPayload = {
    screen: FULL_REPORT_V2_TEST_SCREENS[0],
    blocks: [
      ...sectionHeader("Soul Sovereignty", codes.s7Code),
      { type: "text", variant: "body", text: entry?.archetype ?? "S7 v2 content test" },
      { type: "text", variant: "eyebrow", text: calcNote },
      {
        type: "text",
        variant: "disclaimer",
        text: "Placeholder Lumen art — S7 backgrounds pending. Content from 1320 v2 database.",
      },
    ],
  };

  const s7Essence: FullReportScreenPayload = {
    screen: FULL_REPORT_V2_TEST_SCREENS[1],
    blocks: [
      ...sectionHeader("Sovereignty Essence", codes.s7Code),
      fieldsBlock(
        field("Sovereignty Essence", entry?.sovereignty_essence ?? "—"),
        field("Archetype", entry?.archetype ?? "—"),
      ),
      ...(disclaimer ? [{ type: "text", variant: "disclaimer", text: disclaimer } as FullReportBlock] : []),
    ],
  };

  const s7Patterns: FullReportScreenPayload = {
    screen: FULL_REPORT_V2_TEST_SCREENS[2],
    blocks: [
      ...sectionHeader("Reclaim · Power · Fields", codes.s7Code),
      fieldsBlock(
        field("What Your Soul Is Learning to Reclaim", entry?.what_your_soul_is_learning_to_reclaim ?? "—"),
        field("Where Power Was Given Away", entry?.where_power_was_given_away ?? "—"),
        field(
          "Natural Sovereignty Fields",
          "",
          entry?.natural_sovereignty_fields ?? [],
        ),
      ),
    ],
  };

  const s7Integration: FullReportScreenPayload = {
    screen: FULL_REPORT_V2_TEST_SCREENS[3],
    blocks: [
      ...sectionHeader("Shadow · Mature Expression", codes.s7Code),
      fieldsBlock(
        field("Shadow Distortion of Sovereignty", entry?.shadow_distortion_of_sovereignty ?? "—"),
        field("Mature Sovereignty Expression", entry?.mature_sovereignty_expression ?? "—"),
        field("Wisewave Reflection", entry?.wisewave_reflection ?? "—"),
      ),
    ],
  };

  const s8Divider: FullReportScreenPayload = {
    screen: FULL_REPORT_V2_TEST_SCREENS[4],
    blocks: [
      ...sectionHeader("Soul Contribution", codes.s8Code),
      {
        type: "text",
        variant: "body",
        text:
          "Advanced Integration tier preview. S8 content import ships in Phase 2B; calculation is live (v2 chain).",
      },
      {
        type: "text",
        variant: "eyebrow",
        text: `Computed ${codes.s8Code} from S5 ${codes.s5Code} + S6 ${codes.s6Code} + S7 ${codes.s7Code}`,
      },
    ],
  };

  return [s7Divider, s7Essence, s7Patterns, s7Integration, s8Divider];
}
