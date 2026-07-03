import type { GalleryItem } from "@/data/gallery";
import { assetPath } from "@/lib/assetPath";

type Props = {
  item: GalleryItem;
};

export function BoomerangPhoto({ item }: Props) {
  return (
    <figure className="absolute inset-0 z-0 overflow-hidden">
      <img
        src={assetPath(item.src)}
        alt={item.caption}
        width={item.width}
        height={item.height}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="block h-full w-full object-cover object-center"
      />
      <figcaption className="photo-caption absolute bottom-8 right-6 z-30 md:right-10">
        {item.caption}
      </figcaption>
    </figure>
  );
}
