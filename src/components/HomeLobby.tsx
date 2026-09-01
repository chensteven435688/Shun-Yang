"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ProgressiveImage } from "@/components/media/ProgressiveImage";
import { lobbyPhoto } from "@/data/gallery";
import { LOBBY_LINKS } from "@/lib/lobbyNav";
import { atlastSite, personalSocials } from "@/data/socials";

export function HomeLobby() {
  useEffect(() => {
    document.documentElement.dataset.page = "lobby";
    return () => {
      delete document.documentElement.dataset.page;
    };
  }, []);

  return (
    <section className="home-lobby" aria-label="Shun Yang">
      <figure className="home-lobby-figure">
        <ProgressiveImage
          src={lobbyPhoto.src}
          alt={lobbyPhoto.alt ?? "Shun Yang"}
          width={lobbyPhoto.width}
          height={lobbyPhoto.height}
          aspectRatio="1 / 1"
          sizes="(max-width: 768px) 88vw, 520px"
          className="home-lobby-image"
          imgClassName="object-cover object-center"
          fallbackLabel="Image unavailable"
        />
      </figure>

      <h1 className="home-lobby-title">Shun Yang</h1>

      <nav className="home-lobby-nav" aria-label="Portfolio">
        <ul className="home-lobby-links">
          {LOBBY_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="home-lobby-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="home-lobby-socials" aria-label="Social links">
        {personalSocials.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="home-lobby-social"
          >
            {link.label}
          </a>
        ))}
        <a
          href={atlastSite}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="ATLAST"
          className="home-lobby-social home-lobby-social--atlast"
        >
          ATLAST
        </a>
      </div>
    </section>
  );
}
