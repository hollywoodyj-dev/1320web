/** Auth return context from `next` path — Sign In Page Refinement Spec v1.0. */

export type AuthReturnContext =
  | "account"
  | "full_report"
  | "mobile_report"
  | "booking"
  | "checkout_recovery"
  | "default";

export function resolveAuthReturnContext(nextPath: string): AuthReturnContext {
  const path = nextPath.split("?")[0] ?? nextPath;
  if (path.startsWith("/my-report") || path === "/report" || path.startsWith("/report/")) {
    return "full_report";
  }
  if (path.startsWith("/mobile-report")) return "mobile_report";
  if (path.startsWith("/booking")) return "booking";
  if (path.startsWith("/checkout")) return "checkout_recovery";
  if (path === "/account" || path.startsWith("/account/")) return "account";
  return "default";
}

export function authReturnContextNote(context: AuthReturnContext): string | null {
  switch (context) {
    case "full_report":
    case "mobile_report":
      return "You’ll return to your report after signing in.";
    case "booking":
      return "You’ll return to your booking flow after signing in.";
    case "checkout_recovery":
      return "You’ll return to checkout after signing in.";
    case "account":
      return "You’ll return to your account after signing in.";
    default:
      return null;
  }
}

export function authReturnContextLead(context: AuthReturnContext): string | null {
  switch (context) {
    case "full_report":
    case "mobile_report":
      return "Sign in to continue to your report.";
    case "booking":
      return "Sign in to continue your Personal Integration Session booking.";
    case "checkout_recovery":
      return "Sign in to continue your purchase.";
    case "account":
      return "Sign in to open your account.";
    default:
      return null;
  }
}
