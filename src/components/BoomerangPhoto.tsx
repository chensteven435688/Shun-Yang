"use client";

import { ProgressiveImage } from "@/components/media/ProgressiveImage";
import { heroImage } from "@/lib/criticalAssets";
import type { GalleryItem } from "@/data/gallery";

type Props = {
  item: GalleryItem;
};

export function BoomerangPhoto({ item }: Props) {
  return (
    <figure className="absolute inset-0 z-0 overflow-hidden">
      <ProgressiveImage
        src={item.src || heroImage.src}
        alt={item.alt ?? "Shun Yang"}
        width={item.width}
        height={item.height}
        sizes={item.sizes ?? heroImage.sizes}
        srcSet={item.srcSet ?? heroImage.srcSetJpg}
        webpSrcSet={item.webpSrcSet ?? heroImage.srcSetWebp}
        placeholderSrc={item.placeholderSrc ?? heroImage.placeholder}
        priority
        className="h-full w-full"
        imgClassName="object-cover object-center"
        fallbackLabel="Portrait unavailable"
      />
      <figcaption className="absolute bottom-8 right-6 z-30 text-[10px] font-medium uppercase tracking-[0.25em] text-cream/55 md:right-10">
        {item.caption}
      </figcaption>
    </figure>
  );
}
