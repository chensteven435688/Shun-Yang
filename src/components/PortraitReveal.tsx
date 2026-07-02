"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/data/gallery";

type Props = {
  item: GalleryItem;
};

export function PortraitReveal({ item }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -1, y: -1, lastX: -1, lastY: -1, inside: false });
  const frameRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const top = topRef.current;
    const canvas = canvasRef.current;
    if (!container || !top || !canvas || !item.src || !item.revealSrc) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let maskDirty = false;

    const applyMask = () => {
      if (!maskDirty) return;
      maskDirty = false;
      const mask = `url(${canvas.toDataURL()})`;
      top.style.maskImage = mask;
      top.style.webkitMaskImage = mask;
      top.style.maskSize = "100% 100%";
      top.style.webkitMaskSize = "100% 100%";
      top.style.maskRepeat = "no-repeat";
      top.style.webkitMaskRepeat = "no-repeat";
    };

    const resetMask = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      maskDirty = true;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = width;
      canvas.height = height;
      resetMask();
      applyMask();
    };

    const erase = (x: number, y: number) => {
      const radius = Math.min(width, height) * 0.14;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
      gradient.addColorStop(0.45, "rgba(0, 0, 0, 0.65)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.globalCompositeOperation = "darken";
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      maskDirty = true;
    };

    const strokeErase = (x: number, y: number) => {
      const { lastX, lastY } = pointerRef.current;
      if (lastX < 0) {
        erase(x, y);
        return;
      }
      const dist = Math.hypot(x - lastX, y - lastY);
      const steps = Math.max(1, Math.ceil(dist / 3));
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        erase(lastX + (x - lastX) * t, lastY + (y - lastY) * t);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      pointerRef.current.inside = inside;
      if (!inside) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      strokeErase(x, y);
      pointerRef.current.lastX = x;
      pointerRef.current.lastY = y;
      pointerRef.current.x = x;
      pointerRef.current.y = y;
    };

    const onLeave = () => {
      pointerRef.current.inside = false;
      pointerRef.current.lastX = -1;
      pointerRef.current.lastY = -1;
    };

    const tick = () => {
      frameRef.current += 1;
      if (!pointerRef.current.inside) {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(255, 255, 255, 0.018)";
        ctx.fillRect(0, 0, width, height);
        maskDirty = true;
      }
      if (maskDirty && frameRef.current % 2 === 0) applyMask();
      rafId = requestAnimationFrame(tick);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    container.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      container.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [item.revealSrc, item.src]);

  if (!item.src || !item.revealSrc) return null;

  return (
    <figure
      data-float
      data-depth={item.depth}
      data-parallax={item.parallax}
      className={`photo-card portrait-reveal-card absolute [transform-style:preserve-3d] ${item.className}`}
    >
      <figcaption className="photo-caption">{item.caption}</figcaption>
      <div ref={containerRef} className="photo-frame portrait-reveal h-full w-full">
        <div className="portrait-reveal-bottom absolute inset-0">
          <Image
            src={item.revealSrc}
            alt=""
            fill
            priority
            unoptimized
            className="object-contain bg-olive-dark"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
        <div ref={topRef} className="portrait-reveal-top absolute inset-0">
          <Image
            src={item.src}
            alt={item.caption}
            fill
            priority
            quality={100}
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
        <canvas ref={canvasRef} className="portrait-reveal-canvas" aria-hidden />
      </div>
    </figure>
  );
}
