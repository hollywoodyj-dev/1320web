"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { primeBookingEntryReferrer } from "@/lib/funnel/booking-funnel-props";

/** Internal link onto /booking — primes D-8 entry referrer before client navigation. */
export function BookingEntryLink({ onClick, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        primeBookingEntryReferrer();
        onClick?.(event);
      }}
    />
  );
}
