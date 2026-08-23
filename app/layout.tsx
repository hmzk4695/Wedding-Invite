import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat, Amiri } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Usman & Fatima | Royal Nikkah Invitation",
  description: "Cordially inviting you to celebrate the Nikkah ceremony of Usman and Fatima.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${montserrat.variable} ${amiri.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Exact upright signature wedding fonts with tall loops */}
        <link
          href="https://fonts.googleapis.com/css2?family=Birthstone+Bounce:wght@400;500&family=Mea+Culpa&family=Pinyon+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#faf6ee] m-0 p-0 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}