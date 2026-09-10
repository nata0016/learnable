"use client";

import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { usePreferencesHydrated, usePreferencesStore } from "@/store/preferences";

/**
 * Reflects the persisted accessibility preferences onto <html> as data
 * attributes so plain CSS (globals.css) can apply them app-wide, on every
 * route, without any per-component changes. Renders nothing.
 */
export function PreferencesEffect() {
  const hydrated = usePreferencesHydrated();
  const prefs = usePreferencesStore(
    useShallow((state) => ({
      textScale: state.textScale,
      contrast: state.contrast,
      reduceMotion: state.reduceMotion,
      dyslexiaFont: state.dyslexiaFont,
    }))
  );

  useEffect(() => {
    if (!hydrated) return;

    const root = document.documentElement;
    root.setAttribute("data-text-scale", prefs.textScale);
    root.setAttribute("data-contrast", prefs.contrast);
    root.setAttribute("data-reduce-motion", prefs.reduceMotion);
    root.setAttribute("data-dyslexia", prefs.dyslexiaFont ? "true" : "false");
  }, [hydrated, prefs]);

  return null;
}
