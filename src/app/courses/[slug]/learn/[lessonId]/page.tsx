import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui";
import { LessonsRail } from "@/components/lesson/LessonsRail";
import { TextLessonBody } from "@/components/lesson/TextLessonBody";
import { TextLessonFooter } from "@/components/lesson/TextLessonFooter";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { Quiz } from "@/components/quiz/Quiz";
import { getAllCourses, getCourseBySlug, getLesson, getPreviousLesson } from "@/data/queries";

type LessonPageProps = {
  params: Promise<{ slug: string; lessonId: string }>;
};

export function generateStaticParams() {
  return getAllCourses().flatMap((course) =>
    course.lessons.map((lesson) => ({ slug: course.slug, lessonId: lesson.id }))
  );
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { slug, lessonId } = await params;
  const course = getCourseBySlug(slug);
  const lesson = course ? getLesson(slug, lessonId) : undefined;

  if (!course || !lesson) {
    return { title: "Lesson not found" };
  }

  return {
    title: `${lesson.title} — ${course.title}`,
    description: course.summary,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, lessonId } = await params;
  const course = getCourseBySlug(slug);
  const lesson = course ? getLesson(slug, lessonId) : undefined;

  if (!course || !lesson) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Breadcrumb
        items={[
          { label: "Browse", href: "/browse" },
          { label: course.title, href: `/courses/${course.slug}` },
          { label: lesson.title },
        ]}
      />

      <h1 className="mt-4 text-3xl font-bold text-ink">{lesson.title}</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          {lesson.kind === "video" ? (
            <VideoPlayer slug={course.slug} lesson={lesson} />
          ) : lesson.kind === "text" ? (
            <>
              <TextLessonBody lesson={lesson} />
              <TextLessonFooter
                slug={course.slug}
                lessonId={lesson.id}
                previous={getPreviousLesson(course.slug, lesson.id)}
              />
            </>
          ) : (
            <Quiz slug={course.slug} lesson={lesson} />
          )}
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <LessonsRail course={course} currentLessonId={lesson.id} />
        </aside>
      </div>
    </div>
  );
}
