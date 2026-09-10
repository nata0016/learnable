import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatLessonDuration, lessonKindLabel } from "@/lib/course-format";
import type { Course } from "@/types/course";

export function LessonsRail({
  course,
  currentLessonId,
}: {
  course: Course;
  currentLessonId: string;
}) {
  return (
    <nav
      aria-label={`${course.title} lessons`}
      className="overflow-hidden rounded-lg border border-line bg-surface"
    >
      <h2 className="border-b border-line px-4 py-3 text-sm font-semibold text-ink">
        {course.title}
      </h2>
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles -- Tailwind's preflight sets list-style:none, which strips ol/ul's implicit list role in Safari/VoiceOver; role="list" restores it. */}
      <ol role="list" className="divide-y divide-line">
        {course.lessons.map((lesson) => {
          const isCurrent = lesson.id === currentLessonId;

          return (
            <li key={lesson.id}>
              <Link
                href={`/courses/${course.slug}/learn/${lesson.id}`}
                aria-current={isCurrent ? "true" : undefined}
                className={cn(
                  "flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-tint",
                  isCurrent && "bg-tint"
                )}
              >
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-teal">
                    {lessonKindLabel[lesson.kind]}
                  </span>
                  <span className="block font-medium text-ink">{lesson.title}</span>
                </span>
                <span className="shrink-0 text-xs text-muted">
                  {formatLessonDuration(lesson.durationMin)}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
