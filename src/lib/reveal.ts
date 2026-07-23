import { DURATION, EASING } from "@/lib/motion";

export type RevealKind = "heading" | "text" | "media" | "group" | "meta" | "line";

export const REVEAL = {
  heading: {
    y: 28,
    duration: DURATION.slow,
    ease: EASING.gsap.outStrong,
  },
  text: {
    y: 20,
    duration: DURATION.base + 0.15,
    ease: EASING.gsap.out,
  },
  media: {
    y: 32,
    duration: DURATION.slow,
    ease: EASING.gsap.out,
  },
  group: {
    y: 18,
    duration: DURATION.base,
    ease: EASING.gsap.out,
    stagger: 0.06,
  },
  meta: {
    y: 12,
    duration: DURATION.base,
    ease: EASING.gsap.out,
  },
  line: {
    y: 0,
    duration: DURATION.base,
    ease: EASING.gsap.out,
  },
} as const;

export function revealKindFromEl(el: HTMLElement): RevealKind {
  const raw = el.getAttribute("data-reveal");
  if (
    raw === "heading" ||
    raw === "text" ||
    raw === "media" ||
    raw === "group" ||
    raw === "meta" ||
    raw === "line"
  ) {
    return raw;
  }
  return "text";
}
