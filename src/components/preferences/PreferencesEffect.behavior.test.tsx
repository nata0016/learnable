import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PreferencesEffect } from "@/components/preferences/PreferencesEffect";
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
  document.documentElement.removeAttribute("data-text-scale");
  document.documentElement.removeAttribute("data-contrast");
  document.documentElement.removeAttribute("data-reduce-motion");
  document.documentElement.removeAttribute("data-dyslexia");
});

describe("Preferences apply to <html> via PreferencesEffect", () => {
  it("sets data-text-scale on documentElement when the text size radio changes", async () => {
    const user = userEvent.setup();
    render(
      <>
        <PreferencesEffect />
        <PreferencesPage />
      </>
    );

    await user.click(screen.getByLabelText("Extra large"));

    await waitFor(() => {
      expect(document.documentElement.getAttribute("data-text-scale")).toBe("xlarge");
    });
  });

  it("sets data-reduce-motion=on when the Reduce motion switch is toggled", async () => {
    const user = userEvent.setup();
    render(
      <>
        <PreferencesEffect />
        <PreferencesPage />
      </>
    );

    await user.click(screen.getByRole("switch", { name: "Reduce motion" }));

    await waitFor(() => {
      expect(document.documentElement.getAttribute("data-reduce-motion")).toBe("on");
    });
  });

  it("sets data-contrast=high when High contrast is toggled", async () => {
    const user = userEvent.setup();
    render(
      <>
        <PreferencesEffect />
        <PreferencesPage />
      </>
    );

    await user.click(screen.getByRole("switch", { name: "High contrast" }));

    await waitFor(() => {
      expect(document.documentElement.getAttribute("data-contrast")).toBe("high");
    });
  });
});
