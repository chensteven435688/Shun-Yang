import { NAV_LINKS } from "@/lib/nav";

export type LobbyLink = {
  label: string;
  href: string;
};

/** Kept off the lobby until there is a confirmed show to point at. */
const LOBBY_OMITTED: ReadonlySet<string> = new Set(["Live"]);

/**
 * Homepage lobby navigation — mirrors zhuohmu.com category list pattern.
 * Derived from NAV_LINKS so the lobby always lists routes in the same order as
 * the top bar. `.home-lobby-link` applies no text-transform, so these labels
 * render verbatim.
 */
export const LOBBY_LINKS: LobbyLink[] = NAV_LINKS.filter(
  (link) => !LOBBY_OMITTED.has(link.label)
).map(({ label, href }) => ({ label, href }));
