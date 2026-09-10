/** Parses a transcript timestamp label like "2:14" or "1:02:14" into total seconds. */
export function parseTimestamp(label: string): number {
  const parts = label.split(":").map(Number);

  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }

  return 0;
}

/** Formats total seconds as mm:ss for on-screen display. */
export function formatTime(totalSeconds: number): string {
  const safeSeconds = Number.isFinite(totalSeconds) ? Math.max(0, totalSeconds) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = Math.floor(safeSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

/** Describes total seconds in words for aria-valuetext, e.g. "2 minutes 14 seconds". */
export function describeDuration(totalSeconds: number): string {
  const safeSeconds = Number.isFinite(totalSeconds) ? Math.max(0, Math.round(totalSeconds)) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  const minutePart = minutes === 1 ? "1 minute" : `${minutes} minutes`;
  const secondPart = seconds === 1 ? "1 second" : `${seconds} seconds`;

  if (minutes === 0) return secondPart;
  if (seconds === 0) return minutePart;
  return `${minutePart} ${secondPart}`;
}
