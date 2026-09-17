"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackBookingOptionSelected } from "@/lib/funnel/track-booking-funnel-event";

type BookingSessionSelectLinkProps = ComponentProps<typeof Link> & {
  sessionType: string;
};

/** Session card CTA — fires booking_option_selected on click. */
export function BookingSessionSelectLink({
  sessionType,
  onClick,
  ...props
}: BookingSessionSelectLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackBookingOptionSelected({ readingType: sessionType, entry: "session_card" });
        onClick?.(event);
      }}
    />
  );
}
