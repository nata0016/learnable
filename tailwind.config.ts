import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Each token is backed by a CSS custom property (defined in globals.css
        // as "R G B" channels) so accessibility preferences — high contrast in
        // particular — can override the token app-wide via a single data
        // attribute on <html>, without touching any component. The
        // `rgb(var(...) / <alpha-value>)` form is Tailwind's documented pattern
        // for CSS-variable colors that still support opacity modifiers (e.g. bg-ink/95).
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        teal: "rgb(var(--color-teal) / <alpha-value>)",
        deep: "rgb(var(--color-deep) / <alpha-value>)",
        coral: "rgb(var(--color-coral) / <alpha-value>)",
        mint: "rgb(var(--color-mint) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        tint: "rgb(var(--color-tint) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        warn: "rgb(var(--color-warn) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
