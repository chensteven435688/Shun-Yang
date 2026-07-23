import Link from "next/link";
import { nextShow } from "@/data/shows";

function StageIcon() {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      className="h-14 w-full text-cream/50"
      aria-hidden
    >
      <path
        d="M10 55 L60 25 L110 55"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <line x1="25" y1="55" x2="25" y2="68" stroke="currentColor" strokeWidth="1" />
      <line x1="95" y1="55" x2="95" y2="68" stroke="currentColor" strokeWidth="1" />
      <path
        d="M8 68 L112 68"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <ellipse cx="60" cy="42" rx="8" ry="12" stroke="currentColor" strokeWidth="0.8" />
      <line x1="60" y1="54" x2="60" y2="62" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

export function NextLiveWidget() {
  return (
    <Link
      href="/#live"
      data-lobby-depth="1"
      data-cursor="view"
      className="next-live-widget pointer-events-auto absolute bottom-8 left-6 z-20 hidden md:block"
    >
      <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-cream/45">
        Next Live
      </p>

      <div className="mt-3 px-1">
        <StageIcon />
      </div>

      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/80">
        {nextShow.venue}
      </p>

      <div className="mt-3 flex items-center gap-2 border-t border-cream/10 pt-3">
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-lime" aria-hidden>
          <path
            fill="currentColor"
            d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
          />
        </svg>
        <span className="text-[9px] uppercase tracking-[0.15em] text-cream/45">
          ΛTLΛST · {nextShow.city}
        </span>
      </div>
    </Link>
  );
}
