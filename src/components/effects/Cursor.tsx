"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useMotionPreference } from "@/components/providers/MotionProvider";
import { isCoarsePointer } from "@/lib/breakpoints";

type CursorState = "default" | "link" | "view" | "play" | "open" | "external";

const LABELS: Partial<Record<CursorState, string>> = {
  link: "Open",
  view: "View",
  play: "Play",
  open: "Menu",
  external: "↗",
};

export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const { reducedMotion, ready } = useMotionPreference();
  const [state, setState] = useState<CursorState>("default");

  useEffect(() => {
    if (!ready || reducedMotion || isCoarsePointer()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringSmooth = { x: pos.x, y: pos.y };
    let frameId = 0;
    let currentState: CursorState = "default";

    const setPos = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const applyState = (next: CursorState) => {
      if (next === currentState) return;
      currentState = next;
      setState(next);

      const expanded = next !== "default";
      gsap.to(ring, {
        scale: expanded ? 1.55 : 1,
        borderColor: expanded
          ? "rgba(196, 165, 116, 0.75)"
          : "rgba(232, 233, 236, 0.35)",
        duration: 0.28,
        overwrite: true,
      });
      gsap.to(dot, {
        scale: expanded ? 0.55 : 1,
        duration: 0.22,
        overwrite: true,
      });
    };

    const resolveState = (el: Element | null): CursorState => {
      if (!el) return "default";
      if (el.closest("input, textarea, select, [contenteditable='true']")) {
        return "default";
      }
      const host = el.closest<HTMLElement>("[data-cursor]");
      if (host) {
        const value = host.getAttribute("data-cursor");
        if (
          value === "link" ||
          value === "view" ||
          value === "play" ||
          value === "open" ||
          value === "external"
        ) {
          return value;
        }
      }
      const anchor = el.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href") ?? "";
        if (/^https?:\/\//i.test(href) || anchor.target === "_blank") {
          return "external";
        }
        return "link";
      }
      if (el.closest("button")) return "link";
      return "default";
    };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      applyState(resolveState(e.target as Element | null));
    };

    const onDown = () => {
      gsap.to(ring, {
        scale: currentState === "default" ? 0.85 : 1.35,
        duration: 0.12,
        overwrite: true,
      });
    };
    const onUp = () => {
      gsap.to(ring, {
        scale: currentState === "default" ? 1 : 1.55,
        duration: 0.18,
        overwrite: true,
      });
    };

    const render = () => {
      setPos(dot, pos.x, pos.y);
      ringSmooth.x += (pos.x - ringSmooth.x) * 0.2;
      ringSmooth.y += (pos.y - ringSmooth.y) * 0.2;
      setPos(ring, ringSmooth.x, ringSmooth.y);
      if (labelRef.current) {
        setPos(labelRef.current, ringSmooth.x, ringSmooth.y + 28);
      }
      frameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
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
  }, [ready, reducedMotion]);

  if (!ready || reducedMotion) return null;

  const label = LABELS[state];

  return (
    <div ref={rootRef} className="cursor-root" aria-hidden>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
      <span
        ref={labelRef}
        className={`cursor-label ${label ? "is-visible" : ""}`}
      >
        {label ?? ""}
      </span>
    </div>
  );
}
