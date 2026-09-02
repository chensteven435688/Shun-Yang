import Link from "next/link";
import { ProgressiveImage } from "@/components/media/ProgressiveImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MusicFeatured } from "@/components/music/MusicFeatured";
import { releases, type Release } from "@/data/releases";

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
          as={standalone ? "h1" : "h2"}
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

        <MusicFeatured />

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
