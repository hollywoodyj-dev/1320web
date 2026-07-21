/** Pre-Session Intake Form v1.0 — typed field schema (approved sections & intent). */

export type IntakeFieldType = "text" | "textarea" | "select" | "checkbox" | "readonly";

export type IntakeFieldDef = {
  id: string;
  type: IntakeFieldType;
  label: string;
  help?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  /** Prefill from account/report/session — never re-asked. */
  prefillKey?: string;
  readOnly?: boolean;
};

export type IntakeSectionDef = {
  id: string;
  title: string;
  intro?: string;
  fields: IntakeFieldDef[];
};

export const INTAKE_FORM_VERSION = "pre-session-intake-v1.0" as const;

export const INTAKE_SECTIONS: IntakeSectionDef[] = [
  {
    id: "basic_information",
    title: "Basic Information",
    intro: "These details come from your account and booking. Please confirm they look correct.",
    fields: [
      { id: "preferred_name", type: "readonly", label: "Preferred name", prefillKey: "preferredName", readOnly: true },
      { id: "email", type: "readonly", label: "Email", prefillKey: "email", readOnly: true },
      { id: "birth_date", type: "readonly", label: "Birth date", prefillKey: "birthDate", readOnly: true },
      { id: "timezone", type: "text", label: "Timezone for the Session", help: "e.g. Australia/Sydney", required: true },
    ],
  },
  {
    id: "blueprint_information",
    title: "Blueprint Information",
    intro: "Your Soul Blueprint is read-only. Codes are connected from your Full Report.",
    fields: [
      { id: "report_id", type: "readonly", label: "Report", prefillKey: "reportId", readOnly: true },
      { id: "foundation_codes", type: "readonly", label: "Foundation (S1 → S3 → S2 → S0)", prefillKey: "foundationCodes", readOnly: true },
      { id: "advanced_codes", type: "readonly", label: "Advanced layers (S4–S9)", prefillKey: "advancedCodes", readOnly: true },
      { id: "session_type", type: "readonly", label: "Session type", prefillKey: "sessionType", readOnly: true },
      { id: "session_date", type: "readonly", label: "Scheduled session", prefillKey: "sessionDate", readOnly: true },
    ],
  },
  {
    id: "what_brings_you",
    title: "What Brings You Here",
    fields: [
      {
        id: "what_brings_you",
        type: "textarea",
        label: "What brings you to this Personal Integration Session?",
        required: true,
      },
      {
        id: "why_now",
        type: "textarea",
        label: "Why does this feel important now?",
        required: true,
      },
    ],
  },
  {
    id: "current_experience",
    title: "Current Experience",
    fields: [
      {
        id: "current_experience",
        type: "textarea",
        label: "What are you noticing in your lived experience right now?",
        required: true,
      },
      {
        id: "where_stuck",
        type: "textarea",
        label: "Where do you feel stuck, tense, or unclear?",
      },
    ],
  },
  {
    id: "patterns_and_responses",
    title: "Patterns and Previous Responses",
    fields: [
      {
        id: "familiar_patterns",
        type: "textarea",
        label: "What familiar patterns keep returning?",
      },
      {
        id: "what_already_tried",
        type: "textarea",
        label: "What have you already tried in response?",
      },
    ],
  },
  {
    id: "session_intention",
    title: "Session Intention",
    fields: [
      {
        id: "session_intention",
        type: "textarea",
        label: "What would make this Session meaningful for you?",
        required: true,
      },
      {
        id: "growth_edge",
        type: "textarea",
        label: "Name one growth edge you want to explore (in your own words)",
        required: true,
      },
    ],
  },
  {
    id: "preferred_support",
    title: "Preferred Style of Support",
    fields: [
      {
        id: "support_style",
        type: "select",
        label: "How would you like to be supported?",
        required: true,
        options: [
          { value: "reflective", label: "Reflective listening and mirroring" },
          { value: "structured", label: "Clear structure and practical integration" },
          { value: "exploratory", label: "Open exploration with space to feel" },
          { value: "balanced", label: "A balance of reflection and structure" },
        ],
      },
      {
        id: "support_notes",
        type: "textarea",
        label: "Anything else that helps your Facilitator support you well?",
      },
    ],
  },
  {
    id: "wellbeing_scope",
    title: "Wellbeing and Scope Check",
    intro:
      "Personal Integration is symbolic self-awareness support, not therapy, medical care, crisis support, or diagnosis. Please answer honestly so we can keep the Session within a safe and appropriate scope.",
    fields: [
      {
        id: "in_crisis",
        type: "select",
        label: "Are you currently in crisis or needing immediate safety support?",
        required: true,
        options: [
          { value: "no", label: "No" },
          { value: "unsure", label: "I am unsure" },
          { value: "yes", label: "Yes — I need support beyond this Session" },
        ],
      },
      {
        id: "professional_care",
        type: "select",
        label: "Are you currently working with a therapist, counsellor, or medical professional for related concerns?",
        required: true,
        options: [
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
          { value: "prefer_not", label: "Prefer not to say" },
        ],
      },
      {
        id: "scope_acknowledgement",
        type: "checkbox",
        label:
          "I understand this Session is symbolic integration support and not therapy, diagnosis, prediction, or emergency care.",
        required: true,
      },
    ],
  },
  {
    id: "consent",
    title: "Consent",
    fields: [
      {
        id: "consent_blueprint_use",
        type: "checkbox",
        label:
          "I consent to my Facilitator reviewing my Soul Blueprint codes and this intake to prepare for the Session.",
        required: true,
      },
      {
        id: "consent_record",
        type: "checkbox",
        label:
          "I consent to 1320 storing this intake and Session records for delivery, continuity, and account access.",
        required: true,
      },
      {
        id: "consent_agency",
        type: "checkbox",
        label:
          "I understand my Blueprint is a mirror, not a fixed identity, and that my choices remain my own.",
        required: true,
      },
    ],
  },
];

export type IntakeResponses = Record<string, string | boolean | null | undefined>;
