"use client";

import { useEffect, useState } from "react";
import {
  HOME_SECTIONS,
  HEADER_OFFSET_PX,
  type HomeSectionId,
  isHomePath,
} from "@/lib/nav";

type Options = {
  pathname: string;
  enabled?: boolean;
};

/**
 * Tracks which homepage section meaningfully occupies the viewport.
 * Uses IntersectionObserver with a top inset matching the fixed header.
 */
export function useActiveSection({
  pathname,
  enabled = true,
}: Options): HomeSectionId | null {
  const onHome = isHomePath(pathname);
  const [active, setActive] = useState<HomeSectionId | null>(null);

  useEffect(() => {
    if (!enabled || !onHome) return;

    const hash = window.location.hash.replace("#", "") as HomeSectionId | "";
    if (hash && HOME_SECTIONS.some((s) => s.id === hash)) {
      queueMicrotask(() => setActive(hash));
    }

    const ratios = new Map<HomeSectionId, number>();
    let frame = 0;

    const commit = () => {
      frame = 0;
      let best: HomeSectionId | null = null;
      let bestRatio = 0;

      for (const section of HOME_SECTIONS) {
        const ratio = ratios.get(section.id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = section.id;
        }
      }

      if (best && bestRatio > 0.12) {
        setActive((prev) => (prev === best ? prev : best));
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(commit);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as HomeSectionId;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        schedule();
      },
      {
        root: null,
        rootMargin: `-${HEADER_OFFSET_PX}px 0px -42% 0px`,
        threshold: [0, 0.15, 0.3, 0.5, 0.7, 1],
      }
    );

    for (const section of HOME_SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [enabled, onHome, pathname]);

  if (!enabled || !onHome) return null;
  return active;
}
