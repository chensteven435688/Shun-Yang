"use client";

import { usePathname } from "next/navigation";
import { isHomePath } from "@/lib/nav";

export function Footer() {
  const pathname = usePathname();

  if (isHomePath(pathname)) {
    return null;
  }

  return (
    <footer className="section-divider px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="font-serif text-xl text-cream/40">
          Shun Yang · ΛTLΛST
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-cream/25">
          © {new Date().getFullYear()} — All rights reserved
        </p>
      </div>
    </footer>
  );
}
