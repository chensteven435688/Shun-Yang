import { videoBanners } from "@/data/videos";
import { VideoBanner } from "./VideoBanner";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function VideoBanners({ standalone = false }: { standalone?: boolean }) {
  const projectCount = videoBanners.length;

  return (
    <section
      id={standalone ? undefined : "videos"}
      className={`videos-section section-divider ${
        standalone ? "pt-32 md:pt-36" : ""
      }`}
      data-reveal-scope
    >
      <div
        className={`px-6 pb-10 md:px-10 ${
          standalone ? "pt-0" : "pt-24 md:pt-32"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            index="03"
            eyebrow="Videos"
            title={
              <>
                On <em className="text-lime">Screen</em>
              </>
            }
            description="Music videos and visual projects — previews play inline, full releases open on YouTube."
            align="split"
            action={
              <div data-reveal="meta" className="videos-section-stat">
                <p className="videos-section-stat-value">
                  {String(projectCount).padStart(2, "0")}
                </p>
                <p className="videos-section-stat-label">
                  {projectCount === 1 ? "Project" : "Projects"}
                </p>
              </div>
            }
          />
        </div>
      </div>

      <div className="video-project-list">
        {videoBanners.map((video, index) => (
          <VideoBanner
            key={video.id}
            video={video}
            index={index}
            total={projectCount}
          />
        ))}
      </div>

      <div className="videos-section-foot px-6 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <p data-reveal="meta" className="videos-section-footnote">
            More visual work is on the way — stay tuned for the next release.
          </p>
        </div>
      </div>
    </section>
  );
}
