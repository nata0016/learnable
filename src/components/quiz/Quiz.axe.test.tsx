import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Quiz } from "@/components/quiz/Quiz";
import { getCourseBySlug } from "@/data/queries";
import { useProgressStore } from "@/store/progress";
import type { QuizLesson } from "@/types/course";

const course = getCourseBySlug("data-analysis-foundations")!;
const quizLesson = course.lessons.find((lesson): lesson is QuizLesson => lesson.kind === "quiz")!;

beforeEach(() => {
  localStorage.clear();
  useProgressStore.setState({ completedLessons: {}, quizScores: {} });
});

describe("Quiz accessibility", () => {
  it("has no axe violations in the initial state", async () => {
    const { container } = render(<Quiz slug={course.slug} lesson={quizLesson} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations after answering a question", async () => {
    const user = userEvent.setup();
    const { container } = render(<Quiz slug={course.slug} lesson={quizLesson} />);

    const firstQuestion = quizLesson.questions[0];
    await user.click(screen.getByLabelText(firstQuestion.options[0].text));
    await user.click(screen.getByRole("button", { name: "Check answer" }));

    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations on a validation error", async () => {
    const user = userEvent.setup();
    const { container } = render(<Quiz slug={course.slug} lesson={quizLesson} />);

    await user.click(screen.getByRole("button", { name: "Check answer" }));

    expect(await axe(container)).toHaveNoViolations();
  });
});
