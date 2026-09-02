import type { Metadata } from "next";
import { LinkHub } from "@/components/LinkHub";
import { intricateHub } from "@/data/intricate-links";
import { absoluteAssetUrl } from "@/lib/assetPath";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Intricate — Romantica | Shun Yang",
  description:
    "Listen to Intricate by Romantica on Spotify, Apple Music, YouTube, KKBOX, and more.",
  openGraph: {
    title: "Intricate — Romantica",
    description:
      "Listen to Intricate by Romantica on Spotify, Apple Music, YouTube, KKBOX, and more.",
    url: siteUrl("/music/intricate"),
    images: [absoluteAssetUrl("/images/intricate-cover.png")],
  },
};

export default function IntricateLinkHubPage() {
  return <LinkHub hub={intricateHub} />;
}
