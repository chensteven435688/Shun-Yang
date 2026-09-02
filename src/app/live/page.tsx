import type { Metadata } from "next";
import { Live } from "@/components/Live";
import { absoluteAssetUrl } from "@/lib/assetPath";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Live — Shun Yang",
  description: "Upcoming and past live performances — ΛTLΛST and Shun Yang.",
  openGraph: {
    title: "Live — Shun Yang",
    description: "Upcoming and past live performances — ΛTLΛST and Shun Yang.",
    url: siteUrl("/live"),
    images: [absoluteAssetUrl("/og-image.jpg")],
  },
};

export default function LivePage() {
  return <Live standalone />;
}
