"use client";

import Link from "next/link";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { SeoArticleCtaLink } from "@/components/seo/seo-article-cta-link";
import { trackEvent } from "@/lib/analytics";
import {
  calculateLifePath,
  MONTH_OPTIONS,
  validateLifePathFields,
  type LifePathResult,
} from "@/lib/life-path/calculate-life-path";
import { saveLifePathHandoff } from "@/lib/life-path/handoff";
import { getLifePathMeaning, lifePathSectionId } from "@/lib/life-path/meanings";
import { seoAttributionAnalyticsProps } from "@/lib/seo/attribution";
import { FREE_BLUEPRINT_HREF } from "@/lib/seo/types";

const SLUG = "what-is-my-life-path-number";
const CLUSTER = "life-path-numerology";
const ANALYTICS_CLUSTER = "life-path-calculator";

type LifePathCalculatorProps = {
  primaryKeyword?: string;
};

function reductionTrace(value: number, reduced: number): string {
  if (value === reduced) return String(reduced);
  return `${value} → ${reduced}`;
}

function yearReductionTrace(year: number, yearValue: number): string {
  const digits = String(year).split("").join(" + ");
  const first = String(year)
    .split("")
    .reduce((sum, d) => sum + Number(d), 0);
  if (first === yearValue) return `${year} → ${digits} = ${yearValue}`;
  return `${year} → ${digits} = ${first} → ${yearValue}`;
}

