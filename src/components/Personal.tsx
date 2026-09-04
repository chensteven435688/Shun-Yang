import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProgressiveImage } from "@/components/media/ProgressiveImage";
import { aboutPortrait } from "@/lib/criticalAssets";

type Props = {
  standalone?: boolean;
};

export function Personal({ standalone = false }: Props) {
  return (
    <section
      id={standalone ? undefined : "about"}
      className={`about-section section-tone--light px-6 py-24 md:px-10 md:py-32 ${
        standalone ? "pt-32 md:pt-36" : ""
      }`}
      data-reveal-scope
    >
      <div className="mx-auto max-w-7xl">
        <div className="ui-card">
        <SectionHeader
          as={standalone ? "h1" : "h2"}
          index="01"
          eyebrow="About"
          title={
            <>
              Shun Yang
              <span className="mt-2 block text-lg font-normal tracking-normal text-ink-muted md:text-xl">
                陳舜揚
              </span>
            </>
          }
        />

        <div className="about-grid mt-14 md:mt-16">
          <div className="about-statement">
            <p data-reveal="heading" className="about-lead">
              Lyrics that feel less composed than remembered.
            </p>
            <p
              data-reveal="meta"
              className="mt-6 text-sm uppercase tracking-[0.2em] text-cream/40"
            >
              Vocalist · Lyricist · Creator · Taipei, Taiwan
            </p>
            <div data-reveal="meta" className="about-meta-rail">
              <span>EN / 中文</span>
              <span>ΛTLΛST</span>
              <span>Romantica</span>
            </div>
          </div>

          <div className="about-body">
            <p data-reveal="text" className="text-lg leading-relaxed text-cream/75 md:text-xl">
              I&apos;m a vocalist and lyricist who writes from the inside out —
              lyrics that feel less composed than remembered. Beyond music, this
              is my personal space: moments, projects, and the things I&apos;m
              building along the way.
            </p>
            <p data-reveal="text" className="mt-6 text-base leading-relaxed text-cream/55 md:text-lg">
              With{" "}
              <a
                href="https://atlastofficial.com"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                className="text-lime transition-opacity hover:opacity-80"
              >
                ΛTLΛST
              </a>
              , my duo with Will, I make music where two instruments are enough
              to say everything that matters. Raw voice, honest strings, and the
              space between them.
            </p>

            <blockquote
              data-reveal="heading"
              className="about-quote mt-10 border-l border-lime/40 pl-6 font-serif text-lg italic leading-relaxed text-cream/70 md:text-xl"
            >
              &ldquo;We don&apos;t make music to be remembered. We make it
              because some things can only be said with a chord and a
              breath.&rdquo;
            </blockquote>

            <div data-reveal="group" className="mt-12 flex flex-wrap gap-3">
              {["Lead Vocals", "Lyricist", "Composer", "ΛTLΛST"].map((tag) => (
                <span key={tag} data-reveal-item className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <figure data-reveal="media" className="about-portrait">
            <ProgressiveImage
              src={aboutPortrait.src}
              alt="Shun Yang in Taipei, 2025"
              width={aboutPortrait.width}
              height={aboutPortrait.height}
              aspectRatio="4 / 5"
              sizes={aboutPortrait.sizes}
              srcSet={aboutPortrait.srcSetJpg}
              webpSrcSet={aboutPortrait.srcSetWebp}
              placeholderSrc={aboutPortrait.placeholder}
              className="about-portrait-image"
              imgClassName="object-cover object-center"
              fallbackLabel="Portrait unavailable"
            />
            <figcaption className="about-portrait-caption">
              TAIPEI, 2025
            </figcaption>
          </figure>
        </div>

        {!standalone && (
          <p data-reveal="meta" className="mt-12 text-[10px] uppercase tracking-[0.3em] text-ink-faint">
            Continue to{" "}
            <Link href="/music/" data-cursor="link" className="text-ink-muted hover:text-lime-dim">
              Music
            </Link>
          </p>
        )}
        </div>
      </div>
    </section>
  );
}
