import type { Metadata } from "next";
import { Moments } from "@/components/Moments";
import { absoluteAssetUrl } from "@/lib/assetPath";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Moments — Shun Yang",
  description:
    "Gallery of moments — on stage, in studio, and everyday life from Shun Yang.",
  openGraph: {
    title: "Moments — Shun Yang",
    description:
      "Gallery of moments — on stage, in studio, and everyday life from Shun Yang.",
    url: siteUrl("/moments"),
    images: [absoluteAssetUrl("/og-image.jpg")],
  },
};

export default function MomentsPage() {
  return <Moments standalone />;
}
