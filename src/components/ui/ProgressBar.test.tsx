import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { ProgressBar } from "@/components/ui";

describe("ProgressBar", () => {
  it("exposes correct aria-valuenow/min/max and a visible text label", () => {
    render(
      <ProgressBar value={3} min={0} max={5}>
        3 of 5 lessons complete
      </ProgressBar>
    );

    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBe("3");
    expect(bar.getAttribute("aria-valuemin")).toBe("0");
    expect(bar.getAttribute("aria-valuemax")).toBe("5");
    expect(screen.getByText("3 of 5 lessons complete")).toBeDefined();

    // the visible text is also the progressbar's accessible name, not just nearby text
    expect(screen.getByRole("progressbar", { name: "3 of 5 lessons complete" })).toBe(bar);
  });

  it("clamps the fill width to the 0-100 range", () => {
    const { rerender, container } = render(
      <ProgressBar value={999} max={5}>
        Over max
      </ProgressBar>
    );
    let fill = container.querySelector(".bg-teal") as HTMLElement;
    expect(fill.style.width).toBe("100%");

    rerender(
      <ProgressBar value={-10} max={5}>
        Under min
      </ProgressBar>
    );
    fill = container.querySelector(".bg-teal") as HTMLElement;
    expect(fill.style.width).toBe("0%");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <ProgressBar value={2} max={4}>
        2 of 4 questions answered
      </ProgressBar>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
