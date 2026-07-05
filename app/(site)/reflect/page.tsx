import type { Metadata } from "next";
import Link from "next/link";
import { ReflectEntryForm } from "@/components/reflect-entry-form";
import { SectionCard } from "@/components/section-card";
import { REFLECT_HERO, REFLECT_META } from "@/lib/wisewave/reflect-content";

export const metadata: Metadata = {
  title: REFLECT_META.title,
  description: REFLECT_META.description,
};

export default function ReflectPage() {
  return (
    <div className="conversion-page space-y-5">
      <section className="conversion-hero">
        <p className="conversion-eyebrow">{REFLECT_HERO.eyebrow}</p>
        <h1 className="conversion-title">{REFLECT_HERO.title}</h1>
        <p className="conversion-boundary text-sm opacity-90">{REFLECT_HERO.boundary}</p>
      </section>
      <SectionCard title="Begin">
        <ReflectEntryForm />
      </SectionCard>
      <p className="text-sm opacity-80">
        Prefer a live facilitator?{" "}
        <Link href="/booking" className="blueprint-secondary-link">
          Request a Personal Integration Session
        </Link>
        .
      </p>
    </div>
  );
}
