"use client";

import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { describeDuration, formatTime, parseTimestamp } from "@/lib/video-format";
import { nextLesson, useHydrated, useProgressStore } from "@/store/progress";
import { usePreferencesHydrated, usePreferencesStore } from "@/store/preferences";
import type { VideoLesson } from "@/types/course";

const SAMPLE_VIDEO_SRC = "/video/sample.mp4";
const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function VideoPlayer({ slug, lesson }: { slug: string; lesson: VideoLesson }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const hydrated = useHydrated();
  const markLessonComplete = useProgressStore((state) => state.markLessonComplete);
  const completedLessons = useProgressStore(useShallow((state) => state.completedLessons));

  const preferencesHydrated = usePreferencesHydrated();
  const captionsDefault = usePreferencesStore((state) => state.captionsDefault);

  const isCompleted = hydrated ? (completedLessons[slug] ?? []).includes(lesson.id) : false;
  const next = hydrated ? nextLesson(slug)({ completedLessons }) : null;

  // The <track default> attribute shows captions before preferences are known
  // (so server render and first client paint agree). Once the captionsDefault
  // preference is available, sync both the real track and our state to it.
  useEffect(() => {
    if (!preferencesHydrated) return;
    const track = videoRef.current?.textTracks[0];
    if (track) track.mode = captionsDefault ? "showing" : "hidden";
    setCaptionsOn(captionsDefault);
  }, [preferencesHydrated, captionsDefault]);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // A small local video can finish loading metadata before this component's
  // event handlers are attached, so the loadedmetadata/durationchange events
  // can fire "too early" and get missed. Sync once on mount as a fallback.
  useEffect(() => {
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      setDuration(video.duration);
    }
  }, []);

  function announce(message: string) {
    setAnnouncement(message);
  }

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }

  function handlePlay() {
    setIsPlaying(true);
    announce("Playing");
  }

  function handlePause() {
    setIsPlaying(false);
    if (!videoRef.current?.ended) {
      announce("Paused");
    }
  }

  function handleEnded() {
    setIsPlaying(false);
    if (!isCompleted) {
      markLessonComplete(slug, lesson.id);
    }
    announce("Lesson complete");
  }

  function handleLoadedMetadata() {
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration)) setDuration(video.duration);
  }

  function handleDurationChange() {
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration)) setDuration(video.duration);
  }

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (video) setCurrentTime(video.currentTime);
  }

  function handleError() {
    setHasError(true);
  }

  function handleSeekChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    const video = videoRef.current;
    if (video) video.currentTime = value;
    setCurrentTime(value);
  }

  function handleVolumeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    setVolume(value);
    const video = videoRef.current;
    if (video) {
      video.volume = value;
      if (value > 0 && video.muted) {
        video.muted = false;
        setMuted(false);
      }
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
  }

  function toggleCaptions() {
    const video = videoRef.current;
    const track = video?.textTracks[0];
    if (!track) return;
    const nextCaptionsOn = track.mode !== "showing";
    track.mode = nextCaptionsOn ? "showing" : "hidden";
    setCaptionsOn(nextCaptionsOn);
    announce(nextCaptionsOn ? "Captions on" : "Captions off");
  }

  function handleRateChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const rate = Number(event.target.value);
    setPlaybackRate(rate);
    const video = videoRef.current;
    if (video) video.playbackRate = rate;
  }

  async function toggleFullscreen() {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await container.requestFullscreen();
    }
  }

  function seekTo(seconds: number) {
    const video = videoRef.current;
    if (video) video.currentTime = seconds;
  }

  function handleMarkComplete() {
    markLessonComplete(slug, lesson.id);
    announce("Lesson complete");
  }

  const transcriptSeconds = lesson.transcript.map((line) => parseTimestamp(line.t));
  let activeIndex = -1;
  transcriptSeconds.forEach((seconds, index) => {
    if (seconds <= currentTime) activeIndex = index;
  });

  return (
    <div>
      <div ref={containerRef} className="overflow-hidden rounded-lg border border-line bg-ink">
        <div className="relative aspect-video w-full bg-ink">
          <video
            ref={videoRef}
            poster={lesson.videoPoster}
            preload="metadata"
            playsInline
            className="h-full w-full object-cover"
            onLoadedMetadata={handleLoadedMetadata}
            onDurationChange={handleDurationChange}
            onTimeUpdate={handleTimeUpdate}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            onError={handleError}
          >
            <source src={SAMPLE_VIDEO_SRC} type="video/mp4" />
            <track kind="captions" src={lesson.captionsVttPath} srcLang="en" label="English" default />
            Your browser doesn&rsquo;t support embedded video.{" "}
            <a href={SAMPLE_VIDEO_SRC} className="underline">
              Download the video
            </a>{" "}
            instead.
          </video>

          {hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-ink/95 p-6 text-center text-white">
              <p className="font-semibold">Video unavailable — read the transcript instead.</p>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 bg-deep p-3 text-white">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-pressed={isPlaying}
              onClick={togglePlay}
              disabled={hasError}
              className="inline-flex h-9 min-w-[4.5rem] items-center justify-center rounded-md bg-teal px-3 text-sm font-semibold text-white hover:bg-mint hover:text-deep disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

            <span className="font-mono text-sm tabular-nums text-white/90">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <input
              type="range"
              aria-label="Seek"
              aria-valuetext={`${describeDuration(currentTime)} of ${describeDuration(duration)}`}
              min={0}
              max={duration}
              step={1}
              value={currentTime}
              onChange={handleSeekChange}
              disabled={hasError}
              className="h-2 flex-1 cursor-pointer accent-teal disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              aria-pressed={captionsOn}
              onClick={toggleCaptions}
              disabled={hasError}
              className="rounded-md border border-white/30 px-3 py-1.5 text-sm font-semibold hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {captionsOn ? "Captions off" : "Captions on"}
            </button>

            <label className="flex items-center gap-2 text-sm">
              <span>Playback speed</span>
              <select
                value={playbackRate}
                onChange={handleRateChange}
                disabled={hasError}
                className="rounded-md border border-white/30 bg-deep px-2 py-1 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {PLAYBACK_RATES.map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}×
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              aria-pressed={muted}
              onClick={toggleMute}
              disabled={hasError}
              className="rounded-md border border-white/30 px-3 py-1.5 text-sm font-semibold hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {muted ? "Unmute" : "Mute"}
            </button>

            <input
              type="range"
              aria-label="Volume"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              disabled={hasError}
              className="h-2 w-24 cursor-pointer accent-teal disabled:cursor-not-allowed"
            />

            <button
              type="button"
              onClick={toggleFullscreen}
              disabled={hasError}
              className="ml-auto rounded-md border border-white/30 px-3 py-1.5 text-sm font-semibold hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            </button>
          </div>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <div className="mt-4">
        {isCompleted ? (
          <div className="flex flex-col gap-3 rounded-lg border border-line bg-tint p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-success">✓ Lesson complete</p>
            {next ? (
              <Button href={`/courses/${slug}/learn/${next.id}`} variant="primary" size="sm">
                Next: {next.title}
              </Button>
            ) : (
              <Button href={`/courses/${slug}`} variant="secondary" size="sm">
                Back to course
              </Button>
            )}
          </div>
        ) : (
          <Button variant="primary" size="md" onClick={handleMarkComplete}>
            Mark lesson complete
          </Button>
        )}
      </div>

      <section className="mt-10" aria-label="Transcript">
        <h2 className="text-xl font-semibold text-ink">Transcript</h2>
        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles -- Tailwind's preflight sets list-style:none, which strips ol/ul's implicit list role in Safari/VoiceOver; role="list" restores it. */}
        <ol role="list" className="mt-4 flex flex-col gap-1">
          {lesson.transcript.map((line, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={line.t}>
                <button
                  type="button"
                  onClick={() => seekTo(transcriptSeconds[index])}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-tint",
                    isActive && "bg-tint"
                  )}
                >
                  <span className="mt-0.5 shrink-0 font-mono text-xs text-teal">{line.t}</span>
                  <span className={cn("text-sm", isActive ? "font-semibold text-ink" : "text-muted")}>
                    {line.text}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
