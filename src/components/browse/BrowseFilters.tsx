"use client";

import { useMemo, useState } from "react";
import { Button, Chip } from "@/components/ui";
import { CourseCard } from "@/components/browse/CourseCard";
import type { Course } from "@/types/course";

type FilterKey = "captions" | "beginner" | "self-paced" | "under-5h" | "transcript";

const FILTERS: { key: FilterKey; label: string; test: (course: Course) => boolean }[] = [
  { key: "captions", label: "Captions", test: (course) => course.hasCaptions },
  { key: "beginner", label: "Beginner", test: (course) => course.difficulty === "beginner" },
  // Every course on Learnable is self-paced; this chip affirms that rather than narrowing results.
  { key: "self-paced", label: "Self-paced", test: () => true },
  { key: "under-5h", label: "Under 5h", test: (course) => course.durationHours < 5 },
  { key: "transcript", label: "Transcript", test: (course) => course.hasTranscript },
];

export function BrowseFilters({ courses }: { courses: Course[] }) {
  const [activeFilters, setActiveFilters] = useState<FilterKey[]>([]);

  const filteredCourses = useMemo(() => {
    if (activeFilters.length === 0) return courses;
    const activeTests = FILTERS.filter((filter) => activeFilters.includes(filter.key));
    return courses.filter((course) => activeTests.every((filter) => filter.test(course)));
  }, [courses, activeFilters]);

  function toggleFilter(key: FilterKey) {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((activeKey) => activeKey !== key) : [...prev, key]
    );
  }

  function clearFilters() {
    setActiveFilters([]);
  }

  return (
    <div>
      <div role="group" aria-label="Filter courses" className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <Chip
            key={filter.key}
            pressed={activeFilters.includes(filter.key)}
            onPressedChange={() => toggleFilter(filter.key)}
          >
            {filter.label}
          </Chip>
        ))}
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-muted">
        Showing {filteredCourses.length} of {courses.length} courses
      </p>

      {filteredCourses.length === 0 ? (
        <div className="mt-8 rounded-lg border border-line bg-surface p-8 text-center">
          <p className="text-ink">No courses match those filters.</p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        // eslint-disable-next-line jsx-a11y/no-redundant-roles -- Tailwind's preflight sets list-style:none, which strips ol/ul's implicit list role in Safari/VoiceOver; role="list" restores it.
        <ul role="list" className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, index) => (
            <li key={course.id}>
              <CourseCard course={course} priority={index < 3} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
