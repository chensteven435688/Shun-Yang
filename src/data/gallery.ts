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

/** Editorial lobby still used in the hero metadata portrait panel. */
export const lobbyPhoto: GalleryItem = {
  id: "lobby",
  caption: "TAIPEI, 2025",
  alt: "Shun Yang in a Taipei lobby, 2025",
  src: "/lobby-future.png",
  width: 1024,
  height: 1024,
  sizes: "(max-width: 768px) 42vw, 220px",
};
