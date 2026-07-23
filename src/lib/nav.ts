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
  route?: "/music" | "/moments";
};

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/#about", index: "01", sectionId: "about" },
  { label: "Videos", href: "/#videos", index: "02", sectionId: "videos" },
  { label: "Music", href: "/music/", index: "03", route: "/music" },
  { label: "Moments", href: "/moments/", index: "04", route: "/moments" },
  { label: "Live", href: "/#live", index: "05", sectionId: "live" },
  { label: "Contact", href: "/#contact", index: "06", sectionId: "contact" },
];

export function normalizePathname(path: string): string {
  const bare = path.replace(/\/$/, "") || "/";
  return bare;
}

export function isHomePath(pathname: string): boolean {
  return normalizePathname(pathname) === "/";
}
