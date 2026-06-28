import type { Metadata } from "next";
import { Schibsted_Grotesk, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500", "600"],
  variable: "--font-italic",
  display: "swap",
});

// Eyebrow/label font — self-hosted via next/font instead of a manual Google
// Fonts <link>, so it's optimized and doesn't block on an external request.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaskShift AI — AI Automation Agency for Local Businesses",
  description:
    "TaskShift AI builds voice agents, WhatsApp automations and custom tools that catch every lead and handle the busywork — 24/7, so local businesses can focus on the work that matters.",
  openGraph: {
    title: "TaskShift AI — AI Automation Agency",
    description:
      "Voice agents, automation and intelligent tools — designed and deployed for businesses that want to move faster with fewer people.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskShift AI — AI Automation Agency",
    description:
      "Voice agents, automation and intelligent tools — designed and deployed for businesses that want to move faster with fewer people.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${schibsted.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <style>{`
          .eyebrow {
            font-family: var(--font-mono), monospace;
          }
          body {
            font-family: var(--font-display, 'Schibsted Grotesk', sans-serif);
          }
        `}</style>
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
