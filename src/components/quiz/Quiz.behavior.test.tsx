import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

describe("Quiz behavior", () => {
  it("shows a role=alert error and moves focus to the fieldset when submitting with nothing selected", async () => {
    const user = userEvent.setup();
    render(<Quiz slug={course.slug} lesson={quizLesson} />);

    await user.click(screen.getByRole("button", { name: "Check answer" }));

    const alert = screen.getByRole("alert");
    expect(alert.textContent).toBe("Select an answer to continue.");

    const fieldset = document.querySelector("fieldset");
    expect(fieldset).not.toBeNull();
    expect(document.activeElement).toBe(fieldset);

    // the fieldset is wired to the error via aria-describedby
    expect(fieldset?.getAttribute("aria-describedby")).toBe(alert.id);
  });

  it("announces the result via the aria-live region and moves focus to the feedback after answering", async () => {
    const user = userEvent.setup();
    render(<Quiz slug={course.slug} lesson={quizLesson} />);

    const firstQuestion = quizLesson.questions[0];
    const correctOption = firstQuestion.options.find(
      (option) => option.id === firstQuestion.correctOptionId
    )!;

    await user.click(screen.getByLabelText(correctOption.text));
    await user.click(screen.getByRole("button", { name: "Check answer" }));

    const liveRegion = document.querySelector('[aria-live="polite"]');
    expect(liveRegion?.textContent).toBe("Correct");

    // "Correct" legitimately appears twice: the visible feedback and the live-region echo.
    expect(screen.getAllByText("Correct")).toHaveLength(2);
    expect(screen.getByText(firstQuestion.explanation)).toBeDefined();

    // radios lock once the question is submitted
    const radios = document.querySelectorAll<HTMLInputElement>(`input[name="${firstQuestion.id}"]`);
    radios.forEach((radio) => expect(radio.disabled).toBe(true));
  });

  it("shows incorrect feedback for a wrong answer", async () => {
    const user = userEvent.setup();
    render(<Quiz slug={course.slug} lesson={quizLesson} />);

    const firstQuestion = quizLesson.questions[0];
    const wrongOption = firstQuestion.options.find(
      (option) => option.id !== firstQuestion.correctOptionId
    )!;

    await user.click(screen.getByLabelText(wrongOption.text));
    await user.click(screen.getByRole("button", { name: "Check answer" }));

    expect(screen.getByText("Not quite")).toBeDefined();
    const liveRegion = document.querySelector('[aria-live="polite"]');
    expect(liveRegion?.textContent).toBe("Not quite — see the explanation");
  });

  it("persists the score to the progress store when the quiz is completed", async () => {
    const user = userEvent.setup();
    render(<Quiz slug={course.slug} lesson={quizLesson} />);

    for (let index = 0; index < quizLesson.questions.length; index += 1) {
      const question = quizLesson.questions[index];
      const correctOption = question.options.find((option) => option.id === question.correctOptionId)!;
      const isLast = index === quizLesson.questions.length - 1;

      await user.click(screen.getByLabelText(correctOption.text));
      await user.click(screen.getByRole("button", { name: "Check answer" }));
      await user.click(screen.getByRole("button", { name: isLast ? "See results" : "Next question" }));
    }

    const key = `${course.slug}:${quizLesson.id}`;
    const score = useProgressStore.getState().quizScores[key];
    expect(score).toEqual({ correct: quizLesson.questions.length, total: quizLesson.questions.length });

    const completed = useProgressStore.getState().completedLessons[course.slug];
    expect(completed).toContain(quizLesson.id);

    expect(screen.getByText(`${quizLesson.questions.length} of ${quizLesson.questions.length} correct`)).toBeDefined();
  });
});
