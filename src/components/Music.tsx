import Image from "next/image";
import { releases } from "@/data/releases";

export function Music() {
  return (
    <section id="music" className="section-divider px-6 py-24 md:px-10 md:py-32">
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
          <a
            href="https://music.apple.com/tw/album/intricate/1787195411"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.2em] text-cream/40 transition-colors hover:text-lime"
          >
            Intricate on Apple Music →
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {releases.map((release, i) => (
            <a
              key={release.title}
              href={release.href}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              data-magnetic
              className={`project-card music-card group block overflow-hidden rounded-sm border border-cream/8 bg-olive-dark/40 transition-colors hover:border-lime/30 ${
                release.cover ? "music-card--cover p-0" : "p-5"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {release.cover ? (
                <div className="grid md:grid-cols-[140px_1fr]">
                  <div className="music-card-cover relative aspect-square w-full md:aspect-auto md:h-full md:min-h-[140px]">
                    <Image
                      src={release.cover}
                      alt={`${release.title} single cover`}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 140px"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4 p-5">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-lime">
                        {release.type}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl text-cream md:text-3xl">
                        {release.title}
                      </h3>
                      <p className="mt-1 text-sm text-cream/40">{release.subtitle}</p>
                      <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-cream/35">
                        Listen on Apple Music
                      </p>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/15 transition-colors group-hover:border-lime group-hover:bg-lime group-hover:text-dark">
                      <svg
                        viewBox="0 0 24 24"
                        className="ml-0.5 h-3.5 w-3.5 fill-current"
                        aria-hidden
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-lime">
                      {release.type}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-cream md:text-3xl">
                      {release.title}
                    </h3>
                    <p className="mt-1 text-sm text-cream/40">{release.subtitle}</p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/15 transition-colors group-hover:border-lime group-hover:bg-lime group-hover:text-dark">
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-0.5 h-3.5 w-3.5 fill-current"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
