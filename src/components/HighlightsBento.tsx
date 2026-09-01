import Link from "next/link";
import Image from "next/image";
import { getFeaturedRelease, releases } from "@/data/releases";
import { pastShows, upcomingShows } from "@/data/shows";
import { assetPath } from "@/lib/assetPath";

const DESKTOP_STATS = [
  {
    value: `${releases.length}+`,
    label: "Releases",
    desc: "Albums and singles across the Romantica era and beyond.",
    dark: false,
  },
  {
    value: `${pastShows.length}`,
    label: "Live Dates",
    desc: "Full-length concerts and performances across Taipei.",
    dark: true,
  },
  {
    value: "ΛTLΛST",
    label: "Duo Project",
    desc: "Raw voice and honest strings — two instruments, everything that matters.",
    dark: false,
  },
  {
    value: "Romantica",
    label: "Current Era",
    desc: "Chen An Wang & Shun Yang — lyrics that feel remembered, not composed.",
    dark: true,
  },
] as const;

export function HighlightsBento() {
  const featured = getFeaturedRelease();

  return (
    <section
      id="highlights"
      className="highlights-section section-tone--light"
      data-reveal-scope
      aria-label="Highlights"
    >
      <div className="highlights-heading">
        <div className="highlights-dots" aria-hidden>
          <span />
          <span />
          <span />
          <span />
        </div>
        <h2 data-reveal="heading" className="highlights-title">
          At a Glance
        </h2>
      </div>

      <div data-reveal="group" className="highlights-bento">
        <Link
          href={featured.linkHub ?? featured.href}
          data-cursor="view"
          data-reveal-item
          className="bento-card bento-card--feature group"
        >
          {featured.cover && (
            <div className="bento-feature-image">
              <Image
                src={assetPath(featured.cover)}
                alt={`${featured.title} cover`}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
          )}
          <div className="bento-feature-overlay" aria-hidden />
          <div className="bento-feature-copy">
            <p className="bento-feature-label">Latest Release</p>
            <p className="bento-feature-title">{featured.title}</p>
          </div>
        </Link>

        {DESKTOP_STATS.map((stat) => (
          <article
            key={stat.label}
            data-reveal-item
            className={`bento-card ${stat.dark ? "bento-card--dark" : ""}`}
          >
            <span className="bento-stat-icon" aria-hidden>
              ↗
            </span>
            <p className="bento-stat-value">{stat.value}</p>
            <p className="bento-stat-label">{stat.label}</p>
            <p className="bento-stat-desc">{stat.desc}</p>
          </article>
        ))}
      </div>

      {upcomingShows.length > 0 && (
        <p data-reveal="meta" className="mx-auto mt-8 max-w-lg text-center text-sm text-ink-muted">
          Next up: {upcomingShows[0].venue} · {upcomingShows[0].city}
        </p>
      )}
    </section>
  );
}
