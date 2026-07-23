import { heroImage } from "@/lib/criticalAssets";

export type GalleryItem = {
  id: string;
  caption: string;
  src: string;
  width: number;
  height: number;
  alt?: string;
  sizes?: string;
  srcSet?: string;
  webpSrcSet?: string;
  placeholderSrc?: string;
};

export const lobbyPhoto: GalleryItem = {
  id: "main",
  caption: "TAIPEI, 2025",
  alt: "Shun Yang in Taipei, 2025",
  src: heroImage.src,
  width: heroImage.width,
  height: heroImage.height,
  sizes: heroImage.sizes,
  srcSet: heroImage.srcSetJpg,
  webpSrcSet: heroImage.srcSetWebp,
  placeholderSrc: heroImage.placeholder,
};
