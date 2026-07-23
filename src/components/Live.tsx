import { SectionHeader } from "@/components/ui/SectionHeader";
import { nextShow, pastShows, upcomingShows } from "@/data/shows";

export function Live() {
  return (
    <section
      id="live"
      className="live-section section-divider px-6 py-24 md:px-10 md:py-32"
      data-reveal-scope
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="05"
          eyebrow="ΛTLΛST · Tour"
          title={
            <>
              Live &amp; <em className="text-lime">Present</em>
            </>
          }
          description="Upcoming performances and a growing archive of past dates."
        />

        <div className="live-next mt-14 md:mt-16" data-reveal="group">
          <p data-reveal-item className="section-eyebrow !text-lime">
            <span className="section-index">Next</span>
            <span className="section-eyebrow-rule" aria-hidden />
            <span>Upcoming</span>
          </p>
          {upcomingShows.map((show) => (
            <div key={show.date + show.venue} data-reveal-item className="live-next-card">
              <p className="live-next-date">{show.date}</p>
              <h3 className="live-next-venue">{show.venue}</h3>
              <p className="live-next-detail">{show.detail}</p>
              <div className="live-next-meta">
                <span>{show.city}</span>
                <span className="text-lime">{show.status}</span>
              </div>
              {show.ticketUrl && (
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="external"
                  className="btn-lime mt-6 inline-flex"
                >
                  Tickets ↗
                </a>
              )}
              {show.infoUrl && (
                <a
                  href={show.infoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="external"
                  className="btn-outline mt-6 inline-flex"
                >
                  Info ↗
                </a>
              )}
            </div>
          ))}
          {!upcomingShows.length && (
            <p data-reveal-item className="text-cream/45">
              {nextShow.venue} — {nextShow.status}
            </p>
          )}
        </div>

        <div className="live-archive mt-16 md:mt-20">
          <p data-reveal="meta" className="section-eyebrow">
            <span className="section-index">Archive</span>
            <span className="section-eyebrow-rule" aria-hidden />
            <span>Past Shows</span>
          </p>

          <ol className="live-timeline mt-8">
            {pastShows.map((show, i) => (
              <li
                key={show.date + show.venue}
                data-reveal="text"
                className="live-timeline-item"
              >
                <span className="live-timeline-marker" aria-hidden />
                <span className="live-timeline-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="live-timeline-date">{show.date}</p>
                <div className="live-timeline-body">
                  <p className="live-timeline-venue">{show.venue}</p>
                  <p className="live-timeline-detail">{show.detail}</p>
                </div>
                <p className="live-timeline-city">{show.city}</p>
                <p className="live-timeline-status">{show.status}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
