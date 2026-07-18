import Link from "next/link";
import { SectionCard } from "@/components/section-card";

type BookingLoginGateProps = {
  nextPath?: string;
};

export function BookingLoginGate({ nextPath = "/booking" }: BookingLoginGateProps) {
  const next = encodeURIComponent(nextPath);

  return (
    <SectionCard title="Sign in to book">
      <p className="mb-4">
        Create a free account once with your name and birth date. After that, booking only asks about
        your session — no repeating the same details.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href={`/signup?next=${next}`} className="gold-button">
          CREATE ACCOUNT
        </Link>
        <Link href={`/login?next=${next}`} className="blueprint-secondary-link self-center">
          Sign in
        </Link>
      </div>
    </SectionCard>
  );
}
