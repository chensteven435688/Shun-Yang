import Image from "next/image";
import Link from "next/link";
import type { LinkHubItem, LinkHubSocial } from "@/data/intricate-links";
import { assetPath } from "@/lib/assetPath";
import { ProgressiveImage } from "@/components/media/ProgressiveImage";
import { TrackLinkMotion } from "@/components/music/TrackLinkMotion";

type HubData = {
  title: string;
  artist: string;
  subtitle: string;
  bio: string;
  cover: string;
  socials: LinkHubSocial[];
  links: LinkHubItem[];
};

function SocialIcon({ icon }: { icon: LinkHubSocial["icon"] }) {
  if (icon === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }

  if (icon === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

type Props = {
  hub: HubData;
  backHref?: string;
  backLabel?: string;
};

export function LinkHub({
  hub,
  backHref = "/music",
  backLabel = "Back to Music",
}: Props) {
  return (
    <section className="link-hub min-h-screen px-6 pb-16 pt-32 md:pt-36">
      <div className="mx-auto w-full max-w-md">
        <Link
          href={backHref}
          data-cursor="link"
          className="mb-10 inline-flex text-[10px] uppercase tracking-[0.25em] text-cream/40 transition-colors hover:text-lime"
        >
          ← {backLabel}
        </Link>

        <div className="text-center" data-reveal="media">
          <div className="mx-auto relative aspect-square w-28 overflow-hidden border border-cream/15">
            <ProgressiveImage
              src={hub.cover}
              alt={`${hub.title} cover`}
              width={112}
              height={112}
              aspectRatio="1 / 1"
              sizes="112px"
              className="h-full w-full"
              fallbackLabel="Cover"
            />
          </div>

          <h1 className="mt-6 font-serif text-4xl text-cream">{hub.title}</h1>
          <p className="mt-2 text-sm text-cream/55">
            {hub.artist} · {hub.subtitle}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-cream/45">{hub.bio}</p>

          <div className="mt-6 flex items-center justify-center gap-3">
            {hub.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                data-cursor="external"
                className="link-hub-social flex h-11 w-11 items-center justify-center border border-cream/15 text-cream/70 transition-colors hover:border-lime/40 hover:text-lime"
              >
                <SocialIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>

        <TrackLinkMotion links={hub.links}>
          <ul className="mt-10 space-y-3">
            {hub.links.map((item) => (
              <li key={item.href + item.title} data-track-link>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="external"
                  className="link-hub-card group flex items-center gap-3 border border-cream/10 bg-olive-light/35 px-3 py-3 transition-colors hover:border-lime/35 hover:bg-olive-light/55"
                >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-olive-dark">
                  {item.thumbnail ? (
                    <Image
                      src={assetPath(item.thumbnail)}
                      alt=""
                      width={48}
                      height={48}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-cream/20"
                        aria-hidden
                      >
                        <path
                          fill="currentColor"
                          d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate text-sm font-medium text-cream group-hover:text-lime">
                    {item.title}
                  </p>
                  {item.subtitle && (
                    <p className="mt-0.5 truncate text-xs text-cream/40">
                      {item.subtitle}
                    </p>
                  )}
                </div>

                <span
                  className="pr-2 text-[10px] tracking-[0.2em] text-cream/30 transition-colors group-hover:text-lime/70"
                  aria-hidden
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
          </ul>
        </TrackLinkMotion>
      </div>
    </section>
  );
}
