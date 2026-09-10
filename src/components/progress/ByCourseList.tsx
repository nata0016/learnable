"use client";

import { useShallow } from "zustand/react/shallow";
import { Card, ProgressBar } from "@/components/ui";
import { getAllCourses } from "@/data/queries";
import { courseProgress, useHydrated, useProgressStore } from "@/store/progress";

export function ByCourseList() {
  const hydrated = useHydrated();
  const completedLessons = useProgressStore(useShallow((state) => state.completedLessons));
  const courses = getAllCourses();

  return (
    <section>
      <h2 className="text-xl font-semibold text-ink">By course</h2>
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles -- Tailwind's preflight sets list-style:none, which strips ol/ul's implicit list role in Safari/VoiceOver; role="list" restores it. */}
      <ul role="list" className="mt-4 flex flex-col gap-4">
        {courses.map((course) => {
          const progress = hydrated
            ? courseProgress(course.slug)({ completedLessons })
            : { completed: 0, total: course.lessons.length, pct: 0 };

          return (
            <li key={course.slug}>
              <Card>
                <p className="font-semibold text-ink">{course.title}</p>
                <ProgressBar value={progress.completed} max={progress.total} className="mt-2 max-w-sm">
                  {progress.pct}%
                </ProgressBar>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
