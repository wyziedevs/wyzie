import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wyzie — Technology Solutions",
  description:
    "Wyzie is a technology solutions company building production-grade APIs, open source tools, and offering consulting & custom development services.",
  keywords: ["Wyzie", "API", "open source", "consulting", "development", "technology"],
  metadataBase: new URL("https://wyzie.io"),
  openGraph: {
    title: "Wyzie — Technology Solutions",
    description:
      "Production-grade APIs, open source development, and consulting services.",
    url: "https://wyzie.io",
    siteName: "Wyzie",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wyzie — Technology Solutions",
    description: "Production-grade APIs, open source development, and consulting services.",
  },
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
        {children}
      </body>
    </html>
  );
}
