import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Shun Yang",
  description: "Get in touch with Shun Yang for music, shows, and collaborations.",
  openGraph: {
    title: "Contact — Shun Yang",
    description: "Get in touch with Shun Yang for music, shows, and collaborations.",
    url: siteUrl("/contact"),
  },
};

export default function ContactPage() {
  return <Contact standalone />;
}
