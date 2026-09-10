import type { Metadata } from "next";
import Link from "next/link";
import { Button, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Your account",
  description: "Demo account details for LearnAble.",
};

const PROFILE = [
  { label: "Name", value: "Ada Lovelace" },
  { label: "Email", value: "ada@example.com" },
  { label: "Learning goal", value: "Build confidence with data analysis" },
  { label: "Plan", value: "Free" },
];

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink">Your account</h1>
      <p className="mt-2 text-muted">Demo profile — this is sample data, not a real account.</p>

      <Card as="div" className="mt-8">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PROFILE.map((item) => (
            <div key={item.label}>
              <dt className="text-sm font-semibold text-muted">{item.label}</dt>
              <dd className="mt-1 text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/preferences"
          className="text-sm font-semibold text-teal hover:text-deep hover:underline"
        >
          Accessibility preferences
        </Link>
        <Button
          variant="secondary"
          size="sm"
          title="Demo — sign out isn't implemented"
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
