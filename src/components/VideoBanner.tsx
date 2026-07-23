"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoBannerItem } from "@/data/videos";
import { assetPath } from "@/lib/assetPath";
import { ProgressiveImage } from "@/components/media/ProgressiveImage";
import { useMotionPreference } from "@/components/providers/MotionProvider";

type Props = {
  video: VideoBannerItem;
  index: number;
};

export function VideoBanner({ video, index }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wantsPreview, setWantsPreview] = useState(false);
  const { reducedMotion } = useMotionPreference();
  const number = String(index + 1).padStart(2, "0");

  useEffect(() => {
    if (!wantsPreview || !video.src || reducedMotion) return;

    const section = sectionRef.current;
    const el = videoRef.current;
    if (!section || !el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        } else {
          el.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [wantsPreview, video.src, reducedMotion]);

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) {
      setWantsPreview(true);
      return;
    }
    if (el.paused) {
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const startPreview = () => {
    if (video.placeholder) return;
    setWantsPreview(true);
  };

  return (
    <article
      ref={sectionRef}
      id={video.id}
      data-reveal="media"
      className="video-project"
    >
      <div className="video-project-media">
        {video.placeholder ? (
          <div className="video-project-placeholder">
            <p className="video-project-placeholder-mark">+</p>
          </div>
        ) : (
          <>
            {video.poster && !wantsPreview && (
              <button
                type="button"
                className="video-project-poster"
                onClick={startPreview}
                data-cursor="play"
                aria-label={`Play preview of ${video.title}`}
              >
                <ProgressiveImage
                  src={video.poster}
                  alt=""
                  width={1920}
                  height={1080}
                  aspectRatio="16 / 9"
                  sizes="100vw"
                  className="h-full w-full"
                  fallbackLabel="Preview unavailable"
                />
                <span className="video-project-play">Play Preview</span>
              </button>
            )}

            {wantsPreview && video.src && (
              <video
                ref={videoRef}
                className="video-project-video"
                src={assetPath(video.src)}
                poster={video.poster ? assetPath(video.poster) : undefined}
                muted
                loop
                playsInline
                preload="metadata"
              />
            )}
          </>
        )}
        <div className="video-project-overlay" aria-hidden />
      </div>

      <div className="video-project-content">
        <p className="section-eyebrow !text-lime">
          <span className="section-index">{number}</span>
          <span className="section-eyebrow-rule" aria-hidden />
          <span>{video.tag}</span>
        </p>
        <h2 className="video-project-title">{video.title}</h2>
        <p className="mt-3 text-sm uppercase tracking-[0.25em] text-cream/50">
          {video.subtitle}
        </p>
        {video.quote && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">
            {video.quote}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {video.placeholder ? (
            <span className="btn-outline pointer-events-none opacity-70">
              {video.cta}
            </span>
          ) : (
            <>
              {video.href && (
                <a
                  href={video.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="external"
                  data-magnetic
                  className="btn-lime"
                >
                  {video.cta} ↗
                </a>
              )}
              {video.src && (
                <>
                  <button
                    type="button"
                    data-cursor="play"
                    onClick={togglePlay}
                    className="btn-outline"
                  >
                    {!wantsPreview
                      ? "Load Preview"
                      : isPlaying
                        ? "Pause"
                        : "Play"}
                  </button>
                  {wantsPreview && (
                    <button
                      type="button"
                      data-cursor="link"
                      onClick={toggleMute}
                      className="btn-outline"
                    >
                      {isMuted ? "Unmute" : "Mute"}
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}
