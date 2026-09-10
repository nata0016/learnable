import type { Difficulty, Lesson } from "@/types/course";

export const difficultyLabel: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  "all-levels": "All levels",
};

export const lessonKindLabel: Record<Lesson["kind"], string> = {
  video: "Video",
  text: "Reading",
  quiz: "Quiz",
};

export function formatCourseDuration(hours: number): string {
  return `${hours}h`;
}

export function formatLessonDuration(minutes: number): string {
  return `${minutes} min`;
}
