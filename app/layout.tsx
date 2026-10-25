import type { Metadata } from "next";
import { Chewy, Permanent_Marker } from "next/font/google";
import Announcement from "@/components/Announcement";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/data";
import { metaFor } from "@/lib/metadata";
import "./globals.css";

// The live Trace theme uses Chewy for headings and Permanent Marker for everything else.
const chewy = Chewy({ weight: "400", subsets: ["latin"], variable: "--primary-font", display: "swap" });
const marker = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--secondary-font", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.metadata.og.url),
  ...metaFor("/"),
  icons: {
    icon: site.metadata.icons
      .filter((i) => i.rel === "icon")
      .map((i) => ({ url: i.href, type: i.type ?? undefined })),
    apple: site.metadata.icons.filter((i) => i.rel === "apple-touch-icon").map((i) => i.href),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${chewy.variable} ${marker.variable}`}>
      <body>
        <Announcement />
        <Header />
        <main className="content" id="main">
          <div className="wrapper">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
