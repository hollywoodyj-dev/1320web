import Link from "next/link";
import { BOOKING_FORM_SECTION } from "@/lib/booking-content";

type BookingLoginGateProps = {
  nextPath?: string;
};

export function BookingLoginGate({ nextPath = "/booking" }: BookingLoginGateProps) {
  const next = encodeURIComponent(nextPath);

  return (
    <div className="booking-login-gate">
      <p className="booking-login-gate-lead">{BOOKING_FORM_SECTION.anonymousLead}</p>
      <div className="booking-login-gate-actions">
        <Link href={`/signup?next=${next}`} className="gold-button">
          {BOOKING_FORM_SECTION.createAccountCta}
        </Link>
        <Link href={`/login?next=${next}`} className="blueprint-secondary-link">
          {BOOKING_FORM_SECTION.signInCta}
        </Link>
      </div>
    </div>
  );
}
