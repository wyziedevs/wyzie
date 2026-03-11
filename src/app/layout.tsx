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
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  title: {
    default: "Wyzie - Technology Solutions",
    template: "%s | Wyzie",
  },
  description:
    "Wyzie builds production-grade APIs, open source tools, and offers consulting & custom development services. Serving 10M+ daily requests on Cloudflare's edge network with 99.9% uptime.",
  keywords: [
    "Wyzie",
    "API development",
    "open source",
    "Cloudflare Workers",
    "edge computing",
    "REST API",
    "TypeScript",
    "consulting",
    "custom development",
    "subtitle API",
    "technology solutions",
  ],
  metadataBase: new URL("https://wyzie.io"),
  alternates: {
    canonical: "https://wyzie.io",
  },
  openGraph: {
    title: "Wyzie - Technology Solutions",
    description:
      "Production-grade APIs on Cloudflare's edge network, open source tools used by millions, and consulting services. 10M+ daily requests, 99.9% uptime.",
    url: "https://wyzie.io",
    siteName: "Wyzie",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/header.png",
        width: 1200,
        height: 630,
        alt: "Wyzie - Technology Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wyzie - Technology Solutions",
    description:
      "Production-grade APIs, open source tools, and consulting services. 10M+ daily requests, 99.9% uptime.",
    images: ["/header.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
