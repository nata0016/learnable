"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCourseBySlug } from "@/data/queries";
import type { Lesson } from "@/types/course";

export type QuizScore = {
  correct: number;
  total: number;
};

type ProgressState = {
  completedLessons: Record<string, string[]>;
  quizScores: Record<string, QuizScore>;
  markLessonComplete: (slug: string, lessonId: string) => void;
  setQuizScore: (slug: string, lessonId: string, correct: number, total: number) => void;
};

type ProgressSlice = Pick<ProgressState, "completedLessons">;

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedLessons: {},
      quizScores: {},

      markLessonComplete: (slug, lessonId) =>
        set((state) => {
          const existing = state.completedLessons[slug] ?? [];
          if (existing.includes(lessonId)) return state;

          return {
            completedLessons: {
              ...state.completedLessons,
              [slug]: [...existing, lessonId],
            },
          };
        }),

      setQuizScore: (slug, lessonId, correct, total) =>
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            [`${slug}:${lessonId}`]: { correct, total },
          },
        })),
    }),
    {
      name: "learnable-progress",
      skipHydration: true,
    }
  )
);

/**
 * Pure selector factory: courseProgress(slug) => selector(state) => { completed, total, pct }.
 * Use via `useProgressStore(useShallow(courseProgress(slug)))`.
 */
export const courseProgress =
  (slug: string) =>
  (state: ProgressSlice): { completed: number; total: number; pct: number } => {
    const course = getCourseBySlug(slug);
    const total = course?.lessons.length ?? 0;
    const completed = state.completedLessons[slug]?.length ?? 0;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, total, pct };
  };

/**
 * Pure selector factory: nextLesson(slug) => selector(state) => first not-completed Lesson, or null.
 */
export const nextLesson =
  (slug: string) =>
  (state: ProgressSlice): Lesson | null => {
    const course = getCourseBySlug(slug);
    if (!course) return null;

    const completedIds = new Set(state.completedLessons[slug] ?? []);
    return course.lessons.find((lesson) => !completedIds.has(lesson.id)) ?? null;
  };

/**
 * True once the persisted store has rehydrated from localStorage on the client.
 * Server render and the first client render both see `false` (empty state),
 * so there is no SSR/client markup mismatch — rehydration happens after mount.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (useProgressStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }

    const unsubscribe = useProgressStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    void useProgressStore.persist.rehydrate();

    return unsubscribe;
  }, []);

  return hydrated;
}
