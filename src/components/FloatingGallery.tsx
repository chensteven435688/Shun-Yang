"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryItems } from "@/data/gallery";
import { TopoLines } from "./TopoLines";
import { PortraitReveal } from "./PortraitReveal";
import { NextLiveWidget } from "./NextLiveWidget";
import { AmbientGlow } from "./effects/AmbientGlow";

gsap.registerPlugin(ScrollTrigger);

export function FloatingGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery) return;

    const floats = gallery.querySelectorAll<HTMLElement>("[data-float]");
    const quote = section.querySelector("[data-hero-quote]");
    const signature = section.querySelector("[data-hero-signature]");

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      floats.forEach((el) => {
        const depth = Number(el.dataset.depth || 1);
        const rect = el.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(el, {
          x: x * depth * 14,
          y: y * depth * 11,
          rotateX: -relY * 14,
          rotateY: relX * 14,
          transformPerspective: 1200,
          duration: 1.1,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    floats.forEach((el) => {
      const speed = Number(el.dataset.parallax || 50);
      gsap.to(el, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    gsap.to(section.querySelector(".hero-vignette"), {
      opacity: 0.85,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    if (quote) {
      gsap.fromTo(
        quote,
        {
          clipPath: "inset(100% 0% 0% 0%)",
          filter: "blur(10px)",
          y: 24,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          filter: "blur(0px)",
          y: 0,
          duration: 1.4,
          ease: "power4.out",
          delay: 0.45,
        }
      );
    }

    if (signature) {
      gsap.fromTo(
        signature,
        { opacity: 0, y: 30, letterSpacing: "0.3em" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.05em",
          duration: 1.2,
          ease: "power3.out",
          delay: 1,
        }
      );
    }

    gsap.fromTo(
      gallery.querySelectorAll("[data-float]"),
      { opacity: 0, scale: 0.88, y: 60, rotateX: 12 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        duration: 1.3,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.15,
      }
    );

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[140vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <AmbientGlow />
        <TopoLines />
        <div className="hero-vignette" aria-hidden />

        <div className="absolute left-1/2 top-[14%] z-20 w-full max-w-xl -translate-x-1/2 px-6 text-center">
          <p
            data-hero-quote
            className="font-serif text-lg leading-relaxed text-cream/90 md:text-xl lg:text-2xl"
          >
            It doesn&apos;t matter{" "}
            <em className="not-italic text-lime">where</em> you start,
            it&apos;s <em className="not-italic text-lime">how</em> you progress
            from there.
          </p>
          <p
            data-hero-signature
            className="mt-4 font-serif text-2xl text-lime md:text-3xl"
          >
            Shun Yang
          </p>
        </div>

        <div
          ref={galleryRef}
          className="absolute inset-0 mx-auto max-w-[1400px] [perspective:1200px]"
        >
          {galleryItems.map((item) =>
            item.revealSrc ? (
              <PortraitReveal key={item.id} item={item} />
            ) : (
              <figure
                key={item.id}
                data-float
                data-depth={item.depth}
                data-parallax={item.parallax}
                className={`photo-card absolute [transform-style:preserve-3d] ${item.className} ${
                  item.id === "studio" || item.id === "detail"
                    ? "hidden md:block"
                    : ""
                }`}
              >
                <figcaption className="photo-caption">{item.caption}</figcaption>
                <div
                  className={`photo-frame h-full w-full ${
                    item.desaturated ? "photo-desaturated" : ""
                  }`}
                >
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      priority={item.id === "main"}
                      quality={100}
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="photo-placeholder">
                      <span className="font-serif text-4xl text-cream/20">
                        +
                      </span>
                      <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-cream/30">
                        Add photo
                      </span>
                    </div>
                  )}
                </div>
              </figure>
            )
          )}
        </div>

        <NextLiveWidget />

        <div
          data-hero-scroll
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-cream/40">
            Scroll
          </span>
          <div className="scroll-indicator h-10 w-px bg-gradient-to-b from-lime/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
