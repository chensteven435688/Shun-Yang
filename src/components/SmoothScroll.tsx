"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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

      const url = new URL(href, window.location.origin);
      const hash = url.hash;
      if (!hash) return;

      if (url.pathname !== window.location.pathname) return;

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

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");

    const revealElement = (el: HTMLElement, delay: number) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power4.out",
        delay,
      });
    };

    reveals.forEach((el, i) => {
      const delay = (i % 4) * 0.05;

      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => revealElement(el, delay),
      });

      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
        revealElement(el, delay);
      }
    });

    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        scaleY: 0.3,
        opacity: 0.3,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
      });
    }

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("popstate", onPopState);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
