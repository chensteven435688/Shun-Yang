import Link from "next/link";
import { ProgressiveImage } from "@/components/media/ProgressiveImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFeaturedRelease, releases, type Release } from "@/data/releases";

type Props = {
  standalone?: boolean;
};

function ArchiveRow({ release, index }: { release: Release; index: number }) {
  const meta = (
    <>
      <span className="music-archive-index">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="music-archive-cover">
        {release.cover ? (
          <ProgressiveImage
            src={release.cover}
            alt=""
            width={120}
            height={120}
            aspectRatio="1 / 1"
            sizes="96px"
            className="h-full w-full"
            fallbackLabel="—"
          />
        ) : null}
      </div>
      <div className="music-archive-meta">
        <p className="text-[10px] uppercase tracking-[0.2em] text-lime">
          {release.type}
          {release.year ? ` · ${release.year}` : ""}
        </p>
        <h3 className="mt-1 font-serif text-xl text-cream transition-colors group-hover:text-lime md:text-2xl">
          {release.title}
        </h3>
        <p className="mt-1 text-sm text-cream/40">{release.subtitle}</p>
      </div>
    </>
  );

  if (release.linkHub) {
    return (
      <li data-reveal="media" className="music-archive-item">
        <Link href={release.linkHub} data-cursor="view" className="music-archive-link group">
          {meta}
          <span className="music-archive-cta">Open →</span>
        </Link>
      </li>
    );
  }

  return (
    <li data-reveal="media" className="music-archive-item">
      <a
        href={release.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="external"
        className="music-archive-link group"
      >
        {meta}
        <span className="music-archive-cta">Listen ↗</span>
      </a>
    </li>
  );
}

export function Music({ standalone = false }: Props) {
  const featured = getFeaturedRelease();

  return (
    <section
      id={standalone ? undefined : "music"}
      data-reveal-scope
      className={`music-page px-6 py-24 md:px-10 md:py-32 ${
        standalone ? "pt-32 md:pt-36" : "section-divider"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="03"
          eyebrow="Discography"
          title={
            <>
              Sound of
              <br />
              <em className="text-lime">Intricate Hearts</em>
            </>
          }
          description="Releases from Romantica and beyond — listen, share, and explore every platform."
          align="split"
        />

        <article className="music-featured mt-14 md:mt-16" data-reveal-scope>
          <div className="music-featured-grid">
            <div data-reveal="media" className="music-featured-art">
              {featured.cover && (
                <ProgressiveImage
                  src={featured.cover}
                  alt={`${featured.title} cover`}
                  width={720}
                  height={720}
                  aspectRatio="1 / 1"
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="music-featured-image"
                  fallbackLabel="Cover unavailable"
                />
              )}
            </div>
            <div className="music-featured-copy">
              <p data-reveal="meta" className="section-eyebrow !mt-0">
                <span className="section-index">01</span>
                <span className="section-eyebrow-rule" aria-hidden />
                <span>
                  {featured.type}
                  {featured.year ? ` · ${featured.year}` : ""}
                </span>
              </p>
              <h3 data-reveal="heading" className="music-featured-title">
                {featured.title}
              </h3>
              <p data-reveal="text" className="mt-3 text-cream/50">
                {featured.subtitle}
              </p>
              {featured.description && (
                <p data-reveal="text" className="mt-5 max-w-md text-base leading-relaxed text-cream/60">
                  {featured.description}
                </p>
              )}
              <div data-reveal="group" className="mt-8 flex flex-wrap gap-3">
                {featured.linkHub && (
                  <Link
                    href={featured.linkHub}
                    data-cursor="view"
                    data-magnetic
                    data-reveal-item
                    className="btn-lime"
                  >
                    All Links
                  </Link>
                )}
                <a
                  href={featured.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="external"
                  data-reveal-item
                  className="btn-outline"
                >
                  Apple Music ↗
                </a>
                {featured.spotifyHref && (
                  <a
                    href={featured.spotifyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="external"
                    data-reveal-item
                    className="btn-outline"
                  >
                    Spotify ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>

        <div className="mt-20 md:mt-24">
          <p data-reveal="meta" className="section-eyebrow">
            <span className="section-index">Catalog</span>
            <span className="section-eyebrow-rule" aria-hidden />
            <span>Archive</span>
          </p>

          <ol className="music-archive mt-8">
            {releases.map((release, i) => (
              <ArchiveRow key={release.id} release={release} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
