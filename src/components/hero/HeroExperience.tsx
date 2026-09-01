"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroContent } from "@/components/hero/HeroContent";
import { Hero3DFallback } from "@/components/hero/Hero3DFallback";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { useMotionPreference } from "@/components/providers/MotionProvider";
import { DURATION, EASING, LOADER } from "@/lib/motion";
import { HERO3D } from "@/lib/hero3d";

gsap.registerPlugin(ScrollTrigger);

const Hero3D = dynamic(
  () => import("@/components/hero/Hero3D").then((m) => m.Hero3D),
  { ssr: false, loading: () => null }
);

function loaderAlreadyDone() {
  if (typeof document === "undefined") return true;
  return document.documentElement.dataset.loader === "skip";
}

export function HeroExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { mode, allowPointer, ready: capabilityReady } = useDeviceCapability();
  const { reducedMotion } = useMotionPreference();
  const [webglReady, setWebglReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const [allow3D, setAllow3D] = useState(false);

  const onReady = useCallback(() => setWebglReady(true), []);
  const onFatal = useCallback(() => setWebglFailed(true), []);

  const use3D = capabilityReady && mode !== "static" && !webglFailed;

  // Defer mounting Three until after loader / first paint
  useEffect(() => {
    if (!use3D) return;

    const start = () => setAllow3D(true);
    if (loaderAlreadyDone()) {
      const id = window.setTimeout(start, 120);
      return () => window.clearTimeout(id);
    }

    const poll = window.setInterval(() => {
      if (loaderAlreadyDone()) {
        window.clearInterval(poll);
        start();
      }
    }, 80);

    const safety = window.setTimeout(() => {
      window.clearInterval(poll);
      start();
    }, LOADER.maxMs + 800);

    return () => {
      window.clearInterval(poll);
      window.clearTimeout(safety);
    };
  }, [use3D]);

  // Cinematic entrance for HTML content
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const nodes = section.querySelectorAll<HTMLElement>("[data-hero-enter]");
    if (reducedMotion) {
      gsap.set(nodes, { opacity: 1, y: 0 });
      return;
    }

    const short = loaderAlreadyDone();
    const delayBase = short ? 0.05 : 0.15;

    gsap.set(nodes, { opacity: 0, y: 22 });

    const tl = gsap.timeline({ delay: delayBase });
    nodes.forEach((el) => {
      const kind = el.dataset.heroEnter;
      const dur =
        kind === "title" ? DURATION.slow : kind === "text" ? DURATION.base + 0.1 : DURATION.base;
      const d =
        kind === "title" ? 0 : kind === "text" ? 0.12 : kind === "media" ? 0.18 : 0.06;
      tl.to(
        el,
        { opacity: 1, y: 0, duration: dur, ease: EASING.gsap.outStrong },
        d
      );
    });

    const scrollCue = section.querySelector(".hero-scroll-cue");
    if (scrollCue) {
      tl.to(scrollCue, { opacity: 1, duration: 0.5, ease: EASING.gsap.out }, "-=0.2");
    }

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  // Gentle scroll fade of stage as user leaves hero
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const stage = section.querySelector(".hero-stage");
    if (!stage) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const t = self.progress;
        gsap.set(stage, {
          opacity: 1 - t * 0.45,
          y: t * 40,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [reducedMotion]);

  const showCanvas = allow3D && use3D;
  const canvasVisible = webglReady && showCanvas;
  const activeMode = mode === "full" || mode === "reduced" ? mode : null;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-experience"
      aria-label="Shun Yang — Introduction"
    >
      <div className="hero-stage" aria-hidden>
        <Hero3DFallback />
        {showCanvas && activeMode && (
          <div
            className={`hero-3d-layer ${canvasVisible ? "is-ready" : ""}`}
            style={{ transitionDuration: `${HERO3D.revealMs}ms` }}
          >
            <Hero3D
              mode={activeMode}
              allowPointer={allowPointer}
              onReady={onReady}
              onFatal={onFatal}
            />
          </div>
        )}
      </div>

      <div className="hero-experience-inner">
        <HeroContent />

        <div className="hero-scroll-cue" data-hero-scroll>
          <span>Scroll</span>
          <div className="scroll-indicator hero-scroll-line" />
        </div>
      </div>
    </section>
  );
}
