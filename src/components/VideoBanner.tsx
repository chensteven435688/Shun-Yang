"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoBannerItem } from "@/data/videos";
import { assetPath } from "@/lib/assetPath";
import { useMotionPreference } from "@/components/providers/MotionProvider";

type Props = {
  video: VideoBannerItem;
  index: number;
  total: number;
};

export function VideoBanner({ video, index, total }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { reducedMotion } = useMotionPreference();
  const number = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  useEffect(() => {
    if (!video.src || reducedMotion || video.placeholder) return;

    const section = sectionRef.current;
    const el = videoRef.current;
    if (!section || !el) return;

    // play() settles asynchronously, so it can resolve after the section unmounts.
    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          el.play()
            .then(() => {
              if (!cancelled) setIsPlaying(true);
            })
            .catch(() => {
              if (!cancelled) setIsPlaying(false);
            });
        } else {
          el.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [video.src, video.placeholder, reducedMotion]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    media.classList.toggle("is-playing", isPlaying && !reducedMotion);
    media.classList.toggle("is-inview", isInView);
  }, [isPlaying, isInView, reducedMotion]);

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  return (
    <article
      ref={sectionRef}
      id={video.id}
      data-reveal="media"
      className="video-project"
    >
      <div ref={mediaRef} className="video-project-media">
        <div className="video-project-media-size" aria-hidden="true" />
        <div className="video-project-frame">
          {video.placeholder ? (
            <div className="video-project-placeholder">
              <div className="video-project-placeholder-grid" aria-hidden />
              <p className="video-project-placeholder-mark">+</p>
              <p className="video-project-placeholder-label">In Production</p>
            </div>
          ) : (
            video.src && (
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
            )
          )}

          <div className="video-project-overlay" aria-hidden />
          <div className="video-project-corners" aria-hidden>
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="video-project-chrome" aria-hidden>
            <span className="video-project-chrome-index">
              {number} / {totalLabel}
            </span>
            {!video.placeholder && isPlaying && (
              <span className="video-project-chrome-status">
                <span className="video-project-chrome-dot" />
                Now Playing
              </span>
            )}
          </div>

          {!video.placeholder && video.src && (
            <div className="video-project-controls">
              <button
                type="button"
                data-cursor="play"
                onClick={togglePlay}
                className="video-project-control"
                aria-label={isPlaying ? "Pause preview" : "Play preview"}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                type="button"
                data-cursor="link"
                onClick={toggleMute}
                className="video-project-control"
                aria-label={isMuted ? "Unmute preview" : "Mute preview"}
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="video-project-content">
        <div className="video-project-content-inner">
          <p className="section-eyebrow !text-lime">
            <span className="section-index">{number}</span>
            <span className="section-eyebrow-rule" aria-hidden />
            <span>{video.tag}</span>
          </p>
          <h2 className="video-project-title">{video.title}</h2>
          <div className="video-project-meta">
            <p className="video-project-subtitle">{video.subtitle}</p>
            {video.year && (
              <>
                <span className="video-project-meta-sep" aria-hidden>
                  ·
                </span>
                <p className="video-project-year">{video.year}</p>
              </>
            )}
          </div>
          {video.quote && (
            <p className="video-project-quote">{video.quote}</p>
          )}

          <div className="video-project-actions">
            {video.placeholder ? (
              <span className="btn-outline pointer-events-none opacity-70">
                {video.cta}
              </span>
            ) : (
              video.href && (
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
              )
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
