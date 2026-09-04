export type MomentCategory =
  | "on-stage"
  | "in-studio"
  | "behind-the-scenes"
  | "travel"
  | "portraits"
  | "everyday";

export type MomentItem = {
  id: string;
  category: MomentCategory;
  label: string;
  caption: string;
  /** When set, the item is a real photograph */
  src?: string;
  srcSet?: string;
  webpSrcSet?: string;
  placeholderSrc?: string;
  width?: number;
  height?: number;
  alt?: string;
  date?: string;
  location?: string;
  featured?: boolean;
  credit?: string;
};

/**
 * Moments archive entries.
 * Add real photos by setting `src`, `width`, `height`, and `alt`.
 * Until then, cards render as intentional category placeholders.
 */
export const momentCategories: {
  id: MomentCategory;
  label: string;
}[] = [
  { id: "on-stage", label: "On Stage" },
  { id: "in-studio", label: "Live 2024" },
  { id: "behind-the-scenes", label: "Behind the Scenes" },
  { id: "travel", label: "Home" },
  { id: "portraits", label: "Portraits" },
  { id: "everyday", label: "Everyday" },
];

export const moments: MomentItem[] = [
  {
    id: "on-stage",
    category: "on-stage",
    label: "On Stage",
    caption: "LIVE 2025",
    src: "/images/moments/live-2025.jpg",
    srcSet: "/images/moments/live-2025.jpg 7008w",
    webpSrcSet: "/images/moments/live-2025.webp 7008w",
    placeholderSrc: "/images/moments/live-2025-placeholder.jpg",
    width: 7008,
    height: 4672,
    alt: "Shun Yang singing live with ΛTLΛST, 2025",
    date: "2025",
    featured: true,
  },
  {
    id: "in-studio",
    category: "in-studio",
    label: "Live 2024",
    caption: "LIVE 2024",
    src: "/images/moments/live-2024.jpg",
    srcSet: "/images/moments/live-2024.jpg 1706w",
    webpSrcSet: "/images/moments/live-2024.webp 1706w",
    placeholderSrc: "/images/moments/live-2024-placeholder.jpg",
    width: 1706,
    height: 1365,
    alt: "Shun Yang on stage with a microphone, 2024",
    date: "2024",
    featured: true,
  },
  {
    id: "behind-the-scenes",
    category: "behind-the-scenes",
    label: "Behind Scenes",
    caption: "BTS 2025",
    src: "/images/moments/bts-2025.jpg",
    srcSet: "/images/moments/bts-2025.jpg 3840w",
    webpSrcSet: "/images/moments/bts-2025.webp 3840w",
    placeholderSrc: "/images/moments/bts-2025-placeholder.jpg",
    width: 3840,
    height: 2161,
    alt: "Shun Yang in a phone booth, behind the scenes, 2025",
    date: "2025",
    featured: true,
  },
  {
    id: "travel",
    category: "travel",
    label: "Home",
    caption: "HOME",
    src: "/images/moments/home.jpg",
    srcSet: "/images/moments/home.jpg 1179w",
    webpSrcSet: "/images/moments/home.webp 1179w",
    placeholderSrc: "/images/moments/home-placeholder.jpg",
    width: 1179,
    height: 2096,
    alt: "Shun Yang at home holding a container of blueberries",
    featured: true,
  },
  {
    id: "portraits",
    category: "portraits",
    label: "Portraits",
    caption: "PORTRAITS",
    src: "/images/moments/portrait-2025.jpg",
    srcSet: "/images/moments/portrait-2025.jpg 3376w",
    webpSrcSet: "/images/moments/portrait-2025.webp 3376w",
    placeholderSrc: "/images/moments/portrait-2025-placeholder.jpg",
    width: 3376,
    height: 6000,
    alt: "Studio portrait of Shun Yang seated, looking toward the camera",
    featured: true,
  },
  {
    id: "everyday",
    category: "everyday",
    label: "Everyday",
    caption: "DAILY LIFE",
    src: "/images/moments/daily-life.jpg",
    srcSet: "/images/moments/daily-life.jpg 2316w",
    webpSrcSet: "/images/moments/daily-life.webp 2316w",
    placeholderSrc: "/images/moments/daily-life-placeholder.jpg",
    width: 2316,
    height: 3088,
    alt: "Shun Yang on a city street, daily life",
    featured: true,
  },
];

export function getMomentPreview(limit = 4): MomentItem[] {
  const featured = moments.filter((m) => m.featured && m.src);
  if (featured.length) return featured.slice(0, limit);
  return moments.slice(0, limit);
}

export function hasRealMomentPhotos(): boolean {
  return moments.some((m) => Boolean(m.src));
}
