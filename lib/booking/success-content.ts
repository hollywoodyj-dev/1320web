/** Booking success — post-payment scheduling bridge. */

import { LEGAL_PLACEHOLDERS } from "@/lib/legal-placeholders";

export const BOOKING_SUCCESS_META = {
  title: "Payment Confirmed — Schedule Your Session",
  description:
    "Your Personal Integration Session is paid. Choose a time to schedule your session.",
};

export const BOOKING_SUCCESS_COPY = {
  title: "Payment Confirmed — Schedule Your Session",
  body: "Thank you. Your Personal Integration Session is paid. Choose a time below to schedule your session, then complete Pre-Session Intake so your Blueprint Integration Consultant can prepare.",
  scheduleTitle: "Schedule Your Session",
  loadingCalendar: "Loading scheduling calendar…",
  confirmingPayment: "Confirming your payment…",
  fulfilling: "Setting up your session space…",
  calendarReady: "Select a time that works for you.",
  calendarUnavailable:
    "We could not load the scheduling calendar right now. You can return to your account or contact support for help scheduling your session.",
  noSession:
    "We could not confirm this payment session. Return to your account or contact support for help.",
  prepTitle: "Next: Pre-Session Intake",
  prepBody:
    "After you pick a time, complete your Pre-Session Intake so your Blueprint Integration Consultant can prepare with your Soul Blueprint.",
  prepCta: "Complete Pre-Session Intake",
  openPrepCta: "Open Session Prep Space",
  accountCta: "Return to Account",
  supportLead: "Need help?",
  supportCta: "Contact Support",
  supportHref: `mailto:${LEGAL_PLACEHOLDERS.contactEmail}`,
  bookAnotherCta: "Book Another Session",
  openCalendarExternal: "Open Scheduling Calendar",
};
