"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useMotionPreference } from "@/components/providers/MotionProvider";
import { EASING } from "@/lib/motion";
import { HEADER_OFFSET_PX, normalizePathname } from "@/lib/nav";
import { REVEAL, revealKindFromEl } from "@/lib/reveal";

gsap.registerPlugin(ScrollTrigger);

type LenisInstance = InstanceType<typeof Lenis>;

let activeLenis: LenisInstance | null = null;

function getLenis() {
  return activeLenis;
}

function scrollWithOffset(
  lenis: LenisInstance | null,
  hash: string,
  immediate = false
) {
  if (!hash || hash === "#") {
    if (lenis) lenis.scrollTo(0, { immediate });
    else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
    return;
  }

  const target = document.querySelector(hash);
  if (!(target instanceof HTMLElement)) return;

  if (lenis) {
    lenis.scrollTo(target, {
      offset: -HEADER_OFFSET_PX,
      immediate,
    });
    return;
  }

  const top =
    target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
  window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
}

function initReveals(reducedMotion: boolean) {
  const triggers: ScrollTrigger[] = [];
  const tweens: gsap.core.Tween[] = [];
  const revealed = new WeakSet<HTMLElement>();

  const mark = (el: HTMLElement) => {
    el.setAttribute("data-revealed", "true");
  };

  const revealOne = (el: HTMLElement, delay = 0, immediate = false) => {
    if (revealed.has(el)) return;
    revealed.add(el);

    if (immediate || reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
      mark(el);
      return;
    }

    const kind = revealKindFromEl(el);
    const preset = REVEAL[kind];

    if (kind === "group") {
      const children = el.querySelectorAll<HTMLElement>("[data-reveal-item]");
      if (children.length) {
        gsap.set(el, { opacity: 1, y: 0 });
        const groupPreset = REVEAL.group;
        const tween = gsap.fromTo(
          children,
          { opacity: 0, y: groupPreset.y },
          {
            opacity: 1,
            y: 0,
            duration: groupPreset.duration,
            ease: groupPreset.ease,
            stagger: groupPreset.stagger,
            delay,
            onComplete: () => mark(el),
          }
        );
        tweens.push(tween);
        return;
      }
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: preset.y },
      {
        opacity: 1,
        y: 0,
        duration: preset.duration,
        ease: preset.ease,
        delay,
        onComplete: () => mark(el),
      }
    );
    tweens.push(tween);
  };

  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]")
  );

  if (reducedMotion) {
    nodes.forEach((el) => revealOne(el, 0, true));
    return { triggers, tweens, refresh: () => undefined };
  }

  // Group by nearest section to limit ScrollTrigger count
  const bySection = new Map<Element | Document, HTMLElement[]>();
  for (const el of nodes) {
    const section =
      el.closest("section, article, [data-reveal-scope]") ?? document.body;
    const list = bySection.get(section) ?? [];
    list.push(el);
    bySection.set(section, list);
  }

  bySection.forEach((els, section) => {
    const trigger = ScrollTrigger.create({
      trigger: section === document.body ? els[0] : (section as Element),
      start: "top 88%",
      once: true,
      onEnter: () => {
        els.forEach((el, i) => revealOne(el, (i % 5) * 0.05));
      },
    });
    triggers.push(trigger);

    // Immediately reveal anything already in view
    const rect =
      section === document.body
        ? els[0].getBoundingClientRect()
        : (section as Element).getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      els.forEach((el, i) => revealOne(el, (i % 5) * 0.05, true));
    }
  });

  return {
    triggers,
    tweens,
    refresh: () => ScrollTrigger.refresh(),
  };
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { reducedMotion } = useMotionPreference();
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let rafId = 0;
    let indicatorTween: gsap.core.Tween | undefined;
    const revealApi = initReveals(reducedMotion);
    let lenis: LenisInstance | null = null;

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest("a[href*='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const url = new URL(href, window.location.href);
      if (!url.hash) return;

      if (
        normalizePathname(url.pathname) !==
        normalizePathname(window.location.pathname)
      ) {
        return;
      }

      event.preventDefault();
      scrollWithOffset(getLenis(), url.hash);
      window.history.pushState(null, "", `${url.pathname}${url.hash}`);
    };

    document.addEventListener("click", onAnchorClick);

    const onPopState = () => {
      scrollWithOffset(getLenis(), window.location.hash, true);
    };
    window.addEventListener("popstate", onPopState);

    if (!reducedMotion) {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.4,
      });
      activeLenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      const scrollIndicator = document.querySelector(".scroll-indicator");
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
    } else {
      activeLenis = null;
    }

    if (window.location.hash) {
      requestAnimationFrame(() => {
        scrollWithOffset(getLenis(), window.location.hash, true);
      });
    }

    const refresh = () => {
      if (cancelled) return;
      revealApi.refresh();
    };

    window.addEventListener("load", refresh);

    const onMedia = (event: Event) => {
      if (!(event.target instanceof HTMLImageElement)) return;
      refresh();
    };
    document.addEventListener("load", onMedia, true);

    const onVisibility = () => {
      if (document.hidden) {
        indicatorTween?.pause();
      } else {
        indicatorTween?.resume();
        refresh();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Route / content settle
    const settle = window.setTimeout(refresh, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(settle);
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("load", refresh);
      document.removeEventListener("load", onMedia, true);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(rafId);
      indicatorTween?.kill();
      revealApi.tweens.forEach((t) => t.kill());
      revealApi.triggers.forEach((t) => t.kill());
      if (lenis) {
        lenis.destroy();
        if (activeLenis === lenis) activeLenis = null;
      }
    };
  }, [reducedMotion, pathname]);

  return <>{children}</>;
}

export { scrollWithOffset, getLenis };
