import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { CourseCard } from "@/components/browse/CourseCard";
import { getAllCourses } from "@/data/queries";

const course = getAllCourses()[0];

describe("CourseCard accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(<CourseCard course={course} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
