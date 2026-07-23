/** Central motion language — elegant, inertial, precise. Never bouncy. */

export const EASING = {
  outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  outQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
  outCubic: "cubic-bezier(0.33, 1, 0.68, 1)",
  inOutCubic: "cubic-bezier(0.65, 0.05, 0.36, 1)",
  cinematic: "cubic-bezier(0.65, 0.05, 0, 1)",
  /** GSAP-compatible names for timelines */
  gsap: {
    out: "power3.out",
    outStrong: "power4.out",
    in: "power2.in",
    inOut: "power2.inOut",
    soft: "sine.inOut",
  },
} as const;

export const DURATION = {
  instant: 0.15,
  fast: 0.28,
  base: 0.55,
  slow: 0.9,
  atmospheric: 1.4,
  cinematic: 1.85,
} as const;

export const LOADER = {
  storageKey: "sy-loader-complete",
  /** Hard ceiling so visitors never get trapped */
  maxMs: 6500,
  /** Minimum presence on first visit so the mark can resolve */
  minMs: 700,
  /** Brief settle on repeat visits */
  repeatMs: 220,
  /** Displayed progress lerp factor per frame (0–1) */
  progressLerp: 0.12,
} as const;

export const INTENSITY = {
  /** Pointer parallax / magnetic strength multipliers */
  magnetic: 1,
  parallax: 1,
  grain: 1,
  particles: 1,
  /** Scale down automatically on coarse pointers / reduced motion via consumers */
} as const;

export const HERO = {
  entranceDelayFirst: 0.15,
  entranceDelayRepeat: 0.05,
} as const;
