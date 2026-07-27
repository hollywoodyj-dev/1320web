/** Personal Integration Summary Template v1.0 — client-facing structure only. */

import { ROLE_TITLE_FULL, ROLE_TITLE_SHORT } from "@/lib/personal-integration/role-titles";

export const SUMMARY_TEMPLATE_VERSION = "personal-integration-summary-v1.0" as const;

export type SummaryContent = {
  client_name: string;
  session_date: string;
  /** Internal JSON key retained; client-facing value uses Blueprint Integration Consultant. */
  facilitator_label: string;
  session_type: string;
  report_id: string;
  session_focus: string;
  core_recognition: string;
  inner_tension: string;
  existing_resource: string;
  growth_edge: string;
  conscious_choice: string;
  seven_day_practice: string;
  reflection_question: string;
  layers_explored: string;
  closing_boundary: string;
};

export const SUMMARY_FIELD_META: Array<{
  key: keyof SummaryContent;
  label: string;
  help?: string;
  autofillFromNotes?: string;
}> = [
  { key: "client_name", label: "Client name" },
  { key: "session_date", label: "Session date" },
  { key: "facilitator_label", label: ROLE_TITLE_SHORT },
  { key: "session_type", label: "Session type" },
  { key: "report_id", label: "Report ID" },
  { key: "session_focus", label: "Session focus", autofillFromNotes: "primary_focus" },
  { key: "core_recognition", label: "Core recognition", autofillFromNotes: "core_recognition" },
  { key: "inner_tension", label: "Inner tension", autofillFromNotes: "inner_tension" },
  { key: "existing_resource", label: "Existing resource", autofillFromNotes: "existing_resource" },
  { key: "growth_edge", label: "Growth edge", autofillFromNotes: "growth_edge" },
  { key: "conscious_choice", label: "Conscious choice", autofillFromNotes: "conscious_choice" },
  { key: "seven_day_practice", label: "7-Day practice", autofillFromNotes: "practice" },
  { key: "reflection_question", label: "Reflection question", autofillFromNotes: "reflection_question" },
  { key: "layers_explored", label: "Layers explored", autofillFromNotes: "layers_explored" },
  {
    key: "closing_boundary",
    label: "Closing boundary",
    help: "Remind the client this is symbolic integration, not diagnosis or prediction.",
  },
];

export const SUMMARY_DEFAULT_CLOSING =
  "Your Soul Blueprint is a mirror — not a fixed identity. This Summary reflects what you named in Session. Your choices and timing remain your own.";

export const SUMMARY_COPY = {
  title: "Integration Summary",
  previewTitle: "Preview as Client",
  saveDraft: "Save Draft",
  markReady: "Mark Ready for Review",
  publish: "Publish Summary",
  send: "Send to Client",
  publishedNote: "Published summaries are visible in the client account. Private notes are never included.",
  separationNote:
    "Private session notes are stored separately and are not sent with this client-facing Summary.",
};

export function emptySummaryContent(): SummaryContent {
  return {
    client_name: "",
    session_date: "",
    facilitator_label: ROLE_TITLE_FULL,
    session_type: "",
    report_id: "",
    session_focus: "",
    core_recognition: "",
    inner_tension: "",
    existing_resource: "",
    growth_edge: "",
    conscious_choice: "",
    seven_day_practice: "",
    reflection_question: "",
    layers_explored: "",
    closing_boundary: SUMMARY_DEFAULT_CLOSING,
  };
}
