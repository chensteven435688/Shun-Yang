"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useMotionPreference } from "@/components/providers/MotionProvider";
import { isCoarsePointer } from "@/lib/breakpoints";
import { INTENSITY } from "@/lib/motion";

/**
 * Applies restrained magnetic motion to [data-magnetic] elements.
 * Keep the attribute sparse — CTAs only.
 */
export function MagneticController() {
  const { reducedMotion } = useMotionPreference();
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion || isCoarsePointer()) return;

    const cleanups: Array<() => void> = [];
    const nodes = document.querySelectorAll<HTMLElement>("[data-magnetic]");

    nodes.forEach((el) => {
      const max = 9 * INTENSITY.magnetic;
      let frame = 0;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let hovering = false;

      const render = () => {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        gsap.set(el, { x: currentX, y: currentY, force3D: true });
        if (
          hovering ||
          Math.abs(targetX - currentX) > 0.04 ||
          Math.abs(targetY - currentY) > 0.04
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
        targetX = Math.max(-max, Math.min(max, relX * 0.18));
        targetY = Math.max(-max, Math.min(max, relY * 0.18));
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
      cleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        if (frame) cancelAnimationFrame(frame);
        gsap.set(el, { clearProps: "transform" });
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [reducedMotion, pathname]);

  return null;
}
