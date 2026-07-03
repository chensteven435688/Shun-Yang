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
        alt=""
        width={item.width}
        height={item.height}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="block h-full w-full object-cover object-center"
      />
      <figcaption className="absolute bottom-8 right-6 z-30 text-[10px] font-medium uppercase tracking-[0.25em] text-cream/55 md:right-10">
        {item.caption}
      </figcaption>
    </figure>
  );
}
