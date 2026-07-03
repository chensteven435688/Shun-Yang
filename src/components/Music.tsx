import Image from "next/image";
import Link from "next/link";
import { releases } from "@/data/releases";
import { assetPath } from "@/lib/assetPath";

const intricate = releases.find((release) => release.title === "Intricate");

function cardLabel(release: (typeof releases)[number]) {
  if (release.linkHub) return "View all links";
  if (release.spotifyHref) return "Apple Music · Spotify";
  return "Listen on Apple Music";
}

type Props = {
  standalone?: boolean;
};

export function Music({ standalone = false }: Props) {
  return (
    <section
      id={standalone ? undefined : "music"}
      className={`px-6 py-24 md:px-10 md:py-32 ${
        standalone ? "pt-32 md:pt-36" : "section-divider"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
          data-reveal
        >
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-lime">
              Discography
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.05] text-cream md:text-6xl">
              Sound of
              <br />
              <em className="text-lime">Intricate Hearts</em>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            {intricate && (
              <>
                <Link
                  href="/music/intricate"
                  className="text-[11px] uppercase tracking-[0.2em] text-cream/40 transition-colors hover:text-lime"
                >
                  Intricate links →
                </Link>
                <a
                  href={intricate.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[0.2em] text-cream/40 transition-colors hover:text-lime"
                >
                  Intricate on Apple Music →
                </a>
                {intricate.spotifyHref && (
                  <a
                    href={intricate.spotifyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-[0.2em] text-cream/40 transition-colors hover:text-lime"
                  >
                    Intricate on Spotify →
                  </a>
                )}
              </>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {releases.map((release, i) => {
            const cardHref = release.linkHub ?? release.href;
            const isInternal = Boolean(release.linkHub);

            const cardClassName =
              "project-card music-card group block overflow-hidden rounded-sm border border-cream/8 bg-olive-dark/40 p-0 transition-colors hover:border-lime/30";
            const cardStyle = { transitionDelay: `${i * 80}ms` };
            const cardContent = (
              <div className="grid md:grid-cols-[auto_1fr] md:items-center">
                <div className="flex items-center justify-center p-3 md:p-4">
                  <div className="music-card-cover relative aspect-square w-full max-w-[148px] overflow-hidden rounded-sm sm:max-w-[168px] md:size-[124px] md:max-w-none">
                    {release.cover ? (
                      <Image
                        src={assetPath(release.cover)}
                        alt={`${release.title} ${release.type.toLowerCase()} cover`}
                        fill
                        quality={100}
                        unoptimized
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 168px, 124px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-olive-dark">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-7 w-7 text-cream/15"
                          aria-hidden
                        >
                          <path
                            fill="currentColor"
                            d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3 p-4 pt-0 md:py-4 md:pl-0">
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-lime">
                      {release.type}
                    </p>
                    <h3 className="mt-1.5 font-serif text-lg leading-tight text-cream md:text-xl">
                      {release.title}
                    </h3>
                    <p className="mt-1 text-xs leading-snug text-cream/40">
                      {release.subtitle}
                    </p>
                    {release.cover && (
                      <p className="mt-2 text-[9px] uppercase tracking-[0.15em] text-cream/35">
                        {cardLabel(release)}
                      </p>
                    )}
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream/15 transition-colors group-hover:border-lime group-hover:bg-lime group-hover:text-dark">
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-0.5 h-3 w-3 fill-current"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            );

            if (isInternal) {
              return (
                <Link
                  key={release.title}
                  href={cardHref}
                  data-reveal
                  data-magnetic
                  className={cardClassName}
                  style={cardStyle}
                >
                  {cardContent}
                </Link>
              );
            }

            return (
            <a
              key={release.title}
              href={cardHref}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              data-magnetic
              className={cardClassName}
              style={cardStyle}
            >
              {cardContent}
            </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
