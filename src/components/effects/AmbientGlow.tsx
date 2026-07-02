"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function AmbientGlow() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orbs = containerRef.current?.querySelectorAll<HTMLElement>("[data-orb]");
    if (!orbs?.length) return;

    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        x: `random(-40, 40)`,
        y: `random(-30, 30)`,
        scale: `random(0.9, 1.15)`,
        duration: 4 + i * 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div
        data-orb
        className="ambient-orb absolute -left-[10%] top-[15%] h-[45vw] w-[45vw] max-h-[500px] max-w-[500px] rounded-full bg-lime/20 blur-[100px]"
      />
      <div
        data-orb
        className="ambient-orb absolute -right-[5%] bottom-[10%] h-[40vw] w-[40vw] max-h-[420px] max-w-[420px] rounded-full bg-cream/10 blur-[90px]"
      />
      <div
        data-orb
        className="ambient-orb absolute left-[35%] top-[55%] h-[30vw] w-[30vw] max-h-[320px] max-w-[320px] rounded-full bg-lime/10 blur-[80px]"
      />
    </div>
  );
}
