"use client";

import { shouldEmbedScheduleUrl, toScheduleEmbedUrl } from "@/lib/booking/scheduling-urls";

type BookingSchedulePanelProps = {
  scheduleUrl: string | null;
};

export function BookingSchedulePanel({ scheduleUrl }: BookingSchedulePanelProps) {
  if (!scheduleUrl) {
    return (
      <div className="glass-card p-4 text-sm space-y-2">
        <p className="font-medium">Choose your session time</p>
        <p className="opacity-80">
          Your payment is confirmed. We will email you a scheduling link shortly. You can also
          continue to session prep below while we finalize the calendar.
        </p>
      </div>
    );
  }

  const embed = shouldEmbedScheduleUrl(scheduleUrl);
  const embedUrl = toScheduleEmbedUrl(scheduleUrl);

  return (
    <div className="glass-card p-4 text-sm space-y-3">
      <p className="font-medium">Choose your session time</p>
      <p className="opacity-80">
        Select a time that works for you. Your timezone from the booking form helps us align
        availability.
      </p>
      {embed ? (
        <div className="overflow-hidden rounded-lg border border-white/10 bg-black/20">
          <iframe
            title="Book your Personal Integration Session"
            src={embedUrl}
            className="h-[640px] w-full border-0"
            loading="lazy"
          />
        </div>
      ) : (
        <a href={scheduleUrl} className="gold-button inline-flex" target="_blank" rel="noreferrer">
          OPEN SCHEDULING CALENDAR
        </a>
      )}
    </div>
  );
}
