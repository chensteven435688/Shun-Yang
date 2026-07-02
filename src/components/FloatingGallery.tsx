"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { lobbyPhoto } from "@/data/gallery";
import { BoomerangPhoto } from "./BoomerangPhoto";
import { NextLiveWidget } from "./NextLiveWidget";

export function FloatingGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery) return;

    const quote = section.querySelector("[data-hero-quote]");
    const signature = section.querySelector("[data-hero-signature]");

    if (quote) {
      gsap.fromTo(
        quote,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }

    if (signature) {
      gsap.fromTo(
        signature,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.55,
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[140vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-olive">
        <div className="relative z-20 shrink-0 px-6 pb-8 pt-28 text-center md:px-10 md:pb-10 md:pt-32">
          <p
            data-hero-quote
            className="font-serif text-lg leading-relaxed text-cream md:text-xl lg:text-2xl"
          >
            It doesn&apos;t matter{" "}
            <em className="not-italic text-lime">where</em> you start,
            it&apos;s <em className="not-italic text-lime">how</em> you progress
            from there.
          </p>
          <p
            data-hero-signature
            className="mt-4 font-serif text-2xl text-cream md:text-3xl"
          >
            Shun Yang
          </p>
        </div>

        <div ref={galleryRef} className="relative min-h-0 flex-1">
          <BoomerangPhoto item={lobbyPhoto} />

          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-olive to-transparent"
            aria-hidden
          />

          <NextLiveWidget />

          <div
            data-hero-scroll
            className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-cream/50">
              Scroll
            </span>
            <div className="scroll-indicator h-10 w-px bg-gradient-to-b from-lime/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
