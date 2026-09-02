"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { useRouter } from "next/navigation";
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
  initialActiveId?: string;
  onActiveChange?: (release: Release, index: number) => void;
};

type StackLayout = {
  x: number;
  y: number;
  z: number;
  rotateY: number;
  rotateX: number;
  scale: number;
  depth: number;
};

const CAROUSEL = {
  radius: 112,
  /** Sideways nudge that keeps a cover sitting directly behind the front one visible. */
  peekX: 76,
  peekY: 16,
  /** Tilts the ring plane so the two side positions never land on equal depth. */
  ringTilt: 20,
  faceTurn: 26,
  stepDuration: 1.05,
  snapDuration: 0.85,
  dragSensitivity: 0.0036,
  momentumScale: 0.00022,
  ease: "power3.inOut",
  snapEase: "power4.out",
  perspective: 1400,
} as const;

/** Covers must divide the full circle, otherwise rotation cannot wrap seamlessly. */
function arcStepForCount(count: number): number {
  return count > 0 ? 360 / count : 360;
}

function angleForItem(index: number, rotation: number, arcStep: number): number {
  return (index - rotation) * arcStep;
}

/**
 * Places a cover on a turntable ring. Every term derives from sin/cos of the angle,
 * so the layout repeats exactly once per turn and rotation can accumulate forever.
 */
