import Image from "next/image";
import Link from "next/link";
import { Card, Tag } from "@/components/ui";
import { difficultyLabel, formatCourseDuration } from "@/lib/course-format";
import type { Course } from "@/types/course";

export function CourseCard({ course, priority = false }: { course: Course; priority?: boolean }) {
  return (
    <Card as="article" className="flex h-full flex-col gap-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-md bg-tint">
        <Image
          src={course.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          priority={priority}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <h2 className="text-lg font-semibold text-ink">{course.title}</h2>
        <p className="text-sm text-muted">{course.summary}</p>

        <div className="flex flex-wrap gap-2">
          <Tag>{difficultyLabel[course.difficulty]}</Tag>
          <Tag>{formatCourseDuration(course.durationHours)}</Tag>
          {course.hasCaptions ? <Tag variant="ok">Captions</Tag> : null}
          {course.hasTranscript ? <Tag variant="ok">Transcript</Tag> : null}
        </div>

        <Link
          href={`/courses/${course.slug}`}
          aria-label={`View course: ${course.title}`}
          className="mt-auto inline-flex w-fit items-center gap-1 text-sm font-semibold text-teal hover:text-deep hover:underline"
        >
          View course
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Card>
  );
}
