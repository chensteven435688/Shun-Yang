import type { Metadata } from "next";
import { Libre_Baskerville, DM_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/effects/Cursor";
import { FilmGrain } from "@/components/effects/FilmGrain";
import { OpeningLoader } from "@/components/loader/OpeningLoader";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SectionProgress } from "@/components/navigation/SectionProgress";
import { RouteFade } from "@/components/transitions/RouteFade";
import { MagneticController } from "@/components/effects/MagneticController";
import { bootScript } from "@/lib/bootScript";
import { siteOrigin, siteUrl } from "@/lib/site";
import "./globals.css";

const libre = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-libre",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: "Shun Yang — Vocalist, Lyricist & Creator",
  description:
    "Personal portfolio of Shun Yang (陳舜揚) — vocalist and lyricist of ΛTLΛST. Music, moments, and everything in between.",
  openGraph: {
    type: "website",
    url: siteUrl(),
    title: "Shun Yang — Vocalist, Lyricist & Creator",
    description:
      "Personal portfolio of Shun Yang — vocalist and lyricist of ΛTLΛST from Taipei.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 675,
        alt: "Shun Yang — Taipei, 2025",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shun Yang — Vocalist, Lyricist & Creator",
    description:
      "Personal portfolio of Shun Yang — vocalist and lyricist of ΛTLΛST from Taipei.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${libre.variable} ${dmSans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <noscript>
          <style>{`
            [data-reveal]{opacity:1!important;transform:none!important}
            .opening-loader{display:none!important}
          `}</style>
        </noscript>
        <MotionProvider>
          <OpeningLoader />
          <FilmGrain />
          <Cursor />
          <MagneticController />
          <RouteFade />
          <SmoothScroll>
            <Nav />
            <SectionProgress />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
