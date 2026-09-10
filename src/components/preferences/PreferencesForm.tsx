"use client";

import { useState } from "react";
import { Button, Toggle } from "@/components/ui";
import {
  usePreferencesHydrated,
  usePreferencesStore,
  type Contrast,
  type ReduceMotion,
  type TextScale,
} from "@/store/preferences";

const TEXT_SCALE_OPTIONS: { value: TextScale; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "large", label: "Large" },
  { value: "xlarge", label: "Extra large" },
];

export function PreferencesForm() {
  const hydrated = usePreferencesHydrated();
  const [announcement, setAnnouncement] = useState("");

  const textScale = usePreferencesStore((state) => state.textScale);
  const contrast = usePreferencesStore((state) => state.contrast);
  const reduceMotion = usePreferencesStore((state) => state.reduceMotion);
  const dyslexiaFont = usePreferencesStore((state) => state.dyslexiaFont);
  const captionsDefault = usePreferencesStore((state) => state.captionsDefault);

  const setTextScale = usePreferencesStore((state) => state.setTextScale);
  const setContrast = usePreferencesStore((state) => state.setContrast);
  const setReduceMotion = usePreferencesStore((state) => state.setReduceMotion);
  const setDyslexiaFont = usePreferencesStore((state) => state.setDyslexiaFont);
  const setCaptionsDefault = usePreferencesStore((state) => state.setCaptionsDefault);
  const reset = usePreferencesStore((state) => state.reset);

  // Before hydration, show the same defaults the store starts with — server
  // render and the first client paint agree, so there's no mismatch flash.
  const displayTextScale = hydrated ? textScale : "default";
  const displayContrast = hydrated ? contrast : "normal";
  const displayReduceMotion = hydrated ? reduceMotion : "system";
  const displayDyslexiaFont = hydrated ? dyslexiaFont : false;
  const displayCaptionsDefault = hydrated ? captionsDefault : true;

  function handleTextScaleChange(value: TextScale) {
    setTextScale(value);
    const label = TEXT_SCALE_OPTIONS.find((option) => option.value === value)?.label ?? value;
    setAnnouncement(`Text size: ${label}`);
  }

  function handleContrastChange(checked: boolean) {
    const value: Contrast = checked ? "high" : "normal";
    setContrast(value);
    setAnnouncement(`High contrast ${checked ? "on" : "off"}`);
  }

  function handleReduceMotionChange(checked: boolean) {
    const value: ReduceMotion = checked ? "on" : "system";
    setReduceMotion(value);
    setAnnouncement(`Reduce motion ${checked ? "on" : "off"}`);
  }

  function handleDyslexiaChange(checked: boolean) {
    setDyslexiaFont(checked);
    setAnnouncement(`Dyslexia-friendly font ${checked ? "on" : "off"}`);
  }

  function handleCaptionsChange(checked: boolean) {
    setCaptionsDefault(checked);
    setAnnouncement(`Captions on by default ${checked ? "on" : "off"}`);
  }

  function handleReset() {
    reset();
    setAnnouncement("Preferences reset to defaults");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink">Accessibility preferences</h1>
      <p className="mt-2 text-muted">
        Changes apply immediately across the whole app and are saved on this device.
      </p>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <fieldset className="mt-10 rounded-lg border border-line bg-surface p-5">
        <legend className="px-1 text-lg font-semibold text-ink">Text size</legend>
        <div className="mt-3 flex flex-wrap gap-4">
          {TEXT_SCALE_OPTIONS.map((option) => {
            const inputId = `text-scale-${option.value}`;
            return (
              <div key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={inputId}
                  name="text-scale"
                  value={option.value}
                  checked={displayTextScale === option.value}
                  onChange={() => handleTextScaleChange(option.value)}
                  className="h-4 w-4 accent-teal"
                />
                <label htmlFor={inputId} className="text-ink">
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-col gap-6 rounded-lg border border-line bg-surface p-5">
        <Toggle
          id="pref-contrast"
          label="High contrast"
          description="Increases text and border contrast across the app."
          checked={displayContrast === "high"}
          onCheckedChange={handleContrastChange}
        />
        <Toggle
          id="pref-reduce-motion"
          label="Reduce motion"
          description="Turns off non-essential transitions and animations."
          checked={displayReduceMotion === "on"}
          onCheckedChange={handleReduceMotionChange}
        />
        <Toggle
          id="pref-dyslexia"
          label="Dyslexia-friendly font"
          description="Switches body text to OpenDyslexic."
          checked={displayDyslexiaFont}
          onCheckedChange={handleDyslexiaChange}
        />
        <Toggle
          id="pref-captions"
          label="Captions on by default"
          description="New video lessons start with captions showing."
          checked={displayCaptionsDefault}
          onCheckedChange={handleCaptionsChange}
        />
      </div>

      <Button variant="secondary" size="md" onClick={handleReset} className="mt-8">
        Reset to defaults
      </Button>
    </div>
  );
}
