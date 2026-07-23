"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  applyReducedMotionAttr,
  getPrefersReducedMotion,
  subscribeReducedMotion,
} from "@/lib/reducedMotion";

type MotionContextValue = {
  reducedMotion: boolean;
  /** True after client hydration — safe for pointer / session checks */
  ready: boolean;
};

const MotionContext = createContext<MotionContextValue>({
  reducedMotion: false,
  ready: false,
});

function subscribeReady(onStoreChange: () => void) {
  onStoreChange();
  return () => undefined;
}

function getReadySnapshot() {
  return true;
}

function getServerReadySnapshot() {
  return false;
}

function subscribeMotion(onStoreChange: () => void) {
  return subscribeReducedMotion((reduced) => {
    applyReducedMotionAttr(reduced);
    onStoreChange();
  });
}

function getMotionSnapshot() {
  const reduced = getPrefersReducedMotion();
  applyReducedMotionAttr(reduced);
  return reduced;
}

function getServerMotionSnapshot() {
  return false;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    getServerMotionSnapshot
  );

  const ready = useSyncExternalStore(
    subscribeReady,
    getReadySnapshot,
    getServerReadySnapshot
  );

  const value = useMemo(
    () => ({ reducedMotion, ready }),
    [reducedMotion, ready]
  );

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}

export function useMotionPreference(): MotionContextValue {
  return useContext(MotionContext);
}
