export const HEADER_OFFSET_PX = 96;

export const HOME_SECTIONS = [
  { id: "about", label: "About", index: "01" },
  { id: "videos", label: "Videos", index: "02" },
  { id: "live", label: "Live", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
] as const;

export type HomeSectionId = (typeof HOME_SECTIONS)[number]["id"];

export type NavLink = {
  label: string;
  href: string;
  index: string;
  /** Homepage hash target without # */
  sectionId?: HomeSectionId;
  /** Separate app route (not a homepage hash) */
  route?: "/about" | "/videos" | "/music" | "/moments" | "/live" | "/contact";
};

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/about/", index: "01", route: "/about" },
  { label: "Videos", href: "/videos/", index: "02", route: "/videos" },
  { label: "Music", href: "/music/", index: "03", route: "/music" },
  { label: "Moments", href: "/moments/", index: "04", route: "/moments" },
  { label: "Live", href: "/live/", index: "05", route: "/live" },
  { label: "Contact", href: "/contact/", index: "06", route: "/contact" },
];

/**
 * Visible in the desktop top bar. The menu trigger is hidden at these widths,
 * so every route needs an entry here to stay reachable from a subpage.
 */
export const DESKTOP_NAV_LINKS = NAV_LINKS;

export function normalizePathname(path: string): string {
  const bare = path.replace(/\/$/, "") || "/";
  return bare;
}

export function isHomePath(pathname: string): boolean {
  return normalizePathname(pathname) === "/";
}
