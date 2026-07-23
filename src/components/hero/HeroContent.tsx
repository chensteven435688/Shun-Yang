import Link from "next/link";
import { getFeaturedRelease } from "@/data/releases";

const latest = getFeaturedRelease();

type Props = {
  className?: string;
};

/**
 * Server-renderable hero identity content.
 */
export function HeroContent({ className = "" }: Props) {
  return (
    <div className={`hero-content ${className}`.trim()}>
      <p className="hero-kicker" data-hero-enter="meta">
        Taipei · Taiwan · ΛTLΛST
      </p>

      <h1 className="hero-title" data-hero-enter="title">
        <span className="hero-title-en">SHUN YANG</span>
        <span className="hero-title-zh">陳舜揚</span>
      </h1>

      <p className="hero-roles" data-hero-enter="meta">
        Vocalist · Lyricist · Creator
      </p>

      <p className="hero-statement" data-hero-enter="text">
        It doesn&apos;t matter{" "}
        <em className="hero-em">where</em> you start, it&apos;s{" "}
        <em className="hero-em">how</em> you progress from there.
      </p>

      {latest && (
        <div className="hero-release" data-hero-enter="meta">
          <p className="hero-release-label">Latest Release</p>
          <Link
            href={latest.linkHub ?? latest.href}
            data-cursor="view"
            className="hero-release-link"
          >
            <span className="hero-release-title">{latest.title}</span>
            <span className="hero-release-sub">{latest.subtitle}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
