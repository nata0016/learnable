import type { Metadata } from "next";
import { Atkinson_Hyperlegible, IBM_Plex_Mono } from "next/font/google";
import { Header } from "@/components/shell/Header";
import { MobileNav } from "@/components/shell/MobileNav";
import { PreferencesEffect } from "@/components/preferences/PreferencesEffect";
import "@fontsource/opendyslexic/400.css";
import "@fontsource/opendyslexic/700.css";
import "./globals.css";

// Populates --font-sans-base (not --font-sans directly) so globals.css can
// define --font-sans as a plain reference to it. That indirection matters:
// the dyslexia-font override redefines --font-sans, and a CSS custom
// property that referenced itself (var(--font-sans) inside --font-sans's
// own new value) would be circular and invalid at computed-value time.
const atkinsonHyperlegible = Atkinson_Hyperlegible({
  variable: "--font-sans-base",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "%s · LearnAble",
    default: "LearnAble — Accessibility-first learning",
  },
  description:
    "LearnAble is an accessibility-first learning platform built to WCAG 2.2 AA, with a fully keyboard-operable video player, captions and transcripts, and adjustable text size, contrast, motion, and font preferences.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${atkinsonHyperlegible.variable} ${ibmPlexMono.variable}`}>
      <body
        className="min-h-full flex flex-col bg-paper text-ink font-sans antialiased pb-16 md:pb-0"
        suppressHydrationWarning
      >
        <PreferencesEffect />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-ink focus:shadow-md"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <footer className="border-t border-line bg-surface">
          <div className="mx-auto max-w-5xl px-4 py-4 text-sm text-muted">
            &copy; {new Date().getFullYear()} Learnable
          </div>
        </footer>
        <MobileNav />
      </body>
    </html>
  );
}
