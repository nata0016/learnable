"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TextScale = "default" | "large" | "xlarge";
export type Contrast = "normal" | "high";
export type ReduceMotion = "system" | "on";

type PreferencesValues = {
  textScale: TextScale;
  contrast: Contrast;
  reduceMotion: ReduceMotion;
  dyslexiaFont: boolean;
  captionsDefault: boolean;
};

type PreferencesState = PreferencesValues & {
  setTextScale: (value: TextScale) => void;
  setContrast: (value: Contrast) => void;
  setReduceMotion: (value: ReduceMotion) => void;
  setDyslexiaFont: (value: boolean) => void;
  setCaptionsDefault: (value: boolean) => void;
  reset: () => void;
};

const DEFAULT_PREFERENCES: PreferencesValues = {
  textScale: "default",
  contrast: "normal",
  reduceMotion: "system",
  dyslexiaFont: false,
  captionsDefault: true,
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...DEFAULT_PREFERENCES,

      setTextScale: (value) => set({ textScale: value }),
      setContrast: (value) => set({ contrast: value }),
      setReduceMotion: (value) => set({ reduceMotion: value }),
      setDyslexiaFont: (value) => set({ dyslexiaFont: value }),
      setCaptionsDefault: (value) => set({ captionsDefault: value }),
      reset: () => set({ ...DEFAULT_PREFERENCES }),
    }),
    {
      name: "learnable-prefs",
      skipHydration: true,
    }
  )
);

/**
 * True once the persisted preferences store has rehydrated from localStorage
 * on the client. Server render and the first client render both see `false`
 * (default preferences), so there is no SSR/client markup mismatch.
 */
export function usePreferencesHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (usePreferencesStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }

    const unsubscribe = usePreferencesStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    void usePreferencesStore.persist.rehydrate();

    return unsubscribe;
  }, []);

  return hydrated;
}
