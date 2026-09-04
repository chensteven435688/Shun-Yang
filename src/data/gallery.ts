import { lobbyImage } from "@/lib/criticalAssets";

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

/** Editorial lobby still used on the homepage and hero metadata portrait. */
export const lobbyPhoto: GalleryItem = {
  id: "lobby",
  caption: "TAIPEI, 2025",
  alt: "Shun Yang in a Taipei lobby, 2025",
  src: lobbyImage.src,
  width: lobbyImage.width,
  height: lobbyImage.height,
  sizes: "(max-width: 768px) 42vw, 220px",
  srcSet: lobbyImage.srcSetJpg,
  webpSrcSet: lobbyImage.srcSetWebp,
  placeholderSrc: lobbyImage.placeholder,
};
