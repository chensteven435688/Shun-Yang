import type { Metadata } from "next";
import { Music } from "@/components/Music";

export const metadata: Metadata = {
  title: "Music — Shun Yang",
  description:
    "Discography of Shun Yang — Intricate, singles, and releases from Romantica and ΛTLΛST.",
  openGraph: {
    title: "Music — Shun Yang",
    description:
      "Discography of Shun Yang — Intricate, singles, and releases from Romantica and ΛTLΛST.",
    url: "https://shunyang.com/music",
  },
};

export default function MusicPage() {
  return <Music standalone />;
}
