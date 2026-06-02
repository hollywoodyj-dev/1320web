import type { Metadata } from "next";
import { ImmersiveShell } from "@/components/immersive-shell";

export const metadata: Metadata = {
  title: "Opening Your 1320 Soul Blueprint",
  description: "Your four-part Soul Code is forming through Origin Frequency, Vibration Tier, Mirror Path, and Void Gate.",
};

export default function GeneratingLayout({ children }: { children: React.ReactNode }) {
  return <ImmersiveShell>{children}</ImmersiveShell>;
}
