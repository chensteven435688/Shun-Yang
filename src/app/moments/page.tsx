import type { Metadata } from "next";
import { Moments } from "@/components/Moments";
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
  },
};

export default function MomentsPage() {
  return <Moments standalone />;
}
