export type Difficulty = "beginner" | "intermediate" | "all-levels";

export type LessonBase = {
  id: string;
  title: string;
  kind: "video" | "text" | "quiz";
  durationMin: number;
};

export type TranscriptLine = {
  /** Timestamp label like "2:14" */
  t: string;
  text: string;
};

export type VideoLesson = LessonBase & {
  kind: "video";
  videoPoster: string;
  captionsVttPath: string;
  transcript: TranscriptLine[];
};

export type TextLesson = LessonBase & {
  kind: "text";
  bodyMarkdown: string;
  figure?: {
    src: string;
    alt: string;
  };
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
};

export type QuizLesson = LessonBase & {
  kind: "quiz";
  questions: QuizQuestion[];
};

export type Lesson = VideoLesson | TextLesson | QuizLesson;

export type Course = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  durationHours: number;
  hasCaptions: boolean;
  hasTranscript: boolean;
  thumbnail: string;
  lessons: Lesson[];
};
