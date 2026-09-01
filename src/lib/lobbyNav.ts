export type LobbyLink = {
  label: string;
  href: string;
};

/** Homepage lobby navigation — mirrors zhuohmu.com category list pattern */
export const LOBBY_LINKS: LobbyLink[] = [
  { label: "Music", href: "/music/" },
  { label: "Videos", href: "/videos/" },
  { label: "Moments", href: "/moments/" },
  { label: "about", href: "/about/" },
  { label: "contact", href: "/contact/" },
];
