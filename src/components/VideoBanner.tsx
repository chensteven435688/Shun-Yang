"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoBannerItem } from "@/data/videos";

type Props = {
  video: VideoBannerItem;
  index: number;
};

function youtubeEmbedUrl(id: string) {
  const params = new URLSearchParams({
    controls: "0",
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id,
    rel: "0",
    playsinline: "1",
    modestbranding: "1",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function VideoBanner({ video, index }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const useYoutube = Boolean(video.youtubeId);

  useEffect(() => {
    if (useYoutube || !video.src) return;

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
  }, [useYoutube, video.src]);

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
    <section
      ref={sectionRef}
      id={video.id}
      data-reveal
      className="video-banner group relative min-h-[88vh] overflow-hidden"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="video-banner-media absolute inset-0 bg-olive-dark">
        {video.placeholder ? (
          <div className="video-banner-placeholder h-full w-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(201,169,110,0.12),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(18,16,14,0.2),rgba(18,16,14,0.95))]" />
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-5xl text-cream/10 md:text-7xl">
              +
            </p>
          </div>
        ) : useYoutube && video.youtubeId ? (
          <iframe
            className="video-banner-youtube"
            src={youtubeEmbedUrl(video.youtubeId)}
            title={`${video.title} preview`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
          />
        ) : video.src ? (
          <video
            ref={videoRef}
            className="video-banner-video h-full w-full object-contain"
            src={video.src}
            poster={video.poster}
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : null}
      </div>

      <div className="video-banner-overlay absolute inset-0" aria-hidden />

      <div className="video-banner-content relative z-10 flex min-h-[88vh] flex-col justify-end px-6 pb-14 pt-28 md:px-10 md:pb-20">
        <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-lime">
          {video.tag}
        </p>
        <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] text-cream md:text-7xl lg:text-8xl">
          {video.title}
        </h2>
        <p className="mt-3 text-sm uppercase tracking-[0.25em] text-cream/50 md:text-base">
          {video.subtitle}
        </p>
        {video.quote && (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">
            {video.quote}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4">
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
                  data-magnetic
                  className="btn-lime"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {video.cta}
                </a>
              )}

              {!useYoutube && video.src && (
                <>
                  <button
                    type="button"
                    data-magnetic
                    onClick={togglePlay}
                    className="btn-outline"
                  >
                    {isPlaying ? "Pause Preview" : "Play Preview"}
                  </button>
                  <button
                    type="button"
                    data-magnetic
                    onClick={toggleMute}
                    className="btn-outline"
                  >
                    {isMuted ? "Unmute" : "Mute"}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
