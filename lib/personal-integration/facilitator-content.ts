/** FS-006.1 — Facilitator console copy. Page 19 internal console refinement. */

export const FACILITATOR_META = {
  title: "Facilitator Console",
  description: "Secure internal access for authorized facilitators only.",
};

export const FACILITATOR_COPY = {
  eyebrow: "Facilitator Console",
  title: "Personal Integration Session Management",
  body: "Secure internal access for authorized facilitators only.",
  support:
    "Secure internal access for reviewing session requests, updating session status, and recording post-session summaries.",
  keyLabel: "Access Key",
  keyHelp: "Enter your facilitator access key to load session records.",
  keyHelper: "Access is restricted to authorized facilitators.",
  load: "Load Sessions",
  loading: "Loading sessions securely…",
  save: "Update Session",
  saving: "Updating…",
  saved: "Session updated.",
  unauthorized: "Access could not be verified. Please check your access key or contact the site operator.",
  empty: "No sessions loaded yet.",
  emptyHint: "Enter your facilitator access key to view session records.",
  emptyList: "No sessions match this filter.",
  filtersTitle: "01 Session Filters",
  listTitle: "02 Session List",
  detailTitle: "03 Selected Session Detail",
  statusTitle: "04 Status Update",
  summaryTitle: "05 Post-Session Summary",
  followUpTitle: "06 Follow-Up Link / Email Status",
  summaryLabel: "Post-session summary",
  summaryPlaceholder:
    "Write a short reflective summary of the session focus, integration themes, and suggested next reflection. Do not include diagnosis, clinical claims, predictions, or sensitive unnecessary details.",
  summaryHint:
    "Keep summaries reflective, brief, and non-clinical. No diagnosis, treatment, medical, legal, financial, or predictive claims.",
  followUpNotGenerated: "Follow-up not generated",
  followUpGenerated: "Follow-up generated",
  emailPending: "Email pending",
  emailSent: "Email sent",
  emailFailed: "Email failed",
  emailNotConfigured: "Email sending is not configured. Follow-up link generated only.",
  emailConfiguredNote: "Follow-up email will be sent after session completion.",
  returnAccount: "Return to Account",
  footerInternal: "Internal Facilitator Console",
};

export const FACILITATOR_STATUS_OPTIONS = [
  { value: "scheduled", label: "Scheduled" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const;

export const FACILITATOR_FILTERS = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "scheduled", label: "Scheduled" },
  { id: "completed", label: "Completed" },
  { id: "follow_up_sent", label: "Follow-Up Sent" },
  { id: "cancelled", label: "Cancelled" },
  { id: "needs_attention", label: "Needs Attention" },
] as const;

export type FacilitatorFilterId = (typeof FACILITATOR_FILTERS)[number]["id"];
