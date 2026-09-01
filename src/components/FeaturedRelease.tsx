"use client";

import { useRef, type PointerEvent } from "react";
import Link from "next/link";
import { ProgressiveImage } from "@/components/media/ProgressiveImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFeaturedRelease } from "@/data/releases";
import { useMotionPreference } from "@/components/providers/MotionProvider";
import { isCoarsePointer } from "@/lib/breakpoints";

export function FeaturedRelease() {
  const release = getFeaturedRelease();
  const artRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPreference();

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || isCoarsePointer()) return;
    const el = artRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
  };

  const onLeave = () => {
    const el = artRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <section
      id="featured"
      className="featured-release section-divider px-6 py-24 md:px-10 md:py-32"
      data-reveal-scope
    >
      <div className="mx-auto max-w-7xl">
        <div className="ui-card ui-card--dark">
        <SectionHeader
          index="02"
          eyebrow="Featured Release"
          title={
            <>
              Sound of <em className="text-lime">Intricate Hearts</em>
            </>
          }
          description="A compact entry into the catalog — explore the full discography on the Music page."
          align="split"
          action={
            <Link href="/music/" data-cursor="view" className="section-text-link">
              Explore All Music →
            </Link>
          }
        />

        <div className="featured-grid mt-14 md:mt-18">
          <div
            className="featured-art-wrap"
            onPointerMove={onMove}
            onPointerLeave={onLeave}
          >
            <div ref={artRef} className="featured-art">
              <div className="featured-art-ring" aria-hidden />
              <div className="featured-art-frame">
                {release.cover ? (
                  <ProgressiveImage
                    src={release.cover}
                    alt={`${release.title} cover`}
                    width={640}
                    height={640}
                    aspectRatio="1 / 1"
                    sizes="(max-width: 768px) 80vw, 360px"
                    className="featured-art-image"
                    fallbackLabel="Cover unavailable"
                  />
                ) : null}
              </div>
              <div className="featured-art-disc" aria-hidden />
            </div>
          </div>

          <div className="featured-copy">
            <p data-reveal="meta" className="featured-type">
              {release.type}
              {release.year ? ` · ${release.year}` : ""}
            </p>
            <h3 data-reveal="heading" className="featured-title">
              {release.title}
            </h3>
            <p data-reveal="text" className="featured-sub">
              {release.subtitle}
            </p>
            {release.description && (
              <p data-reveal="text" className="featured-desc">
                {release.description}
              </p>
            )}

            <div data-reveal="group" className="featured-actions">
              {release.linkHub && (
                <Link
                  href={release.linkHub}
                  data-magnetic
                  data-cursor="view"
                  data-reveal-item
                  className="btn-lime"
                >
                  View Release
                </Link>
              )}
              <a
                href={release.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                data-reveal-item
                className="btn-outline"
              >
                Apple Music ↗
              </a>
              {release.spotifyHref && (
                <a
                  href={release.spotifyHref}
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
        </div>
      </div>
    </section>
  );
}
