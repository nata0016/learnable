"use client";

import { useShallow } from "zustand/react/shallow";
import { Card } from "@/components/ui";
import { getAllCourses } from "@/data/queries";
import { courseProgress, useHydrated, useProgressStore } from "@/store/progress";

function StatCard({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <Card>
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-1 text-3xl font-bold text-ink">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </Card>
  );
}

export function StatCards() {
  const hydrated = useHydrated();
  const completedLessons = useProgressStore(useShallow((state) => state.completedLessons));
  const courses = getAllCourses();

  const enrolled = hydrated
    ? courses.filter((course) => (completedLessons[course.slug]?.length ?? 0) > 0).length
    : 0;

  const completed = hydrated
    ? courses.filter((course) => {
        const progress = courseProgress(course.slug)({ completedLessons });
        return progress.total > 0 && progress.completed === progress.total;
      }).length
    : 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard label="Courses enrolled" value={enrolled} />
      <StatCard label="Courses completed" value={completed} />
      <StatCard label="Day streak" value={3} hint="Demo stat — not yet tracked" />
    </div>
  );
}
