"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const links = [
  { label: "About", href: "/#about", index: "01" },
  { label: "Videos", href: "/#videos", index: "02" },
  { label: "Music", href: "/music", index: "03" },
  { label: "Moments", href: "/#moments", index: "04" },
  { label: "Live", href: "/#live", index: "05" },
  { label: "Contact", href: "/#contact", index: "06" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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

      gsap.set(menu, { pointerEvents: "auto" });
      gsap.set(linksEl, { opacity: 1, y: 0 });
      gsap.set(linkItems, { opacity: 1, y: 0 });

      gsap.to(menu, {
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });

      if (backdrop) {
        gsap.fromTo(
          backdrop,
          { scale: 1.06, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }
        );
      }

      gsap.fromTo(
        linkItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.07,
          ease: "power4.out",
          delay: 0.1,
        }
      );

      if (feature) {
        gsap.fromTo(
          feature,
          { x: 32, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.85, ease: "power3.out", delay: 0.3 }
        );
      }

      if (footer) {
        gsap.fromTo(
          footer,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", delay: 0.45 }
        );
      }

      return;
    }

    if (!hasAnimatedRef.current) return;

    gsap.killTweensOf([menu, backdrop, linksEl, linkItems, feature, footer]);

    gsap.to(menu, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => gsap.set(menu, { pointerEvents: "none" }),
    });

    gsap.to(linkItems, {
      y: 20,
      opacity: 0,
      duration: 0.25,
      stagger: 0.03,
      ease: "power2.in",
    });

    if (feature) {
      gsap.to(feature, { opacity: 0, x: 20, duration: 0.25, ease: "power2.in" });
    }

    if (footer) {
      gsap.to(footer, { opacity: 0, y: 12, duration: 0.25, ease: "power2.in" });
    }
  }, [menuOpen]);

  return (
    <>
      <header className="pointer-events-none fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-10 md:py-8">
        <nav className="flex items-start justify-between">
          <Link
            href="/"
            data-magnetic
            className="pointer-events-auto font-serif text-xl leading-[0.95] tracking-wide text-cream md:text-2xl"
          >
            SHUN
            <br />
            YANG
          </Link>

          <div className="pointer-events-auto flex items-center gap-3">
            <Link href="/music" data-magnetic className="btn-lime">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
                aria-hidden
              >
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
              </svg>
              Music
            </Link>

            <button
              type="button"
              data-magnetic
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border backdrop-blur-sm transition-colors duration-500 ${
                menuOpen
                  ? "border-lime/40 bg-olive-dark/80"
                  : "border-cream/20 bg-olive-dark/30"
              }`}
            >
              <span
                className={`nav-ham-line w-5 ${menuOpen ? "translate-y-[5px] rotate-45 bg-lime" : "w-4"}`}
              />
              <span
                className={`nav-ham-line w-5 ${menuOpen ? "-translate-y-[5px] -rotate-45 bg-lime" : "w-5"}`}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        ref={menuRef}
        className="nav-menu fixed inset-0 z-40 opacity-0"
        aria-hidden={!menuOpen}
      >
        <div className="nav-menu-backdrop absolute inset-0" aria-hidden>
          <div className="relative h-full w-full">
            <Image
              src="/hero.jpg"
              alt=""
              fill
              unoptimized
              className="object-cover object-center opacity-[0.18] blur-2xl saturate-[0.85]"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,169,110,0.12),transparent_45%)]" />
          <div className="absolute inset-0 bg-olive-dark/88 backdrop-blur-md" />
          <div className="nav-menu-grain absolute inset-0 opacity-[0.35]" aria-hidden />
        </div>

        <div className="relative z-10 flex h-full flex-col px-6 pb-8 pt-28 md:px-10 md:pb-10 md:pt-32">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <ul ref={linksRef} className="nav-menu-links">
              {links.map((link) => (
                <li key={link.href} data-nav-link>
                  <Link
                    href={link.href}
                    data-magnetic
                    onClick={() => setMenuOpen(false)}
                    className="nav-menu-link group"
                  >
                    <span className="nav-menu-link-index">{link.index}</span>
                    <span className="nav-menu-link-label">{link.label}</span>
                    <span className="nav-menu-link-line" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>

            <div
              ref={featureRef}
              className="nav-menu-feature mt-14 hidden lg:block"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-lime">
                Latest Release
              </p>
              <Link
                href="/music/intricate"
                data-magnetic
                onClick={() => setMenuOpen(false)}
                className="group mt-5 block"
              >
                <div className="relative aspect-square w-52 overflow-hidden rounded-sm border border-cream/10 bg-olive-dark transition-colors group-hover:border-lime/35">
                  <Image
                    src="/images/intricate-cover.png"
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
            <p className="font-serif text-lg text-cream/50">
              陳舜揚 · ΛTLΛST
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
