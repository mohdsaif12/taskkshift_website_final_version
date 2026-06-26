export const EASE = {
  cinematic: [0.86, 0, 0.07, 1] as [number, number, number, number],
  premium: [0.645, 0.045, 0.355, 1] as [number, number, number, number],
  natural: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
} as const;

// Plain (v: number) => number easing functions, for shaping a 0-1
// scroll-linked progress value before mapping it to an output range.
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
