import { courses } from "@/data/courses";
import type { Course, Lesson } from "@/types/course";

export function getAllCourses(): Course[] {
  return courses;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getLesson(courseSlug: string, lessonId: string): Lesson | undefined {
  const course = getCourseBySlug(courseSlug);
  return course?.lessons.find((lesson) => lesson.id === lessonId);
}

export function getNextLesson(courseSlug: string, lessonId: string): Lesson | undefined {
  const course = getCourseBySlug(courseSlug);
  if (!course) return undefined;

  const currentIndex = course.lessons.findIndex((lesson) => lesson.id === lessonId);
  if (currentIndex === -1) return undefined;

  return course.lessons[currentIndex + 1];
}

export function getPreviousLesson(courseSlug: string, lessonId: string): Lesson | undefined {
  const course = getCourseBySlug(courseSlug);
  if (!course) return undefined;

  const currentIndex = course.lessons.findIndex((lesson) => lesson.id === lessonId);
  if (currentIndex <= 0) return undefined;

  return course.lessons[currentIndex - 1];
}
