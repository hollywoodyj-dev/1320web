export type UserRow = {
  id: string;
  email: string;
  first_name: string | null;
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
