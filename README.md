# LearnAble

LearnAble is an accessibility-first learning platform: a course catalog and lesson player built from the ground up to meet **WCAG 2.2 AA**, not retrofitted for it. Every interactive control is a real native element (buttons, radios, `<video>`, range inputs), keyboard operability and focus management are treated as first-class features rather than an afterthought, and users can adjust text size, contrast, motion, and font to fit how they read.

## Stack

- **Next.js 15** (App Router, TypeScript) on **React 19**
- **Tailwind CSS 3**, with design tokens as CSS custom properties (so preferences like high contrast can override them app-wide from one place)
- **Zustand** (with `persist`) for progress tracking and accessibility preferences
- **react-markdown** for safe, semantic rendering of lesson content
- **Vitest + Testing Library + jest-axe** for component and accessibility testing

## Running locally

```bash
npm i
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # eslint, including the strict jsx-a11y ruleset
```

## Testing

```bash
npm test         # run the test suite once
npm run test:watch
```

23 tests across 9 files: component-level `jest-axe` checks (Quiz, VideoPlayer, CourseCard, Toggle, Field, the preferences form) and behavioral tests for the accessibility-critical logic (quiz validation and focus management, live-region announcements, preference-driven `<html>` attributes, `ProgressBar`'s ARIA wiring).

## Accessibility

This is the point of the project, so here's what's actually implemented rather than just claimed:

- **A fully custom, keyboard-operable video player** — no reliance on the browser's default controls. Play/pause, seek, volume, mute, playback speed, captions toggle, and fullscreen are all real `<button>`/`<input type="range">`/`<select>` elements, every one reachable and operable by keyboard with a visible focus ring.
- **Captions and a synced, seekable transcript** — a real `<track kind="captions">` wired to a WebVTT file, plus a transcript list where each line is a button that seeks the video and highlights as the nearest line to the current playback position.
- **Managed focus, not just visible focus** — on quiz validation errors, per-question feedback, quiz results, and question navigation, focus is deliberately moved to the relevant new content so keyboard and screen-reader users land where the action happened, instead of losing their place.
- **Live-region announcements** for state changes that don't otherwise get announced: play/pause, captions on/off, quiz answer correctness, quiz completion, and every accessibility preference change.
- **User-adjustable preferences that actually apply app-wide**, not just stored: text size (up to 20px root, scaling every rem-based size in the app), high contrast (verified AAA-level contrast ratios, not just AA), reduce motion (disables transitions independent of OS settings), a genuine OFL-licensed dyslexia-friendly font (OpenDyslexic), and a default-captions-on toggle — all persisted across visits.
- **Semantic HTML first, ARIA only where native elements can't do the job** — real `<fieldset>`/`<legend>` radio groups for the quiz and preferences, real `<dl>` for account details, proper heading order, and `role="list"` only where Tailwind's own CSS strips native list semantics (a documented Safari/VoiceOver bug).
- **Verified, not assumed**: 0 axe-core violations of any severity across all 9 pages (Browse, course detail, video/text/quiz lessons, Preferences, Progress, Learn, Account), checked with a real Chrome instance in addition to the automated test suite.
