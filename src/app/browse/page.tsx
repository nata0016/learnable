import type { Metadata } from "next";
import { getAllCourses } from "@/data/queries";
import { BrowseFilters } from "@/components/browse/BrowseFilters";

export const metadata: Metadata = {
  title: "Browse courses",
  description: "Browse every free, self-paced course available on LearnAble.",
};

export default function BrowsePage() {
  const courses = getAllCourses();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink">Browse courses</h1>
      <p className="mt-2 text-muted">
        Free, self-paced courses — filter by what matters to you.
      </p>

      <div className="mt-8">
        <BrowseFilters courses={courses} />
      </div>
    </div>
  );
}
