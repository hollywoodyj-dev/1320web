"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackFunnelEvent } from "@/lib/funnel/track-funnel-event";
import { bookingOptionEventProps, resolveSourcePage } from "@/lib/funnel/booking-funnel-props";

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
        trackFunnelEvent("booking_option_selected", {
          ...bookingOptionEventProps(sessionType),
          source_page: resolveSourcePage(),
          entry: "session_card",
        });
        onClick?.(event);
      }}
    />
  );
}
