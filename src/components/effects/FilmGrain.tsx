"use client";

import { useMotionPreference } from "@/components/providers/MotionProvider";

export function FilmGrain() {
  const { reducedMotion } = useMotionPreference();
  if (reducedMotion) return null;
  return <div className="film-grain" aria-hidden />;
}
