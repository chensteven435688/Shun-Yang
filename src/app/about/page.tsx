import type { Metadata } from "next";
import { Personal } from "@/components/Personal";
import { absoluteAssetUrl } from "@/lib/assetPath";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Shun Yang",
  description:
    "Shun Yang (陳舜揚) — vocalist and lyricist from Taipei. ΛTLΛST, Romantica, and the work in between.",
  openGraph: {
    title: "About — Shun Yang",
    description:
      "Shun Yang (陳舜揚) — vocalist and lyricist from Taipei. ΛTLΛST, Romantica, and the work in between.",
    url: siteUrl("/about"),
    images: [absoluteAssetUrl("/og-image.jpg")],
  },
};

export default function AboutPage() {
  return <Personal standalone />;
}
