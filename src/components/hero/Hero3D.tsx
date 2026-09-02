"use client";

import { useEffect, useRef } from "react";
import type { Hero3DMode } from "@/lib/hero3d";

type Props = {
  mode: Exclude<Hero3DMode, "static">;
  allowPointer: boolean;
  onReady?: () => void;
  onFatal?: () => void;
};

export function Hero3D({ mode, allowPointer, onReady, onFatal }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);
  const onFatalRef = useRef(onFatal);

  useEffect(() => {
    onReadyRef.current = onReady;
    onFatalRef.current = onFatal;
  }, [onReady, onFatal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const shell = shellRef.current;
    if (!canvas || !shell) return;

    let cancelled = false;
    let handle: {
      setPointer: (nx: number, ny: number) => void;
      setScroll: (t: number) => void;
      resize: (width: number, height: number) => void;
      setVisible: (visible: boolean) => void;
      setDocumentHidden: (hidden: boolean) => void;
      dispose: () => void;
    } | null = null;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;

    const cleanups: Array<() => void> = [];

    const boot = async () => {
      try {
        const { createHeroSculpture } = await import("./createHeroSculpture");
        if (cancelled) return;

        handle = createHeroSculpture({
          canvas,
          mode,
          onReady: () => {
            if (!cancelled) onReadyRef.current?.();
          },
        });

        const measure = () => {
          const rect = shell.getBoundingClientRect();
          handle?.resize(rect.width, rect.height);
        };
        measure();

        ro = new ResizeObserver(measure);
        ro.observe(shell);

        io = new IntersectionObserver(
          ([entry]) => {
            handle?.setVisible(
              entry.isIntersecting && entry.intersectionRatio > 0.08
            );
          },
          { threshold: [0, 0.08, 0.2, 0.5] }
        );
        io.observe(shell);

        const onVisibility = () => {
          handle?.setDocumentHidden(document.hidden);
        };
        document.addEventListener("visibilitychange", onVisibility);
        cleanups.push(() =>
          document.removeEventListener("visibilitychange", onVisibility)
        );

        if (allowPointer) {
          const onPointer = (event: PointerEvent) => {
            const rect = shell.getBoundingClientRect();
            const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
            handle?.setPointer(nx, ny);
          };
          const onLeave = () => handle?.setPointer(0, 0);
          shell.addEventListener("pointermove", onPointer, { passive: true });
          shell.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            shell.removeEventListener("pointermove", onPointer);
            shell.removeEventListener("pointerleave", onLeave);
          });
        }

        let scrollFrame = 0;
        const readScroll = () => {
          scrollFrame = 0;
          const rect = shell.getBoundingClientRect();
          const view = window.innerHeight || 1;
          const progress = 1 - Math.max(0, Math.min(1, rect.bottom / (view + rect.height)));
          handle?.setScroll(progress);
        };

        // Scroll can fire several times between paints and each rect read forces a
        // synchronous layout, so coalesce down to one read per frame.
        const onScroll = () => {
          if (!scrollFrame) scrollFrame = requestAnimationFrame(readScroll);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        readScroll();
        cleanups.push(() => {
          window.removeEventListener("scroll", onScroll);
          if (scrollFrame) cancelAnimationFrame(scrollFrame);
        });
      } catch {
        if (!cancelled) onFatalRef.current?.();
      }
    };

    void boot();

    return () => {
      cancelled = true;
      ro?.disconnect();
      io?.disconnect();
      cleanups.forEach((fn) => fn());
      handle?.dispose();
      handle = null;
    };
  }, [mode, allowPointer]);

  return (
    <div ref={shellRef} className="hero-3d-shell" aria-hidden>
      <canvas ref={canvasRef} className="hero-3d-canvas" />
    </div>
  );
}
