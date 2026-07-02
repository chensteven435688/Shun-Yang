export function Personal() {
  return (
    <section id="about" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-lime">
              About Me
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-cream md:text-5xl lg:text-6xl">
              Shun Yang
              <span className="mt-2 block text-lg font-normal text-cream/50 md:text-xl">
                陳舜揚
              </span>
            </h2>
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-cream/40">
              Vocalist · Lyricist · Creator · Taiwan
            </p>
          </div>

          <div className="lg:col-span-7" data-reveal>
            <p className="text-lg leading-relaxed text-cream/75 md:text-xl">
              I&apos;m a vocalist and lyricist who writes from the inside out —
              lyrics that feel less composed than remembered. Beyond music, this
              is my personal space: moments, projects, and the things I&apos;m
              building along the way.
            </p>
            <p className="mt-6 text-base leading-relaxed text-cream/55 md:text-lg">
              With{" "}
              <a
                href="https://atlastofficial.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime transition-opacity hover:opacity-80"
              >
                ΛTLΛST
              </a>
              , my duo with Will, I make music where two instruments are enough
              to say everything that matters. Raw voice, honest strings, and the
              space between them.
            </p>

            <blockquote className="mt-10 border-l border-lime/40 pl-6 font-serif text-lg italic leading-relaxed text-cream/70 md:text-xl">
              &ldquo;We don&apos;t make music to be remembered. We make it
              because some things can only be said with a chord and a
              breath.&rdquo;
            </blockquote>

            <div className="mt-12 flex flex-wrap gap-3">
              {[
                "Lead Vocals",
                "Lyricist",
                "Composer",
                "Photography",
                "ΛTLΛST",
              ].map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
