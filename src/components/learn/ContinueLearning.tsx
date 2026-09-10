"use client";

import { useShallow } from "zustand/react/shallow";
import { Button, Card, ProgressBar } from "@/components/ui";
import { getAllCourses } from "@/data/queries";
import { lessonKindLabel } from "@/lib/course-format";
import { courseProgress, nextLesson, useHydrated, useProgressStore } from "@/store/progress";

export function ContinueLearning() {
  const hydrated = useHydrated();
  const completedLessons = useProgressStore(useShallow((state) => state.completedLessons));

  const inProgressCourse = hydrated
    ? getAllCourses().find((course) => {
        const { completed, total } = courseProgress(course.slug)({ completedLessons });
        return completed > 0 && completed < total;
      })
    : undefined;

  if (!inProgressCourse) {
    return (
      <Card className="text-center">
        <h2 className="text-xl font-semibold text-ink">Start your first course</h2>
        <p className="mt-2 text-muted">
          You haven&rsquo;t started a course yet — browse the catalog to find one that fits.
        </p>
        <Button href="/browse" variant="primary" size="md" className="mt-4">
          Browse courses
        </Button>
      </Card>
    );
  }

  const progress = courseProgress(inProgressCourse.slug)({ completedLessons });
  const next = nextLesson(inProgressCourse.slug)({ completedLessons });
  const continueHref = next
    ? `/courses/${inProgressCourse.slug}/learn/${next.id}`
    : `/courses/${inProgressCourse.slug}`;

  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <p className="text-sm font-semibold text-teal">Continue learning</p>
        <h2 className="mt-1 text-xl font-semibold text-ink">{inProgressCourse.title}</h2>
        {next ? (
          <p className="mt-1 text-sm text-muted">
            Next up: {next.title} · {lessonKindLabel[next.kind]}
          </p>
        ) : null}
        <ProgressBar value={progress.completed} max={progress.total} className="mt-4 max-w-sm">
          {progress.completed} of {progress.total} lessons complete
        </ProgressBar>
      </div>
      <Button href={continueHref} variant="primary" size="md">
        Continue
      </Button>
    </Card>
  );
}
