"use client";

import { usePathname } from "next/navigation";
import { HOME_SECTIONS, isHomePath, NAV_LINKS } from "@/lib/nav";
import { useActiveSection } from "@/hooks/useActiveSection";

/**
 * Desktop-only vertical section progress. Hidden on small screens and non-home routes.
 */
export function SectionProgress() {
  const pathname = usePathname();
  const active = useActiveSection({ pathname });

  if (!isHomePath(pathname)) return null;

  const current =
    HOME_SECTIONS.find((s) => s.id === active) ??
    HOME_SECTIONS[0];
  const index =
    NAV_LINKS.find((l) => l.sectionId === current.id)?.index ?? current.index;

  return (
    <aside
      className="section-progress"
      aria-label={`Current section ${current.label}`}
    >
      <span className="section-progress-index">{index}</span>
      <span className="section-progress-line" aria-hidden />
      <span className="section-progress-label">{current.label}</span>
    </aside>
  );
}
