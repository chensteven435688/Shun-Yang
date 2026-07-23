const QUERY = "(prefers-reduced-motion: reduce)";

export function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(QUERY).matches;
}

export function subscribeReducedMotion(
  callback: (reduced: boolean) => void
): () => void {
  if (typeof window === "undefined") return () => undefined;

  const mql = window.matchMedia(QUERY);
  const handler = () => callback(mql.matches);

  callback(mql.matches);
  mql.addEventListener("change", handler);
  return () => mql.removeEventListener("change", handler);
}

/** Sync html dataset for CSS hooks (set before paint via inline boot script too). */
export function applyReducedMotionAttr(reduced: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.reducedMotion = reduced ? "true" : "false";
}
