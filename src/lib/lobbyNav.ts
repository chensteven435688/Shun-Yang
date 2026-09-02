export type LobbyLink = {
  label: string;
  href: string;
};

/**
 * Homepage lobby navigation — mirrors zhuohmu.com category list pattern.
 * `.home-lobby-link` applies no text-transform, so labels render verbatim and
 * should stay title case to match NAV_LINKS.
 */
export const LOBBY_LINKS: LobbyLink[] = [
  { label: "Music", href: "/music/" },
  { label: "Videos", href: "/videos/" },
  { label: "Moments", href: "/moments/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];
