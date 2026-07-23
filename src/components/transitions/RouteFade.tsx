"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMotionPreference } from "@/components/providers/MotionProvider";

/**
 * Restrained route fade. Never blocks navigation; safety timeout always clears.
 */
export function RouteFade() {
  const pathname = usePathname();
  const { reducedMotion } = useMotionPreference();
  const [visible, setVisible] = useState(false);
  const prevPath = useRef(pathname);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (reducedMotion) return;
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];

    setVisible(true);
    const hide = window.setTimeout(() => setVisible(false), 280);
    const safety = window.setTimeout(() => setVisible(false), 900);
    timers.current = [hide, safety];

    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
  }, [pathname, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      className={`route-fade ${visible ? "is-visible" : ""}`}
      aria-hidden
    />
  );
}