function layoutFromAngle(angleDeg: number): StackLayout {
  const rad = (angleDeg * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const depth = (cos + 1) / 2;
  const behind = Math.max(0, -cos);

  return {
    x: sin * CAROUSEL.radius + behind * CAROUSEL.peekX,
    y: -sin * 12 - behind * CAROUSEL.peekY,
    z: cos * CAROUSEL.radius - CAROUSEL.radius + sin * CAROUSEL.ringTilt,
    rotateY: -sin * CAROUSEL.faceTurn,
    rotateX: -sin * 5,
    scale: 0.87 + depth * 0.13,
    depth,
  };
}

function normalizeIndex(index: number, total: number): number {
  return ((index % total) + total) % total;
}

function shortestDelta(from: number, to: number, total: number): number {
  let delta = to - normalizeIndex(Math.round(from), total);
  if (delta > total / 2) delta -= total;
  if (delta < -total / 2) delta += total;
  return delta;
}

function resolveInitialIndex(items: Release[], initialActiveId?: string): number {
  if (initialActiveId) {
    const byId = items.findIndex((r) => r.id === initialActiveId);
    if (byId >= 0) return byId;
  }
  const featured = items.findIndex((r) => r.featured);
  return featured >= 0 ? featured : 0;
}

export function AlbumStack({
  releases,
  className = "",
  initialActiveId,
  onActiveChange,
}: Props) {
  const router = useRouter();
  const items = useMemo(() => releases.filter((r) => r.cover), [releases]);
  const initialIndex = resolveInitialIndex(items, initialActiveId);
  const itemsRef = useRef(items);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const motionRef = useRef({ rotation: initialIndex });
  const targetRef = useRef(initialIndex);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const floatRef = useRef<gsap.core.Tween | null>(null);
  const dragRef = useRef({
    active: false,
    dragging: false,
    startX: 0,
    startY: 0,
    startRotation: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });
  const isAnimatingRef = useRef(false);
  const stageQuickTo = useRef<{
    rotateX: (value: number) => void;
    rotateY: (value: number) => void;
  } | null>(null);
  const { reducedMotion } = useMotionPreference();

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isMotionLocked, setIsMotionLocked] = useState(false);

  // GSAP callbacks read the list outside of render, so keep a ref in sync with it.
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const renderRing = useCallback((rotation: number) => {
    const stage = stageRef.current;
    const stackItems = itemsRef.current;
    if (!stage || !stackItems.length) return;

    const arcStep = arcStepForCount(stackItems.length);

    stackItems.forEach((_, index) => {
      const angle = angleForItem(index, rotation, arcStep);
      const layout = layoutFromAngle(angle);
      const link = linkRefs.current[index];
      const card = link?.querySelector<HTMLElement>("[data-album-card]");
      if (!link || !card) return;

      link.style.zIndex = String(Math.round(800 + layout.z));

      gsap.set(link, {
        x: layout.x,
        y: layout.y,
        z: layout.z,
        rotateY: layout.rotateY,
        rotateX: layout.rotateX,
        scale: layout.scale,
        force3D: true,
        transformPerspective: CAROUSEL.perspective,
      });

      card.classList.toggle("album-stack-card--hero", layout.depth > 0.92);
    });
  }, []);

  const finishMotion = useCallback(
    (rotation: number) => {
      const stackItems = itemsRef.current;
      const snapped = normalizeIndex(Math.round(rotation), stackItems.length);
      motionRef.current.rotation = snapped;
      targetRef.current = snapped;
      renderRing(snapped);
      isAnimatingRef.current = false;
      setIsMotionLocked(false);
      setActiveIndex(snapped);
      onActiveChange?.(stackItems[snapped], snapped);
      floatRef.current?.resume();
    },
    [onActiveChange, renderRing]
  );

  const settleTo = useCallback(
    (target: number, duration: number, ease: string) => {
      tweenRef.current?.kill();
      floatRef.current?.pause();
      isAnimatingRef.current = true;
      setIsMotionLocked(true);
      targetRef.current = target;

      tweenRef.current = gsap.to(motionRef.current, {
        rotation: target,
        duration: reducedMotion ? 0 : duration,
        ease,
        overwrite: true,
        onUpdate: () => renderRing(motionRef.current.rotation),
        onComplete: () => finishMotion(target),
      });

      return tweenRef.current;
    },
    [finishMotion, reducedMotion, renderRing]
  );

  /** Steps are measured from the pending target so rapid clicks queue instead of stalling. */
  const rotate = useCallback(
    (direction: 1 | -1) => {
      if (itemsRef.current.length < 2) return;
      settleTo(targetRef.current + direction, CAROUSEL.stepDuration, CAROUSEL.ease);
    },
    [settleTo]
  );

  const focusIndex = useCallback(
    (index: number) => {
      const total = itemsRef.current.length;
      if (total < 2) return;
      const delta = shortestDelta(targetRef.current, index, total);
      if (delta === 0) return;
      settleTo(targetRef.current + delta, CAROUSEL.stepDuration, CAROUSEL.ease);
    },
    [settleTo]
  );

  const openRelease = useCallback(
    (release: Release) => {
      const href = release.linkHub ?? release.href;
      if (release.linkHub) {
        router.push(href);
        return;
      }
      window.open(href, "_blank", "noopener,noreferrer");
    },
    [router]
  );

  useEffect(() => {
    motionRef.current.rotation = initialIndex;
    renderRing(initialIndex);
    onActiveChange?.(items[initialIndex], initialIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount only
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reducedMotion) return;

    stageQuickTo.current = {
      rotateX: gsap.quickTo(stage, "rotateX", { duration: 1.1, ease: EASING.gsap.out }),
      rotateY: gsap.quickTo(stage, "rotateY", { duration: 1.1, ease: EASING.gsap.out }),
    };
  }, [reducedMotion]);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage || !items.length) return;

    const links = stage.querySelectorAll<HTMLElement>("[data-album-link]");
    const inners = stage.querySelectorAll<HTMLElement>("[data-album-float]");

    if (reducedMotion) {
      gsap.set(links, { clearProps: "all", opacity: 1 });
      renderRing(motionRef.current.rotation);
      return;
    }

    gsap.set(links, {
      opacity: 0,
      y: 48,
      rotateX: 14,
      force3D: true,
      transformPerspective: CAROUSEL.perspective,
    });

    const enter = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top 82%",
        once: true,
      },
      onComplete: () => {
        floatRef.current = gsap.to(inners, {
          y: "+=5",
          duration: 3.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.35, from: "center" },
        });
      },
    });

    items.forEach((_, index) => {
      const layout = layoutFromAngle(
        angleForItem(index, motionRef.current.rotation, arcStepForCount(items.length))
      );

      enter.to(
        links[index],
        {
          opacity: 1,
          x: layout.x,
          y: layout.y,
          z: layout.z,
          rotateY: layout.rotateY,
          rotateX: layout.rotateX,
          scale: layout.scale,
          duration: DURATION.cinematic,
          ease: EASING.gsap.outStrong,
        },
        index * 0.14
      );
    });

    return () => {
      enter.kill();
      floatRef.current?.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === root) t.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- entrance runs once on mount
  }, [items.length, reducedMotion]);

  useEffect(
    () => () => {
      tweenRef.current?.kill();
    },
    []
  );

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || isCoarsePointer()) return;

    const drag = dragRef.current;
    if (drag.dragging) {
      const dx = event.clientX - drag.startX;
      motionRef.current.rotation = drag.startRotation - dx * CAROUSEL.dragSensitivity;
      renderRing(motionRef.current.rotation);

      const now = performance.now();
      const dt = Math.max(now - drag.lastTime, 1);
      drag.velocity = (event.clientX - drag.lastX) / dt;
      drag.lastX = event.clientX;
      drag.lastTime = now;
      return;
    }

    if (isAnimatingRef.current) return;

    const stage = stageRef.current;
    const quick = stageQuickTo.current;
    if (!stage || !quick) return;

    const rect = stage.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    quick.rotateY(px * 9);
    quick.rotateX(-py * 7);
  };

  const onLeave = () => {
    const quick = stageQuickTo.current;
    if (!quick || reducedMotion) return;
    quick.rotateY(0);
    quick.rotateX(0);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (items.length < 2 || reducedMotion) return;
    if ((event.target as HTMLElement).closest(".album-stack-nav")) return;

    tweenRef.current?.kill();
    floatRef.current?.pause();
    isAnimatingRef.current = false;
    setIsMotionLocked(false);
    targetRef.current = motionRef.current.rotation;

    dragRef.current = {
      active: true,
      dragging: false,
      startX: event.clientX,
      startY: event.clientY,
      startRotation: motionRef.current.rotation,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active || items.length < 2) return;

    if (drag.dragging) {
      const inertia = -drag.velocity * CAROUSEL.momentumScale * 1000;
      const projected = motionRef.current.rotation + inertia;
      const duration = Math.min(
        1.4,
        CAROUSEL.snapDuration + Math.min(Math.abs(drag.velocity) * 0.0018, 0.45)
      );
      settleTo(Math.round(projected), duration, CAROUSEL.snapEase);
    } else {
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      const rotation = motionRef.current.rotation;

      if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy)) {
        rotate(dx > 0 ? -1 : 1);
      } else if (Math.abs(rotation - Math.round(rotation)) > 0.001) {
        settleTo(Math.round(rotation), CAROUSEL.snapDuration, CAROUSEL.snapEase);
      } else {
        floatRef.current?.resume();
      }
    }

    drag.active = false;
    drag.dragging = false;
  };

  const onPointerMoveStart = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const dx = event.clientX - drag.startX;
    if (Math.abs(dx) > 6) {
      drag.dragging = true;
      setIsMotionLocked(true);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (items.length < 2) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      rotate(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      rotate(-1);
    }
  };

  if (!items.length) return null;

  const activeRelease = items[activeIndex];

  return (
    <div
      ref={rootRef}
      className={`album-stack ${className}`.trim()}
      onPointerMove={(event) => {
        onPointerMoveStart(event);
        onMove(event);
      }}
      onPointerLeave={onLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        dragRef.current.active = false;
        dragRef.current.dragging = false;
        setIsMotionLocked(false);
        floatRef.current?.resume();
      }}
      onKeyDown={onKeyDown}
      tabIndex={items.length > 1 ? 0 : undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label="Album covers"
    >
      <div className="album-stack-rig">
        {items.length > 1 && (
          <div className="album-stack-controls">
            <button
              type="button"
              className="album-stack-nav"
              onClick={(event) => {
                event.stopPropagation();
                rotate(-1);
              }}
              aria-label={`Previous album: ${items[normalizeIndex(activeIndex - 1, items.length)].title}`}
            >
              ←
            </button>
            <button
              type="button"
              className="album-stack-nav"
              onClick={(event) => {
                event.stopPropagation();
                rotate(1);
              }}
              aria-label={`Next album: ${items[normalizeIndex(activeIndex + 1, items.length)].title}`}
            >
              →
            </button>
          </div>
        )}

        <div ref={stageRef} className="album-stack-stage">
          {items.map((release, index) => {
            const isActive = index === activeIndex && !isMotionLocked;
            const isExternal = !release.linkHub;

            return (
              <div
                key={release.id}
                ref={(el) => {
                  linkRefs.current[index] = el;
                }}
                data-album-link
                data-cursor={isActive ? (isExternal ? "external" : "view") : "view"}
                className={`album-stack-link ${isActive ? "" : "album-stack-link--peek"}`}
                role="button"
                tabIndex={isActive ? 0 : -1}
                aria-label={
                  isActive
                    ? `Open ${release.title}`
                    : `Bring ${release.title} to front`
                }
                onClick={() => {
                  if (isMotionLocked) return;
                  if (index === activeIndex) {
                    openRelease(release);
                  } else {
                    focusIndex(index);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    if (index === activeIndex) openRelease(release);
                    else focusIndex(index);
                  }
                }}
              >
                <article data-album-card className="album-stack-card">
                  <div data-album-float className="album-stack-card-float">
                    <div className="album-stack-card-inner">
                      {release.cover && (
                        <Image
                          src={assetPath(release.cover)}
                          alt={`${release.title} cover`}
                          width={480}
                          height={480}
                          unoptimized
                          priority={index === initialIndex}
                          className="album-stack-cover"
                          sizes="(max-width: 768px) 70vw, 320px"
                        />
                      )}
                      <div className="album-stack-card-meta">
                        <p className="album-stack-card-type">{release.type}</p>
                        <p className="album-stack-card-title">{release.title}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {activeRelease.title}
      </p>
    </div>
  );
}
