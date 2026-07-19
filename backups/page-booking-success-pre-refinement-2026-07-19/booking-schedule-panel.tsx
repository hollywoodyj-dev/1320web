"use client";

import { BOOKING_SUCCESS_COPY } from "@/lib/booking/success-content";
import { shouldEmbedScheduleUrl, toScheduleEmbedUrl } from "@/lib/booking/scheduling-urls";

type BookingSchedulePanelProps = {
  scheduleUrl: string | null;
  /** When true, show loading placeholder instead of unavailable. */
  loading?: boolean;
};

export function BookingSchedulePanel({ scheduleUrl, loading = false }: BookingSchedulePanelProps) {
  if (loading) {
    return (
      <div className="booking-success-schedule-panel" aria-busy="true">
        <h2 className="booking-success-section-title">{BOOKING_SUCCESS_COPY.scheduleTitle}</h2>
        <p className="booking-success-schedule-status" role="status">
          {BOOKING_SUCCESS_COPY.loadingCalendar}
        </p>
      </div>
    );
  }

  if (!scheduleUrl) {
    return (
      <div className="booking-success-schedule-panel">
        <h2 className="booking-success-section-title">{BOOKING_SUCCESS_COPY.scheduleTitle}</h2>
        <p className="booking-success-schedule-status">{BOOKING_SUCCESS_COPY.calendarUnavailable}</p>
      </div>
    );
  }

  const embed = shouldEmbedScheduleUrl(scheduleUrl);
  const embedUrl = toScheduleEmbedUrl(scheduleUrl);

  return (
    <div className="booking-success-schedule-panel">
      <h2 className="booking-success-section-title">{BOOKING_SUCCESS_COPY.scheduleTitle}</h2>
      <p className="booking-success-schedule-lead">{BOOKING_SUCCESS_COPY.calendarReady}</p>
      {embed ? (
        <div className="booking-success-embed">
          <iframe
            title="Schedule your Personal Integration Session"
            src={embedUrl}
            className="booking-success-iframe"
            loading="lazy"
          />
        </div>
      ) : (
        <a
          href={scheduleUrl}
          className="gold-button booking-success-primary"
          target="_blank"
          rel="noreferrer"
        >
          {BOOKING_SUCCESS_COPY.openCalendarExternal}
        </a>
      )}
    </div>
  );
}
