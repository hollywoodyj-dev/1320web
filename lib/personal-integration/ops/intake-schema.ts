/**
 * Pre-Session Intake Form v1.1 · Easy Access Edition
 * Client-facing questions stay ordinary-language; legacy v1.0 fields archived.
 */

import { ROLE_TITLE_SHORT } from "@/lib/personal-integration/role-titles";

export type IntakeFieldType =
  | "text"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox"
  | "readonly"
  | "link";

export type IntakeFieldDef = {
  id: string;
  type: IntakeFieldType;
  label: string;
  help?: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  /** Prefill from account/report/session — never re-asked. */
  prefillKey?: string;
  readOnly?: boolean;
  /** Short free-text — fewer rows. */
  short?: boolean;
  hrefPrefillKey?: string;
};

export type IntakeSectionDef = {
  id: string;
  title: string;
  intro?: string;
  fields: IntakeFieldDef[];
};

export const INTAKE_FORM_VERSION = "pre-session-intake-v1.1-easy-access" as const;

export type IntakeResponses = Record<string, string | string[] | boolean | null | undefined>;

/** Q1 — What would you most like to explore */
export const EXPLORE_OPTIONS = [
  { value: "relationship", label: "A relationship" },
  { value: "decision_direction", label: "A decision or direction" },
  { value: "repeating_pattern", label: "A repeating pattern" },
  { value: "work_purpose_creativity", label: "Work, purpose or creativity" },
  { value: "self_worth_receiving_boundaries", label: "Self-worth, receiving or boundaries" },
  { value: "change_transition", label: "A change or transition" },
  { value: "cannot_name_yet", label: "Something I cannot clearly name yet" },
  { value: "something_else", label: "Something else" },
] as const;

/** Q3 — Why now */
export const WHY_NOW_OPTIONS = [
  { value: "affecting_for_some_time", label: "It has been affecting me for some time" },
  { value: "something_recently_changed", label: "Something recently changed" },
  { value: "need_to_make_a_decision", label: "I need to make a decision" },
  { value: "same_pattern_keeps_repeating", label: "The same pattern keeps repeating" },
  { value: "understand_myself_better", label: "I want to understand myself better" },
  { value: "not_sure_ready_to_talk", label: "I am not sure — I just feel ready to talk about it" },
] as const;

/** Q4 — What would feel helpful */
export const HELPFUL_OPTIONS = [
  { value: "understand_what_may_be_happening", label: "To understand what may be happening" },
  { value: "another_perspective", label: "To see the situation from another perspective" },
  { value: "clearer_about_a_decision", label: "To feel clearer about a decision" },
  { value: "recognise_repeating_pattern", label: "To recognise a repeating pattern" },
  { value: "one_small_next_step", label: "To find one small next step" },
  { value: "feel_heard_and_understood", label: "To feel heard and understood" },
  { value: "not_sure_yet", label: "I am not sure yet" },
] as const;

export const INTAKE_SECTIONS: IntakeSectionDef[] = [
  {
    id: "session_context",
    title: "Your Session",
    intro: "These details are already linked from your booking. You do not need to re-enter them.",
    fields: [
      {
        id: "preferred_name",
        type: "readonly",
        label: "Preferred name",
        prefillKey: "preferredName",
        readOnly: true,
      },
      { id: "email", type: "readonly", label: "Email", prefillKey: "email", readOnly: true },
      {
        id: "session_type",
        type: "readonly",
        label: "Session",
        prefillKey: "sessionType",
        readOnly: true,
      },
      {
        id: "session_date",
        type: "readonly",
        label: "Scheduled time",
        prefillKey: "sessionDate",
        readOnly: true,
      },
      {
        id: "report_link",
        type: "link",
        label: "Your Full Report",
        hrefPrefillKey: "reportHref",
        prefillKey: "reportId",
      },
      {
        id: "timezone",
        type: "text",
        label: "Timezone (optional)",
        help: "e.g. Australia/Sydney — helpful if your schedule needs confirming",
        prefillKey: "timezone",
      },
    ],
  },
  {
    id: "easy_access",
    title: "A few simple questions",
    intro: "About 3–5 minutes. Ordinary words are enough.",
    fields: [
      {
        id: "explore_topics",
        type: "multiselect",
        label: "What would you most like to explore in this session?",
        required: true,
        options: [...EXPLORE_OPTIONS],
      },
      {
        id: "explore_note",
        type: "textarea",
        label: "Tell us a little more, if you would like.",
        short: true,
        placeholder: "Optional",
      },
      {
        id: "what_is_happening",
        type: "textarea",
        label: "What has been happening recently?",
        help: "You can describe one situation, feeling, question or concern.",
        placeholder:
          "For example: I keep having the same disagreement with someone, I feel unsure about my work direction, or I have been feeling stuck lately.",
        required: true,
        short: true,
      },
      {
        id: "why_now_options",
        type: "multiselect",
        label: "Why does this feel important to you now?",
        options: [...WHY_NOW_OPTIONS],
      },
      {
        id: "why_now_note",
        type: "textarea",
        label: "Anything else about why now? (optional)",
        short: true,
        placeholder: "Optional",
      },
      {
        id: "helpful_outcomes",
        type: "multiselect",
        label: "At the end of the session, what would feel helpful?",
        help: "Your selection helps us know where to begin. It is not a promise that any outcome will necessarily be achieved.",
        required: true,
        options: [...HELPFUL_OPTIONS],
      },
      {
        id: "anything_to_know",
        type: "textarea",
        label: `Is there anything you would like your ${ROLE_TITLE_SHORT} to know before you meet?`,
        help: "This is optional. You may leave it blank.",
        short: true,
        placeholder: "Optional",
      },
      {
        id: "scope_acknowledgement",
        type: "checkbox",
        label:
          "Personal Integration is a reflective service and is not therapy, diagnosis, prediction, crisis support, or medical, legal or financial advice. I understand.",
        required: true,
      },
    ],
  },
];

