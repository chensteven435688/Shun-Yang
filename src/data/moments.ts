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
  { id: "in-studio", label: "In Studio" },
  { id: "behind-the-scenes", label: "Behind the Scenes" },
  { id: "travel", label: "Travel" },
  { id: "portraits", label: "Portraits" },
  { id: "everyday", label: "Everyday" },
];

export const moments: MomentItem[] = [
  {
    id: "on-stage",
    category: "on-stage",
    label: "On Stage",
    caption: "LIVE, 2025",
  },
  {
    id: "in-studio",
    category: "in-studio",
    label: "In Studio",
    caption: "RECORDING, 2024",
  },
  {
    id: "behind-the-scenes",
    category: "behind-the-scenes",
    label: "Behind Scenes",
    caption: "BTS, 2025",
  },
  {
    id: "travel",
    category: "travel",
    label: "Travel",
    caption: "ON THE ROAD",
  },
  {
    id: "portraits",
    category: "portraits",
    label: "Portraits",
    caption: "PORTRAITS",
  },
  {
    id: "everyday",
    category: "everyday",
    label: "Everyday",
    caption: "DAILY LIFE",
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
