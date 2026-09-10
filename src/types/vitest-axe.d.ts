import type { AxeResults } from "axe-core";

// jest-axe ships types for Jest's `expect`, not Vitest's. This augments
// Vitest's own `Assertion` interface for the one matcher we register
// (expect.extend(toHaveNoViolations)) in vitest.setup.ts.
declare module "vitest" {
  interface Assertion<T = unknown> {
    toHaveNoViolations(): T extends AxeResults ? void : never;
  }
}

export {};
