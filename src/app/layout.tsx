import type { Metadata } from "next";
import { Libre_Baskerville, DM_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/effects/Cursor";
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
  metadataBase: new URL("https://shunyang.com"),
  title: "Shun Yang — Vocalist, Lyricist & Creator",
  description:
    "Personal portfolio of Shun Yang (陳舜揚) — vocalist and lyricist of ΛTLΛST. Music, moments, and everything in between.",
  openGraph: {
    title: "Shun Yang — Vocalist, Lyricist & Creator",
    description:
      "Personal portfolio of Shun Yang — vocalist and lyricist of ΛTLΛST from Taipei.",
    images: ["/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${libre.variable} ${dmSans.variable}`}>
      <body>
        <Cursor />
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
