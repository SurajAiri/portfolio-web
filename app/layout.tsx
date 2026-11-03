import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Geist_Mono,
  Instrument_Sans,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { personalInfo } from "@/data/personal";

const siteUrl = "https://www.surajairi.com.np";

// Display face for headlines: Bricolage Grotesque, with its optical-size axis
// so large headlines get the tighter, more characterful cut automatically.
const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

// Reading face for everything else.
const body = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

// Mono is kept only for code blocks and inline code in project write-ups.
const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
  themeColor: "#0b1411",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
