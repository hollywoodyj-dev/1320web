/** Full 1320 Soul Origin Report v2 — payload types (spec v1.0) */

export const FULL_REPORT_V2_VERSION = "Full Report v1.0";
export const FULL_REPORT_V2_THEME_VERSION = "1320 Dark Cosmic Portal v1.0";
export const FULL_REPORT_V2_INNER_PAGE_COUNT = 18;

export type FullReportV2Client = {
  name: string;
  birth_date: string;
  birth_date_display: string;
  birth_date_iso: string;
  timezone?: string;
  language?: "en" | "zh" | "bilingual";
  report_mode?: "paid_full";
};

export type FullReportV2ReportMeta = {
  report_id: string;
  version: string;
  theme_version: string;
  generated_date: string;
  generated_time: string;
  generated_by: string;
  type: string;
};

export type FullReportV2CalculationLayer = {
  formula: string;
  raw: number;
  code: string;
  title: string;
  mod?: string;
};

export type FullReportV2S3Calculation = {
  formula: string;
  raw: number;
  code: string;
  title: string;
};

export type FullReportV2Calculation = {
  birth_date: string;
  digits?: number[];
  s1: FullReportV2CalculationLayer;
  s3: FullReportV2S3Calculation;
  s2: FullReportV2CalculationLayer;
  s0: FullReportV2CalculationLayer;
  combination_signature: string;
  s4_code?: string;
  s5_code?: string;
  s6_code?: string;
  s7_code?: string;
  s8_code?: string;
  s9_code?: string;
};

export type FullReportV2ModuleSlot = Record<string, unknown>;

export type FullReportV2IntegratedBlueprint = {
  core_essence?: string;
  energy_expression?: string;
  relationship_mirror?: string;
  awakening_path?: string;
  integrated_pattern?: string;
  main_inner_conflict?: string;
  integration_theme?: string;
  embodiment_practice?: string;
  reflection_questions?: string[];
  combination_signature?: string;
  archetype_title?: string;
  archetype_summary?: string;
  gift_1?: string;
  gift_2?: string;
  gift_3?: string;
  gift_4?: string;
  s1_expression?: string;
  s2_expression?: string;
  s3_expression?: string;
  s0_expression?: string;
  synergy_essence_vibration?: string;
  synergy_mirror_vibration?: string;
  synergy_essence_mirror?: string;
  synergy_void_all?: string;
  flow_1_title?: string;
  flow_1_copy?: string;
  flow_2_title?: string;
  flow_2_copy?: string;
  flow_3_title?: string;
  flow_3_copy?: string;
  flow_4_title?: string;
  flow_4_copy?: string;
  integration_guidance?: string;
  final_remembrance?: string;
};

export type FullReportV2IntegratedAction = {
  flow_summary?: string;
  s1_life_expression?: string;
  s3_life_expression?: string;
  s2_life_expression?: string;
  s0_life_expression?: string;
  s1_daily_action?: string;
  s3_daily_action?: string;
  s2_daily_action?: string;
  s0_daily_action?: string;
  affirmation?: string;
};

export type FullReportV2PracticeDay = {
  day: number;
  theme: string;
  practice: string;
  reflection: string;
};

export type FullReportV2IntegrationPractice = {
  days: FullReportV2PracticeDay[];
};

export type FullReportV2ReflectionJournal = {
  prompt?: string;
  placeholder?: string;
  quote?: string;
};

export type FullReportV2ClosingReflection = {
  subtitle?: string;
  message?: string;
  reminder_1_title?: string;
  reminder_1_copy?: string;
  reminder_2_title?: string;
  reminder_2_copy?: string;
  reminder_3_title?: string;
  reminder_3_copy?: string;
  reminder_4_title?: string;
  reminder_4_copy?: string;
  reminder_5_title?: string;
  reminder_5_copy?: string;
  quote?: string;
  thank_you_message?: string;
};

export type FullReportV2FinalDisclaimer = {
  hero_note?: string;
  remember_copy?: string;
  thank_you_line?: string;
};

export type FullReportV2CTAs = {
  primary: string;
  secondary: string;
  soft: string;
  optional?: string;
};

export type FullReportV2Payload = {
  client: FullReportV2Client;
  report: FullReportV2ReportMeta;
  calculation: FullReportV2Calculation;
  modules: {
    s0: FullReportV2ModuleSlot;
    s1: FullReportV2ModuleSlot;
    s2: FullReportV2ModuleSlot;
    s3: FullReportV2ModuleSlot;
    s4: FullReportV2ModuleSlot;
    s5: FullReportV2ModuleSlot;
    s6: FullReportV2ModuleSlot;
    s7: FullReportV2ModuleSlot;
    s8: FullReportV2ModuleSlot;
    s9: FullReportV2ModuleSlot;
  };
  integrated_blueprint: FullReportV2IntegratedBlueprint;
  integrated_action?: FullReportV2IntegratedAction;
  integration_practice: FullReportV2IntegrationPractice;
  reflection_journal?: FullReportV2ReflectionJournal;
  closing_reflection?: FullReportV2ClosingReflection;
  final_disclaimer?: FullReportV2FinalDisclaimer;
  ctas: FullReportV2CTAs;
};

export type FullReportV2InputClient = {
  name: string;
  birth_date: string;
  birth_date_display?: string;
  timezone?: string;
  language?: "en" | "zh" | "bilingual";
};

export type FullReportV2LayerTitles = {
  s1?: string;
  s2?: string;
  s3?: string;
  s0?: string;
};
