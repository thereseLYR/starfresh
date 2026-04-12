import type { Metadata } from "next";
import localFont from "next/font/local";
import { Sora } from "next/font/google";
import { ThemeProvider } from "@/app/context/ThemeContext";
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
  title: "Character Creator",
  description: "Build your character",
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
