"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringSmooth = { x: pos.x, y: pos.y };
    let hovering = false;
    let frameId = 0;

    const setPos = (el: HTMLElement, x: number, y: number) => {
      gsap.set(el, { x, y, xPercent: -50, yPercent: -50 });
    };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;

      const magnetic = document
        .elementFromPoint(e.clientX, e.clientY)
        ?.closest<HTMLElement>("[data-magnetic]");

      if (magnetic && !hovering) {
        hovering = true;
        gsap.to(ring, {
          scale: 1.6,
          borderColor: "rgba(210, 255, 0, 0.7)",
          duration: 0.3,
        });
        gsap.to(dot, { scale: 1.2, duration: 0.25 });
      } else if (!magnetic && hovering) {
        hovering = false;
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(232, 226, 214, 0.4)",
          duration: 0.3,
        });
        gsap.to(dot, { scale: 1, duration: 0.25 });
      }
    };

    const onDown = () =>
      gsap.to(ring, { scale: hovering ? 1.3 : 0.8, duration: 0.15 });
    const onUp = () =>
      gsap.to(ring, { scale: hovering ? 1.6 : 1, duration: 0.2 });

    const render = () => {
      setPos(dot, pos.x, pos.y);
      ringSmooth.x += (pos.x - ringSmooth.x) * 0.18;
      ringSmooth.y += (pos.y - ringSmooth.y) * 0.18;
      setPos(ring, ringSmooth.x, ringSmooth.y);
      frameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    frameId = requestAnimationFrame(render);

    document.body.classList.add("custom-cursor-active");

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <div className="cursor-root" aria-hidden>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
