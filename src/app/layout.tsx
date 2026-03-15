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
    default: "Wyzie - Technology Solutions",
    template: "%s | Wyzie",
  },
  description:
    "Wyzie is a bespoke software company building production-grade web applications, open source tools, and offering technology consulting and custom development services.",
  keywords: [
    "Wyzie",
    "Technology Solutions",
    "bespoke software",
    "custom software development",
    "web development",
    "open source",
    "Cloudflare Workers",
    "edge computing",
    "TypeScript",
    "Go",
    "consulting",
    "software consulting",
    "custom development",
    "technology solutions",
    "edge network",
    "developer tools",
    "infrastructure",
    "full-stack development",
  ],
  metadataBase: new URL("https://wyzie.io"),
  alternates: {
    canonical: "https://wyzie.io",
  },
  openGraph: {
    title: "Wyzie - Technology Solutions",
    description:
      "Wyzie builds production-grade technology solutions, open source tools, and offers consulting and custom development services.",
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
      "Bespoke software solutions, open source tools, and technology consulting. 50+ projects delivered, 99.9% uptime.",
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
      sameAs: ["https://github.com/wyziedevs", "https://discord.gg/2mxraHBVtB"],
      description:
        "Technology solutions company building bespoke software, open source tools, and providing technology consulting services.",
    },
    {
      "@type": "WebSite",
      "@id": "https://wyzie.io/#website",
      url: "https://wyzie.io",
      name: "Wyzie",
      publisher: { "@id": "https://wyzie.io/#organization" },
      description:
        "Bespoke software solutions, open source tools, and technology consulting on Cloudflare's edge network.",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log('%c\u26a1 Built by Wyzie','font-size:14px;font-weight:bold;color:#2563eb');console.log('%cWe build things properly. See for yourself \u2192','color:#8a95a8');console.log('%chttps://github.com/wyziedevs','color:#60a5fa;text-decoration:underline');`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CursorLight />
        <GlowCardTracker />
        {children}
      </body>
    </html>
  );
}
