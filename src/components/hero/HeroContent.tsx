import Link from "next/link";

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
        Vocalist · Lyricist · Creator
      </p>

      <h1 className="hero-title" data-hero-enter="title">
        <span className="hero-title-en">SHUN YANG</span>
        <span className="hero-title-zh">陳舜揚</span>
      </h1>

      <p className="hero-roles" data-hero-enter="meta">
        Taipei · Taiwan · ΛTLΛST
      </p>

      <p className="hero-statement" data-hero-enter="text">
        Lyrics that feel less composed than remembered — raw voice, honest
        strings, and the space between them.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3" data-hero-enter="meta">
        <Link href="/music/" data-cursor="view" className="btn-lime">
          Listen
        </Link>
        <Link href="/#about" data-cursor="link" className="btn-outline">
          About
        </Link>
      </div>
    </div>
  );
}
