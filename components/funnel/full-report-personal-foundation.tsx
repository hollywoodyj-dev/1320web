"use client";

import { useEffect, useState } from "react";
import { BIRTH_COOKIE_NAME, parseBirthCookieValue } from "@/lib/birth-cookie";
import { calculate1320Code } from "@/lib/calculate1320Code";
import { PERSONAL_FOUNDATION_CONTEXT } from "@/lib/full-report-content";
import { isValidBirthDate } from "@/lib/validateBirthDate";

type FoundationCode = { label: string; value: string | number };

function readBirthFromBrowser(): { year: number; month: number; day: number } | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const year = Number.parseInt(params.get("year") ?? "", 10);
  const month = Number.parseInt(params.get("month") ?? "", 10);
  const day = Number.parseInt(params.get("day") ?? "", 10);
  if (isValidBirthDate(year, month, day)) return { year, month, day };

  const match = document.cookie.match(new RegExp(`(?:^|; )${BIRTH_COOKIE_NAME}=([^;]*)`));
  if (!match?.[1]) return null;
  return parseBirthCookieValue(decodeURIComponent(match[1]));
}

/** Account/birth-aware foundation strip — client-only so the sales page can stay static. */
export function FullReportPersonalFoundation() {
  const [codes, setCodes] = useState<FoundationCode[] | null>(null);

  useEffect(() => {
    const birth = readBirthFromBrowser();
    if (!birth) return;
    const code = calculate1320Code(birth.year, birth.month, birth.day);
    setCodes([
      { label: "S1", value: code.s1 },
      { label: "S3", value: code.s3Raw },
      { label: "S2", value: code.s2 },
      { label: "S0", value: code.s0 },
    ]);
  }, []);

  if (!codes) return null;

  return (
    <section className="full-report-personal-foundation" aria-label={PERSONAL_FOUNDATION_CONTEXT.title}>
      <h2 className="full-report-invite-title">{PERSONAL_FOUNDATION_CONTEXT.title}</h2>
      <ul className="full-report-foundation-codes">
        {codes.map((item) => (
          <li key={item.label}>
            {item.label}-{String(item.value)}
          </li>
        ))}
      </ul>
      <p>{PERSONAL_FOUNDATION_CONTEXT.supporting}</p>
    </section>
  );
}
