import { HomeLobby } from "@/components/HomeLobby";
import { assetPath, assetSrcSet } from "@/lib/assetPath";
import { lobbyImage } from "@/lib/criticalAssets";

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={assetPath(lobbyImage.webpSrc)}
        imageSrcSet={assetSrcSet(lobbyImage.srcSetWebp)}
        imageSizes={lobbyImage.sizes}
        type="image/webp"
        fetchPriority="high"
      />
      <HomeLobby />
    </>
  );
}
