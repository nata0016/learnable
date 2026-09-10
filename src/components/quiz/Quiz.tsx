"use client";

import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Button, ProgressBar } from "@/components/ui";
import { cn } from "@/lib/cn";
import { nextLesson, useHydrated, useProgressStore } from "@/store/progress";
import type { QuizLesson } from "@/types/course";

const PASS_THRESHOLD = 0.7;

type AnswerState = {
  selectedOptionId: string | null;
  submitted: boolean;
};

export function Quiz({ slug, lesson }: { slug: string; lesson: QuizLesson }) {
  const questions = lesson.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>(() =>
    questions.map(() => ({ selectedOptionId: null, submitted: false }))
  );
  const [showResults, setShowResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const fieldsetRef = useRef<HTMLFieldSetElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const resultsHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasMountedRef = useRef(false);

  const hydrated = useHydrated();
  const markLessonComplete = useProgressStore((state) => state.markLessonComplete);
  const setQuizScore = useProgressStore((state) => state.setQuizScore);
  const completedLessons = useProgressStore(useShallow((state) => state.completedLessons));

  const question = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const answeredCount = answers.filter((answer) => answer.submitted).length;
  const isCurrentCorrect = currentAnswer.selectedOptionId === question.correctOptionId;

  const correctCount = answers.filter(
    (answer, index) => answer.selectedOptionId === questions[index].correctOptionId
  ).length;
  const passed = correctCount / questions.length >= PASS_THRESHOLD;

  const next = hydrated ? nextLesson(slug)({ completedLessons }) : null;

  // Move focus to the relevant part of the new question/state on every
  // transition after the initial page load (never steal focus on mount).
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (currentAnswer.submitted) {
      feedbackRef.current?.focus();
    } else {
      fieldsetRef.current?.focus();
    }
  }, [currentIndex, currentAnswer.submitted]);

  useEffect(() => {
    if (!showResults) return;
    setQuizScore(slug, lesson.id, correctCount, questions.length);
    markLessonComplete(slug, lesson.id);
    resultsHeadingRef.current?.focus();
  }, [showResults, slug, lesson.id, correctCount, questions.length, setQuizScore, markLessonComplete]);

  function handleSelectOption(optionId: string) {
    setAnswers((prev) =>
      prev.map((answer, index) => (index === currentIndex ? { ...answer, selectedOptionId: optionId } : answer))
    );
    setErrorMessage(null);
  }

  function handleCheckAnswer() {
    if (!currentAnswer.selectedOptionId) {
      setErrorMessage("Select an answer to continue.");
      fieldsetRef.current?.focus();
      return;
    }

    setErrorMessage(null);
    setAnswers((prev) =>
      prev.map((answer, index) => (index === currentIndex ? { ...answer, submitted: true } : answer))
    );
    setAnnouncement(isCurrentCorrect ? "Correct" : "Not quite — see the explanation");
  }

  function handleNext() {
    if (isLastQuestion) {
      setShowResults(true);
      return;
    }
    setCurrentIndex((index) => index + 1);
    setErrorMessage(null);
  }

  function handleReview() {
    setShowResults(false);
    setCurrentIndex(0);
    setErrorMessage(null);
  }

  const errorId = `${question.id}-error`;

  return (
    <div>
      {showResults ? (
        <div>
          <h2
            ref={resultsHeadingRef}
            tabIndex={-1}
            className="text-2xl font-bold text-ink focus:outline-none"
          >
            Quiz results
          </h2>

          <div className="mt-4 flex items-center gap-3 rounded-lg border border-line bg-tint p-4">
            <span aria-hidden="true" className={cn("text-2xl", passed ? "text-success" : "text-warn")}>
              {passed ? "✓" : "!"}
            </span>
            <div>
              <p className={cn("font-semibold", passed ? "text-success" : "text-warn")}>
                {passed ? "Nice work — you passed" : "Keep practicing"}
              </p>
              <p className="text-sm text-ink">
                {correctCount} of {questions.length} correct
              </p>
            </div>
          </div>

          <h3 className="mt-8 text-lg font-semibold text-ink">Review your answers</h3>
          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles -- Tailwind's preflight sets list-style:none, which strips ol/ul's implicit list role in Safari/VoiceOver; role="list" restores it. */}
          <ol role="list" className="mt-4 flex flex-col gap-4">
            {questions.map((reviewQuestion, index) => {
              const answer = answers[index];
              const correct = answer.selectedOptionId === reviewQuestion.correctOptionId;
              const selectedOption = reviewQuestion.options.find(
                (option) => option.id === answer.selectedOptionId
              );

              return (
                <li key={reviewQuestion.id} className="rounded-lg border border-line bg-surface p-4">
                  <p className="font-semibold text-ink">
                    {index + 1}. {reviewQuestion.prompt}
                  </p>
                  <p
                    className={cn(
                      "mt-2 flex items-center gap-2 text-sm font-semibold",
                      correct ? "text-success" : "text-error"
                    )}
                  >
                    <span aria-hidden="true">{correct ? "✓" : "✕"}</span>
                    {correct ? "Correct" : "Incorrect"} — your answer:{" "}
                    {selectedOption?.text ?? "No answer"}
                  </p>
                  <p className="mt-2 text-sm text-muted">{reviewQuestion.explanation}</p>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="secondary" size="md" onClick={handleReview}>
              Review answers
            </Button>
            {next ? (
              <Button href={`/courses/${slug}/learn/${next.id}`} variant="primary" size="md">
                Next: {next.title}
              </Button>
            ) : (
              <Button href={`/courses/${slug}`} variant="primary" size="md">
                Back to course
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm font-semibold text-teal">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <ProgressBar value={answeredCount} max={questions.length} className="mt-2 max-w-sm">
            {answeredCount} of {questions.length} questions answered
          </ProgressBar>

          <fieldset
            ref={fieldsetRef}
            tabIndex={-1}
            aria-describedby={errorMessage ? errorId : undefined}
            className="mt-8 focus:outline-none"
          >
            <legend className="text-lg font-semibold text-ink">{question.prompt}</legend>

            {errorMessage ? (
              <p id={errorId} role="alert" className="mt-2 text-sm font-semibold text-error">
                {errorMessage}
              </p>
            ) : null}

            <div className="mt-4 flex flex-col gap-3">
              {question.options.map((option) => {
                const optionInputId = `${question.id}-${option.id}`;
                return (
                  <div key={option.id} className="flex items-center gap-3">
                    <input
                      type="radio"
                      id={optionInputId}
                      name={question.id}
                      value={option.id}
                      checked={currentAnswer.selectedOptionId === option.id}
                      onChange={() => handleSelectOption(option.id)}
                      disabled={currentAnswer.submitted}
                      className="h-4 w-4 shrink-0 accent-teal disabled:cursor-not-allowed"
                    />
                    <label htmlFor={optionInputId} className="text-ink">
                      {option.text}
                    </label>
                  </div>
                );
              })}
            </div>
          </fieldset>

          {currentAnswer.submitted ? (
            <div
              ref={feedbackRef}
              tabIndex={-1}
              className="mt-4 rounded-lg border border-line bg-tint p-4 focus:outline-none"
            >
              <p
                className={cn(
                  "flex items-center gap-2 font-semibold",
                  isCurrentCorrect ? "text-success" : "text-error"
                )}
              >
                <span aria-hidden="true">{isCurrentCorrect ? "✓" : "✕"}</span>
                {isCurrentCorrect ? "Correct" : "Not quite"}
              </p>
              <p className="mt-2 text-sm text-ink">{question.explanation}</p>
            </div>
          ) : null}

          <p aria-live="polite" className="sr-only">
            {announcement}
          </p>

          <div className="mt-6">
            {!currentAnswer.submitted ? (
              <Button variant="primary" size="md" onClick={handleCheckAnswer}>
                Check answer
              </Button>
            ) : (
              <Button variant="primary" size="md" onClick={handleNext}>
                {isLastQuestion ? "See results" : "Next question"}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
