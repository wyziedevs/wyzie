import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import { MotionObserver } from "@/components/MotionObserver";
import { Tactile } from "@/components/Tactile";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Wyzie builds, sets up and runs business technology: custom software, websites, VoIP phone systems, networks, cloud and IT support, from the team that builds and runs Wyzie Subs, Kilter and pitmaster.cc.";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  title: {
    default: "Wyzie: Business Technology, Built and Kept Working",
    template: "%s | Wyzie",
  },
  description,
  keywords: [
    "Wyzie",
    "bespoke software",
    "custom software development",
    "web development",
    "website design",
    "VoIP phone systems",
    "business phone systems",
    "network setup",
    "IT support",
    "managed IT services",
    "Microsoft 365",
    "Google Workspace",
    "API development",
    "MVP development",
    "Cloudflare Workers",
    "TypeScript",
    "Go",
    "software consulting",
    "Wyzie Subs",
    "Kilter",
  ],
  metadataBase: new URL("https://wyzie.io"),
  alternates: {
    canonical: "https://wyzie.io",
  },
  openGraph: {
    title: "Wyzie: Business Technology, Built and Kept Working",
    description,
    url: "https://wyzie.io",
    siteName: "Wyzie",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/header.png",
        width: 350,
        height: 150,
        alt: "Wyzie",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Wyzie: Business Technology, Built and Kept Working",
    description,
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

export const viewport: Viewport = {
  themeColor: "#0f1218",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://wyzie.io/#organization",
      name: "Wyzie",
      legalName: "Wyzie LLC",
      url: "https://wyzie.io",
      email: "hello@wyzie.io",
      logo: {
        "@type": "ImageObject",
        url: "https://wyzie.io/favicon.png",
      },
      sameAs: ["https://github.com/wyziedevs", "https://discord.gg/2mxraHBVtB"],
      description,
    },
    {
      "@type": "WebSite",
      "@id": "https://wyzie.io/#website",
      url: "https://wyzie.io",
      name: "Wyzie",
      publisher: { "@id": "https://wyzie.io/#organization" },
      description,
    },
  ],
};

/*
 * Marks the page as animating before the first paint, so an entrance never
 * shows its final state and then jumps back to replay it. A reader who asked
 * for less motion is never marked, and neither is one without JavaScript:
 * for both, every word is simply on the page. If the observer never starts,
 * the deadline shows everything anyway.
 */
const motionScript = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.dataset.motion='on';setTimeout(function(){if(!d.dataset.observed){document.querySelectorAll('.reveal').forEach(function(e){e.dataset.shown=''})}},3000)}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={openSans.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <MotionObserver />
        <Tactile />
        {children}
      </body>
    </html>
  );
}
