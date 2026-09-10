"use client";

import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import Link from "next/link";
import { Button } from "@/components/ui";
import { nextLesson, useHydrated, useProgressStore } from "@/store/progress";
import type { Lesson } from "@/types/course";

export function TextLessonFooter({
  slug,
  lessonId,
  previous,
}: {
  slug: string;
  lessonId: string;
  previous?: Lesson;
}) {
  const [announcement, setAnnouncement] = useState("");

  const hydrated = useHydrated();
  const markLessonComplete = useProgressStore((state) => state.markLessonComplete);
  const completedLessons = useProgressStore(useShallow((state) => state.completedLessons));

  const isCompleted = hydrated ? (completedLessons[slug] ?? []).includes(lessonId) : false;
  const next = hydrated ? nextLesson(slug)({ completedLessons }) : null;

  function handleMarkComplete() {
    markLessonComplete(slug, lessonId);
    setAnnouncement("Lesson complete");
  }

  return (
    <div className="mt-10 flex flex-col gap-4">
      {previous ? (
        <Link
          href={`/courses/${slug}/learn/${previous.id}`}
          className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-teal hover:text-deep hover:underline"
        >
          <span aria-hidden="true">←</span> Previous: {previous.title}
        </Link>
      ) : null}

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      {isCompleted ? (
        <div className="flex flex-col gap-3 rounded-lg border border-line bg-tint p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-success">✓ Lesson complete</p>
          {next ? (
            <Button href={`/courses/${slug}/learn/${next.id}`} variant="primary" size="sm">
              Next: {next.title}
            </Button>
          ) : (
            <Button href={`/courses/${slug}`} variant="secondary" size="sm">
              Back to course
            </Button>
          )}
        </div>
      ) : (
        <Button variant="primary" size="md" onClick={handleMarkComplete} className="w-fit">
          Mark lesson complete
        </Button>
      )}
    </div>
  );
}
