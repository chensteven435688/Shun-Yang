import {
  atlastSite,
  atlastSocials,
  contactEmail,
  personalSocials,
  type SocialLink,
} from "@/data/socials";
import { SectionHeader } from "@/components/ui/SectionHeader";

function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          data-cursor="external"
          data-reveal-item
          className="tag-pill transition-colors hover:border-lime/40 hover:text-cream"
        >
          {link.short}
          <span className="ml-1 opacity-40" aria-hidden>
            ↗
          </span>
        </a>
      ))}
    </div>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="contact-finale section-divider px-6 py-24 md:px-10 md:py-32"
      data-reveal-scope
    >
      <div className="mx-auto max-w-7xl">
        <div className="contact-shell">
          <div className="contact-lambda" aria-hidden>
            <svg viewBox="0 0 120 140" fill="none">
              <path
                d="M28 118 L60 18 L92 118"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M42 78 H78"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.55"
              />
            </svg>
          </div>

          <SectionHeader
            index="06"
            eyebrow="Collaboration"
            title={
              <>
                Get in <em className="text-lime">Touch</em>
              </>
            }
            description="For music, shows, collaborations, or just to say hello — reach out or follow along."
          />

          <div data-reveal="group" className="contact-cta mt-10">
            <a
              href={`mailto:${contactEmail}`}
              data-magnetic
              data-cursor="link"
              data-reveal-item
              className="btn-lime contact-email-btn"
            >
              Send Email
            </a>
            <a
              href={`mailto:${contactEmail}`}
              data-cursor="link"
              data-reveal-item
              className="contact-email-text"
            >
              {contactEmail}
            </a>
            <a
              href={atlastSite}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="external"
              data-reveal-item
              className="section-text-link"
            >
              atlastofficial.com ↗
            </a>
          </div>

          <div data-reveal="group" className="contact-socials mt-14">
            <div data-reveal-item>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-cream/35">
                Personal
              </p>
              <SocialLinks links={personalSocials} />
            </div>
            <div data-reveal-item>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-cream/35">
                ΛTLΛST
              </p>
              <SocialLinks links={atlastSocials} />
            </div>
          </div>

          <p data-reveal="meta" className="contact-sign">
            Shun Yang · 陳舜揚 · Taipei
          </p>
        </div>
      </div>
    </section>
  );
}
