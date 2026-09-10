import { beforeEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { getCourseBySlug } from "@/data/queries";
import { useProgressStore } from "@/store/progress";
import { usePreferencesStore } from "@/store/preferences";
import type { VideoLesson } from "@/types/course";

const course = getCourseBySlug("data-analysis-foundations")!;
const videoLesson = course.lessons.find((lesson): lesson is VideoLesson => lesson.kind === "video")!;

beforeEach(() => {
  localStorage.clear();
  useProgressStore.setState({ completedLessons: {}, quizScores: {} });
  usePreferencesStore.setState({
    textScale: "default",
    contrast: "normal",
    reduceMotion: "system",
    dyslexiaFont: false,
    captionsDefault: true,
  });
});

describe("VideoPlayer accessibility", () => {
  it("the control bar and transcript have no axe violations", async () => {
    const { container } = render(<VideoPlayer slug={course.slug} lesson={videoLesson} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
