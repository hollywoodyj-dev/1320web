import type { Metadata } from "next";
import { BookingSuccessClient } from "@/components/booking/booking-success-client";
import { BOOKING_SUCCESS_COPY, BOOKING_SUCCESS_META } from "@/lib/booking/success-content";
import "@/styles/booking-success-v1.css";

export const metadata: Metadata = {
  title: BOOKING_SUCCESS_META.title,
  description: BOOKING_SUCCESS_META.description,
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === "string" ? params.session_id : undefined;

  return (
    <div className="booking-success-page booking-success-page--refined">
      <section className="booking-success-card glass-card" aria-labelledby="booking-success-title">
        <p className="booking-success-eyebrow">Personal Integration Session</p>
        <h1 id="booking-success-title" className="booking-success-title">
          {BOOKING_SUCCESS_COPY.title}
        </h1>
        <p className="booking-success-body">{BOOKING_SUCCESS_COPY.body}</p>
        <BookingSuccessClient sessionId={sessionId} />
      </section>
    </div>
  );
}
