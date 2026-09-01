"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assetPath } from "@/lib/assetPath";
import { type Release } from "@/data/releases";
import { useMotionPreference } from "@/components/providers/MotionProvider";
import { DURATION, EASING } from "@/lib/motion";
import { isCoarsePointer } from "@/lib/breakpoints";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  releases: Release[];
  className?: string;
};

type StackLayout = {
  x: number;
  y: number;
  z: number;
  rotateY: number;
  rotateX: number;
  scale: number;
};

const STACK_LAYOUT: StackLayout[] = [
  { x: -72, y: 28, z: -120, rotateY: 22, rotateX: 8, scale: 0.92 },
  { x: 0, y: 0, z: 0, rotateY: 0, rotateX: 0, scale: 1 },
  { x: 72, y: -24, z: 80, rotateY: -18, rotateX: -6, scale: 0.96 },
];

const STACK_LAYOUTS: Record<number, StackLayout[]> = {
  1: [{ x: 0, y: 0, z: 0, rotateY: 0, rotateX: 0, scale: 1 }],
  2: [
    { x: -56, y: 24, z: -80, rotateY: 18, rotateX: 6, scale: 0.94 },
    { x: 56, y: -20, z: 64, rotateY: -16, rotateX: -5, scale: 1 },
  ],
  3: STACK_LAYOUT,
};

export function AlbumStack({ releases, className = "" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPreference();

  const items = releases.filter((r) => r.cover).slice(0, 3);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage || !items.length) return;

    const cards = stage.querySelectorAll<HTMLElement>("[data-album-card]");

    if (reducedMotion) {
      gsap.set(cards, { clearProps: "all", opacity: 1 });
      return;
    }

    gsap.set(cards, {
      opacity: 0,
      y: 40,
      rotateX: 12,
      transformPerspective: 1000,
    });

    const enter = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top 82%",
        once: true,
      },
    });

    cards.forEach((card, index) => {
      const layouts = STACK_LAYOUTS[items.length] ?? STACK_LAYOUTS[3];
      const layout = layouts[index] ?? layouts[layouts.length - 1];
      enter.to(
        card,
        {
          opacity: 1,
          x: layout.x,
          y: layout.y,
          z: layout.z,
          rotateY: layout.rotateY,
          rotateX: layout.rotateX,
          scale: layout.scale,
          duration: DURATION.slow,
          ease: EASING.gsap.outStrong,
        },
        index * 0.12
      );
    });

    const float = gsap.to(cards, {
      y: "+=10",
      duration: 2.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.25, from: "center" },
    });

    return () => {
      enter.kill();
      float.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === root) t.kill();
      });
    };
  }, [items.length, reducedMotion]);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || isCoarsePointer()) return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(stage, {
      rotateY: px * 10,
      rotateX: -py * 8,
      duration: 0.6,
      ease: EASING.gsap.out,
    });
  };

  const onLeave = () => {
    const stage = stageRef.current;
    if (!stage || reducedMotion) return;
    gsap.to(stage, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: EASING.gsap.out,
    });
  };

  if (!items.length) return null;

  return (
    <div
      ref={rootRef}
      className={`album-stack ${className}`.trim()}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div ref={stageRef} className="album-stack-stage">
        {items.map((release, index) => {
          const href = release.linkHub ?? release.href;
          const isExternal = !release.linkHub;

          const card = (
            <article
              data-album-card
              className={`album-stack-card ${index === 1 ? "album-stack-card--hero" : ""}`}
              style={{ zIndex: items.length - index }}
            >
              <div className="album-stack-card-inner">
                {release.cover && (
                  <Image
                    src={assetPath(release.cover)}
                    alt={`${release.title} cover`}
                    width={480}
                    height={480}
                    unoptimized
                    className="album-stack-cover"
                    sizes="(max-width: 768px) 70vw, 320px"
                  />
                )}
                <div className="album-stack-card-meta">
                  <p className="album-stack-card-type">{release.type}</p>
                  <p className="album-stack-card-title">{release.title}</p>
                </div>
              </div>
            </article>
          );

          if (isExternal) {
            return (
              <a
                key={release.id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                className="album-stack-link"
              >
                {card}
              </a>
            );
          }

          return (
            <Link key={release.id} href={href} data-cursor="view" className="album-stack-link">
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
