import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { Toggle } from "@/components/ui";

describe("Toggle accessibility", () => {
  it("has no axe violations when off", async () => {
    const { container } = render(
      <Toggle id="notif-off" label="Notifications" checked={false} onCheckedChange={() => {}} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations when on, with a description", async () => {
    const { container } = render(
      <Toggle
        id="notif-on"
        label="Notifications"
        description="Get a reminder for daily lessons."
        checked={true}
        onCheckedChange={() => {}}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations when disabled", async () => {
    const { container } = render(
      <Toggle id="notif-disabled" label="Notifications" checked={false} onCheckedChange={() => {}} disabled />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
