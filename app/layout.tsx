import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { getSiteUrl } from "@/lib/platform-config";
import "./globals.css";
import "@/styles/site-density-v1.css";
import "@/styles/about-density-v1.css";
import "@/styles/blueprint-density-v1.css";
import "@/styles/your-code-density-v1.css";
import "@/styles/generating-density-v1.css";
import "@/styles/result-density-v1.css";
import "@/styles/full-report-density-v1.css";
import "@/styles/booking-density-v1.css";
import "@/styles/free-soul-blueprint-v1.css";
import "@/styles/full-report-v2/report-global.css";
import "@/styles/full-report-v2/report-theme-dark.css";
import "@/styles/full-report-v2/report-components.css";
import "@/styles/full-report-v2/report-pages.css";
import "@/styles/full-report-v2/report-responsive.css";
import "@/styles/full-report-v2/report-print.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "1320 Soul Code | Meet Your Soul Blueprint",
    template: "%s | 1320 Soul Code",
  },
  description:
    "Discover your Free Soul Blueprint with 1320 Soul Code — a symbolic mirror for self-awareness, reflection, and conscious integration.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "1320 Soul Code",
  },
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification
            ? {
                other: {
                  "msvalidate.01": bingVerification,
                },
              }
            : {}),
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
