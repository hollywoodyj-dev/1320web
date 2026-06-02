import type { Metadata } from "next";
import Link from "next/link";
import { BookingRequestForm } from "@/components/booking-request-form";
import { FaqSection } from "@/components/conversion/faq-section";
import { SectionCard } from "@/components/section-card";
import {
  AFTER_BOOKING,
  BEFORE_BOOK,
  BOOKING_DISCLAIMER,
  BOOKING_FINAL,
  BOOKING_FAQ,
  BOOKING_HERO,
  BOOKING_META,
  BOOKING_WHO_FOR,
  BOOKING_WHO_NOT,
  READING_OPTIONS,
  SESSION_EXPERIENCE,
  TESTIMONIAL_PLACEHOLDERS,
  WHAT_IS_READING,
  WHAT_TO_PREPARE,
  WHAT_WE_EXPLORE,
} from "@/lib/booking-content";
import { GENERATE_CODE_CTA } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: BOOKING_META.title,
  description: BOOKING_META.description,
};

type SearchParams = Record<string, string | string[] | undefined>;

function readType(params: SearchParams): string | undefined {
  const value = params.type;
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  if (raw === "not-sure") return raw;
  return READING_OPTIONS.options.some((o) => o.id === raw) ? raw : undefined;
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const defaultReadingType = readType(params);

  return (
    <div className="conversion-page space-y-5">
      <header className="blueprint-hero glass-card">
        <p className="blueprint-eyebrow">{BOOKING_HERO.eyebrow}</p>
        <h1 className="blueprint-title">{BOOKING_HERO.title}</h1>
        <p className="blueprint-lead">{BOOKING_HERO.body}</p>
        <p className="conversion-boundary">{BOOKING_HERO.boundary}</p>
        <div className="blueprint-hero-actions">
          <a href="#booking-form" className="gold-button">
            BOOK A READING
          </a>
          <Link href={GENERATE_CODE_CTA.href} className="blueprint-secondary-link">
            GENERATE MY CODE FIRST
          </Link>
          <Link href="/full-report" className="blueprint-secondary-link">
            JOIN FULL REPORT WAITLIST
          </Link>
        </div>
      </header>

      <SectionCard title={WHAT_IS_READING.title}>
        <p>{WHAT_IS_READING.body}</p>
      </SectionCard>

      <SectionCard title={WHAT_WE_EXPLORE.title}>
        <ul className="blueprint-layer-grid">
          {WHAT_WE_EXPLORE.items.map((item) => (
            <li key={item.code} className="blueprint-layer-item">
              <span className="blueprint-layer-code">{item.code}</span>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title={SESSION_EXPERIENCE.title}>
        <ul className="conversion-bullet-list">
          {SESSION_EXPERIENCE.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title={BOOKING_WHO_FOR.title}>
        <ul className="conversion-bullet-list">
          {BOOKING_WHO_FOR.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title={BOOKING_WHO_NOT.title}>
        <p>{BOOKING_WHO_NOT.body}</p>
      </SectionCard>

      <SectionCard title={READING_OPTIONS.title}>
        <div className="conversion-reading-grid">
          {READING_OPTIONS.options.map((option) => (
            <article key={option.id} className="conversion-reading-card glass-card">
              <h3>{option.title}</h3>
              <p className="conversion-reading-duration">{option.duration}</p>
              <p>{option.text}</p>
              <Link
                href={`/booking?type=${option.id}#booking-form`}
                className="blueprint-secondary-link conversion-reading-cta"
              >
                {option.cta}
              </Link>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={BEFORE_BOOK.title}>
        <p>{BEFORE_BOOK.body}</p>
        <Link href={GENERATE_CODE_CTA.href} className="gold-button mt-4 inline-flex">
          {BEFORE_BOOK.cta}
        </Link>
      </SectionCard>

      <SectionCard title={WHAT_TO_PREPARE.title}>
        <ul className="conversion-bullet-list">
          {WHAT_TO_PREPARE.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Request a Booking" id="booking-form">
        <BookingRequestForm defaultReadingType={defaultReadingType} />
      </SectionCard>

      <SectionCard title={AFTER_BOOKING.title}>
        <ol className="blueprint-steps-list">
          {AFTER_BOOKING.steps.map((step, index) => (
            <li key={step}>
              <span className="blueprint-step-num">{String(index + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard title={TESTIMONIAL_PLACEHOLDERS.title}>
        <p className="mb-4">{TESTIMONIAL_PLACEHOLDERS.note}</p>
        <div className="conversion-testimonial-grid">
          {TESTIMONIAL_PLACEHOLDERS.placeholders.map((quote) => (
            <blockquote key={quote} className="conversion-testimonial glass-card">
              {quote}
            </blockquote>
          ))}
        </div>
      </SectionCard>

      <FaqSection items={BOOKING_FAQ} />

      <section className="blueprint-final-cta glass-card">
        <h2>{BOOKING_FINAL.title}</h2>
        <p>{BOOKING_FINAL.body}</p>
        <a href="#booking-form" className="gold-button">
          REQUEST BOOKING
        </a>
        <Link href="/sample-report" className="blueprint-secondary-link block mt-3">
          VIEW SAMPLE REPORT
        </Link>
      </section>

      <p className="blueprint-disclaimer">{BOOKING_DISCLAIMER}</p>
    </div>
  );
}
