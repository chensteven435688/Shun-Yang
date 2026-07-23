"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { assetPath } from "@/lib/assetPath";
import { NAV_LINKS, isHomePath, normalizePathname } from "@/lib/nav";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useMotionPreference } from "@/components/providers/MotionProvider";
import { EASING } from "@/lib/motion";

function linkIsActive(
  link: (typeof NAV_LINKS)[number],
  pathname: string,
  activeSection: string | null
) {
  const path = normalizePathname(pathname);

  if (link.route) {
    return path === link.route || path.startsWith(`${link.route}/`);
  }

  if (link.sectionId && isHomePath(path)) {
    return activeSection === link.sectionId;
  }

  return false;
}

export function Nav() {
  const pathname = usePathname();
  const { reducedMotion } = useMotionPreference();
  const activeSection = useActiveSection({ pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (menuOpen) setMenuOpen(false);
  }
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const musicCtaRef = useRef<HTMLAnchorElement>(null);
  const hasAnimatedRef = useRef(false);
  const mainRef = useRef<HTMLElement | null>(null);

  useMagnetic(logoRef, { reducedMotion, strength: 0.22 });
  useMagnetic(musicCtaRef, { reducedMotion, strength: 0.3 });
  useMagnetic(triggerRef, { reducedMotion, strength: 0.25 });
  useFocusTrap(menuOpen, panelRef, triggerRef);

  // Body scroll lock + inert backdrop content
  useEffect(() => {
    const main = document.querySelector("main");
    mainRef.current = main instanceof HTMLElement ? main : null;
    const footer = document.querySelector("footer");

    if (menuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      return () => {
        document.body.style.overflow = prevOverflow;
        main?.removeAttribute("inert");
        footer?.removeAttribute("inert");
      };
    }

    document.body.style.overflow = "";
    main?.removeAttribute("inert");
    footer?.removeAttribute("inert");
    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    const linksEl = linksRef.current;
    const feature = featureRef.current;
    const footer = footerRef.current;
    if (!menu || !linksEl) return;

    const linkItems = linksEl.querySelectorAll<HTMLElement>("[data-nav-link]");
    const backdrop = menu.querySelector(".nav-menu-backdrop");

    if (menuOpen) {
      hasAnimatedRef.current = true;
      gsap.killTweensOf([menu, backdrop, linksEl, linkItems, feature, footer]);
      gsap.set(menu, { pointerEvents: "auto", visibility: "visible" });

      if (reducedMotion) {
        gsap.set(menu, { opacity: 1 });
        gsap.set(linkItems, { opacity: 1, y: 0 });
        if (feature) gsap.set(feature, { opacity: 1, x: 0 });
        if (footer) gsap.set(footer, { opacity: 1, y: 0 });
        return;
      }

      gsap.to(menu, { opacity: 1, duration: 0.45, ease: EASING.gsap.out });

      if (backdrop) {
        gsap.fromTo(
          backdrop,
          { opacity: 0 },
          { opacity: 1, duration: 0.7, ease: EASING.gsap.out }
        );
      }

      gsap.fromTo(
        linkItems,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: EASING.gsap.outStrong,
          delay: 0.06,
        }
      );

      if (feature) {
        gsap.fromTo(
          feature,
          { x: 24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: EASING.gsap.out, delay: 0.2 }
        );
      }

      if (footer) {
        gsap.fromTo(
          footer,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: EASING.gsap.out, delay: 0.3 }
        );
      }

      return;
    }

    if (!hasAnimatedRef.current) return;

    gsap.killTweensOf([menu, backdrop, linksEl, linkItems, feature, footer]);

    if (reducedMotion) {
      gsap.set(menu, { opacity: 0, pointerEvents: "none", visibility: "hidden" });
      return;
    }

    gsap.to(menu, {
      opacity: 0,
      duration: 0.28,
      ease: EASING.gsap.in,
      onComplete: () =>
        gsap.set(menu, { pointerEvents: "none", visibility: "hidden" }),
    });
  }, [menuOpen, reducedMotion]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header pointer-events-none fixed top-0 left-0 right-0 z-50">
        <div className="site-header-inner pointer-events-none flex items-start justify-between px-6 py-5 md:px-10 md:py-7">
          <nav className="flex w-full items-start justify-between" aria-label="Primary">
            <Link
              ref={logoRef}
              href="/"
              data-cursor="link"
              className="pointer-events-auto font-serif text-xl leading-[0.95] tracking-wide text-cream md:text-2xl"
            >
              <span className="sr-only">Shun Yang — Home</span>
              <span aria-hidden>
                SHUN
                <br />
                YANG
              </span>
            </Link>

            <div className="pointer-events-auto flex items-center gap-3 md:gap-4">
              <div className="nav-desktop-meta hidden lg:flex lg:items-center lg:gap-5">
                <p className="nav-coord text-[9px] uppercase tracking-[0.35em] text-cream/35">
                  TPE · 25°02′N
                </p>
                <span className="nav-divider" aria-hidden />
                {isHomePath(pathname) && activeSection && (
                  <p className="text-[9px] uppercase tracking-[0.3em] text-lime/80">
                    {String(
                      NAV_LINKS.find((l) => l.sectionId === activeSection)
                        ?.index ?? ""
                    ).padStart(2, "0")}{" "}
                    <span className="text-cream/45">
                      {
                        NAV_LINKS.find((l) => l.sectionId === activeSection)
                          ?.label
                      }
                    </span>
                  </p>
                )}
              </div>

              <Link
                ref={musicCtaRef}
                href="/music/"
                data-cursor="view"
                className="nav-music-cta"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 fill-current"
                  aria-hidden
                >
                  <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
                </svg>
                Music
              </Link>

              <button
                ref={triggerRef}
                type="button"
                data-cursor="open"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls={menuId}
                onClick={() => setMenuOpen((v) => !v)}
                className={`nav-trigger ${menuOpen ? "is-open" : ""}`}
              >
                <span className="nav-ham-line w-5" />
                <span className="nav-ham-line w-5" />
              </button>
            </div>
          </nav>
        </div>
        <div className="site-header-rule" aria-hidden />
      </header>

      <div
        ref={menuRef}
        id={menuId}
        className="nav-menu fixed inset-0 z-40 opacity-0"
        aria-hidden={!menuOpen}
        style={{ visibility: "hidden" }}
      >
        <button
          type="button"
          className="nav-menu-dismiss"
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        />

        <div className="nav-menu-backdrop absolute inset-0" aria-hidden>
          <div className="relative h-full w-full">
            <Image
              src={assetPath("/images/hero/hero-640.jpg")}
              alt=""
              fill
              unoptimized
              priority={false}
              loading="lazy"
              className="object-cover object-center opacity-[0.16] blur-2xl saturate-[0.8]"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(196,165,116,0.1),transparent_45%)]" />
          <div className="absolute inset-0 bg-olive-dark/90" />
          <div className="nav-menu-grain absolute inset-0 opacity-[0.3]" aria-hidden />
        </div>

        <div
          ref={panelRef}
          className="relative z-10 flex h-[100dvh] flex-col px-6 pb-8 pt-28 md:px-10 md:pb-10 md:pt-32"
          tabIndex={-1}
        >
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <ul ref={linksRef} className="nav-menu-links">
              {NAV_LINKS.map((link) => {
                const active = linkIsActive(link, pathname, activeSection);
                return (
                  <li key={link.href} data-nav-link>
                    <Link
                      href={link.href}
                      data-cursor="link"
                      aria-current={active ? "page" : undefined}
                      onClick={closeMenu}
                      className={`nav-menu-link group ${active ? "is-active" : ""}`}
                    >
                      <span className="nav-menu-link-index">{link.index}</span>
                      <span className="nav-menu-link-label">{link.label}</span>
                      <span className="nav-menu-link-line" aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div
              ref={featureRef}
              className="nav-menu-feature mt-14 hidden lg:block"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-lime">
                Latest Release
              </p>
              <Link
                href="/music/intricate/"
                data-cursor="view"
                onClick={closeMenu}
                className="group mt-5 block"
              >
                <div className="relative aspect-square w-52 overflow-hidden border border-cream/10 bg-olive-dark transition-colors group-hover:border-lime/35">
                  <Image
                    src={assetPath("/images/intricate-cover.png")}
                    alt="Intricate album cover"
                    width={208}
                    height={208}
                    unoptimized
                    className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 font-serif text-3xl text-cream transition-colors group-hover:text-lime">
                  Intricate
                </p>
                <p className="mt-1 text-sm text-cream/45">
                  Romantica · Chen An Wang &amp; Shun Yang
                </p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-cream/35 transition-colors group-hover:text-lime/70">
                  View all links →
                </p>
              </Link>
            </div>
          </div>

          <div
            ref={footerRef}
            className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-3 border-t border-cream/8 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-0"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-cream/35">
              Vocalist · Lyricist · Taipei
            </p>
            <p className="font-serif text-lg text-cream/50">陳舜揚 · ΛTLΛST</p>
          </div>
        </div>
      </div>
    </>
  );
}
