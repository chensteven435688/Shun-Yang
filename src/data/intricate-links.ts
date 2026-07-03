export type LinkHubSocial = {
  label: string;
  href: string;
  icon: "instagram" | "youtube" | "email";
};

export type LinkHubItem = {
  title: string;
  subtitle?: string;
  href: string;
  thumbnail?: string;
};

export const intricateHub = {
  title: "Intricate",
  artist: "Romantica",
  subtitle: "Chen An Wang & Shun Yang",
  bio: "全新專輯《Intricate》現已發行！ New Album “Intricate” is released now!",
  cover: "/images/intricate-cover.png",
  socials: [
    {
      label: "Romantica on Instagram",
      href: "https://www.instagram.com/est2022.romantica/",
      icon: "instagram",
    },
    {
      label: "Romantica on YouTube",
      href: "https://www.youtube.com/@Romantica-official",
      icon: "youtube",
    },
    {
      label: "Email Romantica",
      href: "mailto:est2022.romantica@gmail.com",
      icon: "email",
    },
  ] satisfies LinkHubSocial[],
  links: [
    {
      title: "Romantica — Christmas Light (Official Music Video)",
      href: "https://www.youtube.com/watch?v=MydkARt5onE",
      thumbnail: "/images/christmas-light-mv-cover.jpg",
    },
    {
      title: "“Intricate” — Spotify",
      subtitle: "Album · Romantica",
      href: "https://open.spotify.com/album/4RybR5jnhNHguXQKy5zLRU",
      thumbnail: "/images/intricate-cover.png",
    },
    {
      title: "“Intricate” — Apple Music",
      subtitle: "Album · 9 songs",
      href: "https://music.apple.com/tw/album/intricate/1787195411",
      thumbnail: "/images/intricate-cover.png",
    },
    {
      title: "“Intricate” — YouTube",
      subtitle: "Album · Romantica",
      href: "https://www.youtube.com/playlist?list=PLAsVuJNtCU2AJTcgTw15XC1nSW_-T16Po",
      thumbnail: "/images/intricate-cover.png",
    },
    {
      title: "“Intricate” — KKBOX",
      subtitle: "Album · Romantica",
      href: "https://www.kkbox.com/tw/en/album/Sn9v6--u_eOqN4PGIC",
      thumbnail: "/images/intricate-cover.png",
    },
  ] satisfies LinkHubItem[],
};
