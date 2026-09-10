"use client";

import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { Card, ProgressBar } from "@/components/ui";
import { getCourseBySlug } from "@/data/queries";
import { courseProgress, nextLesson, useHydrated, useProgressStore } from "@/store/progress";

const FEATURED_SLUGS = [
  "data-analysis-foundations",
  "plain-language-writing",
  "intro-to-accessibility",
];

export function YourCourses() {
  const hydrated = useHydrated();
  const completedLessons = useProgressStore(useShallow((state) => state.completedLessons));

  const courses = FEATURED_SLUGS.map((slug) => getCourseBySlug(slug)).filter((c) => c !== undefined);

  return (
    <section>
      <h2 className="text-xl font-semibold text-ink">Your courses</h2>
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles -- Tailwind's preflight sets list-style:none, which strips ol/ul's implicit list role in Safari/VoiceOver; role="list" restores it. */}
      <ul role="list" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {courses.map((course) => {
          const progress = hydrated
            ? courseProgress(course.slug)({ completedLessons })
            : { completed: 0, total: course.lessons.length, pct: 0 };
          const next = hydrated ? nextLesson(course.slug)({ completedLessons }) : course.lessons[0];
          const resumeHref = next
            ? `/courses/${course.slug}/learn/${next.id}`
            : `/courses/${course.slug}`;

          return (
            <li key={course.slug}>
              <Card className="flex h-full flex-col gap-3">
                <h3 className="font-semibold text-ink">{course.title}</h3>
                <ProgressBar value={progress.completed} max={progress.total}>
                  {progress.completed} of {progress.total} lessons
                </ProgressBar>
                <Link
                  href={resumeHref}
                  aria-label={`Resume ${course.title}`}
                  className="mt-auto inline-flex w-fit text-sm font-semibold text-teal hover:text-deep hover:underline"
                >
                  Resume
                </Link>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
