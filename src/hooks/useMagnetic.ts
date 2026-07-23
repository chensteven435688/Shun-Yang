"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { INTENSITY } from "@/lib/motion";
import { isCoarsePointer } from "@/lib/breakpoints";

type Options = {
  reducedMotion: boolean;
  strength?: number;
};

/**
 * Subtle magnetic pull toward the pointer. Transform-only; no layout shift.
 */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  { reducedMotion, strength = 0.28 }: Options
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || isCoarsePointer()) return;

    const max = 10 * INTENSITY.magnetic * strength;
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hovering = false;

    const render = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      gsap.set(el, { x: currentX, y: currentY });
      if (
        hovering ||
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05
      ) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
        gsap.set(el, { x: 0, y: 0 });
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      targetX = Math.max(-max, Math.min(max, relX * strength * 0.2));
      targetY = Math.max(-max, Math.min(max, relY * strength * 0.2));
      hovering = true;
      schedule();
    };

    const onLeave = () => {
      hovering = false;
      targetX = 0;
      targetY = 0;
      schedule();
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      gsap.set(el, { clearProps: "transform" });
    };
  }, [ref, reducedMotion, strength]);
}
