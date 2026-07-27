import type { Metadata } from "next";
import Link from "next/link";
import { BookingLoginGate } from "@/components/auth/booking-login-gate";
import { BookingRequestForm } from "@/components/booking-request-form";
import { FaqSection } from "@/components/conversion/faq-section";
import { SectionCard } from "@/components/section-card";
import {
  AFTER_INTEGRATION,
  BEFORE_SESSION,
  BOOKING_DISCLAIMER,
  BOOKING_FINAL,
  BOOKING_FAQ,
  BOOKING_FORM_SECTION,
  BOOKING_HERO,
  BOOKING_META,
  BOOKING_WHO_FOR,
  BOOKING_WHO_NOT,
  HOW_BLUEPRINT_SHOWS_UP,
  POSITIONING,
  READING_OPTIONS,
  SESSION_EXPERIENCE,
  SESSION_REFLECTIONS,
  WHAT_IS_READING,
} from "@/lib/booking-content";
import { GENERATE_CODE_CTA, SAMPLE_REPORT_HREF } from "@/lib/site-nav";
import { getAccountContext } from "@/lib/auth/account-context";
import { resolveSessionVariant } from "@/lib/personal-integration/session-variants";

export const metadata: Metadata = {
  title: BOOKING_META.title,
  description: BOOKING_META.description,
};

type SearchParams = Record<string, string | string[] | undefined>;

