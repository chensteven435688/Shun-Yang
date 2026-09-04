import { assetPath } from "@/lib/assetPath";

/**
 * Critical first-paint assets tracked by the opening loader.
 * Paths are site-root relative; assetPath() applies the GitHub Pages basePath.
 */
export const HERO_WIDTHS = [640, 1280, 1920, 2560] as const;

export const heroImage = {
  placeholder: "/images/hero/hero-placeholder.jpg",
  /** Fallback single URL (mid desktop) */
  src: "/images/hero/hero-1920.jpg",
  width: 1920,
  height: 1080,
  sizes: "100vw",
  srcSetJpg: HERO_WIDTHS.map(
    (w) => `/images/hero/hero-${w}.jpg ${w}w`
  ).join(", "),
  srcSetWebp: HERO_WIDTHS.map(
    (w) => `/images/hero/hero-${w}.webp ${w}w`
  ).join(", "),
} as const;

/** Dedicated 4:5 crop for the About portrait — not the landscape hero srcset. */
export const ABOUT_PORTRAIT_WIDTHS = [480, 960, 1440] as const;

export const aboutPortrait = {
  placeholder: "/images/about/portrait-placeholder.jpg",
  src: "/images/about/portrait-960.jpg",
  width: 960,
  height: 1200,
  sizes: "(max-width: 1024px) min(45vw, 320px), 220px",
  srcSetJpg: ABOUT_PORTRAIT_WIDTHS.map(
    (w) => `/images/about/portrait-${w}.jpg ${w}w`
  ).join(", "),
  srcSetWebp: ABOUT_PORTRAIT_WIDTHS.map(
    (w) => `/images/about/portrait-${w}.webp ${w}w`
  ).join(", "),
} as const;

export const LOBBY_WIDTHS = [640, 1024] as const;

/** Square lobby still — homepage LCP and hero metadata portrait. */
export const lobbyImage = {
  placeholder: "/images/lobby/lobby-placeholder.jpg",
  src: "/images/lobby/lobby-1024.jpg",
  webpSrc: "/images/lobby/lobby-1024.webp",
  width: 1024,
  height: 1024,
  sizes: "(max-width: 768px) 88vw, 520px",
  srcSetJpg: LOBBY_WIDTHS.map((w) => `/images/lobby/lobby-${w}.jpg ${w}w`).join(
    ", "
  ),
  srcSetWebp: LOBBY_WIDTHS.map(
    (w) => `/images/lobby/lobby-${w}.webp ${w}w`
  ).join(", "),
} as const;

export type CriticalAsset = {
  id: string;
  /** Root-relative path (will be passed through assetPath) */
  src: string;
  weight: number;
};

/** Assets that meaningfully gate the first homepage paint. */
export function getCriticalAssets(): CriticalAsset[] {
  return [
    {
      id: "lobby-primary",
      src: lobbyImage.webpSrc,
      weight: 1,
    },
  ];
}

export function resolveCriticalSrc(src: string): string {
  return assetPath(src);
}
