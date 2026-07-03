import type { Metadata } from "next";
import { Music } from "@/components/Music";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Music — Shun Yang",
  description:
    "Discography of Shun Yang — Intricate, singles, and releases from Romantica and ΛTLΛST.",
  openGraph: {
    title: "Music — Shun Yang",
    description:
      "Discography of Shun Yang — Intricate, singles, and releases from Romantica and ΛTLΛST.",
    url: siteUrl("/music"),
  },
};

export default function MusicPage() {
  return <Music standalone />;
}
