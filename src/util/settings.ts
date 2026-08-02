export interface timings {
  label: string;
  ms: number | null;
}

function minsToMs(time: number) {
  return time * 60 * 1000;
}

export const timings: timings[] = [
  { label: "Static", ms: null },
  { label: "10 min", ms: minsToMs(10) },
  { label: "5 min", ms: minsToMs(5) },
  { label: "2 min", ms: minsToMs(2) },
  { label: "1 min", ms: minsToMs(1) },
  { label: "30 sec", ms: 30 * 1000 },
  { label: "10 sec", ms: 10 * 1000 },
];

export function loadBgImageSwitching(): number {
  const storedBgTiming = localStorage.getItem("bgTiming");

  if (storedBgTiming === null) {
    return 4;
  }

  const index = Number(storedBgTiming);
  if (Number.isNaN(index) || index < 0 || index >= timings.length) {
    return 4;
  }

  return index;
}

export function saveBgImageSwitching(index: number) {
  localStorage.setItem("bgTiming", String(index));
}