/**
 * Legacy v1.0 client fields — archived.
 * Retained for historical response compatibility; do not render to new clients.
 * Deeper interpretive prompts remain Facilitator Workspace preparation only.
 */
export const LEGACY_INTAKE_SECTIONS_V1_0: IntakeSectionDef[] = [
  {
    id: "what_brings_you",
    title: "[Archived] What Brings You Here",
    fields: [
      { id: "what_brings_you", type: "textarea", label: "What brings you…" },
      { id: "why_now", type: "textarea", label: "Why now…" },
    ],
  },
  {
    id: "current_experience",
    title: "[Archived] Current Experience",
    fields: [
      { id: "current_experience", type: "textarea", label: "Current experience…" },
      { id: "where_stuck", type: "textarea", label: "Where stuck…" },
    ],
  },
  {
    id: "patterns_and_responses",
    title: "[Archived] Patterns",
    fields: [
      { id: "familiar_patterns", type: "textarea", label: "Familiar patterns…" },
      { id: "what_already_tried", type: "textarea", label: "What already tried…" },
    ],
  },
  {
    id: "session_intention",
    title: "[Archived] Session Intention",
    fields: [
      { id: "session_intention", type: "textarea", label: "Session intention…" },
      { id: "growth_edge", type: "textarea", label: "Growth edge…" },
    ],
  },
  {
    id: "preferred_support",
    title: "[Archived] Preferred Support",
    fields: [
      { id: "support_style", type: "select", label: "Support style…" },
      { id: "support_notes", type: "textarea", label: "Support notes…" },
    ],
  },
];

export const LEGACY_INTAKE_FIELD_IDS = new Set(
  LEGACY_INTAKE_SECTIONS_V1_0.flatMap((section) => section.fields.map((field) => field.id)),
);

function optionLabel(
  options: ReadonlyArray<{ value: string; label: string }>,
  value: string,
): string {
  return options.find((opt) => opt.value === value)?.label ?? value;
}

function asStringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value) as unknown;
      if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
    } catch {
      return value
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);
    }
  }
  return [];
}

/** Facilitator preparation panel — client answers only; not Blueprint interpretation. */
export type IntakePreparationPanel = {
  formVersion: string;
  mainArea: { labels: string[]; note: string };
  whatIsHappening: string;
  whyNow: { labels: string[]; note: string };
  whatWouldFeelHelpful: { labels: string[]; disclaimer: string };
  anythingToKnow: string;
  scopeAcknowledged: boolean;
  /** Present only if an older draft still contains archived keys. */
  legacyPresent: boolean;
};

export function buildIntakePreparationPanel(responses: IntakeResponses): IntakePreparationPanel {
  const explore = asStringList(responses.explore_topics);
  const whyNow = asStringList(responses.why_now_options);
  const helpful = asStringList(responses.helpful_outcomes);
  const legacyPresent = [...LEGACY_INTAKE_FIELD_IDS].some((id) => {
    const value = responses[id];
    return value !== undefined && value !== null && value !== "" && value !== false;
  });

  return {
    formVersion: INTAKE_FORM_VERSION,
    mainArea: {
      labels: explore.map((value) => optionLabel(EXPLORE_OPTIONS, value)),
      note: typeof responses.explore_note === "string" ? responses.explore_note.trim() : "",
    },
    whatIsHappening:
      typeof responses.what_is_happening === "string" ? responses.what_is_happening.trim() : "",
    whyNow: {
      labels: whyNow.map((value) => optionLabel(WHY_NOW_OPTIONS, value)),
      note: typeof responses.why_now_note === "string" ? responses.why_now_note.trim() : "",
    },
    whatWouldFeelHelpful: {
      labels: helpful.map((value) => optionLabel(HELPFUL_OPTIONS, value)),
      disclaimer: "Selected hopes are preparation cues only — not guaranteed Session outcomes.",
    },
    anythingToKnow:
      typeof responses.anything_to_know === "string" ? responses.anything_to_know.trim() : "",
    scopeAcknowledged: responses.scope_acknowledgement === true,
    legacyPresent,
  };
}

export function validateEasyAccessIntake(responses: IntakeResponses): "ok" | "missing_required" | "consent_required" {
  const explore = asStringList(responses.explore_topics);
  const helpful = asStringList(responses.helpful_outcomes);
  const happening =
    typeof responses.what_is_happening === "string" ? responses.what_is_happening.trim() : "";

  if (!explore.length || !happening || !helpful.length) {
    return "missing_required";
  }
  if (responses.scope_acknowledgement !== true) {
    return "consent_required";
  }
  return "ok";
}
