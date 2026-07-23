import { videoBanners } from "@/data/videos";
import { VideoBanner } from "./VideoBanner";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function VideoBanners() {
  return (
    <section id="videos" className="section-divider" data-reveal-scope>
      <div className="px-6 pb-8 pt-24 md:px-10 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            index="03"
            eyebrow="Videos"
            title={
              <>
                On <em className="text-lime">Screen</em>
              </>
            }
            description="Music videos and visual projects — watch locally or open the full release on YouTube."
          />
        </div>
      </div>
      <div className="video-project-list">
        {videoBanners.map((video, index) => (
          <VideoBanner key={video.id} video={video} index={index} />
        ))}
      </div>
    </section>
  );
}