function readType(params: SearchParams): string | undefined {
  const value = params.type;
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  return resolveSessionVariant(raw) ?? undefined;
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const defaultReadingType = readType(params);
  const account = await getAccountContext();
  const hasCode = Boolean(account?.codeString);
  const showGenerateCode = !hasCode;
  const bookingProfile = account
    ? {
        email: account.user.email,
        firstName: account.user.first_name,
        lastName: account.user.last_name,
        birthDate: account.birthDate,
        codeString: account.codeString,
      }
    : null;

  const returnPath = defaultReadingType
    ? `/booking?type=${encodeURIComponent(defaultReadingType)}#booking-form`
    : "/booking#booking-form";

  return (
    <div className="conversion-page booking-page booking-page--refined space-y-5">
      <header className="blueprint-hero glass-card booking-hero">
        <p className="blueprint-eyebrow">{BOOKING_HERO.eyebrow}</p>
        <h1 className="blueprint-title booking-hero-title">
          <span>{BOOKING_HERO.titleLine1}</span>
          <span>{BOOKING_HERO.titleLine2}</span>
        </h1>
        <p className="blueprint-lead">{BOOKING_HERO.body}</p>
        <p className="conversion-boundary booking-boundary">
          <span className="booking-boundary-line">{BOOKING_HERO.boundaryLine1}</span>
          <span className="booking-boundary-line">{BOOKING_HERO.boundaryLine2}</span>
        </p>
        <div className="blueprint-hero-actions">
          <a href="#booking-form" className="gold-button">
            {BOOKING_HERO.primaryCta}
          </a>
          <Link href="/full-report" className="blueprint-secondary-link">
            {BOOKING_HERO.secondaryCta}
          </Link>
        </div>
      </header>

      <SectionCard title={WHAT_IS_READING.title}>
        <div className="booking-prose">
          {WHAT_IS_READING.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={POSITIONING.title}>
        <ul className="booking-positioning-list">
          {POSITIONING.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title={SESSION_EXPERIENCE.title}>
        <ul className="conversion-bullet-list booking-experience-list">
          {SESSION_EXPERIENCE.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title={HOW_BLUEPRINT_SHOWS_UP.title}>
        <ul className="blueprint-layer-grid booking-shows-up-grid">
          {HOW_BLUEPRINT_SHOWS_UP.items.map((item) => (
            <li
              key={item.category}
              className={`blueprint-layer-item segment-bg segment-bg--${item.code.toLowerCase()}`}
            >
              <span className="blueprint-layer-code">{item.category}</span>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="conversion-pair">
        <SectionCard title={BOOKING_WHO_FOR.title}>
          <p className="booking-who-lead">{BOOKING_WHO_FOR.lead}</p>
          <ul className="conversion-bullet-list">
            {BOOKING_WHO_FOR.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title={BOOKING_WHO_NOT.title}>
          <p className="booking-who-lead">{BOOKING_WHO_NOT.lead}</p>
          <ul className="conversion-bullet-list">
            {BOOKING_WHO_NOT.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title={READING_OPTIONS.title}>
        <div className="conversion-reading-grid">
          {READING_OPTIONS.options.map((option) => (
            <article
              key={option.id}
              className={`conversion-reading-card glass-card booking-session-card${
                option.mostRecommended ? " booking-session-card--recommended" : ""
              }`}
            >
              {option.mostRecommended ? (
                <p className="booking-session-badge">{READING_OPTIONS.mostRecommendedLabel}</p>
              ) : null}
              <h3>{option.title}</h3>
              <p className="conversion-reading-duration">
                {option.duration} · {option.price}
              </p>
              <p className="booking-session-positioning">{option.text}</p>
              <ul className="booking-session-includes">
                {option.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link
                href={`/booking?type=${option.id}#booking-form`}
                className={
                  option.mostRecommended
                    ? "gold-button conversion-reading-cta"
                    : "blueprint-secondary-link conversion-reading-cta"
                }
              >
                {option.cta}
              </Link>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={BEFORE_SESSION.title}>
        <ol className="blueprint-steps-list booking-before-list">
          {BEFORE_SESSION.items.map((item, index) => (
            <li key={item}>
              <span className="blueprint-step-num">{String(index + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
        <p className="booking-after-note">{BEFORE_SESSION.afterNote}</p>
      </SectionCard>

      <SectionCard title={BOOKING_FORM_SECTION.title} id="booking-form">
        {account ? (
          <>
            <p className="booking-form-lead">{BOOKING_FORM_SECTION.signedInLead}</p>
            {showGenerateCode ? (
              <p className="booking-form-secondary-path">
                <Link href={GENERATE_CODE_CTA.href} className="blueprint-secondary-link">
                  {BOOKING_FORM_SECTION.generateCodeCta}
                </Link>
              </p>
            ) : null}
            <BookingRequestForm defaultReadingType={defaultReadingType} account={bookingProfile} />
          </>
        ) : (
          <>
            <BookingLoginGate nextPath={returnPath} />
            {showGenerateCode ? (
              <p className="booking-form-secondary-path">
                <Link href={GENERATE_CODE_CTA.href} className="blueprint-secondary-link">
                  {BOOKING_FORM_SECTION.generateCodeCta}
                </Link>
              </p>
            ) : null}
          </>
        )}
      </SectionCard>

      <SectionCard title={SESSION_REFLECTIONS.title}>
        <p className="booking-who-lead">{SESSION_REFLECTIONS.lead}</p>
        <ul className="booking-reflection-questions">
          {SESSION_REFLECTIONS.questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </SectionCard>

      <FaqSection title="FAQ" items={BOOKING_FAQ} />
      <p className="booking-faq-more">
        <Link href="/faq" className="blueprint-secondary-link">
          View Full FAQ
        </Link>
      </p>

      <SectionCard title={AFTER_INTEGRATION.title}>
        <div className="booking-prose">
          {AFTER_INTEGRATION.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="booking-who-lead mt-4">{AFTER_INTEGRATION.continueLead}</p>
        <ul className="booking-continue-path">
          {AFTER_INTEGRATION.path.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </SectionCard>

      <section className="blueprint-final-cta glass-card">
        <h2>{BOOKING_FINAL.title}</h2>
        <p>{BOOKING_FINAL.body}</p>
        <a href="#booking-form" className="gold-button">
          {BOOKING_FINAL.cta}
        </a>
        <Link href={SAMPLE_REPORT_HREF} className="blueprint-secondary-link block mt-3">
          {BOOKING_FINAL.secondaryCta}
        </Link>
      </section>

      <p className="blueprint-disclaimer">{BOOKING_DISCLAIMER}</p>
    </div>
  );
}
