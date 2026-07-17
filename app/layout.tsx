import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { personalInfo } from "@/data/personal";

// TODO: replace with your real deployed domain.
const siteUrl = "https://surajkairi.dev";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  // "optional" keeps the (metric-matched) fallback font if the real font
  // hasn't arrived in time, instead of swapping mid-session and causing a
  // layout shift — worth more here than guaranteeing the custom font on
  // slow connections.
  display: "optional",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
});

const title = "Suraj Kiran Airi | AI Engineer · Backend";
const description =
  "I build AI systems that solve real problems. AI Engineer and Backend Developer specializing in LLMs, voice AI, and production ML systems.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${personalInfo.name}`,
  },
  description,
  authors: [{ name: personalInfo.name, url: siteUrl }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: personalInfo.name,
    images: [
      {
        url: "/profile.webp",
        width: 512,
        height: 512,
        alt: personalInfo.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/profile.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
