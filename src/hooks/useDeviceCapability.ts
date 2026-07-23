"use client";

import { useMemo } from "react";
import type { Hero3DMode } from "@/lib/hero3d";
import { useMotionPreference } from "@/components/providers/MotionProvider";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { isCoarsePointer } from "@/lib/breakpoints";

type NavConnection = {
  deviceMemory?: number;
  effectiveType?: string;
  saveData?: boolean;
};

function getConnection(): NavConnection | null {
  if (typeof navigator === "undefined") return null;
  const nav = navigator as Navigator & {
    connection?: NavConnection;
    deviceMemory?: number;
  };
  return {
    deviceMemory: nav.deviceMemory,
    effectiveType: nav.connection?.effectiveType,
    saveData: nav.connection?.saveData,
  };
}

/**
 * Capability policy for the hero 3D experience.
 * Prefers stability and battery over showing WebGL everywhere.
 */
export function useDeviceCapability(): {
  mode: Hero3DMode;
  allowPointer: boolean;
  ready: boolean;
} {
  const { reducedMotion, ready } = useMotionPreference();
  const webgl = useWebGLSupport();

  return useMemo(() => {
    if (!ready) {
      return { mode: "static" as const, allowPointer: false, ready: false };
    }

    if (reducedMotion || !webgl) {
      return { mode: "static" as const, allowPointer: false, ready: true };
    }

    const conn = getConnection();
    const memory = conn?.deviceMemory;
    const cores =
      typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 4 : 4;
    const width = typeof window !== "undefined" ? window.innerWidth : 1024;
    const coarse = isCoarsePointer();
    const saveData = Boolean(conn?.saveData);
    const slowNet =
      conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g";

    if (saveData || slowNet || width < 480) {
      return { mode: "static" as const, allowPointer: false, ready: true };
    }

    const weak =
      (typeof memory === "number" && memory > 0 && memory <= 4) || cores <= 4;

    if (weak || coarse || width < 900) {
      return {
        mode: "reduced" as const,
        allowPointer: false,
        ready: true,
      };
    }

    return {
      mode: "full" as const,
      allowPointer: !coarse,
      ready: true,
    };
  }, [ready, reducedMotion, webgl]);
}
