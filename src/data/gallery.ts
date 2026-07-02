export type GalleryItem = {
  id: string;
  caption: string;
  src?: string;
  revealSrc?: string;
  depth: number;
  parallax: number;
  desaturated?: boolean;
  className: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "main",
    caption: "TAIPEI, 2025",
    src: "/hero.png",
    revealSrc: "/lobby-future.png",
    depth: 3,
    parallax: 40,
    className:
      "left-1/2 top-[42%] z-30 h-[55vw] w-[70vw] max-h-[420px] max-w-[340px] -translate-x-1/2 md:top-[38%] md:h-[42vw] md:max-h-[480px] md:w-[34vw] md:max-w-[380px]",
  },
  {
    id: "studio",
    caption: "STUDIO, 2024",
    depth: 1,
    parallax: 80,
    desaturated: true,
    className:
      "left-[4%] top-[8%] z-10 h-[28vw] max-h-[320px] w-[20vw] max-w-[200px]",
  },
  {
    id: "live",
    caption: "BACKSTAGE, 2025",
    depth: 2,
    parallax: 60,
    desaturated: true,
    className:
      "right-[5%] top-[6%] z-10 h-[22vw] max-h-[240px] w-[18vw] max-w-[180px]",
  },
  {
    id: "award",
    caption: "INTRICATE, 2025",
    depth: 2,
    parallax: 55,
    desaturated: true,
    className:
      "bottom-[12%] left-[6%] z-20 h-[24vw] max-h-[260px] w-[22vw] max-w-[220px]",
  },
  {
    id: "detail",
    caption: "MOMENTS, 2024",
    depth: 1,
    parallax: 90,
    className:
      "bottom-[10%] right-[7%] z-10 h-[20vw] max-h-[220px] w-[20vw] max-w-[200px]",
  },
];
