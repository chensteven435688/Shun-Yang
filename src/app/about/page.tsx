import type { Metadata } from "next";
import { Personal } from "@/components/Personal";
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
  },
};

export default function AboutPage() {
  return <Personal standalone />;
}
