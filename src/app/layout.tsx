import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CursorLight } from "@/components/CursorLight";
import { GlowCardTracker } from "@/components/GlowCardTracker";
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
    default: "Wyzie - Production-Grade APIs & Open Source Tools",
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
    "Go",
    "consulting",
    "custom development",
    "subtitle API",
    "technology solutions",
    "edge network",
    "developer tools",
    "infrastructure",
  ],
  metadataBase: new URL("https://wyzie.io"),
  alternates: {
    canonical: "https://wyzie.io",
  },
  openGraph: {
    title: "Wyzie - Production-Grade APIs & Open Source Tools",
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
        alt: "Wyzie - Production-Grade APIs & Open Source Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wyzie - Production-Grade APIs & Open Source Tools",
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://wyzie.io/#organization",
      name: "Wyzie",
      url: "https://wyzie.io",
      logo: {
        "@type": "ImageObject",
        url: "https://wyzie.io/favicon.png",
      },
      sameAs: [
        "https://github.com/wyziedevs",
        "https://discord.gg/2mxraHBVtB",
      ],
      description:
        "Technology solutions company building production-grade APIs, open source tools, and consulting services.",
    },
    {
      "@type": "WebSite",
      "@id": "https://wyzie.io/#website",
      url: "https://wyzie.io",
      name: "Wyzie",
      publisher: { "@id": "https://wyzie.io/#organization" },
      description:
        "Production-grade APIs, open source tools, and consulting services on Cloudflare's edge network.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CursorLight />
        <GlowCardTracker />
        {children}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
