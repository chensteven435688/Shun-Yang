export type Show = {
  date: string;
  venue: string;
  detail: string;
  city: string;
  status: string;
  upcoming: boolean;
};

export const shows: Show[] = [
  {
    date: "2026 Summer",
    venue: "Upcoming Show",
    detail: "Taipei",
    city: "台北 · Taipei",
    status: "More Info Soon",
    upcoming: true,
  },
  {
    date: "2025.08.15",
    venue: "寒舍艾麗",
    detail: "Business Performance · Humble House",
    city: "台北 · Taipei",
    status: "Past Show",
    upcoming: false,
  },
  {
    date: "2025.07.17",
    venue: "貴族世家",
    detail: "Full Length Concert · Backstage Cafe",
    city: "台北 · Taipei",
    status: "Past Show",
    upcoming: false,
  },
  {
    date: "2024.06.01",
    venue: "Romantica",
    detail: "Full Length Concert · Backstage Cafe",
    city: "台北 · Taipei",
    status: "Past Show",
    upcoming: false,
  },
  {
    date: "2023.08.18",
    venue: "Romantica",
    detail: "Full Length Concert · Revolver Bar",
    city: "台北 · Taipei",
    status: "Past Show",
    upcoming: false,
  },
];

export const nextShow = shows.find((s) => s.upcoming) ?? shows[0];
