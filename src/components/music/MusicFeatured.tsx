"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlbumStack } from "@/components/music/AlbumStack";
import { getFeaturedRelease, releases, type Release } from "@/data/releases";

const stackReleases = releases.filter((r) => r.cover);

function getInitialRelease(): Release {
  const featured = getFeaturedRelease();
  return stackReleases.find((r) => r.id === featured.id) ?? stackReleases[0];
}

export function MusicFeatured() {
  const featured = getFeaturedRelease();
  const [activeRelease, setActiveRelease] = useState<Release>(getInitialRelease);
  const copyRef = useRef<HTMLDivElement>(null);
  const hasSwappedRef = useRef(false);

  const onActiveChange = useCallback((release: Release) => {
    setActiveRelease(release);
  }, []);

  // The copy is keyed so its entrance animation replays on every swap, but the
  // scroll reveal pass only ever sees the nodes that existed when it ran — the
  // remounted ones stay hidden by the [data-reveal] styles unless marked here.
  useEffect(() => {
    if (!hasSwappedRef.current) {
      hasSwappedRef.current = true;
      return;
    }

    copyRef.current
      ?.querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((el) => el.setAttribute("data-revealed", "true"));
  }, [activeRelease.id]);

  return (
    <article className="music-featured mt-14 md:mt-16" data-reveal-scope>
      <div className="music-featured-grid">
        <div data-reveal="media" className="music-featured-art">
          <AlbumStack
            releases={releases}
            initialActiveId={featured.id}
            onActiveChange={onActiveChange}
          />
        </div>
        <div
          key={activeRelease.id}
          ref={copyRef}
          className="music-featured-copy music-featured-copy--live"
        >
          <p data-reveal="meta" className="section-eyebrow !mt-0">
            <span className="section-index">01</span>
            <span className="section-eyebrow-rule" aria-hidden />
            <span>
              {activeRelease.type}
              {activeRelease.year ? ` · ${activeRelease.year}` : ""}
            </span>
          </p>
          <h3 data-reveal="heading" className="music-featured-title">
            {activeRelease.title}
          </h3>
          <p data-reveal="text" className="mt-3 text-cream/50">
            {activeRelease.subtitle}
          </p>
          {activeRelease.description && (
            <p
              data-reveal="text"
              className="mt-5 max-w-md text-base leading-relaxed text-cream/60"
            >
              {activeRelease.description}
            </p>
          )}
          <div data-reveal="group" className="mt-8 flex flex-wrap gap-3">
            {activeRelease.linkHub && (
              <Link
                href={activeRelease.linkHub}
                data-cursor="view"
                data-magnetic
                data-reveal-item
                className="btn-lime"
              >
                All Links
              </Link>
            )}
            <a
              href={activeRelease.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="external"
              data-reveal-item
              className="btn-outline"
            >
              Apple Music ↗
            </a>
            {activeRelease.spotifyHref && (
              <a
                href={activeRelease.spotifyHref}
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
  );
}
