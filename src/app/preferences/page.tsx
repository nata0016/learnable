import type { Metadata } from "next";
import { PreferencesForm } from "@/components/preferences/PreferencesForm";

export const metadata: Metadata = {
  title: "Accessibility preferences",
  description: "Adjust text size, contrast, motion, dyslexia-friendly font, and caption defaults.",
};

export default function PreferencesPage() {
  return <PreferencesForm />;
}
