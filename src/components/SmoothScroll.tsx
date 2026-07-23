"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "@/components/providers/MotionProvider";
import { EASING } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

function normalizePath(path: string) {
  return path.replace(/\/$/, "") || "/";
}

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { reducedMotion } = useMotionPreference();

  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const revealed = new WeakSet<HTMLElement>();

    const revealElement = (
      el: HTMLElement,
      delay: number,
      immediate = false
    ) => {
      if (revealed.has(el)) return;
      revealed.add(el);

      if (immediate || reducedMotion) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: EASING.gsap.outStrong,
        delay,
      });
    };

    if (reducedMotion) {
      reveals.forEach((el) => revealElement(el, 0, true));

      const onAnchorClick = (event: MouseEvent) => {
        const anchor = (event.target as Element | null)?.closest(
          "a[href*='#']"
        );
        if (!(anchor instanceof HTMLAnchorElement)) return;

        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;

        const url = new URL(href, window.location.href);
        const hash = url.hash;
        if (!hash) return;

        if (
          normalizePath(url.pathname) !==
          normalizePath(window.location.pathname)
        ) {
          return;
        }

        event.preventDefault();
        const target = document.querySelector(hash);
        if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: "auto" });
        }
        window.history.pushState(null, "", `${url.pathname}${hash}`);
      };

      document.addEventListener("click", onAnchorClick);
      return () => {
        document.removeEventListener("click", onAnchorClick);
      };
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const scrollToHash = (hash: string, immediate = false) => {
      if (!hash || hash === "#") {
        lenis.scrollTo(0, { immediate });
        return;
      }

      const target = document.querySelector(hash);
      if (target instanceof HTMLElement) {
        lenis.scrollTo(target, { immediate });
      }
    };

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest("a[href*='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const url = new URL(href, window.location.href);
      const hash = url.hash;
      if (!hash) return;

      if (
        normalizePath(url.pathname) !== normalizePath(window.location.pathname)
      ) {
        return;
      }

      event.preventDefault();
      scrollToHash(hash);
      window.history.pushState(null, "", `${url.pathname}${hash}`);
    };

    document.addEventListener("click", onAnchorClick);

    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash, true));
    }

    const onPopState = () => scrollToHash(window.location.hash, true);
    window.addEventListener("popstate", onPopState);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    reveals.forEach((el, i) => {
      const delay = (i % 4) * 0.05;

      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () => revealElement(el, delay),
      });
    });

    const revealVisible = () => {
      ScrollTrigger.refresh();
      reveals.forEach((el, i) => {
        if (isInViewport(el)) {
          revealElement(el, (i % 4) * 0.05, true);
        }
      });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(revealVisible);
    });

    window.addEventListener("load", revealVisible);

    const scrollIndicator = document.querySelector(".scroll-indicator");
    let indicatorTween: gsap.core.Tween | undefined;
    if (scrollIndicator) {
      indicatorTween = gsap.to(scrollIndicator, {
        scaleY: 0.3,
        opacity: 0.3,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: EASING.gsap.soft,
      });
    }

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("load", revealVisible);
      cancelAnimationFrame(rafId);
      indicatorTween?.kill();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
