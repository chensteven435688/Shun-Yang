/**
 * Inline boot script — runs before paint to avoid loader/hydration flashes.
 * Injected via next/script (beforeInteractive) in the root layout.
 */
export const bootScript = `
(function () {
  try {
    var root = document.documentElement;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      root.setAttribute("data-reduced-motion", "true");
      root.setAttribute("data-loader", "skip");
    } else {
      root.classList.add("motion-enhance");
      if (sessionStorage.getItem("sy-loader-complete") === "1") {
        root.setAttribute("data-loader", "skip");
      }
    }
  } catch (e) {}
})();
`.trim();
