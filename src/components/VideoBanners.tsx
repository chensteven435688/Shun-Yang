import { videoBanners } from "@/data/videos";
import { VideoBanner } from "./VideoBanner";

export function VideoBanners() {
  return (
    <section id="videos" className="section-divider">
      {videoBanners.map((video, index) => (
        <VideoBanner key={video.id} video={video} index={index} />
      ))}
    </section>
  );
}