export function LifePathCalculator({ primaryKeyword }: LifePathCalculatorProps) {
  const formId = useId();
  const resultRef = useRef<HTMLElement>(null);
  const startedRef = useRef(false);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<(LifePathResult & { input: { year: number; month: number; day: number } }) | null>(
    null,
  );
  const [traceOpen, setTraceOpen] = useState(true);

  const baseProps = () =>
    seoAttributionAnalyticsProps({
      content_slug: SLUG,
      primary_cluster: ANALYTICS_CLUSTER,
      ...(primaryKeyword ? { primary_keyword: primaryKeyword } : {}),
    });

  useEffect(() => {
    if (!result) return;
    const meaning = getLifePathMeaning(result.lifePath);
    if (meaning) {
      trackEvent("life_path_result_meaning_viewed", {
        ...baseProps(),
        result_number: result.lifePath,
        result_type: result.underlyingNumber != null ? "master_number" : "single_digit",
      });
    }
    const id = lifePathSectionId(result.lifePath);
    window.requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById(id)?.classList.add("wimlpn-meaning--active");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once per result
  }, [result]);

  function onFieldFocus() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("life_path_calculator_started", baseProps());
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const validated = validateLifePathFields({ year, month, day });
    if (!validated.ok) {
      setResult(null);
      setError(validated.message);
      trackEvent("life_path_calculation_error", {
        ...baseProps(),
        error_type: validated.error,
      });
      return;
    }

    try {
      const calculated = calculateLifePath(validated.value);
      setResult({ ...calculated, input: validated.value });
      setTraceOpen(true);
      trackEvent("life_path_calculator_completed", {
        ...baseProps(),
        result_number: calculated.lifePath,
        result_type: calculated.underlyingNumber != null ? "master_number" : "single_digit",
      });
    } catch {
      setResult(null);
      setError("Please check the birth date and try again.");
      trackEvent("life_path_calculation_error", {
        ...baseProps(),
        error_type: "invalid_date",
      });
    }
  }

  function continueWithBirthDate() {
    if (!result) return;
    saveLifePathHandoff(result.input.year, result.input.month, result.input.day);
  }

  const meaning = result ? getLifePathMeaning(result.lifePath) : null;
  const hasResult = Boolean(result && meaning);

  return (
    <section id="life-path-calculator" className="wimlpn-calculator" aria-labelledby={`${formId}-heading`}>
      <h2 id={`${formId}-heading`}>Calculate Your Life Path Number</h2>
      <p className="wimlpn-calculator-support">
        Enter your complete date of birth.
        <br />
        No name, birth time, location or email is required.
      </p>

      <form className="wimlpn-calculator-form" onSubmit={onSubmit} noValidate>
        <div className="wimlpn-field-grid birthdate-field-grid">
          <label className="birthdate-field" htmlFor={`${formId}-month`}>
            <span className="birthdate-field-label">Month</span>
            <select
              id={`${formId}-month`}
              name="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              onFocus={onFieldFocus}
              required
            >
              <option value="">Month</option>
              {MONTH_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="birthdate-field" htmlFor={`${formId}-day`}>
            <span className="birthdate-field-label">Day</span>
            <select
              id={`${formId}-day`}
              name="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              onFocus={onFieldFocus}
              required
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={String(d)}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label className="birthdate-field birthdate-field-year" htmlFor={`${formId}-year`}>
            <span className="birthdate-field-label">Year</span>
            <input
              id={`${formId}-year`}
              name="year"
              type="text"
              inputMode="numeric"
              autoComplete="bday-year"
              placeholder="YYYY"
              maxLength={4}
              value={year}
              onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
              onFocus={onFieldFocus}
              required
            />
          </label>
        </div>

        {error ? (
          <p className="wimlpn-error" role="alert">
            {error}
          </p>
        ) : null}

        <div className={`wimlpn-calc-actions${hasResult ? " wimlpn-calc-actions--has-result" : ""}`}>
          <button
            type="submit"
            className={hasResult ? "gold-button gold-button--secondary wimlpn-calc-submit" : "gold-button wimlpn-calc-submit"}
          >
            Calculate My Life Path Number
          </button>
        </div>

        <p className="wimlpn-privacy">
          Your Life Path calculation can run in your browser. Your birth date is not required for email signup or
          account creation.
        </p>

        {!hasResult ? (
          <p className="wimlpn-quiet-link">
            <Link href={FREE_BLUEPRINT_HREF}>Discover My Free Soul Blueprint</Link>
          </p>
        ) : null}
      </form>

      <p className="wimlpn-method-note">
        <strong>{PAGE03_METHOD_INLINE.heading}</strong> {PAGE03_METHOD_INLINE.body}
      </p>

      {hasResult && result && meaning ? (
        <article
          ref={resultRef}
          className="wimlpn-result"
          aria-live="polite"
          aria-labelledby={`${formId}-result-heading`}
        >
          <h2 id={`${formId}-result-heading`}>Your Numerology Life Path Number</h2>
          <p className="wimlpn-result-number">Your Life Path Number Is {result.lifePath}</p>
          <p className="wimlpn-result-title">
            {meaning.isMaster ? `Master Number ${result.lifePath} · ${meaning.title}` : meaning.title}
          </p>
          {result.underlyingNumber != null ? (
            <p className="wimlpn-result-root">Underlying root: {result.underlyingNumber}</p>
          ) : null}

          <p className="wimlpn-result-body">{meaning.body}</p>
          <p className="wimlpn-result-body">
            This does not mean you must match every association. It offers a symbolic theme you can compare with your
            lived experience.
          </p>

          <p>
            <strong>Common strengths:</strong> {meaning.strengths}
          </p>
          <p>
            <strong>Possible growth edge:</strong> {meaning.growthEdge}
          </p>
          <p>
            <strong>Reflection:</strong> {meaning.reflection}
          </p>

          {result.underlyingNumber != null ? (
            <p className="wimlpn-master-note">
              Some numerology traditions interpret {result.lifePath} as a Master Number while also recognising its
              underlying root of {result.underlyingNumber}. The Master Number should not be described as more valuable,
              evolved or spiritually superior to other Life Path Numbers.
            </p>
          ) : null}

          <details className="wimlpn-trace" open={traceOpen} onToggle={(e) => setTraceOpen(e.currentTarget.open)}>
            <summary>How we calculated this</summary>
            <ul>
              <li>
                Month: {reductionTrace(result.input.month, result.monthValue)}
              </li>
              <li>
                Day: {reductionTrace(result.input.day, result.dayValue)}
              </li>
              <li>
                Year: {yearReductionTrace(result.input.year, result.yearValue)}
              </li>
              <li>
                Combined: {result.monthValue} + {result.dayValue} + {result.yearValue} = {result.combinedTotal}
                {result.combinedTotal !== result.lifePath ? ` → ${result.lifePath}` : ""}
              </li>
            </ul>
          </details>

          <div className="wimlpn-result-cta">
            <SeoArticleCtaLink
              cta={{
                label: "Discover My Free Soul Blueprint",
                href: FREE_BLUEPRINT_HREF,
                intent: "free_blueprint",
              }}
              slug={SLUG}
              cluster={CLUSTER}
              placement="result"
              primaryKeyword={primaryKeyword}
              className="gold-button"
              onNavigate={continueWithBirthDate}
            />
            <p className="wimlpn-handoff-note">
              Continue into a separate 1320 experience. Your Life Path result is not part of the Soul Blueprint
              calculation.
            </p>
            <p className="wimlpn-quiet-link">
              <Link href={`#${lifePathSectionId(result.lifePath)}`}>Read the full meaning for Life Path {result.lifePath}</Link>
            </p>
          </div>
        </article>
      ) : null}
    </section>
  );
}

const PAGE03_METHOD_INLINE = {
  heading: "This calculator uses a Pythagorean-style Life Path method.",
  body: "It reduces the month, day and year separately, preserving 11, 22 and 33 where they appear, then combines and reduces the final total.",
};
