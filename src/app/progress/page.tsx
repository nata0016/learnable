import type { Metadata } from "next";
import { StatCards } from "@/components/progress/StatCards";
import { ByCourseList } from "@/components/progress/ByCourseList";
import { Certificates } from "@/components/progress/Certificates";

export const metadata: Metadata = {
  title: "Your progress",
  description: "Track your course progress and certificates.",
};

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink">Your progress</h1>

      <div className="mt-8">
        <StatCards />
      </div>

      <div className="mt-12">
        <ByCourseList />
      </div>

      <div className="mt-12">
        <Certificates />
      </div>
    </div>
  );
}
