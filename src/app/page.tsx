import { Hero } from "@/components/Hero";
import { Personal } from "@/components/Personal";
import { FeaturedRelease } from "@/components/FeaturedRelease";
import { VideoBanners } from "@/components/VideoBanners";
import { Moments } from "@/components/Moments";
import { Live } from "@/components/Live";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Personal />
      <FeaturedRelease />
      <VideoBanners />
      <Moments />
      <Live />
      <Contact />
    </>
  );
}
