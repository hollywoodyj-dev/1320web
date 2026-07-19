import type { Metadata } from "next";
import Link from "next/link";
import { BookingSuccessClient } from "@/components/booking/booking-success-client";
import { SectionCard } from "@/components/section-card";

export const metadata: Metadata = {
  title: "Session Booked — Choose Your Time",
  description: "Your Personal Integration Session payment is confirmed. Pick a time on the calendar.",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === "string" ? params.session_id : undefined;

  return (
    <div className="conversion-page space-y-5">
      <SectionCard title="Payment Confirmed — Schedule Your Session">
        <p>
          Thank you. Your Personal Integration Session is paid. Choose a time on the calendar
          below, then open your session prep space when you are ready.
        </p>
        {sessionId ? <BookingSuccessClient sessionId={sessionId} /> : null}
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/account" className="blueprint-secondary-link">
            Return to account
          </Link>
          <Link href="/booking" className="blueprint-secondary-link">
            Book another session
          </Link>
        </div>
      </SectionCard>
    </div>
  );
}
