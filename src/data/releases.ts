export type Release = {
  title: string;
  type: string;
  subtitle: string;
  href: string;
  cover?: string;
};

export const releases: Release[] = [
  {
    title: "Intricate",
    type: "Album",
    subtitle: "Romantica · Chen An Wang & Shun Yang",
    href: "https://music.apple.com/tw/album/intricate/1787195411",
  },
  {
    title: "I Thought We Had a Future",
    type: "Remastered",
    subtitle: "Romantica · Shun Yang & Chen An Wang",
    href: "https://music.apple.com/tw/album/i-thought-we-had-a-future-remastered/1787195411?i=1787195412",
    cover: "/images/i-thought-we-had-a-future-cover.png",
  },
  {
    title: "Heartbeat",
    type: "Single",
    subtitle: "ΛTLΛST",
    href: "https://artists.landr.com/055855409133",
  },
  {
    title: "Memories",
    type: "Single",
    subtitle: "ΛTLΛST",
    href: "https://artists.landr.com/064837908922",
  },
];
