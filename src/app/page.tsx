import { Hero } from "@/components/Hero";
import { Personal } from "@/components/Personal";
import { VideoBanners } from "@/components/VideoBanners";
import { Music } from "@/components/Music";
import { Moments } from "@/components/Moments";
import { Live } from "@/components/Live";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Personal />
      <VideoBanners />
      <Music />
      <Moments />
      <Live />
      <Contact />
    </>
  );
}
