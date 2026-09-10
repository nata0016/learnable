"use client";

import { useShallow } from "zustand/react/shallow";
import { Button, Card } from "@/components/ui";
import { getAllCourses } from "@/data/queries";
import { courseProgress, useHydrated, useProgressStore } from "@/store/progress";

export function Certificates() {
  const hydrated = useHydrated();
  const completedLessons = useProgressStore(useShallow((state) => state.completedLessons));

  const completedCourses = hydrated
    ? getAllCourses().filter((course) => {
        const progress = courseProgress(course.slug)({ completedLessons });
        return progress.total > 0 && progress.completed === progress.total;
      })
    : [];

  return (
    <section>
      <h2 className="text-xl font-semibold text-ink">Certificates</h2>

      {completedCourses.length === 0 ? (
        <p className="mt-4 text-muted">Complete a course to earn your first certificate.</p>
      ) : (
        // eslint-disable-next-line jsx-a11y/no-redundant-roles -- Tailwind's preflight sets list-style:none, which strips ol/ul's implicit list role in Safari/VoiceOver; role="list" restores it.
        <ul role="list" className="mt-4 flex flex-col gap-3">
          {completedCourses.map((course) => (
            <li key={course.slug}>
              <Card className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-ink">{course.title}</p>
                  <p className="text-sm text-muted">Certificate of completion</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  title="Demo — certificate download not implemented"
                >
                  Download
                </Button>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
