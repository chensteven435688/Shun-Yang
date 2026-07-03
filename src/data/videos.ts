export type VideoBannerItem = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  quote?: string;
  src?: string;
  youtubeId?: string;
  poster?: string;
  href?: string;
  cta: string;
  placeholder?: boolean;
};

export const videoBanners: VideoBannerItem[] = [
  {
    id: "christmas-light",
    tag: "Music Video · Romantica",
    title: "Christmas Light",
    subtitle: "From the Romantica days",
    quote: "One of my early music videos — shot back when I was playing at Romantica.",
    src: "/videos/christmas-light-trailer.mp4",
    poster: "/images/christmas-light-mv-cover.jpg",
    cta: "Watch on YouTube",
    href: "https://www.youtube.com/watch?v=MydkARt5onE",
  },
  {
    id: "next-video",
    tag: "Video · Coming Soon",
    title: "Next Project",
    subtitle: "TBA",
    quote: "Something new is on the way.",
    placeholder: true,
    cta: "Stay Tuned",
    href: "#next-video",
  },
];
