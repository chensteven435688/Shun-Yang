"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LinkHubItem } from "@/data/intricate-links";
import { useMotionPreference } from "@/components/providers/MotionProvider";
import { DURATION, EASING } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  links: LinkHubItem[];
  children: React.ReactNode;
};

export function TrackLinkMotion({ links, children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPreference();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const items = root.querySelectorAll<HTMLElement>("[data-track-link]");
    gsap.set(items, { opacity: 0, x: -28, rotateY: -8, transformPerspective: 800 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top 85%",
        once: true,
      },
    });

    tl.to(items, {
      opacity: 1,
      x: 0,
      rotateY: 0,
      duration: DURATION.base,
      ease: EASING.gsap.outStrong,
      stagger: 0.08,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === root) t.kill();
      });
    };
  }, [links.length, reducedMotion]);

  return (
    <div ref={rootRef} className="track-link-motion">
      {children}
    </div>
  );
}
