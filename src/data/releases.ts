export type Release = {
  id: string;
  title: string;
  type: string;
  subtitle: string;
  href: string;
  spotifyHref?: string;
  cover?: string;
  linkHub?: string;
  year?: string;
  /** Short factual blurb when available */
  description?: string;
  /** Explicit homepage / music-page feature flag */
  featured?: boolean;
};

export const releases: Release[] = [
  {
    id: "intricate",
    title: "Intricate",
    type: "Album",
    subtitle: "Romantica · Chen An Wang & Shun Yang",
    href: "https://music.apple.com/tw/album/intricate/1787195411",
    linkHub: "/music/intricate",
    spotifyHref: "https://open.spotify.com/album/4RybR5jnhNHguXQKy5zLRU",
    cover: "/images/intricate-cover.png",
    year: "2024",
    featured: true,
    description:
      "Album from the Romantica era — Chen An Wang & Shun Yang.",
  },
  {
    id: "i-thought-we-had-a-future",
    title: "I Thought We Had a Future",
    type: "Remastered",
    subtitle: "Romantica · Shun Yang & Chen An Wang",
    href: "https://music.apple.com/tw/album/i-thought-we-had-a-future-remastered/1787195411?i=1787195412",
    cover: "/images/i-thought-we-had-a-future-cover.png",
    year: "2024",
  },
];

/** Prefer explicit featured; fall back to first entry. */
export function getFeaturedRelease(): Release {
  return releases.find((r) => r.featured) ?? releases[0];
}
