"use client";

import Link from "next/link";
import {
  trackEvent,
  type AnalyticsEventName,
  type AnalyticsPayload,
} from "@/lib/soulcode-analytics";

type TrackButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  eventName: AnalyticsEventName;
  eventPayload?: AnalyticsPayload;
};

/** Link that fires a catalogued conversion event on click. */
export function TrackButton({
  href,
  children,
  className,
  eventName,
  eventPayload,
}: TrackButtonProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent(eventName, eventPayload ?? {})}
    >
      {children}
    </Link>
  );
}
