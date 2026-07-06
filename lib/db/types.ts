export type UserRow = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  birth_date: string | null;
  created_at: Date;
};

export type SoulReportRow = {
  id: string;
  user_id: string;
  birth_date: string;
  birth_year: number;
  birth_month: number;
  birth_day: number;
  s1_code: string;
  s3_code: string;
  s2_code: string;
  s0_code: string;
  code_string: string;
  combination_signature: string;
  report_version: string;
  created_at: Date;
};

export type PurchaseRow = {
  id: string;
  user_id: string;
  report_id: string | null;
  stripe_checkout_session_id: string | null;
  status: string;
};

export type EntitlementRow = {
  id: string;
  user_id: string;
  report_id: string;
  product: string;
  status: string;
};

/** FS-005A — mutable platform domain rows (see db/platform-domain-v1.sql). */
export type ExpressionProfileRow = {
  id: string;
  user_id: string;
  report_id: string;
  state: string;
  notes: Record<string, unknown> | null;
  authorship: string;
  updated_at: Date;
};

export type RelationshipMemoryRow = {
  id: string;
  user_id: string;
  report_id: string;
  kind: string;
  content: string;
  memory_layer: string | null;
  source_platform_session_id: string | null;
  user_retained: boolean;
  authorship: string;
  created_at: Date;
};

export type PlatformSessionRow = {
  id: string;
  user_id: string;
  report_id: string;
  kind: string;
  status: string;
  growth_edge: string | null;
  summary: string | null;
  session_variant: string | null;
  meta: Record<string, unknown>;
  prep_access_token: string | null;
  follow_up_access_token: string | null;
  started_at: Date | null;
  completed_at: Date | null;
  authorship: string;
  created_at: Date;
};

export type ReflectionRow = {
  id: string;
  user_id: string;
  report_id: string;
  kind: string;
  body: string;
  source_platform_session_id: string | null;
  authorship: string;
  created_at: Date;
  deleted_at: Date | null;
};

export type JourneyRow = {
  id: string;
  user_id: string;
  report_id: string;
  status: string;
  membership_tier: string | null;
  last_review_at: Date | null;
  meta: Record<string, unknown> | null;
  authorship: string;
  created_at: Date;
  updated_at: Date;
};

export type WisewaveTurnRow = {
  id: string;
  platform_session_id: string;
  user_id: string;
  report_id: string;
  role: string;
  content: string;
  reasoning_audit: Record<string, unknown> | null;
  authorship: string;
  created_at: Date;
};
