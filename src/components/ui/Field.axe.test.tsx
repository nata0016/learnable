import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { Field } from "@/components/ui";

describe("Field accessibility", () => {
  it("has no axe violations (plain input)", async () => {
    const { container } = render(<Field id="name" label="Full name" placeholder="Ada Lovelace" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations with a description", async () => {
    const { container } = render(
      <Field
        id="email"
        label="Email"
        description="We'll only use this to send progress updates."
        placeholder="ada@example.com"
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations with an error", async () => {
    const { container } = render(
      <Field id="username" label="Username" error="This username is already taken." defaultValue="ada" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations as a select", async () => {
    const { container } = render(
      <Field as="select" id="level" label="Level" defaultValue="beginner">
        <option value="beginner">Beginner</option>
        <option value="advanced">Advanced</option>
      </Field>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
