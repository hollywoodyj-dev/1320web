"use client";

import { BirthDateForm } from "@/components/birthdate-form";

/** Wired calculator for homepage entry panel — layout unchanged, submit only. */
export function HomeBirthdateEntry() {
  return <BirthDateForm variant="homepage" idPrefix="home-birth" />;
}
