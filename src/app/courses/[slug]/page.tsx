import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, Button, Card, Tag } from "@/components/ui";
import { getAllCourses, getCourseBySlug } from "@/data/queries";
import { difficultyLabel, formatCourseDuration, formatLessonDuration, lessonKindLabel } from "@/lib/course-format";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCourses().map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return { title: "Course not found" };
  }

  return {
    title: course.title,
    description: course.summary,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const firstLesson = course.lessons[0];
  const enrolHref = firstLesson
    ? `/courses/${course.slug}/learn/${firstLesson.id}`
    : `/courses/${course.slug}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Breadcrumb items={[{ label: "Browse", href: "/browse" }, { label: course.title }]} />

      <h1 className="mt-4 text-3xl font-bold text-ink">{course.title}</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <p className="text-lg text-muted">{course.summary}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Tag>{difficultyLabel[course.difficulty]}</Tag>
            <Tag>{formatCourseDuration(course.durationHours)}</Tag>
            {course.hasCaptions ? <Tag variant="ok">Captions</Tag> : null}
            {course.hasTranscript ? <Tag variant="ok">Transcript</Tag> : null}
          </div>

          <h2 className="mt-10 text-xl font-semibold text-ink">What you&rsquo;ll do</h2>
          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles -- Tailwind's preflight sets list-style:none, which strips ol/ul's implicit list role in Safari/VoiceOver; role="list" restores it. */}
          <ol role="list" className="mt-4 divide-y divide-line rounded-lg border border-line bg-surface">
            {course.lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/courses/${course.slug}/learn/${lesson.id}`}
                  className="flex items-center justify-between gap-4 px-4 py-4 hover:bg-tint"
                >
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-teal">
                      {lessonKindLabel[lesson.kind]}
                    </span>
                    <span className="block font-medium text-ink">{lesson.title}</span>
                  </span>
                  <span className="shrink-0 text-sm text-muted">
                    {formatLessonDuration(lesson.durationMin)}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <Card className="flex flex-col gap-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-tint">
              <Image
                src={course.thumbnail}
                alt=""
                fill
                sizes="(min-width: 1024px) 320px, 100vw"
                className="object-cover"
                priority
              />
              <span className="absolute left-2 top-2 rounded-full bg-surface/90 px-2.5 py-0.5 text-xs font-semibold text-deep">
                Preview · CC
              </span>
            </div>

            <p className="text-sm font-semibold text-teal">Free · self-paced</p>

            <Button href={enrolHref} variant="primary" size="md" className="w-full justify-center">
              Enrol — it&rsquo;s free
            </Button>
            <Button variant="secondary" size="md" className="w-full justify-center">
              Save for later
            </Button>
          </Card>
        </aside>
      </div>
    </div>
  );
}
