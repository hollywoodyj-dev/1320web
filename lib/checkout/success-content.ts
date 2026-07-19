/** Checkout success / Full Report unlock bridge — transactional post-purchase UX. */

import { LEGAL_PLACEHOLDERS } from "@/lib/legal-placeholders";

export const CHECKOUT_SUCCESS_META = {
  title: "Thank You — Your Full Report Is Opening",
  description: "Your purchase was received. We are preparing your Full Report access.",
};

export const CHECKOUT_SUCCESS_COPY = {
  title: "Thank You — Your Full Report Is Opening",
  reassurance: "Your purchase was received. We are preparing your Full Report access.",
  body: "We are confirming your purchase and preparing your Full Report access. If you are not redirected shortly, you can continue below.",
  processingCta: "Preparing Your Report…",
  readyCta: "Go to My Report",
  accountCta: "Go to My Account",
  recoverCta: "Recover Report Access",
  supportLead: "Need help?",
  supportCta: "Contact support",
  supportHref: `mailto:${LEGAL_PLACEHOLDERS.contactEmail}`,
  homeCta: "Return Home",
  processingStatus: "Confirming your purchase…",
  stillProcessingStatus: "Still preparing your Full Report access…",
  readyStatus: "Your Full Report is ready.",
  unavailableStatus:
    "We could not confirm report access yet. You can check your account or contact support for help.",
};
