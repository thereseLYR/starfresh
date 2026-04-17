import SiteNav from "@/app/components/SiteNav";
import { ThemeProvider } from "@/app/context/ThemeContext";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const nobleType = localFont({
  src: "../public/fonts/NobleType_Light-s.p.726ac507.otf",
  variable: "--font-noble",
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Starfresh · Character Creator",
  description:
    "Build your character for Starfresh — choose your species, faction, constellation, history, career, and stats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nobleType.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SiteNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
