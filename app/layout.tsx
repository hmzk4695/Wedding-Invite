import type { Metadata } from "next";
import { Cinzel, Montserrat, Amiri, Alex_Brush } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
});

const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-amiri",
  weight: ["400", "700"],
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Nikkah of Fatima & Usman",
  description: "The Royal Wedding Celebration of Fatima & Usman — 25th December 2026",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${montserrat.variable} ${amiri.variable} ${alexBrush.variable}`}>
      <body className="antialiased font-sans bg-[#f3ede3] text-[#2b241b] selection:bg-[#c59e47]/30">{children}</body>
    </html>
  );
}