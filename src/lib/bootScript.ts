/**
 * Inline boot script — runs before paint to avoid loader/hydration flashes.
 * Kept as a string for Next.js Script / dangerouslySetInnerHTML.
 */
export const bootScript = `
(function () {
  try {
    var root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.setAttribute("data-reduced-motion", "true");
      root.setAttribute("data-loader", "skip");
    } else if (sessionStorage.getItem("sy-loader-complete") === "1") {
      root.setAttribute("data-loader", "skip");
    }
  } catch (e) {}
})();
`.trim();
