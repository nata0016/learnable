import { Button } from "@/components/ui";

export default function CourseNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-ink">Course not found</h1>
      <p className="mt-3 text-muted">
        We couldn&rsquo;t find the course you were looking for. It may have moved, or the link
        might be out of date.
      </p>
      <Button href="/browse" variant="primary" size="md" className="mt-6">
        Back to Browse
      </Button>
    </div>
  );
}
