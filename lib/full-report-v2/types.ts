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
  integration_practice: FullReportV2IntegrationPractice;
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
