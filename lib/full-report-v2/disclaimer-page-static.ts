/**
 * Fixed UI chrome for Page 18 — Final Disclaimer.
 * Fully static legal boundary page; resolver may append optional report metadata.
 */

export const DISCLAIMER_PAGE_HERO = {
  pageNumber: "18",
  title: "Final Disclaimer",
  subtitle: "A Grounded Note on Interpretation, Responsibility, and Use",
  description:
    "This report is created as a symbolic self-awareness guide. Please use it with discernment, personal responsibility, and inner honesty.",
} as const;

export const DISCLAIMER_INTERPRETATION_TITLE = "Interpretation & Scope";

export const DISCLAIMER_INTERPRETATION_LEAD =
  "The 1320 Soul Origin Code System is designed for";

export const DISCLAIMER_INTERPRETATION_EMPHASIS =
  "reflection, self-awareness, symbolic insight, and personal growth";

export const DISCLAIMER_INTERPRETATION_LEAD_TAIL =
  "It is not intended to define, limit, label, or determine who you are.";

export const DISCLAIMER_INTERPRETATION_SECOND =
  "Any language related to soul codes, archetypes, patterns, gifts, mission, shadow, contribution, or return should be understood as symbolic and reflective, not as fixed identity, fate, diagnosis, or absolute truth.";

export const DISCLAIMER_INTERPRETATION_ITEMS = [
  "This report does not predict your future.",
  "This report does not determine your destiny.",
  "This report does not replace your own discernment.",
  "This report should not be used to make major life decisions without grounded reflection.",
  "You remain fully responsible for your choices, actions, and interpretation.",
] as const;

export const DISCLAIMER_USE_TITLE = "The Right Way to Use This Report";

export const DISCLAIMER_SEAL_LABELS = [
  {
    position: "top" as const,
    label: "Reflect",
    copy: "Gain insight without judgment.",
  },
  {
    position: "right" as const,
    label: "Discern",
    copy: "Use your own wisdom above all systems.",
  },
  {
    position: "bottom" as const,
    label: "Integrate",
    copy: "Let insight become embodied alignment.",
  },
  {
    position: "left" as const,
    label: "Choose",
    copy: "Return to your inner authority in every moment.",
  },
] as const;

export const DISCLAIMER_MIRROR_LINES = ["Let this report be a mirror,", "not a cage."] as const;

export const DISCLAIMER_RIGHTS_COPY =
  "© 1320 Soul Code System. All rights reserved. This report, its structure, language, symbols, and visual system are intended for personal use only. No part may be copied, reproduced, resold, redistributed, or used for commercial purposes without written permission.";

export const DISCLAIMER_PROFESSIONAL_TITLE = "Professional & Wellness Disclaimer";

export const DISCLAIMER_PROFESSIONAL_INTRO =
  "This report is not a medical, psychological, psychiatric, legal, financial, or professional advisory document.";

export const DISCLAIMER_PROFESSIONAL_ITEMS = [
  "It is not a mental health diagnosis.",
  "It is not a substitute for therapy, counselling, medical care, or crisis support.",
  "It is not financial, legal, career, relationship, or health advice.",
  "It should not be used to delay, avoid, or replace professional support.",
  "If you are in emotional distress, crisis, or danger, please seek appropriate professional or emergency assistance immediately.",
] as const;

export const DISCLAIMER_PROFESSIONAL_CLOSING =
  "Your experience matters. Please take what feels helpful, leave what does not resonate, and always return to your grounded inner knowing.";

export const DISCLAIMER_BOTTOM_SECTIONS = [
  {
    icon: "☽",
    title: "Use With Discernment",
    copy: "This report is most useful when approached with curiosity, openness, and grounded self-responsibility.",
  },
  {
    icon: "✺",
    title: "Your Inner Authority Comes First",
    copy: "No system, code, report, or interpretation should replace your lived experience, personal agency, or direct inner knowing.",
  },
  {
    icon: "✦",
    title: "Closing Reminder",
    copy: "You are more than any report. You are a living, evolving being with choice, dignity, awareness, and inner wisdom.",
  },
] as const;
