import type { Metadata } from "next";
import { VideoBanners } from "@/components/VideoBanners";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Videos — Shun Yang",
  description: "Music videos and visual projects by Shun Yang.",
  openGraph: {
    title: "Videos — Shun Yang",
    description: "Music videos and visual projects by Shun Yang.",
    url: siteUrl("/videos"),
  },
};

export default function VideosPage() {
  return <VideoBanners standalone />;
}
