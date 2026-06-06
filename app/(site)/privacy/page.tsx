import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-document";
import { PRIVACY_META, PRIVACY_SECTIONS } from "@/lib/privacy-content";

export const metadata: Metadata = {
  title: PRIVACY_META.title,
  description: PRIVACY_META.description,
};

export default function PrivacyPage() {
  return (
    <div className="conversion-page legal-page">
      <header className="blueprint-hero glass-card">
        <p className="blueprint-eyebrow">LEGAL</p>
        <h1 className="blueprint-title">Privacy Policy</h1>
        <p className="blueprint-lead">
          How we collect, use, and protect information on the 1320 Soul Origin Code site.
        </p>
      </header>
      <LegalDocument sections={PRIVACY_SECTIONS} />
    </div>
  );
}
