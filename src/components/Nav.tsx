"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Videos", href: "#videos" },
  { label: "Music", href: "#music" },
  { label: "Moments", href: "#moments" },
  { label: "Live", href: "#live" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="pointer-events-none fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-10 md:py-8">
        <nav className="flex items-start justify-between">
          <a
            href="#"
            data-magnetic
            className="pointer-events-auto font-serif text-xl leading-[0.95] tracking-wide text-cream md:text-2xl"
          >
            SHUN
            <br />
            YANG
          </a>

          <div className="pointer-events-auto flex items-center gap-3">
            <a href="#music" data-magnetic className="btn-lime">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
                aria-hidden
              >
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
              </svg>
              Music
            </a>

            <button
              type="button"
              data-magnetic
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-cream/20 bg-olive-dark/30 backdrop-blur-sm"
            >
              <span
                className={`nav-ham-line w-5 ${menuOpen ? "translate-y-[5px] rotate-45" : "w-4"}`}
              />
              <span
                className={`nav-ham-line w-5 ${menuOpen ? "-translate-y-[5px] -rotate-45" : "w-5"}`}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-olive-dark/95 backdrop-blur-md transition-all duration-700 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-magnetic
                onClick={() => setMenuOpen(false)}
                className="font-serif text-4xl text-cream transition-colors hover:text-lime md:text-6xl"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
