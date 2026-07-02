const personalSocials = [
  {
    label: "Instagram",
    short: "IG",
    href: "https://www.instagram.com/levi._.c/",
  },
  {
    label: "YouTube",
    short: "YT",
    href: "https://www.youtube.com/@levi._.c",
  },
];

const atlastSocials = [
  {
    label: "Instagram",
    short: "IG",
    href: "https://instagram.com/atlast._.official",
  },
  {
    label: "YouTube",
    short: "YT",
    href: "https://youtube.com/@ATLAST-BAND-2025",
  },
  { label: "X", short: "X", href: "https://x.com/atlast_official" },
  {
    label: "Facebook",
    short: "FB",
    href: "https://www.facebook.com/profile.php?id=61586367412884",
  },
  {
    label: "Threads",
    short: "Threads",
    href: "https://www.threads.com/@atlast._.official",
  },
];

function SocialLinks({
  links,
}: {
  links: { label: string; short: string; href: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="tag-pill transition-colors hover:border-lime/40 hover:text-cream"
        >
          {link.short}
        </a>
      ))}
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section-divider px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div
          className="rounded-sm border border-cream/8 bg-olive-dark/50 p-10 md:p-16"
          data-reveal
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-lime">
            Stay Tuned
          </p>

          <h2 className="mt-4 font-serif text-5xl leading-[0.95] text-cream md:text-7xl">
            Get in <em className="text-lime">Touch</em>
          </h2>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/55 md:text-lg">
            For music, shows, collaborations, or just to say hello — reach out
            or follow along.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="mailto:info@atlastofficial.com" data-magnetic className="btn-lime">
              Send Email
            </a>
            <a
              href="https://atlastofficial.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.2em] text-cream/40 transition-colors hover:text-lime"
            >
              atlastofficial.com →
            </a>
          </div>

          <div className="mt-12 space-y-8 border-t border-cream/8 pt-10">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-cream/35">
                Personal
              </p>
              <SocialLinks links={personalSocials} />
            </div>
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-cream/35">
                ΛTLΛST
              </p>
              <SocialLinks links={atlastSocials} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
