"use client";

import { useEffect, useRef } from "react";

const tape =
  "ΛTLΛST ◆ INTRICATE — ALBUM OUT NOW ◆ SHUN YANG ◆ BORN TO LAST ◆";

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(40);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let lastY = window.scrollY;
    let frameId = 0;

    const update = () => {
      const delta = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      const target = Math.max(18, Math.min(55, 40 - delta * 1.2));
      speedRef.current += (target - speedRef.current) * 0.08;
      track.style.setProperty("--marquee-duration", `${speedRef.current}s`);
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const items = Array(4).fill(tape);

  return (
    <section className="section-divider overflow-hidden bg-olive-dark py-4">
      <div ref={trackRef} className="marquee-track flex whitespace-nowrap">
        <div className="marquee-content flex shrink-0">
          {items.map((item, i) => (
            <span
              key={`a-${i}`}
              className="mx-6 font-serif text-xl tracking-wide text-cream/25 md:text-3xl"
            >
              {item}
              <span className="mx-6 text-lime">◆</span>
            </span>
          ))}
        </div>
        <div className="marquee-content flex shrink-0" aria-hidden>
          {items.map((item, i) => (
            <span
              key={`b-${i}`}
              className="mx-6 font-serif text-xl tracking-wide text-cream/25 md:text-3xl"
            >
              {item}
              <span className="mx-6 text-lime">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
