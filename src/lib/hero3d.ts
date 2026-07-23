import { INTENSITY } from "@/lib/motion";

export type Hero3DMode = "full" | "reduced" | "static";

export const HERO3D = {
  /** Max device pixel ratio by mode */
  dpr: {
    full: 1.5,
    reduced: 1.15,
  },
  /** Ambient rotation speed (radians / second) */
  spin: {
    full: 0.08,
    reduced: 0.035,
  },
  /** Pointer parallax strength (radians) */
  pointer: {
    full: 0.22 * INTENSITY.parallax,
    reduced: 0,
  },
  /** Soft particle count */
  particles: {
    full: 48,
    reduced: 0,
  },
  /** Canvas fades in after first frame */
  revealMs: 480,
} as const;

export const HERO_COLORS = {
  bg: 0x08090b,
  metal: 0xb8c0cc,
  metalDark: 0x6a7382,
  gold: 0xc4a574,
  cream: 0xe8e9ec,
  void: 0x030406,
} as const;
