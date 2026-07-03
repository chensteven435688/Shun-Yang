import { Hero } from "@/components/Hero";
import { Personal } from "@/components/Personal";
import { VideoBanners } from "@/components/VideoBanners";
import { Moments } from "@/components/Moments";
import { Live } from "@/components/Live";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Personal />
      <VideoBanners />
      <Moments />
      <Live />
      <Contact />
    </>
  );
}
