import { beforeEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import PreferencesPage from "@/app/preferences/page";
import { usePreferencesStore } from "@/store/preferences";

beforeEach(() => {
  localStorage.clear();
  usePreferencesStore.setState({
    textScale: "default",
    contrast: "normal",
    reduceMotion: "system",
    dyslexiaFont: false,
    captionsDefault: true,
  });
});

describe("Preferences form accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(<PreferencesPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
