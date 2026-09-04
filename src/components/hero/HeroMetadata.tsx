import Link from "next/link";
import { nextShow } from "@/data/shows";
import { lobbyPhoto } from "@/data/gallery";
import { ProgressiveImage } from "@/components/media/ProgressiveImage";

/**
 * Technical metadata rail + editorial portrait panel.
 */
export function HeroMetadata() {
  return (
    <aside className="hero-metadata" aria-label="Hero details">
      <div className="hero-meta-coords" data-hero-enter="meta">
        <span>01</span>
        <span className="hero-meta-rule" aria-hidden />
        <span>25.0330° N</span>
        <span>121.5654° E</span>
      </div>

      <figure className="hero-portrait" data-hero-enter="media">
        <ProgressiveImage
          src={lobbyPhoto.src}
          alt={lobbyPhoto.alt ?? "Shun Yang"}
          width={lobbyPhoto.width}
          height={lobbyPhoto.height}
          aspectRatio="4 / 5"
          sizes={lobbyPhoto.sizes ?? "(max-width: 768px) 42vw, 220px"}
          srcSet={lobbyPhoto.srcSet}
          webpSrcSet={lobbyPhoto.webpSrcSet}
          placeholderSrc={lobbyPhoto.placeholderSrc}
          className="hero-portrait-image"
          imgClassName="object-cover object-[center_22%]"
          fallbackLabel="Portrait unavailable"
        />
        <figcaption className="hero-portrait-caption">
          {lobbyPhoto.caption}
        </figcaption>
      </figure>

      <Link
        href="/#live"
        data-cursor="view"
        data-hero-enter="meta"
        className="hero-live-chip"
      >
        <span className="hero-live-label">Next Live</span>
        <span className="hero-live-venue">{nextShow.venue}</span>
        <span className="hero-live-city">ΛTLΛST · {nextShow.city}</span>
      </Link>
    </aside>
  );
}
