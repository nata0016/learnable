import type { Metadata } from "next";
import { ContinueLearning } from "@/components/learn/ContinueLearning";
import { YourCourses } from "@/components/learn/YourCourses";

export const metadata: Metadata = {
  title: "Learn",
  description: "Pick up where you left off.",
};

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink">Welcome back</h1>

      <div className="mt-8">
        <ContinueLearning />
      </div>

      <div className="mt-12">
        <YourCourses />
      </div>
    </div>
  );
}
