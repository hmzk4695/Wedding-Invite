import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat, Amiri, Great_Vibes } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  weight: ["400", "700"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Fatima & Usman | Royal Nikkah Invitation",
  description: "Cordially inviting you to celebrate the Nikkah ceremony of Fatima and Usman.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${montserrat.variable} ${amiri.variable} ${greatVibes.variable}`}
    >
      <body className="antialiased bg-[#faf6ee] m-0 p-0 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}