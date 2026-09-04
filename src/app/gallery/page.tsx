import type { Metadata } from "next";
import { Moments } from "@/components/Moments";
import { absoluteAssetUrl } from "@/lib/assetPath";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery — Shun Yang",
  description:
    "Photo gallery — on stage, in studio, and everyday life from Shun Yang.",
  openGraph: {
    title: "Gallery — Shun Yang",
    description:
      "Photo gallery — on stage, in studio, and everyday life from Shun Yang.",
    url: siteUrl("/gallery"),
    images: [absoluteAssetUrl("/og-image.jpg")],
  },
};

export default function GalleryPage() {
  return <Moments standalone />;
}
