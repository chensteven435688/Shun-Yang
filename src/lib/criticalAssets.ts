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

export type CriticalAsset = {
  id: string;
  /** Root-relative path (will be passed through assetPath) */
  src: string;
  weight: number;
};

/** Assets that meaningfully gate the hero experience. */
export function getCriticalAssets(): CriticalAsset[] {
  return [
    {
      id: "hero-primary",
      src: "/images/hero/hero-1920.webp",
      weight: 3,
    },
    {
      id: "hero-fallback",
      src: "/images/hero/hero-1920.jpg",
      weight: 2,
    },
    {
      id: "intricate-cover",
      src: "/images/intricate-cover.png",
      weight: 1,
    },
  ];
}

export function resolveCriticalSrc(src: string): string {
  return assetPath(src);
}
