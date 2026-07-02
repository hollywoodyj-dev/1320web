/**
 * Fixed UI chrome for Page 08 — Integrated Soul Blueprint.
 */

export const INTEGRATED_PAGE_HERO = {
  pageNumber: "08",
  title: "Integrated Soul Blueprint",
  subtitle: "Your Complete Soul Map · How Your Core Codes Work Together as One",
  description:
    "This page reveals how your core soul codes integrate and work together — forming a multidimensional pattern of essence, vibration, mirrors, and return.",
} as const;

export const INTEGRATED_CODE_ROLES: ReadonlyArray<{
  key: "s1" | "s3" | "s2" | "s0";
  badge: string;
  copy: string;
}> = [
  {
    key: "s1",
    badge: "S1",
    copy: "Your core essence and original soul frequency — what you came here to embody.",
  },
  {
    key: "s3",
    badge: "S3",
    copy: "Your natural vibration — how you move, express, adapt, and influence life.",
  },
  {
    key: "s2",
    badge: "S2",
    copy: "Your mirrors and lessons — how life reflects what is ready to be seen and integrated.",
  },
  {
    key: "s0",
    badge: "S0",
    copy: "Your awakening gate — the illusion you transcend to return to truth.",
  },
];

export const INTEGRATED_SYNERGY_SECTIONS: ReadonlyArray<{
  id: string;
  title: string;
  icon: "flame" | "mirror" | "waves" | "ring";
}> = [
  { id: "essence_vibration", title: "Essence + Vibration", icon: "flame" },
  { id: "mirror_vibration", title: "Mirror + Vibration", icon: "waves" },
  { id: "essence_mirror", title: "Essence + Mirror", icon: "mirror" },
  { id: "void_all", title: "Void Gate + All Codes", icon: "ring" },
];

export const INTEGRATED_FINAL_REMEMBRANCE = "You are here for so much more.";

export const INTEGRATED_SEE_IT_COPY =
  "This is your integrated soul blueprint — not a label, not a limitation, and not a prediction. It is a mirror of possibility.";
