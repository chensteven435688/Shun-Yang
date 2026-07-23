export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export function mqMin(bp: Breakpoint): string {
  return `(min-width: ${BREAKPOINTS[bp]}px)`;
}

export function mqMax(bp: Breakpoint): string {
  return `(max-width: ${BREAKPOINTS[bp] - 1}px)`;
}

export function isDesktopPointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: coarse)").matches;
}
