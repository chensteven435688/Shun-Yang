import type { Metadata } from "next";
import { VideoBanners } from "@/components/VideoBanners";
import { absoluteAssetUrl } from "@/lib/assetPath";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Videos — Shun Yang",
  description: "Music videos and visual projects by Shun Yang.",
  openGraph: {
    title: "Videos — Shun Yang",
    description: "Music videos and visual projects by Shun Yang.",
    url: siteUrl("/videos"),
    images: [absoluteAssetUrl("/images/christmas-light-mv-cover.jpg")],
  },
};

export default function VideosPage() {
  return <VideoBanners standalone />;
}
