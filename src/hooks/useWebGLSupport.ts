"use client";

import { useSyncExternalStore } from "react";

function detectWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

function subscribe() {
  return () => undefined;
}

export function useWebGLSupport(): boolean {
  return useSyncExternalStore(subscribe, detectWebGL, () => false);
}
